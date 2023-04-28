using api_faculdade.Bussiness.API;
using Dev_Backend.Bussiness.API.GenericPagings;
using Dev_Backend.Data.Models.Users;
using Dev_Backend.Extensions;
using Dev_Backend.Maqui.Data.Models;
using Dev_Backend.Utils.WherePredicate;

namespace Dev_Backend.Data.Repositories
{
    public class UserRepository : RepositoryBase<DbContext>
    {
        public UserRepository(DbContext dbContext) : base(dbContext)
        {

        }

        public async Task<GenericPaging<User>> GetUsers(GetUserFilterPaging filterParams, int? currentPageNumber, int? pageSize)
        {
            string where = "";
            string perfil = filterParams.perfil.ToUpper().Trim();
            if (filterParams.isAdvancedSearch)
            {
                where = UsersWherePredicate.GetUserFilterWhere(filterParams);
            }
            else
            {
                switch (perfil)
                {
                    case "A":
                        where = FilterByTerms.GetWhereOfTerms(filterParams.termsInput, new[] { "u.S_Nome", "u.S_RA", "u.C_Sexo", "u.S_Nome_Mae", "u.B_E_Ativo" });
                        break;

                    default:
                        where = FilterByTerms.GetWhereOfTerms(filterParams.termsInput, new[] { "u.S_Nome", "u.C_Sexo", "u.S_Nome_Mae", "u.B_E_Ativo" });
                        break;
                }
            }
            string orderBy = "";

            if (String.IsNullOrEmpty(filterParams.fieldOrderLabel) == false && filterParams.isDesc != null)
            {
                orderBy = filterParams.isDesc == false ? $"ORDER BY u.{filterParams.fieldOrderLabel} ASC" : $"ORDER BY u.{filterParams.fieldOrderLabel} DESC";
            }

            int maxPageSize = 50;

            pageSize = pageSize < maxPageSize ? pageSize : maxPageSize;
            var skip = currentPageNumber * pageSize;
            var take = pageSize;

            string sql = @$"SELECT COUNT(DISTINCT(u.I_Cod_Usuario)) FROM Usuario u WHERE u.C_Perfil = @perfil {where};
                            
                            SELECT * FROM Usuario u
                            WHERE u.C_Perfil = @perfil {where}
                            {orderBy} 
                            LIMIT @_skip, @_take";

            var sqlParams = new Dictionary<string, object?>
            {
                ["@userName"] = filterParams.userName,
                ["@studantRa"] = filterParams.studantRa,
                ["@gender"] = filterParams.gender,
                ["@motherName"] = filterParams.motherName,
                ["@isActive"] = filterParams.isActive,
                ["@perfil"] = perfil,
                ["@_skip"] = skip,
                ["@_take"] = take
            };

            if (!filterParams.isAdvancedSearch)
            {
                FilterByTerms.AddTerms(sqlParams, filterParams.termsInput);
            }

            var reader = await QueryMultipleAsync(sql, sqlParams.AsExpandoObject());

            int totalCount = reader.Read<int>().FirstOrDefault();
            var studants = reader.Read<User>().ToList();

            var result = new GenericPaging<User>(studants, totalCount, currentPageNumber, pageSize);

            return result;
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

        public async Task<User?> UpdateUser(int userId, PostUser user)
        {
            string sql = "";
            var sqlParams = new Dictionary<string, object?>();

            if (String.IsNullOrEmpty(user.S_Senha))
            {
                sql = @"UPDATE Usuario SET
                            S_Nome = @Nome,
                            S_CPF = @CPF,
                            S_RA = @RA,
                            C_Sexo = @Sigla_Sexo,
                            S_Nome_Mae = @Nome_Mae,
                            B_E_Ativo = @E_Ativo,
                            S_Email = @Email
                            WHERE I_Cod_Usuario = @Cod_Usuario;";

                sqlParams = new Dictionary<string, object?>
                {
                    ["@Cod_Usuario"] = userId,
                    ["@Nome"] = user.S_Nome,
                    ["@CPF"] = user.S_CPF,
                    ["@RA"] = user.S_RA,
                    ["@Sigla_Sexo"] = user.C_Sexo,
                    ["@Nome_Mae"] = user.S_Nome_Mae,
                    ["@E_Ativo"] = user.B_E_Ativo,
                    ["@Email"] = user.S_Email
                };
            }
            else
            {
                string sqlHash = @"SELECT SHA2(@S_Senha, 512)";
                sql = @"UPDATE Usuario SET
                            S_Nome = @Nome,
                            S_CPF = @CPF,
                            S_RA = @RA,
                            C_Sexo = @Sigla_Sexo,
                            S_Nome_Mae = @Nome_Mae,
                            B_E_Ativo = @E_Ativo,
                            S_Email = @Email,
                            S_Senha = @Senha_Hashada
                            WHERE I_Cod_Usuario = @Cod_Usuario;";

                string passwordHash = (await QueryAsync<string>(sqlHash, new
                {
                    @S_Senha = user.S_Senha.Trim()
                })).First();

                sqlParams = new Dictionary<string, object?>
                {
                    ["@Cod_Usuario"] = userId,
                    ["@Nome"] = user.S_Nome,
                    ["@CPF"] = user.S_CPF,
                    ["@RA"] = user.S_RA,
                    ["@Sigla_Sexo"] = user.C_Sexo,
                    ["@Nome_Mae"] = user.S_Nome_Mae,
                    ["@E_Ativo"] = user.B_E_Ativo,
                    ["@Email"] = user.S_Email,
                    ["@Senha_Hashada"] = passwordHash
                };
            }

            await ExecuteAsync(sql, sqlParams.AsExpandoObject());

            var userUpdated = new User()
            {
                I_Cod_Usuario = userId,
                S_Nome = user.S_Nome.Trim(),
                S_CPF = user.S_CPF.Trim(),
                S_RA = user.S_RA.Trim(),
                C_Sexo = user.C_Sexo.Trim(),
                S_Nome_Mae = user.S_Nome_Mae.Trim(),
                B_E_Ativo = user.B_E_Ativo,
                S_Email = user.S_Email.Trim()
            };

            return userUpdated;
        }

        public async Task DeleteUser(int userId)
        {
            string sql = "DELETE FROM Usuario WHERE I_Cod_Usuario = @Cod_Usuario;";

            await ExecuteAsync(sql, new
            {
                @Cod_Usuario = userId
            });
        }
    }
}