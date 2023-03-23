import { useEffect, useState } from 'react';
import './CursosIndex.css';
import NavigationWrapper from '../_navigation/NavigationWrapper';
import { Typography, Input, Collapse, Tag, Select, Button, Table, Dropdown, Modal, InputNumber } from 'antd';
import { ArrowLeftOutlined, DeleteFilled, MoreOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import { LitColunaCursoMaker } from '../../model/literal/lit-coluna-curso';
import CourseService from '../../services/CourseService/CourseService';
import CourseFilterParamsDto from '../../services/CourseService/dto/CourseFilterParamsDto';
import GetCourseDto from '../../services/CourseService/dto/GetCourseDto';
import GenericPagingDto from '../../services/GenericDto/GenericPagingDto';
import { toast } from 'react-toastify';
import { toastError, toastOptions } from '../../misc/utils/utils';
import DataTable from '../../_commons/DataTable/DataTable';
import { useNavigate } from 'react-router-dom';
import ModalConfirm from '../../_commons/ModalConfirm/ModalConfirm';
import Maqui_Filtro_Termos from '../../_commons/MaquiTermsFilter/Maqui_Filtro_Termos';
import Maqui_Filtro_Avancado_Wrapper from '../../_commons/MaquiAdvancedFilter/Maqui_Filtro_Avancado_Wrapper';
import Maqui_Filtro_Avancado_Texto from '../../_commons/MaquiAdvancedFilter/Maqui_Filtro_Avancado_Texto';
import Maqui_Filtro_Avancado_InteiroOuDecimal from '../../_commons/MaquiAdvancedFilter/Maqui_Filtro_Avancado_InteiroOuDecimal';
import Maqui_Filtro_Avancado_Data from '../../_commons/MaquiAdvancedFilter/Maqui_Filtro_Avancado_Data';

function CursosIndex() {

  const [courseResult, setCourseResult] = useState({} as GenericPagingDto<GetCourseDto>);
  const [course, setCourse] = useState({} as GetCourseDto)
  const [filterParams, setFilterParams] = useState<CourseFilterParamsDto>(new CourseFilterParamsDto());
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [selectedFiltros, setSelectedFiltros] = useState<string[]>([]);
  const possiveisFiltros = LitColunaCursoMaker.Todos;
  const [estaMostrandoFiltrosAvancados, setEstaMostrandoFiltrosAvancados] = useState(false);
  const [semesterLimitQtdeType, setSemesterLimitQtdeType] = useState('exact');
  const [testDateType, setTestDateType] = useState('exact');
  const handleChangeActivePanels = (nextIsShowingAdvanced: boolean) => {
    setEstaMostrandoFiltrosAvancados(nextIsShowingAdvanced);
    if (!nextIsShowingAdvanced) {
      
      setFilterParams({
        ...filterParams,
        isAdvancedSearch: false,
        courseName: '',
        semesterLimitQtdeAte: null,
        semesterLimitQtdeDe: null,
        semesterLimitQtdeExact: null
      });
      setSemesterLimitQtdeType('exact');
      setSelectedFiltros([]);
    } else {
      setFilterParams({ ...filterParams, isAdvancedSearch: true });

    }
  }
  const [isExcluirModalOpen, setIsExcluirModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const { state, dispatch } = useContext(AppContext);

  const navigate = useNavigate();

  const courseService = new CourseService();

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async (_page: number = page, _perPage: number = perPage) => {
    setPage(_page);
    setPerPage(_perPage);
    setIsLoading(true);
    try {
      const _courseResult = await courseService.getCourses(filterParams, _page, _perPage);
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
    getCourses(1, 5);
  }

  const handleChange = (ev: any) => {
    setFilterParams({ ...filterParams, [ev.target.name]: ev.target.value });
  }

  const handleAdd = () => {
    setCourse({} as GetCourseDto);
    navigate('/cursos/inserir');
  }

  const handleEdit = (rowData: GetCourseDto) => {
    navigate('/cursos/alterar', { state: { course: rowData } });
  }

  const handleRemove = (rowData: GetCourseDto) => {
    setCourse(rowData);
    setIsExcluirModalOpen(true);
  }

  // Ordenaçao
  let possiveisOrdenacoes = [{ value: '', label: 'Nada' }];
  for (let iPossivelFiltro of possiveisFiltros) {
    possiveisOrdenacoes.push({ value: iPossivelFiltro.value + '--asc', label: iPossivelFiltro.descricao + " Crescente" });
    possiveisOrdenacoes.push({ value: iPossivelFiltro.value + '--desc', label: iPossivelFiltro.descricao + " Decrescente" });
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
      title: 'Nome',
      dataIndex: 's_Nome',
      key: 's_Nome',
    },
    {
      title: 'Limite de Semestres',
      dataIndex: 'i_Qtd_Limite_Semestres',
      key: 'i_Qtd_Limite_Semestres',
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
          allLabelNames={[...(possiveisFiltros.map(x => x.descricao)) /*, 'Teste data' */]}
          selectedLabelNames={selectedFiltros}
          onChangeSelectedLabelNames={setSelectedFiltros}
          show={estaMostrandoFiltrosAvancados}
          onChangeShow={handleChangeActivePanels} >
          <>
            <Maqui_Filtro_Avancado_Texto
              selectedLabelNames={selectedFiltros}
              labelName={LitColunaCursoMaker.Nome.descricao}
              inputName='courseName'
              onChange={handleChange}
              value={filterParams.courseName} />
            <Maqui_Filtro_Avancado_InteiroOuDecimal
              eTipoInteiro={true}
              selectedLabelNames={selectedFiltros}
              labelName={LitColunaCursoMaker.QtdLimiteSemestres.descricao}
              inputNameBasis='semesterLimitQtde'
              onChangeType={setSemesterLimitQtdeType}
              typeValue={semesterLimitQtdeType}
              onChangeFilterParams={setFilterParams}
              filterParams={filterParams}
              selectMinWidth={160} />
              {/*<Maqui_Filtro_Avancado_Data
                selectedLabelNames={selectedFiltros}
                labelName='Teste data'
                inputNameBasis='testDate'
                onChangeType={setTestDateType}
                typeValue={testDateType}
                onChangeFilterParams={setFilterParams}
                filterParams={filterParams}
                selectMinWidth={160}
/>*/}
          </>
        </Maqui_Filtro_Avancado_Wrapper>
        
        <div className="cursos-index-filtro-avancado">
          <div className='half-padding'>
            <Typography.Text>Ordenar por</Typography.Text>
          </div>
          <div className='half-padding'>
            <Select
              style={{ width: 256 }}
              options={possiveisOrdenacoes}
              onChange={(value: string) => setFilterParams({ ...filterParams, fieldOrderLabel: value })}
              value={filterParams.fieldOrderLabel}
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
        <DataTable
          handleRowKey={(course: any) => course.i_Cod_Curso}
          dataSource={courseResult.result}
          columns={columns}
          getData={(_page: number | undefined, _perPage: number | undefined) => getCourses(_page, _perPage)}
          setDataResult={setCourseResult}
          totalCount={courseResult.paging?.totalCount}
          pagination
          isLoading={isLoading}
        />

      </div>

      <ModalConfirm
        openConfirm={isExcluirModalOpen}
        setOpenConfirm={setIsExcluirModalOpen}
        loading={isLoading}
        onAction={handleDelete}
      />

    </NavigationWrapper>
  )
}

export default CursosIndex;
