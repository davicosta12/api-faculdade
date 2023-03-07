using Dev_Backend.Data.Models.Users;

namespace Dev_Backend.Data.Repositories
{
    public class UserRepository : RepositoryBase<DbContext>
    {
        public UserRepository(DbContext dbContext) : base(dbContext)
        {

        }

        public async Task<User?> GetUserById(int I_Cod_Usuario)
        {
            string sql = @"SELECT I_Cod_Usuario,
                           C_Perfil,    
                           S_Nome, 
                           S_CPF, 
                           S_RA, 
                           C_Sexo,
                           S_Nome_Mae, 
                           B_E_Ativo, 
                           S_Email, 
                           S_Senha, 
                           B_Tem_Senha_Temporaria
                           FROM Usuario
                           WHERE I_Cod_Usuario = @I_Cod_Usuario;";

            var userFound = await QueryFirstOrDefaultAsync<User>(sql, new
            {
                @I_Cod_Usuario = I_Cod_Usuario
            });

            return userFound;
        }

        public async Task<User?> GetUserByCPF(string cpf)
        {
            string sql = @"SELECT I_Cod_Usuario,
                           C_Perfil,    
                           S_Nome, 
                           S_CPF, 
                           S_RA, 
                           C_Sexo,
                           S_Nome_Mae, 
                           B_E_Ativo, 
                           S_Email, 
                           S_Senha, 
                           B_Tem_Senha_Temporaria
                           FROM Usuario
                           WHERE S_CPF = @S_CPF;";

            var userFound = await QueryFirstOrDefaultAsync<User>(sql, new
            {
                @S_CPF = cpf.Trim()
            });

            return userFound;
        }
    }
}