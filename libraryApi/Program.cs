using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<BookContext>(opt => opt.UseInMemoryDatabase("LibrarySystem"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
var app = builder.Build();

// GET all books
app.MapGet("/books", async (BookContext db) =>
    await db.Books.ToListAsync());

// GET books for a specific user
app.MapGet("/users/{userId}/books", async (int userId, BookContext db) =>
    await db.Books.Where(b => b.UserId == userId).ToListAsync());

// GET a specific book
app.MapGet("/books/{id}", async (int id, BookContext db) =>
    await db.Books.FindAsync(id)
        is Book book
            ? Results.Ok(book)
            : Results.NotFound());

// POST a new book
app.MapPost("/books", async (Book book, BookContext db) =>
{
    db.Books.Add(book);
    await db.SaveChangesAsync();
    return Results.Created($"/books/{book.Id}", book);
});

// PUT update a book
app.MapPut("/books/{id}", async (int id, Book inputBook, BookContext db) =>
{
    var book = await db.Books.FindAsync(id);
    if (book is null) return Results.NotFound();
    book.Title = inputBook.Title;
    book.Author = inputBook.Author;
    book.Rating = inputBook.Rating;
    book.Status = inputBook.Status;
    book.CoverImageUrl = inputBook.CoverImageUrl;
    await db.SaveChangesAsync();
    return Results.NoContent();
});

// DELETE a book
app.MapDelete("/books/{id}", async (int id, BookContext db) =>
{
    if (await db.Books.FindAsync(id) is Book book)
    {
        db.Books.Remove(book);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }
    return Results.NotFound();
});

// GET all users
app.MapGet("/users", async (BookContext db) =>
    await db.Users.ToListAsync());

// GET a specific user
app.MapGet("/users/{id}", async (int id, BookContext db) =>
    await db.Users.FindAsync(id)
        is User user
            ? Results.Ok(user)
            : Results.NotFound());

// POST a new user
app.MapPost("/users", async (User user, BookContext db) =>
{
    if (await db.Users.AnyAsync(u => u.Username == user.Username))
        return Results.BadRequest("Username already exists");
    db.Users.Add(user);
    await db.SaveChangesAsync();
    return Results.Created($"/users/{user.Id}", user);
});

// PUT update a user
app.MapPut("/users/{id}", async (int id, User inputUser, BookContext db) =>
{
    var user = await db.Users.FindAsync(id);
    if (user is null) return Results.NotFound();
    if (user.Username != inputUser.Username && await db.Users.AnyAsync(u => u.Username == inputUser.Username))
        return Results.BadRequest("Username already exists");
    user.Username = inputUser.Username;
    user.PasswordHash = inputUser.PasswordHash;
    await db.SaveChangesAsync();
    return Results.NoContent();
});

// DELETE a user
app.MapDelete("/users/{id}", async (int id, BookContext db) =>
{
    if (await db.Users.FindAsync(id) is User user)
    {
        db.Users.Remove(user);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }
    return Results.NotFound();
});

app.Run();

// Your existing User, Book, and BookContext classes here