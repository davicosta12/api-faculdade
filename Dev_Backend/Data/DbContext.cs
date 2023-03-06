using System.Data;
using MySql.Data.MySqlClient;

namespace Dev_Backend.Data
{
    public class DbContext
    {
        public readonly IConfiguration _configuration;
        public readonly string _connectionString;
        public DbContext(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("MySqlConnection");
        }
        public IDbConnection CreateConnection()
            => new MySqlConnection(_connectionString);
    }
}