import { ArrowLeftOutlined, SaveFilled } from "@ant-design/icons";
import { Typography, Input, Button, InputNumber } from "antd";
import { useEffect, useState, FunctionComponent } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { toastError, toastOptions } from "../../misc/utils/utils";
import CourseService from "../../services/CourseService/CourseService";
import GetCourseDto from "../../services/CourseService/dto/GetCourseDto";
import NavigationWrapper from "../_navigation/NavigationWrapper";

const InitialValues: GetCourseDto = {
  i_Cod_Curso: 0,
  s_Nome: '',
  i_Qtd_Limite_Semestres: 0
};

interface Props {
  eAlteracao: boolean;
}

const CursosManter: FunctionComponent<Props> = (props) => {

  const [formValues, setFormValues] = useState(InitialValues);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  let course = location?.state?.course as GetCourseDto;

  const courseService = new CourseService();

  const { eAlteracao } = props;

  useEffect(() => {
    if (course?.i_Cod_Curso) {
      setFormValues(course);
    }
    else {
      setFormValues(InitialValues);
    }
  }, [course]);

  const handleCreate = async (values: GetCourseDto) => {
    setIsLoading(true);
    try {
      await courseService.createCourse(values);
      toast.success(`Curso - "${values.s_Nome}" criado com sucesso`, toastOptions(toast));
    }
    catch (err: any) {
      toast.error(toastError(err), toastOptions(toast));
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleUpdate = async (values: GetCourseDto) => {
    setIsLoading(true);
    try {
      await courseService.updateCourse(values.i_Cod_Curso, values);
      toast.success(`Curso - "${values.s_Nome}" atualizado com sucesso`, toastOptions(toast));
    }
    catch (err: any) {
      toast.error(toastError(err), toastOptions(toast));
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = () => {
    !eAlteracao ? handleCreate(formValues) : handleUpdate(formValues);
  }

  const handleGoBack = () => {
    navigate(-1);
  }

  return (

    <NavigationWrapper>
      <div className="half-padding">
        <div className="half-padding">
          <Typography.Title level={3}>{props.eAlteracao ? "Alteração de Curso" : "Inserção de Curso"}</Typography.Title>
        </div>
        <div className="half-padding">
          <Input
            placeholder="Nome"
            value={formValues.s_Nome}
            onChange={(ev: any) => setFormValues({ ...formValues, s_Nome: ev.target.value })}
          />
        </div>
        <div className="half-padding">
          <InputNumber
            value={formValues.i_Qtd_Limite_Semestres.toString()}
            placeholder="Limite de Semestres"
            onChange={(text: string | null) => setFormValues({ ...formValues, i_Qtd_Limite_Semestres: text ? +text : 0 })}
          />
        </div>
        <div className="agrupar-horizontalmente">
          <div className="half-padding" >
            <Button
              shape="round"
              icon={<ArrowLeftOutlined />}
              onClick={handleGoBack}>
              Voltar
            </Button>
          </div>
          <div className="half-padding" >
            <Button
              type="primary"
              shape="round"
              icon={<SaveFilled />}
              loading={isLoading}
              onClick={handleSubmit}
            >
              Confirmar
            </Button>
          </div>
        </div>
      </div>
    </NavigationWrapper>
  )
}

export default CursosManter;
