import React, { useEffect, useState } from 'react';
import './CursosIndex.css';
import NavigationWrapper from '../_navigation/NavigationWrapper';
import { Typography, Input, Collapse, Tag, Select, Button, Table, Dropdown, Modal, InputNumber, Pagination, Card, Col, Row, Spin, Empty } from 'antd';
import { ArrowLeftOutlined, DeleteFilled, MoreOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import { LitColunaCursoMaker } from '../../model/literal/lit-coluna-curso';
import { CursosIndexState } from '../../integrations/cursos-index-state';
import { IResultadoCurso } from '../../model/curso-resultado';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import Maqui_Filtro_Termos from '../_commons/MaquiTermsFilter/Maqui_Filtro_Termos';
import Maqui_Filtro_Avancado_Wrapper from '../_commons/MaquiAdvancedFilter/Maqui_Filtro_Avancado_Wrapper';
import CourseFilterParamsDto from '../../services/CourseService/dto/CourseFilterParamsDto';
import { Constantes } from '../../model/constantes';
import DataTable from '../_commons/DataTable/DataTable';
import Maqui_Botao_Lento from '../_commons/MaquiButton/Maqui_Botao_Lento';
import Maqui_Filtro_Avancado_Texto from '../_commons/MaquiAdvancedFilter/Maqui_Filtro_Avancado_Texto';
import Maqui_Ordenar_Por from '../_commons/MaquiExhibitionOptions/Maqui_Ordenar_Por';
import GetCourseDto from '../../services/CourseService/dto/GetCourseDto';
import { useNavigate } from 'react-router-dom';
import ModalConfirm from '../_commons/ModalConfirm/ModalConfirm';


function CursosIndex() {
  const [course, setCourse] = useState({} as GetCourseDto)
  const [selectedFiltros, setSelectedFiltros] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [filterParams, setFilterParams] = useState<CourseFilterParamsDto>(new CourseFilterParamsDto());
  const handleChangeActivePanels = (next: boolean) => {
    setEstaMostrandoFiltrosAvancados(next);
    if (!next) {
      setFilterParams({
        ...filterParams,
        isAdvancedSearch: false,
        name: '',
        description: '',
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
  const possiveisFiltros = LitColunaCursoMaker.Todos;
  const [estaMostrandoFiltrosAvancados, setEstaMostrandoFiltrosAvancados] = useState(false);
  
  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async (_page: number = page, _perPage: number = perPage) => {
    // Chamada para API
  }

  const handleDelete = async () => {
    // Chamada para API
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

  const handleEdit = (rowData: IResultadoCurso) => {
    navigate('/cursos/alterar', { state: { course: rowData } });
  }

  const handleOpenDelete = (rowData: IResultadoCurso) => {
    //setCourse(rowData);
    setIsExcluirModalOpen(true);
  }
  
  // Ordenaçao
  let possiveisOrdenacoes = [{ value: '', label: 'Nada' }];
  for (let iPossivelFiltro of possiveisFiltros) {
    possiveisOrdenacoes.push({ value: iPossivelFiltro + '--asc', label: iPossivelFiltro + " Crescente" });
    possiveisOrdenacoes.push({ value: iPossivelFiltro + '--desc', label: iPossivelFiltro + " Decrescente" });
  }
    
  // Resultados e Paginaçao default
  const renderItensMais = (rowData: IResultadoCurso) => {
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
      render: (text, rowData: IResultadoCurso, index) => {
        return (
          <Dropdown menu={{ items: renderItensMais(rowData) }} placement="bottomRight" arrow={{ pointAtCenter: true }}>
            <Button icon={<MoreOutlined />}></Button>
          </Dropdown>
        )
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
              labelName={LitColunaCursoMaker.Nome.descricao}
              inputName='name'
              onChange={handleChange}
              value={filterParams.name} />
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
            Acao={() => {}} />
          <div className='half-padding'>
            <Button type="primary" shape="round" icon={<PlusOutlined/>}>Inserir...</Button>
          </div>
        </div>
        
        {/* Resultados e Paginaçao default
                atributos visiveis pra mobile: nome; sexo, ativo e mais
                atributos visiveis pra desktop: nome; cpf; sexo; nome da mae; ativo; e mais */}
        
        {isLoading ?
          <Spin /> :
          ((windowWidth <= Constantes.WidthMaximoMobile && CursosIndexState.cursosApresentados.length > 0) ?
            <Row>
              {CursosIndexState.cursosApresentados.map(xCurso => <Col span={12} className="half-padding">
                <Card title={<div className="cursos-index-botoes-modal">
                    <Dropdown menu={{ items: renderItensMais(xCurso) }} placement="bottomRight" arrow={{ pointAtCenter: true }}>
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
            </Row> : <>{
              CursosIndexState.cursosApresentados.length > 0 ?
              <DataTable
                handleRowKey={(course: any) => course.i_Cod_Curso}
                dataSource={CursosIndexState.cursosApresentados}
                columns={columns}
                getData={(_page: number | undefined, _perPage: number | undefined) => {}}
                setDataResult={null}
                totalCount={CursosIndexState.cursosApresentados.length}
                pagination
                isLoading={false}
                /> :
              <Empty />
            }</>
          )
        }
        
        {windowWidth <= Constantes.WidthMaximoMobile && <div className='usuarios-index-botoes-modal'>
          <Pagination total={CursosIndexState.cursosApresentados.length} defaultCurrent={1} />
        </div>}
      </div>
      
      <ModalConfirm
        openConfirm={isExcluirModalOpen}
        setOpenConfirm={setIsExcluirModalOpen}
        loading={isLoading}
        onAction={handleDelete}
        isAllowed={CursosIndexState.podeExcluir}
        isAllowedLabel='Deseja excluir o Curso? A ação não pode ser desfeita.'
        isNotAllowedLabel='Não é possível excluir um curso enquanto ele tiver ocupações.'
      />
    </NavigationWrapper>
  )
}

export default CursosIndex;
