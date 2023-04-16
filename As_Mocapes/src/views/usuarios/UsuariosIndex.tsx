import React, { useEffect, useState } from 'react';
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
import Maqui_Filtro_Termos from '../_commons/MaquiTermsFilter/Maqui_Filtro_Termos';
import Maqui_Filtro_Avancado_Wrapper from '../_commons/MaquiAdvancedFilter/Maqui_Filtro_Avancado_Wrapper';
import Maqui_Filtro_Avancado_Texto from '../_commons/MaquiAdvancedFilter/Maqui_Filtro_Avancado_Texto';
import Maqui_Filtro_Avancado_Literal from '../_commons/MaquiAdvancedFilter/Maqui_Filtro_Avancado_Literal';
import Maqui_Filtro_Avancado_Logico from '../_commons/MaquiAdvancedFilter/Maqui_Filtro_Avancado_Logico';
import UserFilterParamsDto from '../../services/UserService/dto/UserFilterParamsDto';
import { LitSexoMaker } from '../../model/literal/lit-sexo';
import Maqui_Ordenar_Por from '../_commons/MaquiExhibitionOptions/Maqui_Ordenar_Por';
import Maqui_Botao_Lento from '../_commons/MaquiButton/Maqui_Botao_Lento';
import GetUserDto from '../../services/UserService/dto/GetUserDto';
import { useNavigate } from 'react-router-dom';


