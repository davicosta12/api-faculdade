import { ArrowLeftOutlined, HomeOutlined, SaveFilled } from "@ant-design/icons";
import { Typography, Input, Button, InputNumber, Breadcrumb } from "antd";
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
import PostCourseDto from "../../../services/CourseService/dto/PostCourseDto";
import DetailedCourseDto from "../../../services/CourseService/dto/DetailedCourseDto";
import CourseClassroom from "../../../model/curso/CourseClassroom";
import CursoTurmaManter from "./Turma/CursoTurmaManter";
import TurmasDeCursoLista from "./TurmasDeCursoLista";

interface Props {
  eAlteracao: boolean;
}

const CursosManter: FunctionComponent<Props> = (props) => {

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  let course = location?.state?.course as DetailedCourseDto;

  const formRef: MutableRefObject<FormApi<any, any>> = useRef<any>(null);

  const courseService = new CourseService();

  const { eAlteracao } = props;

  const [_classroomsTable, _setClassroomsTable] = useState([] as CourseClassroom[]);
  const getClassroomsTable = (): CourseClassroom[] => {
    return _classroomsTable;
  }
  const setClassroomsTable = (next: CourseClassroom[]) => {
    _setClassroomsTable(next);
    formRef.current.change('classrooms', next.map(x => x.AsDto()));
  }

  useEffect(() => {
    if (course?.i_Cod_Curso) {
      const parsed = PostCourseDto.FromDetailed(course);
      formRef.current.initialize(parsed);
      const parsedClassrooms = course.classrooms.map(x => CourseClassroom.FromDto(x));
      setClassroomsTable(parsedClassrooms);
    }
    else {
      formRef.current.reset({} as PostCourseDto);
    }
  }, [course]);

  const [breadcrumbNodes, setBreadcrumbNodes] = useState(['Curso']);
  const handleBreadcrumbClick = (event: any, node: string) => {
    event.preventDefault();
    const endIndex = breadcrumbNodes.lastIndexOf(node);
    if (endIndex == -1)
      return;
    setBreadcrumbNodes(breadcrumbNodes.slice(0, endIndex + 1));
  }

  const [selectedClassroom, setSelectedClassroom] = useState({} as CourseClassroom);
  const [eAlteracaoInMemory, setEAlteracaoInMemory] = useState(false);
  const handleOpenEditSubItem = (period: CourseClassroom) => {
    setSelectedClassroom(period);
    setEAlteracaoInMemory(true);
    setBreadcrumbNodes(breadcrumbNodes.concat(['Alterar Turma']));
  }
  const handleOpenAddSubItem = () => {
    setSelectedClassroom(new CourseClassroom());
    setEAlteracaoInMemory(false);
    setBreadcrumbNodes(breadcrumbNodes.concat(['Inserir Turma']));
  }
  const handleGoBackSubItem = () => {
    setBreadcrumbNodes(['Curso']);
  }
  const handleSubmitSubItem = (classroom: CourseClassroom) => {
    const restoredClassroom = new CourseClassroom(
      classroom.i_Cod_Turma,
      classroom.i_Cod_Curso,
      classroom.s_Sequencial,
      classroom.i_Modalidade,
      classroom.i_Cod_Configuracao_De_Periodo,
      classroom.b_Esta_Pendente,
      classroom.d_Data_Inicio,
      classroom.d_Data_Fim,
      classroom.times,
      classroom.enrollments,
      classroom.rowKey
    );
    
    const found = getClassroomsTable().find(x => x.rowKey === restoredClassroom.rowKey);
    if (!found) {
      setClassroomsTable(getClassroomsTable().concat([restoredClassroom]));
    } else {
      setClassroomsTable(getClassroomsTable().map(x => x.rowKey !== restoredClassroom.rowKey ? x : restoredClassroom));
    }
    handleGoBackSubItem();
  }

  const handleCreate = async (values: PostCourseDto) => {
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

  const handleUpdate = async (values: PostCourseDto) => {
    setIsLoading(true);
    try {
      await courseService.updateCourse(course.i_Cod_Curso, values);
      toast.success(`Curso - "${values.s_Nome}" atualizado com sucesso`, toastOptions(toast));
    }
    catch (err: any) {
      toast.error(toastError(err), toastOptions(toast));
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = (values: PostCourseDto) => {
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
              {course.s_Sequencial && <Typography.Title level={5}>[Código: {course.s_Sequencial}]</Typography.Title>}
              <div className="half-padding">
                <Typography.Title level={3}>{eAlteracao ? "Alteração de Curso" : "Inserção de Curso"}</Typography.Title>
              </div>
              <div className="half-padding">
                <Breadcrumb separator=">" >
                  <Breadcrumb.Item><HomeOutlined/></Breadcrumb.Item>
                  {breadcrumbNodes.map(x => <Breadcrumb.Item href=''  onClick={(event) => handleBreadcrumbClick(event, x)} key={x}>{x}</Breadcrumb.Item>) }
                </Breadcrumb>
              </div>
              {breadcrumbNodes.length == 1 && <>
              <div className="half-padding">
                <Field
                  label="Nome"
                  name="s_Nome"
                  required
                  placeholder=""
                  maxLength={100}
                  component={FinalInputText}
                />
              </div>
              <div className="half-padding">
                <Field
                  label="Valor (R$)"
                  name="f_Valor"
                  required
                  placeholder=""
                  maxLength={10}
                  component={FinalInputNumber}
                  isDecimal={true}
                />
              </div>
                <TurmasDeCursoLista
                  classroomsTable={getClassroomsTable()}
                  onChangeClassroomsTable={setClassroomsTable}
                  parentIsLoading={isLoading}
                  onOpenEdit={handleOpenEditSubItem}
                  onOpenAdd={handleOpenAddSubItem}
                />
              <div className="agrupar-horizontalmente">
                <Maqui_Botao_Voltar Acao_Voltar={handleGoBack} /> 
                <Maqui_Botao_Lento
                  Rotulo_Botao="Confirmar"
                  Icone={<SaveFilled/>}
                  Carregando={isLoading}
                  Acao={() => handleSubmit(values as PostCourseDto)} />
                
              </div>
              </>}
              {breadcrumbNodes.length >= 2 && <>
                <CursoTurmaManter
                  selectedClassroom={selectedClassroom}
                  onGoBackSubItem={handleGoBackSubItem}
                  onSubmitSubItem={handleSubmitSubItem}
                  eAlteracaoInMemory={eAlteracaoInMemory}
                  breadcrumbNodes={breadcrumbNodes}
                  onChangeBreadcrumbNodes={setBreadcrumbNodes}
                />
              </>}
            </div>
          )
        }}
      />
    </NavigationWrapper>
  )
}

export default CursosManter;
