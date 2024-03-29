import { FunctionComponent, MutableRefObject, useEffect, useRef, useState } from "react";
import { SaveFilled } from "@ant-design/icons";
import { FormApi } from "final-form";
import { Field, Form } from "react-final-form";
import Maqui_Botao_Voltar from "../../../../_commons/MaquiButton/Maqui_Botao_Voltar";
import Maqui_Botao_Lento from "../../../../_commons/MaquiButton/Maqui_Botao_Lento";
import { CourseClassroomFormValidators } from "./validators";
import CourseClassroom from "../../../../model/curso/CourseClassroom";
import { FinalInputDate } from "../../../../_commons/FinalForm/FinalInputDate";
import { LitModalidadeMaker } from "../../../../model/literal/lit-modalidade";
import { FinalInputLiteral } from "../../../../_commons/FinalForm/FinalInputLiteral";
import { FinalInputFK } from "../../../../_commons/FinalForm/FinalInputFK";
import CourseTime from "../../../../model/curso/CourseTime";
import { Typography } from "antd";
import CourseEnrollment from "../../../../model/curso/CourseEnrollment";
import CursoHorarioManter from "./Horario/CursoHorarioManter";
import CursoMatriculaManter from "./Matricula/CursoMatriculaManter";
import HorariosDeCursoLista from "./HorariosDeCursoLista";
import MatriculasDeCursoLista from "./MatriculasDeCursoLista";
import MaquiService from "../../../../_commons/services/MaquiService";
import CourseStudent from "../../../../model/curso/CourseStudent";

interface Props {
    selectedClassroom: CourseClassroom
    onGoBackSubItem: () => void
    onSubmitSubItem: (next: CourseClassroom) => void
    eAlteracaoInMemory: boolean,
    breadcrumbNodes: string[],
    onChangeBreadcrumbNodes: (next: string[]) => void
}

