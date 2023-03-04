

using Dev_Backend.Models.Department;
using Dev_Backend.Models.Departments;

namespace my_api.Data.Repositories
{
    public class DepartmentRepository : RepositoryBase<DbContext>
    {
        public DepartmentRepository(DbContext dbContext) : base(dbContext)
        {

        }

        public async Task<List<Department>> GetDepartments()
        {
            string sql = "SELECT Cod_Departamento, Nome_departamento FROM Departamento;";

            var departments = await QueryAsync<Department>(sql);

            return departments.ToList();
        }

        public async Task<Department?> GetDepartment(int codDepartamento)
        {
            string sql = "SELECT Cod_Departamento, Nome_departamento FROM Departamento WHERE Cod_Departamento=@_CodDepartamento;";

            var departmentFound = await QueryFirstOrDefaultAsync<Department>(sql, new
            {
                @_CodDepartamento = codDepartamento
            });

            return departmentFound;
        }

        public async Task<List<DepartmentDisciplines>> GetDepartmentDisciplines(int? codDepartamento)
        {
            string where = "";

            if (codDepartamento != null)
            {
                where = "WHERE Di.Cod_Departamento = @_CodDepartamento";
            }

            string sql = $@"SELECT De.Nome_departamento, Di.Nome_Disciplina FROM Disciplina Di
                           INNER JOIN Departamento De ON Di.Cod_Departamento = De.Cod_Departamento
                           {where}";

            var departmentsFound = await QueryAsync<DepartmentDisciplines>(sql, new
            {
                @_CodDepartamento = codDepartamento
            });

            return departmentsFound.ToList();
        }

        public async Task<Department> CreateDepartment(PostDepartment department)
        {
            string sql;
            int identityId;

            sql = @"INSERT INTO Departamento ( Nome_departamento ) VALUES ( @_NomeDepartamento );
                           SELECT LAST_INSERT_ID();";

            identityId = await ExecuteScalarAsync<int>(sql, new
            {
                @_NomeDepartamento = department.Nome_departamento
            });

            var departmentCreated = new Department()
            {
                Cod_Departamento = identityId,
                Nome_departamento = department.Nome_departamento
            };

            return departmentCreated;
        }

        public async Task<Department?> UpdateDepartment(int codDepartamento, PostDepartment department)
        {
            string sql = @"UPDATE Departamento SET Nome_departamento = @_NomeDepartamento
                           WHERE Cod_Departamento=@_CodDepartamento;";

            await ExecuteAsync(sql, new
            {
                @_CodDepartamento = codDepartamento,
                @_NomeDepartamento = department.Nome_departamento
            });

            var departmentUpdated = new Department()
            {
                Cod_Departamento = codDepartamento,
                Nome_departamento = department.Nome_departamento
            };

            return departmentUpdated;
        }

        public async Task DeleteDepartment(int codDepartamento)
        {
            string sql = "DELETE FROM Departamento WHERE Cod_Departamento=@_CodDepartamento;";

            await ExecuteAsync(sql, new
            {
                @_CodDepartamento = codDepartamento
            });
        }
    }
}