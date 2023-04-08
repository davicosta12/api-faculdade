using Dev_Backend.Bussiness;
using Microsoft.OpenApi.Models;

namespace Dev_Backend.Domain
{
    public static class VersionApi
    {
        public static OpenApiInfo GetVersion()
        {
            string url = "https://github.com/davicosta12/api-faculdade";
            string name = "Davi Costa";

            var version = BussinessModel.GetPlatformVersion();

            var contact = new OpenApiInfo
            {
                Version = version.VersionService,
                Title = version.ServiceName,
                Description = $"api-falculdade: {version.VersionCore} - {DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss")}",
                TermsOfService = new Uri("https://github.com/davicosta12/api-faculdade"),

                Contact = new OpenApiContact
                {
                    Name = name,
                    Url = new Uri(url),
                },
                License = new OpenApiLicense
                {
                    Name = name,
                    Url = new Uri(url),
                }
            };

            return contact;
        }
    }
}