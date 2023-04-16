import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OcupacoesIndex.css';
import NavigationWrapper from '../_navigation/NavigationWrapper';
import { Typography, Tag, Select, Button, Switch, Dropdown, Pagination, Card, Col, Row, Spin, Empty } from 'antd';
import { MoreOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import { Constantes } from '../../model/constantes';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import Maqui_Filtro_Termos from '../_commons/MaquiTermsFilter/Maqui_Filtro_Termos';
import Maqui_Filtro_Avancado_Wrapper from '../_commons/MaquiAdvancedFilter/Maqui_Filtro_Avancado_Wrapper';
import Maqui_Filtro_Avancado_Texto from '../_commons/MaquiAdvancedFilter/Maqui_Filtro_Avancado_Texto';
import Maqui_Filtro_Avancado_Literal from '../_commons/MaquiAdvancedFilter/Maqui_Filtro_Avancado_Literal';
import Maqui_Botao_Lento from '../_commons/MaquiButton/Maqui_Botao_Lento';
import Maqui_Ordenar_Por from '../_commons/MaquiExhibitionOptions/Maqui_Ordenar_Por';
import DataTable from '../_commons/DataTable/DataTable';
import GetUserDto from '../../services/UserService/dto/GetUserDto';
import ModalConfirm from '../_commons/ModalConfirm/ModalConfirm';
import OccupationFilterParamsDto from '../../services/OccupationService/dto/OccupationFilterParamsDto';
import { IResultadoOcupacao } from '../../model/ocupacao-resultado';
import { LitColunaOcupacao, LitColunaOcupacaoMaker } from '../../model/literal/lit-coluna-ocupacao';
import { LitDiaSemana, LitDiaSemanaMaker, LitDiaSemanaSiglaNull } from '../../model/literal/lit-dia-semana';
import Maqui_Filtro_Avancado_Hora from './Maqui_Filtro_Avancado_Hora';
import { OcupacoesIndexState } from '../../integrations/ocupacoes-index-state';


function OcupacoesIndex() {
  const [occupation, setOccupation] = useState({} as GetUserDto)
  const [selectedFiltros, setSelectedFiltros] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [filterParams, setFilterParams] = useState<OccupationFilterParamsDto>(new OccupationFilterParamsDto());
  const handleChangeActivePanels = (next: boolean) => {
    setEstaMostrandoFiltrosAvancados(next);
    if (!next) {
      setFilterParams({
        ...filterParams,
        isAdvancedSearch: false,
        teacherName: '',
        courseName: '',
        weekDayAbbrev: '',
        startTimeMinutes: null,
        endTimeMinutes: null,
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
  let possiveisFiltros = LitColunaOcupacaoMaker.Todos;
  const [estaMostrandoFiltrosAvancados, setEstaMostrandoFiltrosAvancados] = useState(false);
  
  useEffect(() => {
    getOccupations();
  }, []);

  const getOccupations = async (_page: number = page, _perPage: number = perPage) => {
    // Chamada para API
  }

  const handleDelete = async () => {
    // Chamada para API
  }

  const handleSearch = () => {
    getOccupations(1, 5);
  }

  const handleChange = (ev: any) => {
    setFilterParams({ ...filterParams, [ev.target.name]: ev.target.value });
  }

  const handleAdd = () => {
    setOccupation({} as GetUserDto);
    navigate('/ocupacoes/inserir');
  }

  const handleEdit = (rowData: IResultadoOcupacao) => {
    navigate('/ocupacoes/alterar', { state: { course: rowData } });
  }

  const handleOpenDelete = (rowData: IResultadoOcupacao) => {
    //setOccupation(rowData);
    setIsExcluirModalOpen(true);
  }
    
  // Resultados e Paginaçao default
  const renderItensMais = (rowData: IResultadoOcupacao) => {
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
  
  const showHours = (hours: Date) => {
    return (hours.getHours().toString().padStart(2, '0'))
      + ':' + hours.getMinutes().toString().padStart(2, '0');
  }
  
  let columns: ColumnsType<IResultadoOcupacao> = [
    {
      title: LitColunaOcupacaoMaker.NomeProfessor.descricao,
      dataIndex: LitColunaOcupacaoMaker.NomeProfessor.nomePropriedade,
      key: LitColunaOcupacaoMaker.NomeProfessor.nomePropriedade,
    },
    {
      title: LitColunaOcupacaoMaker.NomeCurso.descricao,
      dataIndex: LitColunaOcupacaoMaker.NomeCurso.nomePropriedade,
      key: LitColunaOcupacaoMaker.NomeCurso.nomePropriedade,
    },
    {
      title: LitColunaOcupacaoMaker.DiaSemana.descricao,
      dataIndex: LitColunaOcupacaoMaker.DiaSemana.nomePropriedade,
      key: LitColunaOcupacaoMaker.DiaSemana.nomePropriedade,
      render: (text, rowData: IResultadoOcupacao, index) => {
        return (
          <span>{LitDiaSemanaMaker.PorSiglaOrNull(rowData.diaSemana as LitDiaSemanaSiglaNull)?.descricao}</span>
        )
      },
    },
    {
      title: LitColunaOcupacaoMaker.HoraInicio.descricao,
      dataIndex: LitColunaOcupacaoMaker.HoraInicio.nomePropriedade,
      key: LitColunaOcupacaoMaker.HoraInicio.nomePropriedade,
      render: (text, rowData: IResultadoOcupacao, index) => {
        return (
          <span>{showHours(rowData.horaInicio)}</span>
        )
      },
    },
    {
      title: LitColunaOcupacaoMaker.HoraFim.descricao,
      dataIndex: LitColunaOcupacaoMaker.HoraFim.nomePropriedade,
      key: LitColunaOcupacaoMaker.HoraFim.nomePropriedade,
      render: (text, rowData: IResultadoOcupacao, index) => {
        return (
          <span>{showHours(rowData.horaFim)}</span>
        )
      },
    },
    {
      title: '#',
      key: 'mais',
      dataIndex: 'mais',
      render: (text, rowData: IResultadoOcupacao, index) => {
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
          <Typography.Title level={3}>Ocupações</Typography.Title>
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
              labelName={LitColunaOcupacaoMaker.NomeProfessor.descricao}
              inputName='teacherName'
              onChange={handleChange}
              value={filterParams.teacherName} />
            <Maqui_Filtro_Avancado_Texto
              selectedLabelNames={selectedFiltros}
              labelName={LitColunaOcupacaoMaker.NomeCurso.descricao}
              inputName='courseName'
              onChange={handleChange}
              value={filterParams.courseName} />
            <Maqui_Filtro_Avancado_Literal
              selectedLabelNames={selectedFiltros}
              labelName={LitColunaOcupacaoMaker.DiaSemana.descricao}
              literalOptions={LitDiaSemanaMaker.TodosOptions}
              inputName='weekDayAbbrev'
              onChange={handleChange}
              value={filterParams.weekDayAbbrev ?? ''}
              selectMinWith={180} />
            <Maqui_Filtro_Avancado_Hora
              selectedLabelNames={selectedFiltros}
              labelName={LitColunaOcupacaoMaker.HoraInicio.descricao}
              inputName='startTimeMinutes'
              onChange={handleChange}
              valueMinutes={filterParams.startTimeMinutes} />
            <Maqui_Filtro_Avancado_Hora
              selectedLabelNames={selectedFiltros}
              labelName={LitColunaOcupacaoMaker.HoraFim.descricao}
              inputName='endTimeMinutes'
              onChange={handleChange}
              valueMinutes={filterParams.endTimeMinutes} />
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
        
        {isLoading ?
          <Spin /> :
          <>{(windowWidth <= Constantes.WidthMaximoMobile && OcupacoesIndexState.result.length > 0) ?
            <>
              <Row>
                {OcupacoesIndexState.result.map(xOcupacao => <Col span={12} className="half-padding">
                  <Card title={<div className="ocupacoes-index-botoes-modal">
                      <Dropdown menu={{ items: renderItensMais(xOcupacao) }} placement="bottomRight" arrow={{ pointAtCenter: true }}>
                        <Button icon={<MoreOutlined />}></Button>
                      </Dropdown>
                    </div>}
                    bodyStyle={{ padding: "6px" }}
                    headStyle={{ paddingRight: "12px" }}>
                    
                    <div className='half-padding'>
                      <span className='card-text-size'><strong>{xOcupacao.nomeProfessor} - {xOcupacao.nomeCurso}</strong></span>
                    </div>
                    <div className='half-padding'>
                      <span className='card-text-size'><strong>Dia da semana</strong>: {LitDiaSemanaMaker.PorSiglaOrNull(xOcupacao.diaSemana as LitDiaSemanaSiglaNull)?.descricao}</span>
                    </div>
                    <div className='half-padding'>
                      <span className='card-text-size'><strong>Hora Início</strong>: {showHours(xOcupacao.horaInicio)}</span>
                    </div>
                    <div className='half-padding'>
                      <span className='card-text-size'><strong>Hora Fim</strong>: {showHours(xOcupacao.horaFim)}</span>
                    </div>
                    
                  </Card>
                  
                </Col>)}
              </Row>
              <div className='ocupacoes-index-botoes-modal'>
                <Pagination total={OcupacoesIndexState.result.length} defaultCurrent={1} />
              </div>
            </> : <>{
              OcupacoesIndexState.result.length > 0 ?
              <DataTable
                handleRowKey={(occupation: any) => occupation.i_Cod_Ocupacao}
                dataSource={OcupacoesIndexState.result}
                columns={columns}
                getData={(_page: number | undefined, _perPage: number | undefined) => {}}
                setDataResult={null}
                totalCount={OcupacoesIndexState.result.length}
                pagination
                isLoading={false}
                /> :
              <Empty/>
            }</>
          }</>
        }
        
      </div>
      
      <ModalConfirm
        openConfirm={isExcluirModalOpen}
        setOpenConfirm={setIsExcluirModalOpen}
        loading={isLoading}
        onAction={handleDelete}
        isAllowed={true}
        isAllowedLabel={'Deseja excluir a Ocupação? A ação não pode ser desfeita.'}
        isNotAllowedLabel=''
        isLoadingContent={false}
      />
    </NavigationWrapper>
  )
}

export default OcupacoesIndex;