function UsuariosIndex(props: { siglaPerfil: LitPerfilSigla }) {
  const litPerfil = LitPerfilMaker.PorSiglaOrNull(props.siglaPerfil);
  const [user, setUser] = useState({} as GetUserDto)
  const [selectedFiltros, setSelectedFiltros] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [filterParams, setFilterParams] = useState<UserFilterParamsDto>(new UserFilterParamsDto());
  const handleChangeActivePanels = (next: boolean) => {
    setEstaMostrandoFiltrosAvancados(next);
    if (!next) {
      setFilterParams({
        ...filterParams,
        isAdvancedSearch: false,
        name: '',
        ra: '',
        genderAbbrev: null,
        motherName: '',
        isActive: null,
      });
      setSelectedFiltros([]);
    } else {
      setFilterParams({ ...filterParams, isAdvancedSearch: true });
    }
  }
  const [isExcluirModalOpen, setIsExcluirModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { windowWidth } = useWindowDimensions();
    
  // Filtros avançados
  let possiveisFiltros: LitColunaUsuario[] = [];
  possiveisFiltros = LitColunaUsuarioMaker.Todos;
  if (props.siglaPerfil !== 'A') {
    possiveisFiltros = possiveisFiltros.filter(x => x.nomePropriedade !== LitColunaUsuarioMaker.RA.nomePropriedade);
  }
  const [estaMostrandoFiltrosAvancados, setEstaMostrandoFiltrosAvancados] = useState(false);
  
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async (_page: number = page, _perPage: number = perPage) => {
    // Chamada para API
  }

  const handleDelete = async () => {
    // Chamada para API
  }

  const handleSearch = () => {
    getUsers(1, 5);
  }

  const handleChange = (ev: any) => {
    setFilterParams({ ...filterParams, [ev.target.name]: ev.target.value });
  }

  const handleAdd = () => {
    setUser({} as GetUserDto);
    navigate('/cursos/inserir');
  }

  const handleEdit = (rowData: IResultadoUsuario) => {
    navigate('/cursos/alterar', { state: { course: rowData } });
  }

  const handleOpenDelete = (rowData: IResultadoUsuario) => {
    //setUser(rowData);
    setIsExcluirModalOpen(true);
  }
    
  // Resultados e Paginaçao default
  const renderItensMais = (rowData: IResultadoUsuario) => {
    const itensMais: MenuProps['items'] = [
      {
        key: 'mais-alterar',
        label: (<a rel="noopener noreferrer">Alterar</a>),
        onClick: () => handleEdit(rowData)
      },
      {
        key: 'mais-excluir',
        label: (<a rel="noopener noreferrer"
          onClick={() => handleOpenDelete(rowData)}>
          Excluir</a>),
      },
    ]
    return itensMais;
  }
  
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
      render: (text, rowData: IResultadoUsuario, index) => {
        return (
          <Dropdown menu={{ items: renderItensMais(rowData) }} placement="bottomRight" arrow={{ pointAtCenter: true }}>
            <Button icon={<MoreOutlined />}></Button>
          </Dropdown>
        )
      },
    },
  ];
 
  columns = columns.filter(x => x.title == '#' || possiveisFiltros.some(y => y.descricao == x.title ?? ''));
    
  return (
    <NavigationWrapper>
      <div className="half-padding">
        <div className="half-padding">
          <Typography.Title level={3}>{litPerfil?.tituloH3Index}</Typography.Title>
        </div>
        
        {/* Pesquisa */}
        
        <Maqui_Filtro_Termos show={!estaMostrandoFiltrosAvancados} onChange={(_ev: any) => {}} />
        <Maqui_Filtro_Avancado_Wrapper
          allLabelNames={possiveisFiltros.map(x => x.descricao)}
          selectedLabelNames={selectedFiltros}
          onChangeSelectedLabelNames={setSelectedFiltros}
          show={estaMostrandoFiltrosAvancados}
          onChangeShow={handleChangeActivePanels} >
          <>
            <Maqui_Filtro_Avancado_Texto
              selectedLabelNames={selectedFiltros}
              labelName={LitColunaUsuarioMaker.Nome.descricao}
              inputName='name'
              onChange={handleChange}
              value={filterParams.name} />
            <Maqui_Filtro_Avancado_Texto
              selectedLabelNames={selectedFiltros}
              labelName={LitColunaUsuarioMaker.RA.descricao}
              inputName='ra'
              onChange={handleChange}
              value={filterParams.ra} />
            <Maqui_Filtro_Avancado_Literal
              selectedLabelNames={selectedFiltros}
              labelName={LitColunaUsuarioMaker.Sexo.descricao}
              literalOptions={LitSexoMaker.TodosOptions}
              inputName='genderAbbrev'
              onChange={handleChange}
              value={filterParams.genderAbbrev ?? ''}
              selectMinWith={120} />
            <Maqui_Filtro_Avancado_Texto
              selectedLabelNames={selectedFiltros}
              labelName={LitColunaUsuarioMaker.NomeMae.descricao}
              inputName='motherName'
              onChange={handleChange}
              value={filterParams.motherName} />
            <Maqui_Filtro_Avancado_Logico
              selectedLabelNames={selectedFiltros}
              labelName={LitColunaUsuarioMaker.EAtivo.descricao}
              inputName='isActive'
              onChange={handleChange}
              value={filterParams.isActive ?? false} />
          </>  
        </Maqui_Filtro_Avancado_Wrapper>
        
        <Maqui_Ordenar_Por
          allColumns={possiveisFiltros.map(x => ({ dbColumnName: x.nomePropriedade, description: x.descricao }) )}
          onChangeFilterParams={setFilterParams}
          filterParams={filterParams}
          selectMinWith={256} />
        <div className='agrupar-horizontalmente'>
          <Maqui_Botao_Lento
            Rotulo_Botao='Pesquisar'
            Icone={<SearchOutlined/>}
            Carregando={false}
            Acao={handleSearch} />
          <div className='half-padding'>
            <Button
              type="primary"
              shape="round"
              icon={<PlusOutlined/>}
              onClick={handleAdd}>
              Inserir...
            </Button>
          </div>
        </div>
        
        {/* Resultados e Paginaçao default
                atributos visiveis pra mobile: nome; sexo, ativo e mais
                atributos visiveis pra desktop: nome; cpf; sexo; nome da mae; ativo; e mais */}
                
        {windowWidth <= Constantes.WidthMaximoMobile ?
          <Row>
            {UsuariosIndexState.usuariosApresentados.map(xUsuario => <Col span={12} className="half-padding">
              <Card title={<div className="usuarios-index-botoes-modal">
                  <Dropdown menu={{ items: renderItensMais(xUsuario) }} placement="bottomRight" arrow={{ pointAtCenter: true }}>
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
