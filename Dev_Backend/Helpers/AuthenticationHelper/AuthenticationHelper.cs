using Dev_Backend.Models.Users;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Dev_Backend.Helpers
{
    public class AuthenticationHelper
    {
        public static string GenerateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(Settings.Secret);

            string role = "";

            if (user.C_Perfil.ToUpper().Trim() == "A") {
                role = "A";
            }
            else if (user.C_Perfil.ToUpper().Trim() == "P") {
                role = "P";
            }
            else if (user.C_Perfil.ToUpper().Trim() == "S") {
                role = "S";
            }

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.S_Nome),
                    new Claim(ClaimTypes.Role, role)
                }),
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public static class Settings
        {
            public static string Secret = "fedaf7d8863b48e197b9287d492b708e";
        }
    }
}
