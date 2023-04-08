
using System.Dynamic;

namespace Dev_Backend.Extensions
{
    public static class DictionaryExtension
    {
        public static ExpandoObject AsExpandoObject(this IDictionary<string, object?> self)
        {
            var eo = new ExpandoObject();
            var eoColl = (ICollection<KeyValuePair<string, object?>>)eo;

            foreach (var keyValuePair in self)
            {
                eoColl.Add(keyValuePair);
            }

            return eo;
        }
    }
}