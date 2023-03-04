using Dev_Backend.Models.Department;
using Dev_Backend.Models.Departments;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using my_api.Data;
using my_api.Data.Repositories;
using my_api.Models;

namespace my_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ApiExplorerSettings(GroupName = "Departments")]
    public class DepartmentController : ControllerBase
    {
        private readonly DbContext _dbContext;

        public DepartmentController(DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Department>>> GetDepartments()
        {
            try
            {
                var departmentRepository = new DepartmentRepository(_dbContext);

                var departments = await departmentRepository.GetDepartments();

                return Ok(departments);
            }
            catch (Exception e)
            {
                var response = new ResponseMessage();

                response.isValid = false;
                response.errorMessage = $"{e.Message}";
                response.message = $"{e.Message}";
                response.stackTrace = e.StackTrace;

                return BadRequest(response);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Department>> GetDepartment(int id)
        {
            var res = new ResponseMessage()
            {
                isValid = false,
                message = $"Id - ({id}) do departmento não foi encontrado!",
                errorMessage = $"Id - ({id}) do departmento não foi encontrado!"
            };

            try
            {
                var departmentRepository = new DepartmentRepository(_dbContext);

                var departmentFound = await departmentRepository.GetDepartment(id);

                if (departmentFound == null)
                {
                    return NotFound(res);
                }

                return Ok(departmentFound);
            }
            catch (Exception e)
            {
                var response = new ResponseMessage();

                response.isValid = false;
                response.errorMessage = $"{e.Message}";
                response.message = $"{e.Message}";
                response.stackTrace = e.StackTrace;

                return BadRequest(response);
            }
        }

        [HttpGet]
        [Route("Disciplines", Name = "GetDepartmentDisciplines")]
        public async Task<ActionResult<List<DepartmentDisciplines>>> GetDepartmentDisciplines([FromQuery] int? codDiscipline)
        {
            try
            {
                var departmentRepository = new DepartmentRepository(_dbContext);

                var departmentsFound = await departmentRepository.GetDepartmentDisciplines(codDiscipline);

                return Ok(departmentsFound);
            }
            catch (Exception e)
            {
                var response = new ResponseMessage();

                response.isValid = false;
                response.errorMessage = $"{e.Message}";
                response.message = $"{e.Message}";
                response.stackTrace = e.StackTrace;

                return BadRequest(response);
            }
        }

        [HttpPost]
        public async Task<ActionResult<Department>> CreateDepartment([FromBody] PostDepartment department)
        {
            try
            {
                var departmentRepository = new DepartmentRepository(_dbContext);

                var departmentCreated = await departmentRepository.CreateDepartment(department);

                return Ok(departmentCreated);
            }
            catch (Exception e)
            {
                var response = new ResponseMessage();

                response.isValid = false;
                response.errorMessage = $"{e.Message}";
                response.message = $"{e.Message}";
                response.stackTrace = e.StackTrace;

                return BadRequest(response);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Department>> UpdateDepartment(int id, [FromBody] PostDepartment department)
        {
            var res = new ResponseMessage()
            {
                isValid = false,
                message = $"Id - ({id}) do departmento não foi encontrado!",
                errorMessage = $"Id - ({id}) do departmento não foi encontrado!",
                requestBody = department
            };

            try
            {
                var departmentRepository = new DepartmentRepository(_dbContext);

                var departmentFound = await departmentRepository.GetDepartment(id);

                if (departmentFound == null)
                {
                    return NotFound(res);
                }

                var departmentUpdated = await departmentRepository.UpdateDepartment(id, department);

                return Ok(departmentUpdated);
            }
            catch (Exception e)
            {
                var response = new ResponseMessage();

                response.isValid = res.isValid;
                response.errorMessage = $"{e.Message}";
                response.message = $"{e.Message}";
                response.requestBody = res.requestBody;
                response.stackTrace = e.StackTrace;

                return BadRequest(response);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteDepartment(int id)
        {
            var res = new ResponseMessage()
            {
                isValid = false,
                message = $"Id - ({id}) do departmento não foi encontrado!",
                errorMessage = $"Id - ({id}) do departmento não foi encontrado!",
            };

            try
            {
                var departmentRepository = new DepartmentRepository(_dbContext);

                var departmentFound = await departmentRepository.GetDepartment(id);

                if (departmentFound == null)
                {
                    return NotFound(res);
                }

                await departmentRepository.DeleteDepartment(id);

                res.isValid = true;
                res.message = $"Departmento - ({id}) removido com sucesso";
                res.errorMessage = null;

                return Ok(res);
            }
            catch (Exception e)
            {
                var response = new ResponseMessage();

                response.isValid = false;
                response.errorMessage = $"{e.Message}";
                response.message = $"{e.Message}";
                response.stackTrace = e.StackTrace;

                return BadRequest(response);
            }
        }
    }
}