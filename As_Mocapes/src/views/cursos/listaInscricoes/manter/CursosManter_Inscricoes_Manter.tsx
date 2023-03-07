import React, { useState } from "react";
import { ArrowLeftOutlined, SaveFilled } from "@ant-design/icons";
import { Card, Typography, Input, Button, Spin, Switch, Select, DatePicker } from "antd";
import { useParams } from "react-router-dom";
import '../../../inscricoes/InscricoesManter.css';
import { UsuariosIndexState } from "../../../../integrations/usuarios-index-state";
import type { TrilhaCursosManter } from "../../../../model/trilha-cursos-manter";

function CursosManter_Inscricoes_Manter(props: { eAlteracao: boolean, onChangeTrilha: (value: TrilhaCursosManter) => void }) {

  const { id } = useParams();
  
  
  return (
    <>
      <div className="half-padding">
        <div className="half-padding">
          <Typography.Title level={3}>{props.eAlteracao ? "Alteração de Inscrição" : "Inserção de Inscrição"}</Typography.Title>
        </div>
        <div className="inscricoes-manter-selecionar">
          <div className="half-padding">
            <Typography.Text>Nome do Aluno</Typography.Text>
          </div>
          <div className="half-padding">
            <Select
              defaultValue=""
              showSearch
              optionFilterProp="children"
              style={{ width: 200 }}
              options={[
                { value: '', label: 'Selecione...' },
              ].concat(UsuariosIndexState.usuariosApresentados.map(x => {
                return { value: x.id + '', label: x.nome }
              }))}
                    
            />
          </div>
        </div>
        <div className="inscricoes-manter-selecionar">
          <div className="half-padding">
            <Typography.Text>RA do Aluno</Typography.Text>
          </div>
          <div className="half-padding">
            <Select
              defaultValue=""
              showSearch
              optionFilterProp="children"
              style={{ width: 200 }}
              options={[
                { value: '', label: 'Selecione...' },
              ].concat(UsuariosIndexState.usuariosApresentados.map(x => {
                return { value: x.id + '', label: x.ra }
              }))}
                    
            />
          </div>
        </div>
        
        <div className="half-padding">
          <DatePicker placeholder="Data de Início" />
        </div>
        <div className="half-padding">
          <DatePicker placeholder="Data de Fim" />
        </div>
        <div className="agrupar-horizontalmente">
          <div className="half-padding" >
            <Button shape="round" icon={<ArrowLeftOutlined/> } onClick={() => props.onChangeTrilha('Cursos_Inscricoes')}>Voltar</Button>
          </div>
          <div className="half-padding" >
            <Button type="primary" shape="round" icon={<SaveFilled/>}>Confirmar</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CursosManter_Inscricoes_Manter;
