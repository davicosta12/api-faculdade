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
  const handleChangeActivePanels = (activePanels: string | string[]) => {
    setEstaMostrandoFiltrosAvancados((_prev: boolean) => activePanels.length > 0);
    setFilterParams({ ...filterParams, isAdvancedSearch: activePanels.length > 0 });

    if (activePanels.length === 0) {
      setFilterParams({
        ...filterParams,
        courseName: '',
        semesterLimitQtdeAte: null,
        semesterLimitQtdeDe: null,
        semesterLimitQtdeExact: null
      });
      setSemesterLimitQtdeType('exact');
      setSelectedFiltros([]);
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

  const handleCheckAvancado = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedFiltros, tag]
      : selectedFiltros.filter((t) => t !== tag);
    setSelectedFiltros(nextSelectedTags);
  };

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

        {/* Pesquisa */}
        {!estaMostrandoFiltrosAvancados &&
          <div className='half-padding'>
            <Input placeholder="Termos" prefix={<SearchOutlined />} name='termsInput' onChange={handleChange} />
          </div>}
        <div className='half-padding'>
          <Collapse
            onChange={handleChangeActivePanels}
            defaultActiveKey={estaMostrandoFiltrosAvancados ? ["filtros-avancados"] : []}
          >
            <Collapse.Panel header="Filtros Avançados" key="filtros-avancados">
              <div className="half-padding">
                <div className="half-padding ">
                  {possiveisFiltros.map((obj) => (
                    <Tag.CheckableTag
                      key={obj.descricao}
                      checked={selectedFiltros.includes(obj.descricao)}
                      onChange={(checked) => handleCheckAvancado(obj.descricao, checked)}
                    >
                      {obj.descricao}
                    </Tag.CheckableTag>
                  ))}
                </div>
                {selectedFiltros.includes(LitColunaCursoMaker.Nome.descricao) &&
                  <div className="half-padding">
                    <Input
                      name='courseName'
                      value={filterParams.courseName}
                      placeholder="Nome"
                      onChange={handleChange}
                    />
                  </div>}
                {selectedFiltros.includes(LitColunaCursoMaker.QtdLimiteSemestres.descricao) && <div className="half-padding">
                  <div className="cursos-index-filtro-avancado">
                    <div className="half-padding">
                      <Typography.Text>Limite de Semestres</Typography.Text>
                    </div>
                    <div className='half-padding'>
                      <Select
                        style={{ width: 160 }}
                        options={[
                          { value: 'exact', label: 'Exato' },
                          { value: 'interval', label: 'Intervalo' },
                        ]}
                        onChange={(value: string) => {
                          setSemesterLimitQtdeType(value)

                          if (value === 'exact') {
                            setFilterParams({
                              ...filterParams,
                              semesterLimitQtdeDe: null,
                              semesterLimitQtdeAte: null
                            });
                          }
                          else if (value === 'interval') {
                            setFilterParams({
                              ...filterParams,
                              semesterLimitQtdeExact: null,
                            });
                          }
                        }}
                        value={semesterLimitQtdeType}
                      />
                    </div>
                  </div>
                  <div className="cursos-index-filtro-avancado">
                    <div className="half-padding">
                      {semesterLimitQtdeType == 'exact' ?
                        <InputNumber
                          name='semesterLimitQtdeDe'
                          placeholder=""
                          value={filterParams.semesterLimitQtdeExact}
                          onChange={(value: any) => {
                            if (semesterLimitQtdeType === 'exact') {
                              setFilterParams({
                                ...filterParams,
                                semesterLimitQtdeExact: value
                              });
                            }
                          }}
                        /> :
                        <InputNumber
                          name='semesterLimitQtdeDe'
                          placeholder="De"
                          value={filterParams.semesterLimitQtdeDe}
                          onChange={(value: any) => {
                            if (semesterLimitQtdeType === 'interval') {
                              setFilterParams({
                                ...filterParams,
                                semesterLimitQtdeDe: value
                              });
                            }
                          }}
                        />}
                    </div>
                    {semesterLimitQtdeType !== 'exact' &&
                      <div className='half-padding'>
                        <InputNumber
                          name='semesterLimitQtdeAte'
                          placeholder="Até"
                          value={filterParams.semesterLimitQtdeAte}
                          onChange={(value: any) => {
                            if (semesterLimitQtdeType === 'interval') {
                              setFilterParams({
                                ...filterParams,
                                semesterLimitQtdeAte: value
                              });
                            }
                          }}
                        />
                      </div>}
                  </div>
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
