import { ArrowLeftOutlined, SaveFilled } from "@ant-design/icons";
import { Typography, Input, Button, InputNumber } from "antd";
import { FormApi } from "final-form";
import { useEffect, useState, FunctionComponent, useRef, MutableRefObject } from "react";
import { Field, Form } from "react-final-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { toastError, toastOptions } from "../../../misc/utils/utils";
import CourseService from "../../../services/CourseService/CourseService";
import GetCourseDto from "../../../services/CourseService/dto/GetCourseDto";
import { FinalInputNumber } from "../../../_commons/FinalForm/FinalInputNumber";
import { FinalInputText } from "../../../_commons/FinalForm/FinalInputText";
import Maqui_Botao_Lento from "../../../_commons/MaquiButton/Maqui_Botao_Lento";
import Maqui_Botao_Voltar from "../../../_commons/MaquiButton/Maqui_Botao_Voltar";
import NavigationWrapper from "../../_navigation/NavigationWrapper";
import { CourseFormValidators } from "./validators";

interface Props {
  eAlteracao: boolean;
}

const CursosManter: FunctionComponent<Props> = (props) => {

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  let course = location?.state?.course as GetCourseDto;

  const formRef: MutableRefObject<FormApi<any, any>> = useRef<any>(null);

  const courseService = new CourseService();

  const { eAlteracao } = props;

  useEffect(() => {
    if (course?.i_Cod_Curso) {
      formRef.current.initialize(course);
    }
    else {
      formRef.current.reset({} as GetCourseDto);
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

  const handleSubmit = (values: GetCourseDto) => {
    !eAlteracao ? handleCreate(values) : handleUpdate(values);
  }

  const handleGoBack = () => {
    navigate(-1);
  }

  return (

    <NavigationWrapper>
      <Form
        onSubmit={() => { }}
        validate={CourseFormValidators}
        render={({ values, form }) => {
          formRef.current = form;
          return (
            <div className="half-padding">
              <div className="half-padding">
                <Typography.Title level={3}>{props.eAlteracao ? "Alteração de Curso" : "Inserção de Curso"}</Typography.Title>
              </div>
              <div className="half-padding">
                <Field
                  label="Nome"
                  name="s_Nome"
                  required
                  placeholder="Nome"
                  maxLength={100}
                  component={FinalInputText}
                />
              </div>
              <div className="half-padding">
                <Field
                  label="Limite de Semestres"
                  name="i_Qtd_Limite_Semestres"
                  required
                  placeholder="Limite de Semestres"
                  maxLength={3}
                  component={FinalInputNumber}
                  isDecimal={false}
                />
              </div>
              <div className="agrupar-horizontalmente">
                <Maqui_Botao_Voltar Acao_Voltar={handleGoBack} /> 
                <Maqui_Botao_Lento
                  Rotulo_Botao="Confirmar"
                  Icone={<SaveFilled/>}
                  Carregando={isLoading}
                  Acao={() => handleSubmit(values as GetCourseDto)} />
                
              </div>
            </div>
          )
        }}
      />
    </NavigationWrapper>
  )
}

export default CursosManter;
