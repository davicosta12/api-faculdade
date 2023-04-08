using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api_faculdade.Bussiness.API;
using Dev_Backend.Bussiness.API.GenericPagings;
using Dev_Backend.Data;
using Dev_Backend.Data.Models;
using Dev_Backend.Data.Models.Authentication;
using Dev_Backend.Data.Models.Users;
using Dev_Backend.Data.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Dev_Backend.Utils;

namespace api_faculdade.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [ApiExplorerSettings(GroupName = "User")]
    public class UserController : ControllerBase
    {
        private readonly DbContext _dbContext;

        public UserController(DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<GenericPaging<User>>> GetUsers(
            [FromQuery] GetUserFilterPaging filterParams,
            int? currentPageNumber = 0,
            int? pageSize = 5
        )
        {
            try
            {
                var userRepository = new UserRepository(_dbContext);

                var users = await userRepository.GetUsers(filterParams, currentPageNumber, pageSize);

                return Ok(users);
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
        [Route("cadastrar")]
        [AllowAnonymous]
        public async Task<ActionResult<ResponseMessage>> UserRegister([FromBody] SignUpUser userRegister)
        {
            var res = new ResponseMessage()
            {
                isValid = true,
                message = $"{userRegister.C_Perfil.GetSpecificUser()} '{userRegister.S_CPF}' criado com sucesso.",
                requestBody = userRegister
            };

            try
            {
                var authenticationRepository = new AuthenticationRepository(_dbContext);
                var userRepository = new UserRepository(_dbContext);

                var userFound = await userRepository.GetUserByCPF(userRegister.S_CPF);

                if (userFound == null)
                {
                    res.isValid = false;
                    res.message = $"Já existe uma conta com esse CPF '{userRegister.S_CPF}', por favor digite outro CPF.";
                    res.errorMessage = $"Já existe uma conta com esse CPF '{userRegister.S_CPF}', por favor digite outro CPF.";
                    return BadRequest(res);
                }

                var createUser = await authenticationRepository.UserRegister(userRegister);
                res.responseBody = createUser;

                return Ok(res);
            }
            catch (Exception e)
            {
                var retorno = new ResponseMessage();

                retorno.isValid = false;
                retorno.errorMessage = $"{e.Message}";
                retorno.message = $"{e.Message}";
                retorno.stackTrace = e.StackTrace;

                return BadRequest(retorno);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ResponseMessage>> UpdateUser(int id, [FromBody] PostUser user)
        {
            var res = new ResponseMessage()
            {
                isValid = true,
                message = $"{user.C_Perfil.GetSpecificUser()} - {user.S_Nome} alterado com sucesso",
                requestBody = user
            };

            try
            {
                var userRepository = new UserRepository(_dbContext);

                var userFound = await userRepository.GetUserById(id);

                if (userFound == null)
                {
                    res.isValid = false;
                    res.message = $"Id - ({id}) do {user.C_Perfil.GetSpecificUser()} não foi encontrado!";
                    res.errorMessage = $"Id - ({id}) do {user.C_Perfil.GetSpecificUser()} não foi encontrado!";
                    return NotFound(res);
                }

                var userUpdated = await userRepository.UpdateUser(id, user);
                res.responseBody = userUpdated;

                return Ok(res);
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
        public async Task<ActionResult<ResponseMessage>> DeleteUser(int id)
        {
            var res = new ResponseMessage()
            {
                isValid = true,
                message = $"Usuário removido com sucesso",
            };

            try
            {
                var userRepository = new UserRepository(_dbContext);

                var userFound = await userRepository.GetUserById(id);

                if (userFound == null)
                {
                    res.isValid = false;
                    res.message = $"Id - ({id}) do usuário não foi encontrado!";
                    res.errorMessage = $"Id - ({id}) do usuário não foi encontrado!";
                    return NotFound(res);
                }

                await userRepository.DeleteUser(id);

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