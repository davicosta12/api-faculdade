import { FunctionComponent, MutableRefObject, useEffect, useRef } from "react";
import { SaveFilled } from "@ant-design/icons";
import { FormApi } from "final-form";
import { Field, Form } from "react-final-form";
import Maqui_Botao_Voltar from "../../../../../_commons/MaquiButton/Maqui_Botao_Voltar";
import Maqui_Botao_Lento from "../../../../../_commons/MaquiButton/Maqui_Botao_Lento";
import CourseEnrollment from "../../../../../model/curso/CourseEnrollment";
import { FinalInputLogical } from "../../../../../_commons/FinalForm/FinalInputLogical";
import { FinalInputText } from "../../../../../_commons/FinalForm/FinalInputText";
import { FinalInputMaskedText } from "../../../../../_commons/FinalForm/FinalInputMaskedText";
import { FinalInputFK } from "../../../../../_commons/FinalForm/FinalInputFK";

interface Props {
    selectedEnrollment: CourseEnrollment
    onGoBackSubItem: () => void
    onSubmitSubItem: (next: CourseEnrollment) => void
    eAlteracaoInMemory: boolean
}

const CursoMatriculaManter: FunctionComponent<Props> = ({
  selectedEnrollment,
  onGoBackSubItem,
  onSubmitSubItem,
  eAlteracaoInMemory,
}: Props) => {

  const formRef: MutableRefObject<FormApi<any, any>> = useRef<any>(null);

  const startView = async () => {
    formRef.current.initialize(selectedEnrollment);
  }
  useEffect(() => {
    startView();
  }, []);
  
  return (

      <Form
        onSubmit={() => { }}
        render={({ values, form }) => {
          formRef.current = form;
          return (
            <>
              <div className="half-padding">
                <Field
                  label="Novo aluno"
                  name="eNovoAluno"
                  component={FinalInputLogical}
                />
              </div>
              {values.eAlunoNovo ? <>
                <div className="half-padding">
                  <Field
                    label="CPF"
                    name="s_CPF"
                    mask="000.000.000-00"
                    required
                    placeholder=""
                    maxLength={14}
                    component={FinalInputMaskedText}
                  />
                </div>
                <div className="half-padding">
                  <Field
                    label="E-mail"
                    name="s_Email"
                    required
                    placeholder=""
                    maxLength={80}
                    component={FinalInputText}
                  />
                </div>
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
              </> : <>
                <div className="half-padding">
                  <Field
                    label="CPF"
                    name="i_Cod_Aluno"
                    required
                    descriptionColumn="s_CPF"
                    queryName="selectAlunosNoCurso.sql"
                    queryParameterName="Input_CPF"
                    comSelecione={!eAlteracaoInMemory}
                    component={FinalInputFK}
                  />
                </div>
                <div className="half-padding">
                  <Field
                    label="E-mail"
                    name="i_Cod_Aluno"
                    required
                    descriptionColumn="s_Email"
                    queryName="selectAlunosNoCurso.sql"
                    queryParameterName="Input_Email"
                    comSelecione={!eAlteracaoInMemory}
                    component={FinalInputFK}
                  />
                </div>
                <div className="half-padding">
                  <Field
                    label="Nome"
                    name="i_Cod_Aluno"
                    required
                    descriptionColumn="s_Nome"
                    queryName="selectAlunosNoCurso.sql"
                    queryParameterName="Input_Nome"
                    comSelecione={!eAlteracaoInMemory}
                    component={FinalInputFK}
                  />
                </div>
              </>}
             
              <div className="agrupar-horizontalmente">
                <Maqui_Botao_Voltar Acao_Voltar={onGoBackSubItem} />
                <Maqui_Botao_Lento
                  Rotulo_Botao="Confirmar"
                  Icone={<SaveFilled />}
                  Carregando={false}
                  Acao={() => onSubmitSubItem(values as CourseEnrollment)} />
              </div>
            </>
          )
        }}
      />
  )
}

export default CursoMatriculaManter;
