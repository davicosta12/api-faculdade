import React, { useState } from "react";
import { ArrowLeftOutlined, SaveFilled } from "@ant-design/icons";
import { Card, Typography, Input, Button, Spin, Switch, Select, DatePicker } from "antd";
import { useParams } from "react-router-dom";
import { UsuariosManterState } from "../../integrations/usuarios-manter-state";
import NavigationWrapper from "../_navigation/NavigationWrapper";
import './InscricoesManter.css';
import { CursosIndexState } from "../../integrations/cursos-index-state";
import { UsuariosIndexState } from "../../integrations/usuarios-index-state";
import Maqui_Campo_FK from "../../_commons/Maqui_Campo_FK/Maqui_Campo_FK";

function InscricoesManter(props: { eAlteracao: boolean }) {

  const { id } = useParams();
  
  const [eAlteracaoSenha, setEAlteracaoSenha] = useState(false);
  const [codAluno, setCodAluno] = useState<number | undefined>(undefined);

  const handleChangeCodValue = (newValue: number | undefined) => {
    console.log('handleChangeCodValue:');
    console.log(newValue);
    setCodAluno(newValue);
  }
  
  return (
      
    <NavigationWrapper>
      <div className="half-padding">
        <div className="half-padding">
          <Typography.Title level={3}>{props.eAlteracao ? "Alteração de Inscrição" : "Inserção de Inscrição"}</Typography.Title>
        </div>
        <div className="inscricoes-manter-selecionar">
          <div className="half-padding">
            <Typography.Text>Nome do Aluno</Typography.Text>
          </div>
          <div className="half-padding">
            <Maqui_Campo_FK
              descriptionColumn="S_Nome"
              queryName="selectAlunos.sql"
              queryParameterName="Input_Nome"
              comSelecione={!props.eAlteracao}
              minWidth={200}
              codValue={codAluno}
              onChangeCodValue={(newValue) => handleChangeCodValue(newValue)}
            />
          </div>
        </div>
        <div className="inscricoes-manter-selecionar">
          <div className="half-padding">
            <Typography.Text>RA do Aluno</Typography.Text>
          </div>
          <div className="half-padding">
            
            <Maqui_Campo_FK
              descriptionColumn="S_RA"
              queryName="selectAlunos.sql"
              queryParameterName="Input_RA"
              comSelecione={!props.eAlteracao}
              minWidth={200}
              codValue={codAluno}
              onChangeCodValue={(newValue) => setCodAluno(newValue)}
            />
          </div>
        </div>
        <div className="inscricoes-manter-selecionar">
          <div className="half-padding">
            <Typography.Text>Nome do Curso</Typography.Text>
          </div>
          <div className="half-padding">
            <Maqui_Campo_FK
              descriptionColumn="S_Nome"
              queryName="selectCursos.sql"
              queryParameterName="Input_Nome"
              comSelecione={!props.eAlteracao}
              minWidth={200}
            />
          </div>
        </div>
        
        <div className="half-padding">
          <DatePicker placeholder="Data de Início" />
        </div>
        <div className="half-padding">
          <DatePicker placeholder="Data de Fim" />
        </div>
        {UsuariosManterState.NomeNaoInformado && <div className="half-padding">
          <Typography.Text type="danger">O nome é obrigatório</Typography.Text>
        </div>}
        <div className="agrupar-horizontalmente">
          <div className="half-padding" >
            <Button shape="round" icon={<ArrowLeftOutlined/>}>Voltar</Button>
          </div>
          <div className="half-padding" >
            {UsuariosManterState.AvancarEstaCarregando ? <Spin className="antd-top-padding" /> : <Button type="primary" shape="round" icon={<SaveFilled/>}>Confirmar</Button>}
          </div>
        </div>
      </div>
    </NavigationWrapper>
  )
}

export default InscricoesManter;
