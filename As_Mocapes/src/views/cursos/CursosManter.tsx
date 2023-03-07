import React, { useState } from "react";
import { ArrowLeftOutlined, InsertRowBelowOutlined, SaveFilled } from "@ant-design/icons";
import { Typography, Input, Button, InputNumber, Breadcrumb } from "antd";
import { useParams } from "react-router-dom";
import NavigationWrapper from "../_navigation/NavigationWrapper";
import type { TrilhaCursosManter } from "../../model/trilha-cursos-manter";
import CursosManter_Inscricoes from "./listaInscricoes/CursosManter_Inscricoes";
import CursosManter_Inscricoes_Manter from "./listaInscricoes/manter/CursosManter_Inscricoes_Manter";

function CursosManter(props: { eAlteracao: boolean }) {

  const { id } = useParams();
  
  const [trilha, setTrilha] = useState<TrilhaCursosManter>('Cursos');
  const handleChangeTrilha = (value: TrilhaCursosManter) => {
    setTrilha(value);
  }
  
  let breadcrumbItems: string[] = [];
  if (trilha === 'Cursos') {
    breadcrumbItems = ['Cursos'];
  }
  if (trilha === 'Cursos_Inscricoes') {
    breadcrumbItems = ['Cursos', 'Lista de Inscrições'];
  }
  if (trilha === 'Cursos_Inscricoes_Inserir') {
    breadcrumbItems = [ 'Cursos', 'Lista de Inscrições', 'Inserir'];
  }
  if (trilha === 'Cursos_Inscricoes_Alterar') {
    breadcrumbItems = [ 'Cursos', 'Lista de Inscrições', 'Alterar'];
  }
  
  return (
      
    <NavigationWrapper>
      
      <div className="half-padding">
        <div className="half-padding">
        <Breadcrumb>
          {breadcrumbItems.map(x => { return <Breadcrumb.Item>
            {x}
          </Breadcrumb.Item>})}
        </Breadcrumb>
        </div>
      </div>
      {trilha == 'Cursos' && <>
      <div className="half-padding">
        <div className="half-padding">
          <Typography.Title level={3}>{props.eAlteracao ? "Alteração de Curso" : "Inserção de Curso"}</Typography.Title>
        </div>
        <div className="half-padding">
          <Input placeholder="Nome" />
        </div>
        <div className="half-padding">
          <InputNumber placeholder="Limite de Semestres" />
        </div>
        <div className="half-padding">
          <Button shape="round" icon={<InsertRowBelowOutlined/>} onClick={() => handleChangeTrilha('Cursos_Inscricoes')}>Lista de Inscrições</Button>
        </div>
        <div className="agrupar-horizontalmente">
          <div className="half-padding" >
            <Button shape="round" icon={<ArrowLeftOutlined/>}>Voltar</Button>
          </div>
          <div className="half-padding" >
            <Button type="primary" shape="round" icon={<SaveFilled/>}>Confirmar</Button>
          </div>
        </div>
      </div>
      </>}
      {trilha == 'Cursos_Inscricoes' && <CursosManter_Inscricoes onChangeTrilha={handleChangeTrilha} />}
      {trilha == 'Cursos_Inscricoes_Inserir' && <CursosManter_Inscricoes_Manter eAlteracao={false} onChangeTrilha={handleChangeTrilha} />}
      {trilha == 'Cursos_Inscricoes_Alterar' && <CursosManter_Inscricoes_Manter eAlteracao={true} onChangeTrilha={handleChangeTrilha} />}
    </NavigationWrapper>
  )
}

export default CursosManter;
