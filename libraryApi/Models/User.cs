using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

public class User
{
    public int Id { get; set; }
    [Required]
    [StringLength(50, MinimumLength = 3)]
    public string Username { get; set; }
    [Required]
    public string PasswordHash { get; set; }
    public List<Book> Books { get; set; }
}

public class Book
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required string Author { get; set; }
    public int? Rating { get; set; }
    public required string Status { get; set; }
    public required string CoverImageUrl { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
}

public class BookContext : DbContext
{
    public BookContext(DbContextOptions<BookContext> options) : base(options) { }
    public DbSet<Book> Books { get; set; }
    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Username)
            .IsUnique();
    }
}