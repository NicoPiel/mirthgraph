using Microsoft.EntityFrameworkCore;

public class DbService : DbContext
{
    public DbService(DbContextOptions<DbService> options) : base(options) { }

    public DbSet<MirthConnection> MirthConnections { get; set; }
}
