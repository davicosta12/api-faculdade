import { FunctionComponent, MutableRefObject, useEffect, useRef, useState } from "react";
import { SaveFilled } from "@ant-design/icons";
import { FormApi } from "final-form";
import { Field, Form } from "react-final-form";
import Maqui_Botao_Voltar from "../../../../../_commons/MaquiButton/Maqui_Botao_Voltar";
import Maqui_Botao_Lento from "../../../../../_commons/MaquiButton/Maqui_Botao_Lento";
import { FinalInputTimeRange } from "../../../../../_commons/FinalForm/FinalInputTimeRange";
import { CourseTimeFormValidators } from "./validators";
import { FinalInputLiteral } from "../../../../../_commons/FinalForm/FinalInputLiteral";
import CourseTime from "../../../../../model/curso/CourseTime";
import { LitDiaDaSemanaMaker } from "../../../../../model/literal/lit-dia-da-semana";

interface Props {
    selectedTime: CourseTime
    onGoBackSubItem: () => void
    onSubmitSubItem: (next: CourseTime) => void
    eAlteracaoInMemory: boolean
}

const CursoHorarioManter: FunctionComponent<Props> = ({
  selectedTime,
  onGoBackSubItem,
  onSubmitSubItem,
  eAlteracaoInMemory,
}: Props) => {

  const formRef: MutableRefObject<FormApi<any, any>> = useRef<any>(null);

  const startView = async () => {
    formRef.current.initialize(selectedTime);
  }
  useEffect(() => {
    startView();
  }, []);
  
  return (

      <Form
        onSubmit={() => { }}
        validate={CourseTimeFormValidators}
        render={({ values, form }) => {
          formRef.current = form;
          return (
            <>
              <div className="half-padding">
                <Field
                  required
                  label='Dia da Semana'
                  name='i_Dia_Da_Semana'
                  Opcoes={LitDiaDaSemanaMaker.TodosOptions}
                  Com_Selecione={!eAlteracaoInMemory}
                  component={FinalInputLiteral}
                />
              </div>
              <div className="half-padding">
                <Field
                  startInputName="d_Hora_Inicio"
                  endInputName="d_Hora_Fim"
                  required
                  component={FinalInputTimeRange}
                  label='Horário'
                  name='timeRange'
                />
              </div>
             
              <div className="agrupar-horizontalmente">
                <Maqui_Botao_Voltar Acao_Voltar={onGoBackSubItem} />
                <Maqui_Botao_Lento
                  Rotulo_Botao="Confirmar"
                  Icone={<SaveFilled />}
                  Carregando={false}
                  Acao={() => onSubmitSubItem(values as CourseTime)} />
              </div>
            </>
          )
        }}
      />
  )
}

export default CursoHorarioManter;
