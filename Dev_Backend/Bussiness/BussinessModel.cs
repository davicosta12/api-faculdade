using System.Reflection;

namespace Dev_Backend.Bussiness
{
    public static class BussinessModel
    {
        public class GetVersion
        {
            public string ServiceName { get; set; }
            public string VersionService { get; set; }
            public string VersionCore { get; set; }
        }

        public static GetVersion GetPlatformVersion()
        {
            string VersionApi = Assembly.GetEntryAssembly().GetCustomAttribute<AssemblyInformationalVersionAttribute>().InformationalVersion;
            return new GetVersion() { ServiceName = GetServiceName(), VersionService = VersionApi, VersionCore = "1.0.0" };
        }

        public static string GetServiceName()
        {
            //string service = Assembly.GetEntryAssembly().GetName().Name;
            var service = Assembly.GetEntryAssembly().GetName().Name;
            return service;
        }
    }
}