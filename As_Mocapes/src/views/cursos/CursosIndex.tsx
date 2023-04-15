import React, { useState } from 'react';
import './CursosIndex.css';
import NavigationWrapper from '../_navigation/NavigationWrapper';
import { Typography, Input, Collapse, Tag, Select, Button, Table, Dropdown, Modal, InputNumber, Pagination, Card, Col, Row, Spin } from 'antd';
import { ArrowLeftOutlined, DeleteFilled, MoreOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import { LitColunaCursoMaker } from '../../model/literal/lit-coluna-curso';
import { CursosIndexState } from '../../integrations/cursos-index-state';
import { IResultadoCurso } from '../../model/curso-resultado';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { Constantes } from '../../model/constantes';


function CursosIndex() {
  const [selectedFiltros, setSelectedFiltros] = useState<string[]>([]);
  
  const { windowWidth } = useWindowDimensions();
    
  // Filtros avançados
  const possiveisFiltros = ['Nome'];
  const [estaMostrandoFiltrosAvancados, setEstaMostrandoFiltrosAvancados] = useState(false);
  const handleChangeActivePanels = (activePanels: string | string[]) => {
    setEstaMostrandoFiltrosAvancados((_prev: boolean) => activePanels.length > 0);
  }
  const handleCheckAvancado = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedFiltros, tag]
      : selectedFiltros.filter((t) => t !== tag);
    setSelectedFiltros(nextSelectedTags);
  };
    
  // Ordenaçao
  let possiveisOrdenacoes = [{ value: '', label: 'Nada' }];
  for (let iPossivelFiltro of possiveisFiltros) {
    possiveisOrdenacoes.push({ value: iPossivelFiltro + '--asc', label: iPossivelFiltro + " Crescente" });
    possiveisOrdenacoes.push({ value: iPossivelFiltro + '--desc', label: iPossivelFiltro + " Decrescente" });
  }
    
  // Resultados e Paginaçao default
  const [isExcluirModalOpen, setIsExcluirModalOpen] = useState(false);
  const itensMais: MenuProps['items'] = [
    {
      key: 'mais-alterar',
      label: (<a target="_blank" rel="noopener noreferrer" href="#">Alterar</a>),
    },
    {
      key: 'mais-excluir',
      label: (<a rel="noopener noreferrer" onClick={() => setIsExcluirModalOpen(true)}>Excluir</a>),
    },
  ]
  let columns: ColumnsType<IResultadoCurso> = [
    {
      title: LitColunaCursoMaker.Nome.descricao,
      dataIndex: LitColunaCursoMaker.Nome.nomePropriedade,
      key: LitColunaCursoMaker.Nome.nomePropriedade,
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
    
  return (
    <NavigationWrapper>
      <div className="half-padding">
        <div className="half-padding">
          <Typography.Title level={3}>Cursos</Typography.Title>
        </div>
        
        {/* Pesquisa */}
        {!estaMostrandoFiltrosAvancados && <div className='half-padding'>
          <Input placeholder="Termos" prefix={<SearchOutlined/>} />
        </div>}
        <div className='half-padding'>
          <Collapse onChange={handleChangeActivePanels} defaultActiveKey={estaMostrandoFiltrosAvancados ? ["filtros-avancados"] : []} >
            <Collapse.Panel header="Filtros Avançados" key="filtros-avancados">
              <div className="half-padding">
                <div className="half-padding ">
                  {possiveisFiltros.map((tag) => (
                    <Tag.CheckableTag
                      key={tag}
                      checked={selectedFiltros.includes(tag)}
                      onChange={(checked) => handleCheckAvancado(tag, checked)}
                    >
                      {tag}
                    </Tag.CheckableTag>
                  ))}
                </div>
                {selectedFiltros.includes(LitColunaCursoMaker.Nome.descricao) && <div className="half-padding">
                  <Input placeholder="Nome" />
                </div>}
              </div>
            </Collapse.Panel>
          </Collapse>
        </div>
        
        {/* Ordenar por */}
        <div className="cursos-index-filtro-avancado">
          <div className='half-padding'>
            <Typography.Text>Ordenar por</Typography.Text>
          </div>
          <div className='half-padding'>
            <Select
              defaultValue=""
              style={{ width: 256 }}
              options={possiveisOrdenacoes}
            />
          </div>
        </div>
        <div className='agrupar-horizontalmente'>
          <div className='half-padding'>
            <Button type="primary" shape="round" icon={<SearchOutlined/>}>Pesquisar</Button>
          </div>
          <div className='half-padding'>
            <Button type="primary" shape="round" icon={<PlusOutlined/>}>Inserir...</Button>
          </div>
        </div>
        
        {/* Resultados e Paginaçao default
                atributos visiveis pra mobile: nome; sexo, ativo e mais
                atributos visiveis pra desktop: nome; cpf; sexo; nome da mae; ativo; e mais */}
        
        {windowWidth <= Constantes.WidthMaximoMobile ?
          <Row>
            {CursosIndexState.cursosApresentados.map(xCurso => <Col span={12} className="half-padding">
              <Card title={<div className="cursos-index-botoes-modal">
                  <Dropdown menu={{ items: itensMais }} placement="bottomRight" arrow={{ pointAtCenter: true }}>
                    <Button icon={<MoreOutlined />}></Button>
                  </Dropdown>
                </div>}
                bodyStyle={{ padding: "6px" }}
                headStyle={{ paddingRight: "12px" }}>
                
                <div className='half-padding'>
                  <span className='card-text-size'><strong>{xCurso.nome}</strong></span>
                </div>
                
              </Card>
              
            </Col>)}
          </Row> :
          <Table dataSource={CursosIndexState.cursosApresentados} columns={columns} />}
        
        {windowWidth <= Constantes.WidthMaximoMobile && <div className='usuarios-index-botoes-modal'>
          <Pagination total={CursosIndexState.cursosApresentados.length} defaultCurrent={1} />
        </div>}
      </div>
      
      {/* Confirmar a exclusão */}
      <Modal open={isExcluirModalOpen} footer={null} closable={true} onCancel={() => setIsExcluirModalOpen(false)}>
        <div className="half-padding">
          {CursosIndexState.estaCarregandoSePodeExcluir && <>
            <div className="half-padding" >
              <Spin /> 
            </div>
          </>}
          {(!CursosIndexState.estaCarregandoSePodeExcluir && CursosIndexState.podeExcluir) && <>
          <div className="half-padding">
            <Typography.Title level={5}>Deseja excluir o Curso? A ação não pode ser desfeita.</Typography.Title>
          </div>
          <div className="cursos-index-botoes-modal">
            <div className="half-padding" >
              <Button shape="round" onClick={() => setIsExcluirModalOpen(false)} icon={<ArrowLeftOutlined/>}>Voltar</Button>
            </div>
            <div className="half-padding" >
              <Button danger type="primary" shape="round" icon={<DeleteFilled/>}>Excluir</Button>
            </div>
          </div>
          </>}
          {(!CursosIndexState.estaCarregandoSePodeExcluir && !CursosIndexState.podeExcluir) && <>
            <div className="half-padding">
              <Typography.Title level={5}>Não é possível excluir um curso enquanto ele tiver ocupações.</Typography.Title>
            </div>
            <div className="usuarios-index-botoes-modal">
              <div className="half-padding" >
                <Button shape="round" onClick={() => setIsExcluirModalOpen(false)} icon={<ArrowLeftOutlined/>}>Voltar</Button>
              </div>
            </div>
          </>}
        </div>
      </Modal>
    </NavigationWrapper>
  )
}

export default CursosIndex;
