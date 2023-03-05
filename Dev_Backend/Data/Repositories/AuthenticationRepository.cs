using Dev_Backend.Helpers;
using Dev_Backend.Models.Authentication;
using Dev_Backend.Models.Users;
using my_api.Data;
using my_api.Data.Repositories;

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
            string sql = @"SELECT I_Cod_Usuario, 
                           C_Perfil, 
                           S_Nome, 
                           S_CPF, 
                           S_Senha,
                           B_E_Ativo, 
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

        // public async Task<CadastrarUsuario> CadastrarUsuario(CadastrarUsuario usuarioCadastro)
        // {
        //     string sql = @"INSERT INTO Usuario ( nome, senha, e_mail, isAdmin ) VALUES ( @_nome, @_senha, @_email, @_isAdmin );";

        //     usuarioCadastro.nome = usuarioCadastro.nome.Trim();
        //     usuarioCadastro.senha = usuarioCadastro.senha.Trim();
        //     usuarioCadastro.e_mail = usuarioCadastro.e_mail.Trim();

        //     await ExecuteAsync(sql, new
        //     {
        //         @_nome = usuarioCadastro.nome,
        //         @_senha = usuarioCadastro.senha,
        //         @_email = usuarioCadastro.e_mail,
        //         @_isAdmin = false
        //     });

        //     var usuarioCriado = new CadastrarUsuario()
        //     {
        //         nome = usuarioCadastro.nome,
        //         e_mail = usuarioCadastro.e_mail
        //     };

        //     return usuarioCriado;
        // }
    }
}
