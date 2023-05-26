import { useEffect, useState } from 'react';
import './CursosIndex.css';
import NavigationWrapper from '../_navigation/NavigationWrapper';
import { Typography, Button, Dropdown, Card, Col, Row, Pagination, Empty } from 'antd';
import { MoreOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import { LitColunaCursoMaker } from '../../model/literal/lit-coluna-curso';
import CourseService from '../../services/CourseService/CourseService';
import CourseFilterParamsDto from '../../services/CourseService/dto/CourseFilterParamsDto';
import GetCourseDto from '../../services/CourseService/dto/GetCourseDto';
import GenericPagingDto from '../../services/GenericDto/GenericPagingDto';
import { toast } from 'react-toastify';
import { toNullUTCLocaleDateString, toastError, toastOptions } from '../../misc/utils/utils';
import DataTable from '../../_commons/DataTable/DataTable';
import { useNavigate } from 'react-router-dom';
import ModalConfirm from '../../_commons/ModalConfirm/ModalConfirm';
import Maqui_Filtro_Termos from '../../_commons/MaquiTermsFilter/Maqui_Filtro_Termos';
import Maqui_Filtro_Avancado_Wrapper from '../../_commons/MaquiAdvancedFilter/Maqui_Filtro_Avancado_Wrapper';
import Maqui_Filtro_Avancado_Texto from '../../_commons/MaquiAdvancedFilter/Maqui_Filtro_Avancado_Texto';
import Maqui_Filtro_Avancado_InteiroOuDecimal from '../../_commons/MaquiAdvancedFilter/Maqui_Filtro_Avancado_InteiroOuDecimal';
import Maqui_Ordenar_Por from '../../_commons/MaquiExhibitionOptions/Maqui_Ordenar_Por';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { Constantes } from '../../model/constantes';
import { useInterval } from '../../hooks/useInterval';
import Maqui_Filtro_Avancado_Data from '../../_commons/MaquiAdvancedFilter/Maqui_Filtro_Avancado_Data';
import PostCourseDto from '../../services/CourseService/dto/PostCourseDto';

const REFRESH_CURSOS_INTERVAL = 1000 * 30;
const PER_PAGE = 50;

function CursosIndex() {

  const [courseResult, setCourseResult] = useState([] as GetCourseDto[]);
  const [course, setCourse] = useState({} as GetCourseDto)
  const [filterParams, setFilterParams] = useState<CourseFilterParamsDto>(new CourseFilterParamsDto());
  const [selectedFiltros, setSelectedFiltros] = useState<string[]>([]);
  const [estaMostrandoFiltrosAvancados, setEstaMostrandoFiltrosAvancados] = useState(false);
  const [priceType, setPriceType] = useState('exact');
  const [nextClassroomStartDateType, setNextClassroomStartDateType] = useState('exact');
  const handleChangeActivePanels = (nextIsShowingAdvanced: boolean) => {
    setEstaMostrandoFiltrosAvancados(nextIsShowingAdvanced);
    if (!nextIsShowingAdvanced) {

      setFilterParams({
        ...filterParams,
        isAdvancedSearch: false,
        serial: '',
        name: '',
        priceAte: null,
        priceDe: null,
        priceExact: null,
        nextClassroomStartDateAte: null,
        nextClassroomStartDateDe: null,
        nextClassroomStartDateExact: null,
      });
      setPriceType('exact');
      setSelectedFiltros([]);
    } else {
      setFilterParams({ ...filterParams, isAdvancedSearch: true });

    }
  }
  const [isExcluirModalOpen, setIsExcluirModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const { state, dispatch } = useContext(AppContext);

  const navigate = useNavigate();
  const { windowWidth } = useWindowDimensions();

  const courseService = new CourseService();

  useInterval(() => {
    getCourses();
  }, REFRESH_CURSOS_INTERVAL);

  useEffect(() => {
    getCourses();
  }, [])

  const getCourses = async (_perPage: number = PER_PAGE) => {
    setIsLoading(true);
    try {
      const _courseResult = await courseService.getCourses(filterParams, _perPage);
      setCourseResult(_courseResult);
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
      await courseService.deleteCourse(course.i_Cod_Curso);
      toast.success(`Curso - "${course.s_Nome}" removido com sucesso`, toastOptions(toast));
      getCourses();
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
    getCourses();
  }

  const handleChange = (ev: any) => {
    setFilterParams({ ...filterParams, [ev.target.name]: ev.target.value });
  }

  const handleAdd = () => {
    setCourse({} as GetCourseDto);
    navigate('/cursos/inserir');
  }

  const handleEdit = async (rowData: GetCourseDto) => {
    setIsLoading(true);
    try {
      const detailedRow = await courseService.getCourseById(course.i_Cod_Curso);
      setIsLoading(false);
      navigate('/cursos/alterar', { state: { course: detailedRow } });
    }
    catch (err: any) {
      setIsLoading(false);
      toast.error(toastError(err), toastOptions(toast));
    }
  }

  const handleRemove = (rowData: GetCourseDto) => {
    setCourse(rowData);
    setIsExcluirModalOpen(true);
  }

  // Resultados e Paginaçao default

  const renderItensMais = (rowData: GetCourseDto) => {
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

  let columns: ColumnsType<GetCourseDto> = [
    {
      title: 'Sequencial',
      dataIndex: 's_Sequencial',
      key: 's_Sequencial',
    },
    {
      title: 'Nome',
      dataIndex: 's_Nome',
      key: 's_Nome',
    },
    {
      title: 'Valor',
      dataIndex: 'f_Valor',
      key: 'f_Valor',
    },
    {
      title: 'Próxima Turma',
      key: 'dataInicioProximaTurma',
      dataIndex: 'dataInicioProximaTurma',
      render: (text, rowData: GetCourseDto, index) => {
        return (
          <span>
            {toNullUTCLocaleDateString(rowData.dataInicioProximaTurma) ?? 'Não Disp.'}
          </span>
        );
      },
    },
    {
      title: '#',
      key: 'mais',
      dataIndex: 'mais',
      render: (text, rowData: GetCourseDto, index) => {
        return (
          <Dropdown menu={{ items: renderItensMais(rowData) }} placement="bottomRight" arrow={{ pointAtCenter: true }}>
            <Button icon={<MoreOutlined />}></Button>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <NavigationWrapper>
      <div className="half-padding">
        <div className="half-padding">
          <Typography.Title level={3}>Cursos</Typography.Title>
        </div>
        <Maqui_Filtro_Termos show={!estaMostrandoFiltrosAvancados} onChange={handleChange} />
        <Maqui_Filtro_Avancado_Wrapper
          allLabelNames={[...(LitColunaCursoMaker.Todos.map(x => x.descricao))]}
          selectedLabelNames={selectedFiltros}
          onChangeSelectedLabelNames={setSelectedFiltros}
          show={estaMostrandoFiltrosAvancados}
          onChangeShow={handleChangeActivePanels}
        >
          <>
            <Maqui_Filtro_Avancado_Texto
              selectedLabelNames={selectedFiltros}
              labelName={LitColunaCursoMaker.Sequencial.descricao}
              inputName='serial'
              onChange={handleChange}
              value={filterParams.serial} />
            <Maqui_Filtro_Avancado_Texto
              selectedLabelNames={selectedFiltros}
              labelName={LitColunaCursoMaker.Nome.descricao}
              inputName='name'
              onChange={handleChange}
              value={filterParams.name} />
            <Maqui_Filtro_Avancado_InteiroOuDecimal
              eTipoInteiro={false}
              selectedLabelNames={selectedFiltros}
              labelName={LitColunaCursoMaker.Valor.descricao}
              inputNameBasis='price'
              onChangeType={setPriceType}
              typeValue={priceType}
              onChangeFilterParams={setFilterParams}
              filterParams={filterParams}
              selectMinWidth={160} />
            <Maqui_Filtro_Avancado_Data
              selectedLabelNames={selectedFiltros}
              labelName={LitColunaCursoMaker.ProximaTurma.descricao}
              inputNameBasis='nextClassroomStartDate'
              onChangeType={setNextClassroomStartDateType}
              typeValue={nextClassroomStartDateType}
              onChangeFilterParams={setFilterParams}
              filterParams={filterParams}
              selectMinWidth={200} />
          </>
        </Maqui_Filtro_Avancado_Wrapper>

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


        {courseResult?.length ?
          <>
            { windowWidth <= Constantes.WidthMaximoMobile ? /* Caso nao houver nenhum resultado e estiver no mobile, mostrar o mesmo "No Data" da versão pra PC */
              <Row>
                {courseResult.map(xCurso => <Col span={12} className="half-padding">
                  <Card title={<div className="cursos-index-botoes-modal">
                    <Dropdown menu={{ items: renderItensMais(xCurso) }} placement="bottomRight" arrow={{ pointAtCenter: true }}>
                      <Button icon={<MoreOutlined />}></Button>
                    </Dropdown>
                  </div>}
                    bodyStyle={{ padding: "6px" }}
                    headStyle={{ paddingRight: "12px" }}>

                    <div className='half-padding'>
                      <span className='card-text-size'><strong>Nome</strong>: {xCurso.s_Nome}</span>
                    </div>
                  </Card>

                </Col>)}
              </Row> :
                <DataTable
                  handleRowKey={(course: any) => course.i_Cod_Curso}
                  dataSource={courseResult}
                  columns={columns}
                  getData={(_page: number | undefined, _perPage: number | undefined) => getCourses(_perPage)}
                  setDataResult={setCourseResult}
                  totalCount={courseResult.length}
                  pagination
                  isLoading={isLoading}
                />
            }
          </> :
          <Empty />
        }

        {windowWidth <= Constantes.WidthMaximoMobile && courseResult?.length && <div className='usuarios-index-botoes-modal'>
          <Pagination total={courseResult.length} defaultCurrent={1} />
        </div>}

      </div>

      <ModalConfirm
        openConfirm={isExcluirModalOpen}
        setOpenConfirm={setIsExcluirModalOpen}
        loading={isLoading}
        onAction={handleDelete}
        isAllowed={true}
        isAllowedLabel="Deseja excluir o Curso? A ação não pode ser desfeita"
        isNotAllowedLabel=""
      />

    </NavigationWrapper>
  )
}

export default CursosIndex;
