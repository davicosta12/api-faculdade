using Dev_Backend.Helpers;
using Dev_Backend.Data.Models.Authentication;
using Dev_Backend.Data.Models.Users;

namespace Dev_Backend.Data.Repositories
{
    public class AuthenticationRepository : RepositoryBase<DbContext>
    {
        public AuthenticationRepository(DbContext dbContext) : base(dbContext)
        {

        }

        public async Task<AuthenticationModel?> Authenticate(SignInUser userLogin)
        {
            string sqlHash = @"SELECT SHA2(@S_Senha, 512)";
            string sql = @" SELECT I_Cod_Usuario,
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
                            WHERE S_CPF = @CPF AND S_Senha = @Senha_Hash;";

            userLogin.S_CPF = userLogin.S_CPF.Trim();
            userLogin.S_Senha = userLogin.S_Senha.Trim();

            var passwordHash = (await QueryAsync<string>(sqlHash, new
            {
                @S_Senha = userLogin.S_Senha
            })).FirstOrDefault();

            var userFound = await QueryFirstOrDefaultAsync<User>(sql, new
            {
                @CPF = userLogin.S_CPF,
                @Senha_Hash = passwordHash
            });

            if (userFound != null)
            {
                var token = AuthenticationHelper.GenerateToken(userFound);

                var authenticationModel = new AuthenticationModel()
                {
                    user = userFound,
                    token = token
                };

                return authenticationModel;
            }

            return null;
        }

        public async Task<SignUpUser> UserRegister(SignUpUser userRegister)
        {
            string sqlHash = @"SELECT SHA2(@S_Senha, 512)";
            string sql = @"INSERT INTO Usuario (
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
                           ) VALUES (
                            @C_Perfil, 
                            @S_Nome, 
                            @S_CPF, 
                            @S_RA, 
                            @C_Sexo, 
                            @S_Nome_Mae, 
                            @B_E_Ativo, 
                            @S_Email, 
                            @Senha_Hash, 
                            @B_Tem_Senha_Temporaria);";

            var passwordHash = (await QueryAsync<string>(sqlHash, new
            {
                @S_Senha = userRegister.S_Senha.Trim()
            })).FirstOrDefault();

            await ExecuteAsync(sql, new
            {
                @C_Perfil = userRegister.C_Perfil.Trim(),
                @S_Nome = userRegister.S_Nome.Trim(),
                @S_CPF = userRegister.S_CPF.Trim(),
                @S_RA = userRegister.S_RA.Trim(),
                @C_Sexo = userRegister.C_Sexo.Trim(),
                @S_Nome_Mae = userRegister.S_Nome_Mae.Trim(),
                @B_E_Ativo = userRegister.B_E_Ativo,
                @S_Email = userRegister.S_Email.Trim(),
                @Senha_Hash = passwordHash,
                @B_Tem_Senha_Temporaria = userRegister.B_Tem_Senha_Temporaria
            });

            var createUser = new SignUpUser()
            {
                C_Perfil = userRegister.C_Perfil.Trim(),
                S_Nome = userRegister.S_Nome.Trim(),
                S_CPF = userRegister.S_CPF.Trim(),
                S_RA = userRegister.S_RA.Trim(),
                C_Sexo = userRegister.C_Sexo.Trim(),
                S_Nome_Mae = userRegister.S_Nome_Mae.Trim(),
                B_E_Ativo = userRegister.B_E_Ativo,
                S_Email = userRegister.S_Email.Trim(),
                B_Tem_Senha_Temporaria = userRegister.B_Tem_Senha_Temporaria
            };

            return createUser;
        }

        public async Task<User> UserNewPassword(int I_Cod_Usuario, UserNewPassword userNewPassword)
        {
            string sqlMultiple = @" SELECT SHA2(@S_Senha, 512);

                                SELECT I_Cod_Usuario,
                                C_Perfil,    
                                S_Nome, 
                                S_CPF, 
                                S_RA, 
                                C_Sexo,
                                S_Nome_Mae, 
                                B_E_Ativo, 
                                S_Email, 
                                B_Tem_Senha_Temporaria
                                FROM Usuario
                                WHERE I_Cod_Usuario = @I_Cod_Usuario;";

            string sql = @" UPDATE Usuario SET
                            B_Tem_Senha_Temporaria = @B_Tem_Senha_Temporaria,
                            S_Senha = @Senha_Hash
                            WHERE I_Cod_Usuario = @I_Cod_Usuario;";

            var result = await QueryMultipleAsync(sqlMultiple, new
            {
                @I_Cod_Usuario = I_Cod_Usuario,
                @S_Senha = userNewPassword.newPassword.Trim()
            });

            var passwordHash = result.ReadFirstOrDefault<string>();
            var userFound = result.ReadFirstOrDefault<User>();

            await ExecuteAsync(sql, new
            {
                @I_Cod_Usuario = I_Cod_Usuario,
                @Senha_Hash = passwordHash,
                @B_Tem_Senha_Temporaria = 0
            });

            userFound.S_Senha = passwordHash;

            return userFound;
        }
    }
}
