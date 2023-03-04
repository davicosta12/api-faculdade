import React, { useState } from 'react';
import './InscricoesIndex.css';
import NavigationWrapper from '../_navigation/NavigationWrapper';
import { Typography, Input, Collapse, Tag, Select, Button, Table, Dropdown, Modal, DatePicker, Radio, Pagination, Card, Col, Row } from 'antd';
import { ArrowLeftOutlined, CheckOutlined, DeleteFilled, MoreOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import { LitColunaInscricaoMaker } from '../../model/literal/lit-coluna-inscricao';
import { IResultadoInscricao } from '../../model/inscricao-resultado';
import { InscricoesIndexState } from '../../integrations/inscricoes-index-state';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { Constantes } from '../../model/constantes';

function InscricoesIndex() {
  const [selectedFiltros, setSelectedFiltros] = useState<string[]>([]);
  
  const { windowWidth } = useWindowDimensions();
  // Filtros avançados
  let possiveisFiltros: string[] = []
  possiveisFiltros = LitColunaInscricaoMaker.Todos.map(x => x.descricao);
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
  const [tipoDataIncioEscolhido, setTipoDataIncioEscolhido] = useState('data-inicio-exata');
  const [isOpcoesDataOpen, setIsOpcoesDataOpen] = useState(false);
  const handleDataInicioSelect = (value: string) => {
    setTipoDataIncioEscolhido(value);
    if (value == 'data-inicio-intervalo-auto')
      setIsOpcoesDataOpen(true);
  }
    
  // Ordenação
  let possiveisOrdenacoes = [{ value: '', label: 'Nada' }];
  for (let iPossivelFiltro of possiveisFiltros) {
    possiveisOrdenacoes.push({ value: iPossivelFiltro + '--asc', label: iPossivelFiltro + " Crescente" });
    possiveisOrdenacoes.push({ value: iPossivelFiltro + '--desc', label: iPossivelFiltro + " Decrescente" });
  }
    
  // Resultados e Paginação default
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
      title: LitColunaInscricaoMaker.NomeCurso.descricao,
      dataIndex: LitColunaInscricaoMaker.NomeCurso.nomePropriedade,
      key: LitColunaInscricaoMaker.NomeCurso.nomePropriedade,
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
    <NavigationWrapper>
      <div className="half-padding">
        <div className="half-padding">
          <Typography.Title level={3}>Inscrições nos Cursos</Typography.Title>
        </div>
        
        {/* Pesquisa */}
        {!estaMostrandoFiltrosAvancados && <div className='half-padding'>
          <Input placeholder="Termos" prefix={<SearchOutlined/>} />
        </div>}
        <div className='half-padding'>
          <Collapse onChange={handleChangeActivePanels} defaultActiveKey={estaMostrandoFiltrosAvancados ? ["filtros-avancados"] : []}>
            <Collapse.Panel header="Filtros Avançados" key="filtros-avancados" >
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
                {selectedFiltros.includes(LitColunaInscricaoMaker.NomeAluno.descricao) && <div className="half-padding">
                  <Input placeholder="Nome do Aluno" />
                </div>}
                {selectedFiltros.includes(LitColunaInscricaoMaker.RAAluno.descricao) && <div className="half-padding">
                  <Input placeholder="RA do Aluno" />
                </div>}
                {selectedFiltros.includes(LitColunaInscricaoMaker.NomeCurso.descricao) && <div className="half-padding">
                  <Input placeholder="Nome do Curso" />
                </div>}
                {selectedFiltros.includes(LitColunaInscricaoMaker.DataInicio.descricao) && <>
                  <div className="inscricoes-index-filtro-avancado">
                    <div className="half-padding">
                      <Typography.Text>Data de Início</Typography.Text>
                    </div>
                    <div className='half-padding'>
                      <Select
                        defaultValue=""
                        style={{ width: 160 }}
                        options={[
                          { value: 'data-inicio-exata', label: 'Exata' },
                          { value: 'data-inicio-intervalo', label: 'Intervalo' },
                          { value: 'data-inicio-intervalo-auto', label: 'Intervalo Automático' },
                        ]}
                        onChange={handleDataInicioSelect}
                        value={tipoDataIncioEscolhido}
                      />
                    </div>
                  </div>
                  <div className="inscricoes-index-filtro-avancado">
                    <div className="half-padding">
                      {tipoDataIncioEscolhido == 'data-inicio-exata' ?
                        <DatePicker placeholder="Selecione..." /> :
                        <DatePicker placeholder="De" />}
                    </div>
                    {tipoDataIncioEscolhido != 'data-inicio-exata' && <div className='half-padding'>
                      <DatePicker placeholder="Até" />
                    </div>}
                  </div>
                  
                </>}
              </div>
            </Collapse.Panel>
          </Collapse>
        </div>
        
        {/* Ordenar por */}
        <div className="inscricoes-index-filtro-avancado">
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
                  <span className='card-text-size'><strong>Nome do Curso</strong>: {xInscricao.nomeCurso}</span>
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
      
      <Modal open={isOpcoesDataOpen} footer={null} closable={true} onCancel={() => setIsOpcoesDataOpen(false)}>
        <div className="half-padding">
          <div className="half-padding">
            <Typography.Title level={5}>Escolha o intervalo automático</Typography.Title>
          </div>
          
          <Radio.Group onChange={() => setIsOpcoesDataOpen(false)} className="inscricoes-index-opcoes-data half-padding">
            <Radio value={1} className="half-padding">Últimos 7 dias</Radio>
            <Radio value={2} className="half-padding">Últimos 30 dias</Radio>
            <Radio value={3} className="half-padding">Esta Semana</Radio>
            <Radio value={4} className="half-padding">Este mês</Radio>
          </Radio.Group>
          <div className="inscricoes-index-botoes-modal">
            <div className="half-padding" >
              <Button shape="round" onClick={() => setIsOpcoesDataOpen(false)} icon={<ArrowLeftOutlined/>}>Voltar</Button>
            </div>
          </div>
        </div>
      </Modal>
    </NavigationWrapper>
  )
}

export default InscricoesIndex;
