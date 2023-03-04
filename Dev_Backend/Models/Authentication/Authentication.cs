using Dev_Backend.Models.Users;

namespace Dev_Backend.Models.Authentication
{
    public class AuthenticationModel
    {
        public User user { get; set; }
        public string token { get; set; }
    }

    public class SignInUser
    {
        public string S_CPF { get; set; }
        public string S_Senha { get; set; }
    }
}