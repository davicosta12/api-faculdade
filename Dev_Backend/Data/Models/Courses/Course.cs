namespace Dev_Backend.Data.Models.Courses
{
    public class GetCourse
    {
        public int I_Cod_Curso { get; set; }
        public string S_Sequencial { get; set; }
        public string S_Nome { get; set; }
        public double F_Valor { get; set; }
        public DateTime? DataInicioProximaTurma { get; set; }
    }

    public class Course
    {
        public int I_Cod_Curso { get; set; }
        public string S_Sequencial { get; set; }
        public string S_Nome { get; set; }
        public double F_Valor { get; set; }
        public List<Classroom> Classrooms { get; set; } = new();
        public string? S_Pre_Cod { get; set; }
    }

    public class Classroom
    {
        public int I_Cod_Turma { get; set; }
        public int I_Cod_Curso { get; set; }
        public string S_Sequencial { get; set; }
        public int I_Modalidade { get; set; }
        public int I_Cod_Configuracao_De_Periodo { get; set; }
        public bool B_Esta_Pendente { get; set; }
        public DateTime D_Data_Inicio { get; set; }
        public DateTime D_Data_Fim { get; set; }
        public List<Time> Times { get; set; }
        public List<Enrollment> Enrollments { get; set; }
        public string? S_Pre_Cod { get; set; }
        public string? S_Pre_Cod_Curso { get; set; }
    }

    public class Time
    {
        public int I_Cod_Horario { get; set; }
        public int I_Cod_Turma { get; set; }
        public int I_Dia_Da_Semana { get; set; }
        public DateTime D_Hora_Inicio { get; set; }
        public DateTime D_Hora_Fim { get; set; }
        public bool B_E_Hora_Fim_No_Dia_Seguinte { get; set; }
        public string? S_Pre_Cod_Turma { get; set; }
    }

    public class Enrollment
    {
        public int I_Cod_Matricula { get; set; }
        public int I_Cod_Turma { get; set; }
        public int I_Cod_Aluno { get; set; }
        public Student Student { get; set; }
        public string S_Sequencial_RA { get; set; }
        public string? S_Pre_Cod_Turma { get; set; }
        public string? S_Pre_Cod_Aluno { get; set; }
    }

    public class Student
    {
        public int I_Cod_Aluno { get; set; }
        public string S_CPF { get; set; }
        public string S_Email { get; set; }
        public string S_Nome { get; set; }
        public string S_Senha { get; set; }
        public bool B_Tem_Senha_Temporaria { get; set; }
        public string? S_Pre_Cod { get; set; }
    }


    public class PostCourse
    {
        public string S_Nome { get; set; }
        public double F_Valor { get; set; }
        public List<Classroom> Classrooms { get; set; } = new();
        public string? S_Pre_Cod { get; set; }
    }
}