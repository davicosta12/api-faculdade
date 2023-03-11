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
import DataTable from '../../_commons/DataTable/DataTable';

function CursosIndex() {

  const [courseResult, setCourseResult] = useState({} as GenericPagingDto<GetCourseDto>);
  const [filterParams, setFilterParams] = useState<CourseFilterParamsDto>(new CourseFilterParamsDto());
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [selectedFiltros, setSelectedFiltros] = useState<string[]>([]);
  const possiveisFiltros = LitColunaCursoMaker.Todos.map(x => x.descricao);
  const [estaMostrandoFiltrosAvancados, setEstaMostrandoFiltrosAvancados] = useState(false);
  const handleChangeActivePanels = (activePanels: string | string[]) => {
    setEstaMostrandoFiltrosAvancados((_prev: boolean) => activePanels.length > 0);
  }
  const [isExcluirModalOpen, setIsExcluirModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const { state, dispatch } = useContext(AppContext);

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

  const handleCheckAvancado = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedFiltros, tag]
      : selectedFiltros.filter((t) => t !== tag);
    setSelectedFiltros(nextSelectedTags);
  };

  const handleSearch = () => {
    getCourses();
  }

  const handleChange = (ev: any) => {
    setFilterParams({ ...filterParams, [ev.target.name]: ev.target.value });
  }

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
        {!estaMostrandoFiltrosAvancados &&
          <div className='half-padding'>
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
                        onChange={(value: string) => setFilterParams({ ...filterParams, 'semesterLimitQtdeType': value })}
                        value={filterParams.semesterLimitQtdeType}
                      />
                    </div>
                  </div>
                  <div className="cursos-index-filtro-avancado">
                    <div className="half-padding">
                      {filterParams.semesterLimitQtdeType == 'exact' ?
                        <InputNumber
                          name='semesterLimitQtdeDe'
                          placeholder=""
                          value={filterParams.semesterLimitQtdeDe}
                          onChange={handleChange}
                        /> :
                        <InputNumber
                          name='semesterLimitQtdeDe'
                          placeholder="De"
                          value={filterParams.semesterLimitQtdeDe}
                          onChange={handleChange}
                        />}
                    </div>
                    {filterParams.semesterLimitQtdeType != 'exact' &&
                      <div className='half-padding'>
                        <InputNumber
                          name='semesterLimitQtdeAte'
                          placeholder="Até"
                          value={filterParams.semesterLimitQtdeAte}
                          onChange={handleChange}
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
              onChange={(value: string) => setFilterParams({ ...filterParams, 'fieldOrderLabel': value })}
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
            <Button type="primary" shape="round" icon={<PlusOutlined />}>Inserir...</Button>
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
