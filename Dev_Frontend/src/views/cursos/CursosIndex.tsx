import { useEffect, useState } from 'react';
import './CursosIndex.css';
import NavigationWrapper from '../_navigation/NavigationWrapper';
import { Typography, Input, Collapse, Tag, Select, Button, Table, Dropdown, Modal, InputNumber } from 'antd';
import { ArrowLeftOutlined, DeleteFilled, MoreOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { MenuProps } from 'antd';
import { LitColunaCursoMaker } from '../../model/literal/lit-coluna-curso';
import CourseService from '../../services/CourseService/CourseService';
import CourseFilterParamsDto from '../../services/CourseService/dto/CourseFilterParamsDto';
import GetCourseDto from '../../services/CourseService/dto/GetCourseDto';
import GenericPagingDto from '../../services/GenericDto/GenericPagingDto';
import { toast } from 'react-toastify';
import { toastError, toastOptions } from '../../misc/utils/utils';
import { FilterValue, SorterResult } from 'antd/es/table/interface';

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

function CursosIndex() {

  const [courseResult, setCourseResult] = useState({} as GenericPagingDto<GetCourseDto>);
  const [filterParams, setFilterParams] = useState<CourseFilterParamsDto>(new CourseFilterParamsDto());
  const [selectedFiltros, setSelectedFiltros] = useState<string[]>([]);
  const possiveisFiltros = LitColunaCursoMaker.Todos.map(x => x.descricao);
  const [estaMostrandoFiltrosAvancados, setEstaMostrandoFiltrosAvancados] = useState(false);
  const handleChangeActivePanels = (activePanels: string | string[]) => {
    setEstaMostrandoFiltrosAvancados((_prev: boolean) => activePanels.length > 0);
  }
  const [tipoLimiteSemestresEscolhido, setTipoLimiteSemestresEscolhido] = useState('exact');
  const [isExcluirModalOpen, setIsExcluirModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });

  // const { state, dispatch } = useContext(AppContext);

  const courseService = new CourseService();

  useEffect(() => {
    getCourses();
  }, []);

  useEffect(() => {
    getCourses();
  }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);

  const getCourses = async () => {
    setIsLoading(true);
    try {
      const _courseResult = await courseService.getCourses(filterParams, tableParams.pagination?.current, tableParams.pagination?.pageSize);
      setCourseResult(_courseResult);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: _courseResult.paging.totalCount,
        },
      });
    }
    catch (err: any) {
      toast.error(toastError(err), toastOptions(toast));
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleTableChange = (pagination: TablePaginationConfig) => {
    console.log(pagination)
    setTableParams({
      pagination,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setCourseResult({} as GenericPagingDto<GetCourseDto>);
    }
  };

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
          <Input placeholder="Termos" prefix={<SearchOutlined />} />
        </div>}
        <div className='half-padding'>
          <Collapse
            onChange={handleChangeActivePanels}
            defaultActiveKey={estaMostrandoFiltrosAvancados ? ["filtros-avancados"] : []}
          >
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
                {selectedFiltros.includes(LitColunaCursoMaker.QtdLimiteSemestres.descricao) && <div className="half-padding">
                  <div className="cursos-index-filtro-avancado">
                    <div className="half-padding">
                      <Typography.Text>Limite de Semestres</Typography.Text>
                    </div>
                    <div className='half-padding'>
                      <Select
                        defaultValue=""
                        style={{ width: 160 }}
                        options={[
                          { value: 'exact', label: 'Exato' },
                          { value: 'interval', label: 'Intervalo' },
                        ]}
                        onChange={(value: string) => setTipoLimiteSemestresEscolhido(value)}
                        value={tipoLimiteSemestresEscolhido}
                      />
                    </div>
                  </div>
                  <div className="cursos-index-filtro-avancado">
                    <div className="half-padding">
                      {tipoLimiteSemestresEscolhido == 'exact' ?
                        <InputNumber placeholder="" /> :
                        <InputNumber placeholder="De" />}
                    </div>
                    {tipoLimiteSemestresEscolhido != 'exact' && <div className='half-padding'>
                      <InputNumber placeholder="Até" />
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
              defaultValue=""
              style={{ width: 256 }}
              options={possiveisOrdenacoes}
            />
          </div>
        </div>
        <div className='agrupar-horizontalmente'>
          <div className='half-padding'>
            <Button type="primary" shape="round" icon={<SearchOutlined />}>Pesquisar</Button>
          </div>
          <div className='half-padding'>
            <Button type="primary" shape="round" icon={<PlusOutlined />}>Inserir...</Button>
          </div>
        </div>

        {/* Resultados e Paginaçao default
                atributos visiveis pra mobile: nome; sexo, ativo e mais
                atributos visiveis pra desktop: nome; cpf; sexo; nome da mae; ativo; e mais */}
        <Table
          rowKey={(course) => course.i_Cod_Curso}
          dataSource={courseResult.result}
          pagination={tableParams.pagination}
          columns={columns}
          loading={isLoading}
          onChange={handleTableChange}
        />

      </div>

      {/* Confirmar a exclusão */}
      <Modal
        open={isExcluirModalOpen}
        footer={null}
        closable={true}
        onCancel={() => setIsExcluirModalOpen(false)}
      >
        <div className="half-padding">
          <div className="half-padding">
            <Typography.Title level={5}>Deseja excluir o Curso? A ação não pode ser desfeita.</Typography.Title>
          </div>
          <div className="cursos-index-botoes-modal">
            <div className="half-padding" >
              <Button shape="round" onClick={() => setIsExcluirModalOpen(false)} icon={<ArrowLeftOutlined />}>Voltar</Button>
            </div>
            <div className="half-padding" >
              <Button danger type="primary" shape="round" icon={<DeleteFilled />}>Excluir</Button>
            </div>
          </div>
        </div>
      </Modal>
    </NavigationWrapper>
  )
}

export default CursosIndex;
