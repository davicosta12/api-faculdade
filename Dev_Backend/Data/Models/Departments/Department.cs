using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dev_Backend.Data.Models.Departments
{
    public class Department
    {
        public int Cod_Departamento { get; set; }
        public string Nome_departamento { get; set; }
    }

    public class PostDepartment
    {
        public string Nome_departamento { get; set; }
    }
}