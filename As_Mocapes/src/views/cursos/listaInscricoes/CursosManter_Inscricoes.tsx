import React, { useState } from 'react';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import { IResultadoInscricao } from '../../../model/inscricao-resultado';
import { LitColunaInscricaoMaker } from '../../../model/literal/lit-coluna-inscricao';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import { Typography, Input, Collapse, Tag, Select, Button, Table, Dropdown, Modal, DatePicker, Radio, Pagination, Card, Col, Row } from 'antd';
import { ArrowLeftOutlined, DeleteFilled, MoreOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Constantes } from '../../../model/constantes';
import { InscricoesIndexState } from '../../../integrations/inscricoes-index-state';
import { TrilhaCursosManter } from '../../../model/trilha-cursos-manter';

function CursosManter_Inscricoes(props: { onChangeTrilha: (value: TrilhaCursosManter) => void }) {
    const [selectedFiltros, setSelectedFiltros] = useState<string[]>([]);
  
  const { windowWidth } = useWindowDimensions();
    
  let possiveisFiltros: string[] = []
  possiveisFiltros = LitColunaInscricaoMaker.Todos.map(x => x.descricao).filter(x => x !== 'Nome do Curso');
  
  // Resultados e Paginação default
  const [isExcluirModalOpen, setIsExcluirModalOpen] = useState(false);
  const itensMais: MenuProps['items'] = [
    {
      key: 'mais-alterar',
      label: (<a target="_blank" rel="noopener noreferrer" onClick={() => props.onChangeTrilha('Cursos_Inscricoes_Alterar') }>Alterar</a>),
    },
    {
      key: 'mais-excluir',
      label: (<a rel="noopener noreferrer" onClick={() => setIsExcluirModalOpen(true)}>Excluir</a>),
    },
  ]
  let columns: ColumnsType<IResultadoInscricao> = [
    {
      title: LitColunaInscricaoMaker.NomeAluno.descricao,
      dataIndex: LitColunaInscricaoMaker.NomeAluno.nomePropriedade,
      key: LitColunaInscricaoMaker.NomeAluno.nomePropriedade,
    },
    {
      title: LitColunaInscricaoMaker.RAAluno.descricao,
      dataIndex: LitColunaInscricaoMaker.RAAluno.nomePropriedade,
      key: LitColunaInscricaoMaker.RAAluno.nomePropriedade,
    },
    {
      title: LitColunaInscricaoMaker.DataInicio.descricao,
      dataIndex: LitColunaInscricaoMaker.DataInicio.nomePropriedade,
      key: LitColunaInscricaoMaker.DataInicio.nomePropriedade,
      render: (dataInicio: Date) => (
        <span>{('' + dataInicio.getDate()).padStart(2, '0') + '/' + (dataInicio.getMonth() + 1 + '').padStart(2, '0') + '/' + dataInicio.getFullYear()}</span>
      )
    },
    {
      title: '#',
      key: 'mais',
      dataIndex: 'mais',
      render: () => (
        <Dropdown menu={{ items: itensMais }} placement="bottomRight" arrow={{ pointAtCenter: true }}>
          <Button icon={<MoreOutlined />}></Button>
        </Dropdown>
      ),
    },
  ];
    
  columns = columns.filter(x => x.title == '#' || possiveisFiltros.some(y => y == x.title ?? ''));
    
  return (
    <>
      <div className="half-padding">
        <div className="half-padding">
          <Typography.Title level={3}>Lista de Inscrições</Typography.Title>
        </div>
        
        {/* Pesquisa */}
        <div className='half-padding'>
          <Input placeholder="Termos" prefix={<SearchOutlined/>} />
        </div>
        <div className='agrupar-horizontalmente'>
          <div className='half-padding'>
            <Button type="primary" shape="round" icon={<SearchOutlined/>}>Pesquisar</Button>
          </div>
          <div className='half-padding'>
            <Button type="primary" shape="round" icon={<PlusOutlined/>} onClick={() => props.onChangeTrilha('Cursos_Inscricoes_Inserir')}>Inserir...</Button>
          </div>
        </div>
        
        
        {/* Resultados e Paginaçao default
                atributos visiveis pra mobile: nome; sexo, ativo e mais
                atributos visiveis pra desktop: nome; cpf; sexo; nome da mae; ativo; e mais */}
        {windowWidth <= Constantes.WidthMaximoMobile ?
          <Row>
            {InscricoesIndexState.inscricoesApresentadas.map(xInscricao => <Col span={12} className="half-padding">
              <Card title={<div className="inscricoes-index-botoes-modal">
                  <Dropdown menu={{ items: itensMais }} placement="bottomRight" arrow={{ pointAtCenter: true }}>
                    <Button icon={<MoreOutlined />}></Button>
                  </Dropdown>
                </div>}
                bodyStyle={{ padding: "6px" }}
                headStyle={{ paddingRight: "12px" }}>
                
                <div className='half-padding'>
                  <span className='card-text-size'><strong>Nome do Aluno</strong>: {xInscricao.nomeAluno}</span>
                </div>
                <div className='half-padding'>
                  <span className='card-text-size'><strong>RA do Aluno</strong>: {xInscricao.raAluno}</span>
                </div>
                <div className='half-padding'>
                  <span className='card-text-size'><strong>Data de Início</strong>: {('' + xInscricao.dataInicio.getDate()).padStart(2, '0') + '/' + (xInscricao.dataInicio.getMonth() + 1 + '').padStart(2, '0') + '/' + xInscricao.dataInicio.getFullYear()}</span>
                </div>
              </Card>
              
            </Col>)}
          </Row> :
          <Table dataSource={InscricoesIndexState.inscricoesApresentadas} columns={columns} />}
        
        {windowWidth <= Constantes.WidthMaximoMobile && <div className='inscricoes-index-botoes-modal'>
          <Pagination total={InscricoesIndexState.inscricoesApresentadas.length} defaultCurrent={1} />
        </div>}
        
      </div>
      <Modal open={isExcluirModalOpen} footer={null} closable={true} onCancel={() => setIsExcluirModalOpen(false)}>
        <div className="half-padding">
          <div className="half-padding">
            <Typography.Title level={5}>Deseja excluir a Inscrição? A ação não pode ser desfeita.</Typography.Title>
          </div>
          <div className="inscricoes-index-botoes-modal">
            <div className="half-padding" >
              <Button shape="round" onClick={() => setIsExcluirModalOpen(false)} icon={<ArrowLeftOutlined/>}>Voltar</Button>
            </div>
            <div className="half-padding" >
              <Button danger type="primary" shape="round" icon={<DeleteFilled/>}>Excluir</Button>
            </div>
          </div>
        </div>
      </Modal>
      <div className='half-padding'>
        <Button shape="round" icon={<ArrowLeftOutlined/>} onClick={() => props.onChangeTrilha('Cursos')}>Voltar</Button>
      </div>
    </>
  );
}

export default CursosManter_Inscricoes;
