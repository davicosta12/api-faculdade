using System.Data;
using Dapper;
using MySql.Data.MySqlClient;
using static Dapper.SqlMapper;

namespace my_api.Data.Repositories
{
  public class RepositoryBase<TDbContext> where TDbContext : DbContext
  {

    protected readonly DbContext dbContext;

    public RepositoryBase(DbContext dbContext)
    {
      this.dbContext = dbContext;
    }

    ~RepositoryBase()
    {
      this.Dispose();
    }

    public void Dispose()
    {
      System.GC.SuppressFinalize(true);
    }

    protected T QueryFirstOrDefault<T>(string sql, object parameters = null, int commandTimeOut = 0)
    {
      using (var connection = ConnectionFactory())
      {
        return connection.QueryFirstOrDefault<T>(sql, parameters, commandTimeout: commandTimeOut);
      }
    }

    protected async Task<T> QueryFirstOrDefaultAsync<T>(string sql, object parameters = null, int commandTimeOut = 0)
    {
      using (var connection = ConnectionFactory())
      {
        return await connection.QueryFirstOrDefaultAsync<T>(sql, parameters, commandTimeout: commandTimeOut);
      }
    }

    protected T QuerySingleOrDefault<T>(string sql, object parameters = null, int commandTimeOut = 0)
    {
      using (var connection = ConnectionFactory())
      {
        return connection.QuerySingleOrDefault<T>(sql, parameters, commandTimeout: commandTimeOut);
      }
    }

    protected async Task<T> QuerySingleOrDefaultAsync<T>(string sql, object parameters = null, int commandTimeOut = 0)
    {
      using (var connection = ConnectionFactory())
      {
        return await connection.QuerySingleOrDefaultAsync<T>(sql, parameters, commandTimeout: commandTimeOut);
      }
    }

    protected IEnumerable<T> Query<T>(string sql, object parameters = null, int commandTimeOut = 0)
    {
      using (var connection = ConnectionFactory())
      {
        return connection.Query<T>(sql, parameters, commandTimeout: commandTimeOut);
      }
    }

    protected async Task<IEnumerable<T>> QueryAsync<T>(string sql, object parameters = null, int commandTimeOut = 0)
    {
      using (var connection = ConnectionFactory())
      {
        return await connection.QueryAsync<T>(sql, parameters, commandTimeout: commandTimeOut);
      }
    }

    public async Task<IEnumerable<TReturn>> QueryAsync<TFirst, TSecond, TReturn>(string sql, Func<TFirst, TSecond, TReturn> map, object param = null, IDbTransaction transaction = null, bool buffered = true, string splitOn = "Id", int? commandTimeout = null, CommandType? commandType = null)
    {
      using (var connection = ConnectionFactory())
      {
        return await connection.QueryAsync<TFirst, TSecond, TReturn>(sql, map, param, transaction, buffered, splitOn, commandTimeout, commandType);
      }
    }

    public async Task<IEnumerable<TReturn>> QueryAsync<TFirst, TSecond, TThird, TFourth, TReturn>(string sql, Func<TFirst, TSecond, TThird, TFourth, TReturn> map, object param = null, IDbTransaction transaction = null, bool buffered = true, string splitOn = "Id", int? commandTimeout = null, CommandType? commandType = null)
    {
      using (var connection = ConnectionFactory())
      {
        return await connection.QueryAsync<TFirst, TSecond, TThird, TFourth, TReturn>(sql, map, param, transaction, buffered, splitOn, commandTimeout, commandType);
      }
    }

    protected GridReader QueryMultiple(string sql, object parameters = null, int commandTimeOut = 0)
    {
      var connection = ConnectionFactory();
      return connection.QueryMultiple(sql, parameters, commandTimeout: commandTimeOut);
    }

    protected async Task<GridReader> QueryMultipleAsync(string sql, object parameters = null, int commandTimeOut = 0)
    {
      var connection = ConnectionFactory();

      return await connection.QueryMultipleAsync(sql, parameters, commandTimeout: commandTimeOut);
    }

    protected int Execute(string sql, object parameters = null, int commandTimeOut = 0)
    {
      using (var connection = ConnectionFactory())
      {
        return connection.Execute(sql, parameters, commandTimeout: commandTimeOut);
      }
    }

    protected async Task<int> ExecuteAsync(string sql, object parameters = null, int commandTimeOut = 0)
    {
      using (var connection = ConnectionFactory())
      {
        return await connection.ExecuteAsync(sql, parameters, commandTimeout: commandTimeOut);
      }
    }

    protected T ExecuteScalar<T>(string sql, object parameters = null, int commandTimeOut = 0)
    {
      using (var connection = ConnectionFactory())
      {
        return connection.ExecuteScalar<T>(sql, parameters, commandTimeout: commandTimeOut);
      }
    }

    protected async Task<T> ExecuteScalarAsync<T>(string sql, object parameters = null, int commandTimeOut = 0)
    {
      using (var connection = ConnectionFactory())
      {
        return await connection.ExecuteScalarAsync<T>(sql, parameters, commandTimeout: commandTimeOut);
      }
    }

    protected async Task<T> ExecuteScalarTransactionAsync<T>(IDbTransaction transaction, string sql, object parameters = null, int commandTimeOut = 0)
    {
      using (var connection = ConnectionFactory())
      {
        return await connection.ExecuteScalarAsync<T>(sql, parameters, commandTimeout: commandTimeOut, transaction: transaction);
      }
    }

    public MySqlConnection ConnectionFactory()
        => new MySqlConnection(dbContext._connectionString);
  }
}