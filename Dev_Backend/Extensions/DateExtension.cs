using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dev_Backend.Extensions
{
    public static class DateTimeExtension
    {
        public static DateTime ResolveUtm(this DateTime dateTime, int utm = 0)
        {
            return dateTime.AddHours(utm);
        }

        public static DateTime? ResolveUtm(this DateTime? dateTime, int utm = 0)
        {
            return dateTime.Value.AddHours(utm);
        }

        public static DateTime DateStart(this DateTime dateTime)
        {
            DateTime dt = Convert.ToDateTime(Convert.ToDateTime(dateTime.ToString("yyyy-MM-dd")));

            return dt;
        }

        public static DateTime DateEnd(this DateTime dateTime)
        {
            DateTime dtEnd = Convert.ToDateTime($"{dateTime.ToString("yyyy-MM-dd")} 23:59:59");

            return dtEnd;
        }

        public static DateTime DateStart(this DateTime? dateTime)
        {
            DateTime dt = Convert.ToDateTime(Convert.ToDateTime(dateTime.Value.ToString("yyyy-MM-dd")));

            return dt;
        }

        public static DateTime DateEnd(this DateTime? dateTime)
        {

            DateTime dtEnd = Convert.ToDateTime($"{dateTime.Value.ToString("yyyy-MM-dd")} 23:59:59");

            return dtEnd;
        }
    }
}