const CursoTurmaManter: FunctionComponent<Props> = ({
  selectedClassroom,
  onGoBackSubItem,
  onSubmitSubItem,
  eAlteracaoInMemory,
  breadcrumbNodes, onChangeBreadcrumbNodes,
}: Props) => {

  const formRef: MutableRefObject<FormApi<any, any>> = useRef<any>(null);

  const maquiService = new MaquiService();

  const [_timesTable, _setTimesTable] = useState(selectedClassroom.times);
  const getTimesTable = (): CourseTime[] => {
    return _timesTable;
  }
  const setTimesTable = (next: CourseTime[]): void => {
    _setTimesTable(next);
    formRef.current.change('times', next);
  }
  useEffect(() => {
    setTimesTable(selectedClassroom.times);
  }, [selectedClassroom]);
  const [_enrollmentsTable, _setEnrollmentsTable] = useState(selectedClassroom.enrollments);
  const getEnrollmentsTable = (): CourseEnrollment[] => {
    return _enrollmentsTable;
  }
  const setEnrollmentsTable = (next: CourseEnrollment[]): void => {
    _setEnrollmentsTable(next);
    formRef.current.change('enrollments', next);
  }
  useEffect(() => {
    setEnrollmentsTable(selectedClassroom.enrollments);
  }, [selectedClassroom]);

  const startView = async () => {
    formRef.current.initialize(selectedClassroom);
  }
  useEffect(() => {
    startView();
  }, []);

  const [selectedTime, setSelectedTime] = useState({} as CourseTime);
  const [eAlteracaoInMemoryHorario, setEAlteracaoInMemoryHorario] = useState(false);
  const handleOpenEditSubTime = (period: CourseTime) => {
    setSelectedTime(period);
    setEAlteracaoInMemoryHorario(true);
    onChangeBreadcrumbNodes(breadcrumbNodes.concat(['Alterar Horário']));
  }
  const handleOpenAddSubTime = () => {
    setSelectedTime(new CourseTime());
    setEAlteracaoInMemoryHorario(false);
    onChangeBreadcrumbNodes(breadcrumbNodes.concat(['Inserir Horário']));
  }
  const handleGoBackSub = () => {
    onChangeBreadcrumbNodes(['Curso', eAlteracaoInMemory ? 'Alterar Turma' : 'Inserir Turma']);
  }
  const handleSubmitSubTime = (time: CourseTime) => {
    const restoredTime = new CourseTime(
      time.i_Cod_Horario,
      time.i_Cod_Turma,
      time.i_Dia_Da_Semana,
      time.timeRange.startTime,
      time.timeRange.endTime,
      time.timeRange.endsOnNextDay,
      time.rowKey
    );
    
    const found = getTimesTable().find(x => x.rowKey === restoredTime.rowKey);
    if (!found) {
      setTimesTable(getTimesTable().concat([restoredTime]));
    } else {
      setTimesTable(getTimesTable().map(x => x.rowKey !== restoredTime.rowKey ? x : restoredTime));
    }
    handleGoBackSub();
  }

  const [selectedEnrollment, setSelectedEnrollment] = useState({} as CourseEnrollment);
  const [eAlteracaoInMemoryMatricula, setEAlteracaoInMemoryMatricula] = useState(false);
  const handleOpenEditSubEnrollment = (period: CourseEnrollment) => {
    setSelectedEnrollment(period);
    setEAlteracaoInMemoryMatricula(true);
    onChangeBreadcrumbNodes(breadcrumbNodes.concat(['Alterar Matrícula']));
  }
  const handleOpenAddSubEnrollment = () => {
    setSelectedEnrollment(new CourseEnrollment());
    setEAlteracaoInMemoryMatricula(false);
    onChangeBreadcrumbNodes(breadcrumbNodes.concat(['Inserir Matrícula']));
  }
  const handleSubmitSubEnrollment = async (enrollment: CourseEnrollment) => {
    if (!enrollment.eAlunoNovo) {
      if (enrollment.student == null) {
        enrollment.student = new CourseStudent(enrollment.i_Cod_Aluno);
      }
      const studentFromApi = await maquiService.getOptionByCod(enrollment.i_Cod_Aluno ?? 0, 'S_Nome', 'selectAlunosNoCurso.sql');
      enrollment.studentName = studentFromApi.description;
    }
    const restoredEnrollment = new CourseEnrollment(
      enrollment.i_Cod_Matricula,
      enrollment.i_Cod_Turma,
      enrollment.i_Cod_Aluno,
      enrollment.s_Sequencial_RA,
      new CourseStudent(
        enrollment.i_Cod_Aluno,
        enrollment.studentCPF,
        enrollment.studentEmail,
        enrollment.studentName
      ),
      enrollment.rowKey
    );
    
    const found = getEnrollmentsTable().find(x => x.rowKey === restoredEnrollment.rowKey);
    if (!found) {
      setEnrollmentsTable(getEnrollmentsTable().concat([restoredEnrollment]));
    } else {
      setEnrollmentsTable(getEnrollmentsTable().map(x => x.rowKey !== restoredEnrollment.rowKey ? x : restoredEnrollment));
    }
    handleGoBackSub();
  }

  
  return (

      <Form
        onSubmit={() => { }}
        validate={CourseClassroomFormValidators}
        render={({ values, form }) => {
          formRef.current = form;
          return (
            <>
              {breadcrumbNodes.length == 2 && <>
              {selectedClassroom.s_Sequencial && <Typography.Title level={5}>[Código: {selectedClassroom.s_Sequencial}]</Typography.Title>}
              <div className="half-padding">
                <Field
                  required
                  label='Modalidade'
                  name='i_Modalidade'
                  Opcoes={LitModalidadeMaker.TodosOptions}
                  Com_Selecione={!eAlteracaoInMemory}
                  component={FinalInputLiteral}
                />
              </div>
              <div className="half-padding">
                <Field
                  label="Período"
                  name="i_Cod_Configuracao_De_Periodo"
                  required
                  descriptionColumn="s_Nome"
                  queryName="selectPeriodosNoCurso.sql"
                  queryParameterName="Input_Nome"
                  comSelecione={!eAlteracaoInMemory}
                  component={FinalInputFK}
                />
              </div>
              <div className="half-padding">
                <Field
                  label="Data Início"
                  name="d_Data_Inicio"
                  required
                  maxLength={100}
                  component={FinalInputDate}
                />
              </div>
              <div className="half-padding">
                <Field
                  label="Data Fim"
                  name="d_Data_Fim"
                  required
                  maxLength={100}
                  component={FinalInputDate}
                />
              </div>
             
                <HorariosDeCursoLista
                  timesTable={getTimesTable()}
                  onChangeTimesTable={setTimesTable}
                  parentIsLoading={false}
                  onOpenEdit={handleOpenEditSubTime}
                  onOpenAdd={handleOpenAddSubTime}
                />
                <MatriculasDeCursoLista
                  enrollmentsTable={getEnrollmentsTable()}
                  onChangeEnrollmentsTable={setEnrollmentsTable}
                  parentIsLoading={false}
                  onOpenEdit={handleOpenEditSubEnrollment}
                  onOpenAdd={handleOpenAddSubEnrollment}
                />
              <div className="agrupar-horizontalmente">
                <Maqui_Botao_Voltar Acao_Voltar={onGoBackSubItem} />
                <Maqui_Botao_Lento
                  Rotulo_Botao="Confirmar"
                  Icone={<SaveFilled />}
                  Carregando={false}
                  Acao={() => onSubmitSubItem(values as CourseClassroom)} />
              </div>
              </>}
              {breadcrumbNodes.length >= 3 && (breadcrumbNodes[2] == 'Inserir Horário' || breadcrumbNodes[2] == 'Alterar Horário') && <>
                <CursoHorarioManter
                  selectedTime={selectedTime}
                  onGoBackSubItem={handleGoBackSub}
                  onSubmitSubItem={handleSubmitSubTime}
                  eAlteracaoInMemory={eAlteracaoInMemoryHorario}
                />
              </>}
              {breadcrumbNodes.length >= 3 && (breadcrumbNodes[2] == 'Inserir Matrícula' || breadcrumbNodes[2] == 'Alterar Matrícula') && <>
                <CursoMatriculaManter
                  selectedEnrollment={selectedEnrollment}
                  onGoBackSubItem={handleGoBackSub}
                  onSubmitSubItem={handleSubmitSubEnrollment}
                  eAlteracaoInMemory={eAlteracaoInMemoryMatricula}
                />
              </>}

            </>
          )
        }}
      />
  )
}

export default CursoTurmaManter;
