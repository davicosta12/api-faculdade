import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { ArrowLeftOutlined, InsertRowBelowOutlined, SaveFilled } from "@ant-design/icons";
import { FormApi } from "final-form";
import { Typography, Input, Button, InputNumber, Breadcrumb } from "antd";
import { Field, Form } from "react-final-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastError, toastOptions } from "../../misc/utils/utils";
import NavigationWrapper from "../_navigation/NavigationWrapper";
import type { TrilhaCursosManter } from "../../model/trilha-cursos-manter";
import CursosManter_Inscricoes from "./listaInscricoes/CursosManter_Inscricoes";
import CursosManter_Inscricoes_Manter from "./listaInscricoes/manter/CursosManter_Inscricoes_Manter";
import GetCourseDto from "../../services/CourseService/dto/GetCourseDto";
import { CourseFormValidators } from "./CourseFormValidators";
import { FinalInputText } from "../_commons/FinalForm/FinalInputText";
import { FinalInputNumber } from "../_commons/FinalForm/FinalInputNumber";
import Maqui_Botao_Voltar from "../_commons/MaquiButton/Maqui_Botao_Voltar";
import Maqui_Botao_Lento from "../_commons/MaquiButton/Maqui_Botao_Lento";
import { ContainerFormMessageError, FormMessageError, Label, RequiredSpan } from "../../layout/general";
import { FinalInputDescricao } from "./FinalInputDescricao";

function CursosManter(props: { eAlteracao: boolean }) {
  
  // const [trilha, setTrilha] = useState<TrilhaCursosManter>('Cursos');
  // const handleChangeTrilha = (value: TrilhaCursosManter) => {
  //   setTrilha(value);
  // }
  
  // let breadcrumbItems: string[] = [];
  // if (trilha === 'Cursos') {
  //   breadcrumbItems = ['Cursos'];
  // }
  // if (trilha === 'Cursos_Inscricoes') {
  //   breadcrumbItems = ['Cursos', 'Lista de Inscrições'];
  // }
  // if (trilha === 'Cursos_Inscricoes_Inserir') {
  //   breadcrumbItems = [ 'Cursos', 'Lista de Inscrições', 'Inserir'];
  // }
  // if (trilha === 'Cursos_Inscricoes_Alterar') {
  //   breadcrumbItems = [ 'Cursos', 'Lista de Inscrições', 'Alterar'];
  // }
  
  
  
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  let course = location?.state?.course as GetCourseDto;

  const formRef: MutableRefObject<FormApi<any, any>> = useRef<any>(null);

  // const courseService = new CourseService();

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
      // await courseService.createCourse(values);
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
      // await courseService.updateCourse(values.i_Cod_Curso, values);
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
      {/*<div className="half-padding">
        <div className="half-padding">
        <Breadcrumb>
          {breadcrumbItems.map(x => { return <Breadcrumb.Item>
            {x}
          </Breadcrumb.Item>})}
        </Breadcrumb>
        </div>
      </div>*/}
      {/*trilha == 'Cursos' && */<Form
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
                  label="Descrição"
                  name="s_Descricao"
                  required
                  placeholder="Descrição"
                  component={FinalInputDescricao}
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
      />}
      {/*trilha == 'Cursos_Inscricoes' && <CursosManter_Inscricoes onChangeTrilha={handleChangeTrilha} />*/}
      {/*trilha == 'Cursos_Inscricoes_Inserir' && <CursosManter_Inscricoes_Manter eAlteracao={false} onChangeTrilha={handleChangeTrilha} />*/}
      {/*trilha == 'Cursos_Inscricoes_Alterar' && <CursosManter_Inscricoes_Manter eAlteracao={true} onChangeTrilha={handleChangeTrilha} />*/}
    </NavigationWrapper>
  )
}

export default CursosManter;
