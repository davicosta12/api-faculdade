namespace Dev_Backend.Data.Models.Courses
{
    public class Course
    {
        public int I_Cod_Curso { get; set; }
        public string S_Nome { get; set; }
        public int I_Qtd_Limite_Semestres { get; set; }
    }

    public class PostCourse
    {
        public string S_Nome { get; set; }
        public int I_Qtd_Limite_Semestres { get; set; }
    }
}