import { useState } from 'react';
import './UsuariosIndex.css';
import { LitPerfilMaker } from '../../model/literal/lit-perfil';
import type { LitPerfilSigla } from '../../model/literal/lit-perfil';
import NavigationWrapper from '../_navigation/NavigationWrapper';
import { Typography, Button, Switch, Dropdown, Empty } from 'antd';
import { MoreOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { LitColunaUsuarioMaker } from '../../model/literal/lit-coluna-usuario';
import { LitSexoMaker } from '../../model/literal/lit-sexo';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import { Constantes } from '../../model/constantes';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import GetUserDto from '../../services/UserService/dto/GetUserDto';
import GenericPagingDto from '../../services/GenericDto/GenericPagingDto';
import UserFilterParamsDto from '../../services/UserService/dto/UserFilterParamsDto';
import DataTable from '../../_commons/DataTable/DataTable';
import UserService from '../../services/UserService/UserService';
import { useInterval } from '../../hooks/useInterval';
import { toast } from 'react-toastify';
import { toastError, toastOptions } from '../../misc/utils/utils';
import Maqui_Ordenar_Por from '../../_commons/MaquiExhibitionOptions/Maqui_Ordenar_Por';
import Maqui_Filtro_Termos from '../../_commons/MaquiTermsFilter/Maqui_Filtro_Termos';
import Maqui_Filtro_Avancado_Texto from '../../_commons/MaquiAdvancedFilter/Maqui_Filtro_Avancado_Texto';
import Maqui_Filtro_Avancado_Literal from '../../_commons/MaquiAdvancedFilter/Maqui_Filtro_Avancado_Literal';
import Maqui_Filtro_Avancado_Logico from '../../_commons/MaquiAdvancedFilter/Maqui_Filtro_Avancado_Logico';
import Maqui_Filtro_Avancado_Wrapper from '../../_commons/MaquiAdvancedFilter/Maqui_Filtro_Avancado_Wrapper';
import ModalConfirm from '../../_commons/ModalConfirm/ModalConfirm';
import { useNavigate } from 'react-router-dom';

const REFRESH_USERS_INTERVAL = 1000 * 30;

function UsuariosIndex(props: { siglaPerfil: LitPerfilSigla }) {

  const [userResult, setUserResult] = useState({} as GenericPagingDto<GetUserDto>);
  const [user, setUser] = useState({} as GetUserDto)
  const [filterParams, setFilterParams] = useState<UserFilterParamsDto>(new UserFilterParamsDto());
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const litPerfil = LitPerfilMaker.PorSiglaOrNull(props.siglaPerfil);
  const [selectedFiltros, setSelectedFiltros] = useState<string[]>([]);
  // const [isExcluirModalOpen, setIsExcluirModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { windowWidth } = useWindowDimensions();

  const userService = new UserService();

  useInterval(() => {
    getUsers();
  }, REFRESH_USERS_INTERVAL);

  const getUsers = async (_page: number = page, _perPage: number = perPage) => {
    setPage(_page);
    setPerPage(_perPage);
    setIsLoading(true);
    try {
      const _userResult = await userService.getUsers(
        { ...filterParams, perfil: litPerfil?.sigla || '' },
        _page, _perPage
      );
      setUserResult(_userResult);
    }
    catch (err: any) {
      toast.error(toastError(err), toastOptions(toast));
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await userService.deleteUser(user.I_Cod_Usuario);
      toast.success(`Usuário - "${user.s_Nome}" removido com sucesso`, toastOptions(toast));
      getUsers();
      setIsExcluirModalOpen(false);
    }
    catch (err: any) {
      toast.error(toastError(err), toastOptions(toast));
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleSearch = () => {
    getUsers(1, 5);
  }

  const handleChange = (ev: any) => {
    setFilterParams({ ...filterParams, [ev.target.name]: ev.target.value });
  }

  const choiceUser = () => {
    switch (props.siglaPerfil.toLocaleUpperCase().trim()) {
      case 'A': return 'alunos';
      case 'S': return 'secretarios';
      default: return 'professors';
    }
  }

  const handleAdd = () => {
    setUser({} as GetUserDto);
    navigate(`/${choiceUser()}/inserir`);
  }

  const handleEdit = (rowData: GetUserDto) => {
    navigate(`/${choiceUser()}/alterar`, { state: { course: rowData } });
  }

  const handleRemove = (rowData: GetUserDto) => {
    setUser(rowData);
    setIsExcluirModalOpen(true);
  }

  let todosPossiveisFiltros = LitColunaUsuarioMaker.Todos;

  if (props.siglaPerfil !== 'A') {
    todosPossiveisFiltros = LitColunaUsuarioMaker.removerPropriedade('s_RA');
  }

  // Filtros avançados
  let possiveisFiltros: string[] = []
  if (windowWidth <= Constantes.WidthMaximoMobile)
    possiveisFiltros = [LitColunaUsuarioMaker.Nome.descricao, LitColunaUsuarioMaker.RA.descricao];
  else
    possiveisFiltros = LitColunaUsuarioMaker.Todos.map(x => x.descricao);
  if (props.siglaPerfil !== 'A') {
    possiveisFiltros = possiveisFiltros.filter(x => x !== LitColunaUsuarioMaker.RA.descricao);
    if (windowWidth <= Constantes.WidthMaximoMobile)
      possiveisFiltros.push(LitColunaUsuarioMaker.EAtivo.descricao);
  }

  const [estaMostrandoFiltrosAvancados, setEstaMostrandoFiltrosAvancados] = useState(false);
  const handleChangeActivePanels = (nextIsShowingAdvanced: boolean) => {
    setEstaMostrandoFiltrosAvancados(nextIsShowingAdvanced);
    if (!nextIsShowingAdvanced) {
      setFilterParams(new UserFilterParamsDto());
      setSelectedFiltros([]);
    } else {
      setFilterParams({ ...filterParams, isAdvancedSearch: true });
    }
  }
  // const handleCheckAvancado = (tag: string, checked: boolean) => {
  //   const nextSelectedTags = checked
  //     ? [...selectedFiltros, tag]
  //     : selectedFiltros.filter((t) => t !== tag);
  //   setSelectedFiltros(nextSelectedTags);
  // };

  // Resultados e Paginaçao default
  const [isExcluirModalOpen, setIsExcluirModalOpen] = useState(false);

  const renderItensMais = (rowData: GetUserDto) => {
    const itensMais: MenuProps['items'] = [
      {
        key: 'mais-alterar',
        label: (<a rel="noopener noreferrer">Alterar</a>),
        onClick: () => handleEdit(rowData)
      },
      {
        key: 'mais-excluir',
        label: (<a rel="noopener noreferrer"
          onClick={() => handleRemove(rowData)}>
          Excluir</a>),
      },
    ];
    return itensMais;
  }

  let columns: ColumnsType<GetUserDto> = [
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
      render: (text, rowData: GetUserDto, index) => {
        return (
          <Dropdown menu={{ items: renderItensMais(rowData) }} placement="bottomRight" arrow={{ pointAtCenter: true }}>
            <Button icon={<MoreOutlined />}></Button>
          </Dropdown>
        );
      },
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
        <Maqui_Filtro_Termos show={!estaMostrandoFiltrosAvancados} onChange={handleChange} />

        <Maqui_Filtro_Avancado_Wrapper
          allLabelNames={[...(todosPossiveisFiltros.map(x => x.descricao)) /*, 'Teste data' */ /*, 'Ativo' */ /*, 'Sexo' */]}
          selectedLabelNames={selectedFiltros}
          onChangeSelectedLabelNames={setSelectedFiltros}
          show={estaMostrandoFiltrosAvancados}
          onChangeShow={handleChangeActivePanels}
        >
          <>
            {selectedFiltros.includes('Nome') &&
              <Maqui_Filtro_Avancado_Texto
                selectedLabelNames={selectedFiltros}
                labelName={LitColunaUsuarioMaker.Nome.descricao}
                inputName='userName'
                onChange={handleChange}
                value={filterParams.userName}
              />}
            {selectedFiltros.includes('RA') &&
              <Maqui_Filtro_Avancado_Texto
                selectedLabelNames={selectedFiltros}
                labelName={LitColunaUsuarioMaker.RA.descricao}
                inputName='studantRa'
                onChange={handleChange}
                value={filterParams.studantRa}
              />}
            {selectedFiltros.includes('Sexo') &&
              <Maqui_Filtro_Avancado_Literal
                selectedLabelNames={selectedFiltros}
                labelName={LitColunaUsuarioMaker.Sexo.descricao}
                literalOptions={LitSexoMaker.TodosOptions}
                inputName='gender'
                onChange={handleChange}
                value={filterParams.gender ?? ''}
                selectMinWith={120}
              />}
            {selectedFiltros.includes('Nome da mãe') &&
              <Maqui_Filtro_Avancado_Texto
                selectedLabelNames={selectedFiltros}
                labelName={LitColunaUsuarioMaker.NomeMae.descricao}
                inputName='motherName'
                onChange={handleChange}
                value={filterParams.motherName}
              />}
            {selectedFiltros.includes('Ativo') &&
              <Maqui_Filtro_Avancado_Logico
                selectedLabelNames={selectedFiltros}
                labelName='Ativo'
                inputName='isActive'
                onChange={handleChange}
                value={filterParams.isActive ?? false}
              />}
          </>
        </Maqui_Filtro_Avancado_Wrapper>

        {/* Ordenar por */}
        <div className="usuarios-index-filtro-avancado">
          <div className='half-padding'>
            <Maqui_Ordenar_Por
              allColumns={todosPossiveisFiltros.map(x => ({ dbColumnName: x.nomePropriedade, description: x.descricao }))}
              onChangeFilterParams={setFilterParams}
              filterParams={filterParams}
              selectMinWith={256}
            />
          </div>
        </div>
        <div className='agrupar-horizontalmente'>
          <div className='half-padding'>
            <Button
              type="primary"
              shape="round"
              icon={<SearchOutlined />}
              onClick={handleSearch}
            >
              Pesquisar
            </Button>
          </div>
          <div className='half-padding'>
            <Button
              type="primary"
              shape="round"
              icon={<PlusOutlined />}
              onClick={handleAdd}
            >Inserir...
            </Button>
          </div>
        </div>

        {/* Resultados e Paginaçao default
                atributos visiveis pra mobile: nome; sexo, ativo e mais
                atributos visiveis pra desktop: nome; cpf; sexo; nome da mae; ativo; e mais */}
        <>{
          userResult?.result?.length ?
            <DataTable
              handleRowKey={(user: any) => user.I_Cod_Usuario}
              dataSource={userResult.result}
              columns={columns}
              getData={(_page: number | undefined, _perPage: number | undefined) => getUsers(_page, _perPage)}
              setDataResult={setUserResult}
              totalCount={userResult.paging?.totalCount}
              pagination
              isLoading={isLoading}
            /> :
            <Empty />
        }</>

      </div >
      <ModalConfirm
        openConfirm={isExcluirModalOpen}
        setOpenConfirm={setIsExcluirModalOpen}
        loading={isLoading}
        onAction={handleDelete}
      />
    </NavigationWrapper >
  )
}

export default UsuariosIndex;
