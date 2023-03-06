import React, { useState } from 'react';
import './UsuariosIndex.css';
import { LitPerfilMaker } from '../../model/literal/lit-perfil';
import type { LitPerfilSigla } from '../../model/literal/lit-perfil';
import NavigationWrapper from '../_navigation/NavigationWrapper';
import { Typography, Input, Collapse, Tag, Select, Button, Switch, Table, Dropdown, Modal, Pagination, Card, Col, Row, Spin } from 'antd';
import { ArrowLeftOutlined, DeleteFilled, MoreOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { LitColunaUsuario, LitColunaUsuarioMaker } from '../../model/literal/lit-coluna-usuario';
import type { ColumnsType } from 'antd/es/table';
import { IResultadoUsuario } from '../../model/usuario-resultado';
import { UsuariosIndexState } from '../../integrations/usuarios-index-state';
import type { MenuProps } from 'antd';
import { Constantes } from '../../model/constantes';
import useWindowDimensions from '../../hooks/useWindowDimensions';


function UsuariosIndex(props: { siglaPerfil: LitPerfilSigla }) {
  const litPerfil = LitPerfilMaker.PorSiglaOrNull(props.siglaPerfil);
  const [selectedFiltros, setSelectedFiltros] = useState<string[]>([]);
    
  const { windowWidth } = useWindowDimensions();
    
  // Filtros avançados
  let possiveisFiltros: string[] = []
  possiveisFiltros = LitColunaUsuarioMaker.Todos.map(x => x.descricao);
  if (props.siglaPerfil !== 'A') {
    possiveisFiltros = possiveisFiltros.filter(x => x !== LitColunaUsuarioMaker.RA.descricao);
  }
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
  let columns: ColumnsType<IResultadoUsuario> = [
    {
      title: LitColunaUsuarioMaker.Nome.descricao,
      dataIndex: LitColunaUsuarioMaker.Nome.nomePropriedade,
      key: LitColunaUsuarioMaker.Nome.nomePropriedade,
    },
    {
      title: LitColunaUsuarioMaker.RA.descricao,
      dataIndex: LitColunaUsuarioMaker.RA.nomePropriedade,
      key: LitColunaUsuarioMaker.RA.nomePropriedade,
    },
    {
      title: LitColunaUsuarioMaker.Sexo.descricao,
      dataIndex: LitColunaUsuarioMaker.Sexo.nomePropriedade,
      key: LitColunaUsuarioMaker.Sexo.nomePropriedade,
    },
    {
      title: LitColunaUsuarioMaker.NomeMae.descricao,
      dataIndex: LitColunaUsuarioMaker.NomeMae.nomePropriedade,
      key: LitColunaUsuarioMaker.NomeMae.nomePropriedade,
    },
    {
      title: LitColunaUsuarioMaker.EAtivo.descricao,
      dataIndex: LitColunaUsuarioMaker.EAtivo.nomePropriedade,
      key: LitColunaUsuarioMaker.EAtivo.nomePropriedade,
      render: (eAtivo: boolean) => <Switch disabled={true} defaultChecked={eAtivo}></Switch>
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
          <Typography.Title level={3}>{litPerfil?.tituloH3Index}</Typography.Title>
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
                {selectedFiltros.includes('Nome') && <div className="half-padding">
                  <Input placeholder="Nome" />
                </div>}
                {selectedFiltros.includes('RA') && <div className="half-padding">
                  <Input placeholder="RA" />
                </div>}
                {selectedFiltros.includes('Sexo') && <div className="usuarios-index-filtro-avancado">
                  <div className='half-padding'>
                    <Typography.Text>Sexo</Typography.Text>
                  </div>
                  <div className='half-padding'>
                    <Select
                      defaultValue=""
                      style={{ width: 120 }}
                      options={[
                        { value: '', label: 'Selecione...' },
                        { value: 'M', label: 'Masculino' },
                        { value: 'F', label: 'Feminino' },
                      ]} 
                    />
                  </div>
                </div>}
                {selectedFiltros.includes('Nome da mãe') && <div className="half-padding">
                  <Input placeholder="Nome da mãe" />
                </div>}
                {selectedFiltros.includes('Ativo') && <div className="usuarios-index-filtro-avancado">
                  <div className='half-padding'>
                    <Switch />
                  </div>
                  <div className='half-padding'>
                    <Typography.Text>Ativo</Typography.Text>
                  </div>
                </div>}
              </div>
            </Collapse.Panel>
          </Collapse>
        </div>
        
        {/* Ordenar por */}
        <div className="usuarios-index-filtro-avancado">
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
            {UsuariosIndexState.usuariosApresentados.map(xUsuario => <Col span={12} className="half-padding">
              <Card title={<div className="usuarios-index-botoes-modal">
                  <Dropdown menu={{ items: itensMais }} placement="bottomRight" arrow={{ pointAtCenter: true }}>
                    <Button icon={<MoreOutlined />}></Button>
                  </Dropdown>
                </div>}
                bodyStyle={{ padding: "6px" }}
                headStyle={{ paddingRight: "12px" }}>
                
                <div className='half-padding'>
                  <span className='card-text-size'><strong>Nome</strong>: {xUsuario.nome}</span>
                </div>
                <div className='half-padding'>
                  <span className='card-text-size'><strong>RA</strong>: {xUsuario.ra}</span>
                </div>
                <div className='half-padding'>
                  <span className='card-text-size'><strong>Sexo</strong>: {xUsuario.sexo == 'M' ? 'Masculino' : 'Feminino'}</span>
                </div>
                <div className='half-padding'>
                  <span className='card-text-size'><strong>Nome da mãe</strong>: {xUsuario.nomeMae}</span>
                </div>
                <div className='half-padding usuarios-index-filtro-avancado'>
                  <span className='card-text-size'><strong>Ativo</strong>: <Switch disabled={true} defaultChecked={xUsuario.eAtivo}></Switch></span>
                </div>
                
              </Card>
              
            </Col>)}
          </Row> :
          <Table dataSource={UsuariosIndexState.usuariosApresentados} columns={columns} />}
        
        {windowWidth <= Constantes.WidthMaximoMobile && <div className='usuarios-index-botoes-modal'>
          <Pagination total={UsuariosIndexState.usuariosApresentados.length} defaultCurrent={1} />
        </div>}
        
      </div>
      <Modal open={isExcluirModalOpen} footer={null} closable={true} onCancel={() => setIsExcluirModalOpen(false)}>
        <div className="half-padding">
          {UsuariosIndexState.estaCarregandoSePodeExcluir && <>
            <div className="half-padding" >
              <Spin /> 
            </div>
          </>}
          {(!UsuariosIndexState.estaCarregandoSePodeExcluir && UsuariosIndexState.podeExcluir) && <>
            <div className="half-padding">
              <Typography.Title level={5}>Deseja excluir o {litPerfil?.tituloH3ManterUm}? A ação não pode ser desfeita.</Typography.Title>
            </div>
            <div className="usuarios-index-botoes-modal">
              <div className="half-padding" >
                <Button shape="round" onClick={() => setIsExcluirModalOpen(false)} icon={<ArrowLeftOutlined/>}>Voltar</Button>
              </div>
              <div className="half-padding" >
                <Button danger type="primary" shape="round" icon={<DeleteFilled/>}>Excluir</Button>
              </div>
            </div>
          </>}
          {(!UsuariosIndexState.estaCarregandoSePodeExcluir && !UsuariosIndexState.podeExcluir) && <>
            <div className="half-padding">
              <Typography.Title level={5}>Não é possível excluir um aluno enquanto ele tiver inscrições.</Typography.Title>
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

export default UsuariosIndex;
