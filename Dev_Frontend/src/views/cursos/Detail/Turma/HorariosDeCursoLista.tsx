import { Button, Dropdown, Table, Typography } from "antd";
import { FunctionComponent, useState } from "react";
import { MoreOutlined, PlusOutlined } from "@ant-design/icons";

import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import ModalConfirm from "../../../../_commons/ModalConfirm/ModalConfirm";
import CourseTime from "../../../../model/curso/CourseTime";
import { LitDiaDaSemanaMaker } from "../../../../model/literal/lit-dia-da-semana";

interface Props {
    timesTable: CourseTime[]
    onChangeTimesTable: (next: CourseTime[]) => void
    parentIsLoading: boolean
    onOpenEdit: (rowData: CourseTime) => void
    onOpenAdd: () => void
}

const HorariosDeCursoLista: FunctionComponent<Props> = ({
    timesTable, onChangeTimesTable,
    parentIsLoading,
    onOpenEdit,
    onOpenAdd,
}: Props) => {
  const [courseTime, setCourseTime] = useState({} as CourseTime);
  const [isExcluirModalOpen, setIsExcluirModalOpen] = useState(false);

  const handleAskForDelete = (rowData: CourseTime) => {
    setCourseTime(rowData);
    setIsExcluirModalOpen(true);
  }

  const handleDelete = () => {
    onChangeTimesTable(timesTable.filter(x => x.rowKey !== courseTime.rowKey));
    setCourseTime({} as CourseTime);
    setIsExcluirModalOpen(false);
  }

  const renderItensMais = (rowData: CourseTime) => {
    const itensMais: MenuProps['items'] = [
      {
        key: 'mais-alterar',
        label: (<a rel="noopener noreferrer">Alterar</a>),
        onClick: () => onOpenEdit(rowData)
      },
      {
        key: 'mais-excluir',
        label: (<a rel="noopener noreferrer"
          onClick={() => handleAskForDelete(rowData)}>
          Excluir</a>),
      },
    ];
    return itensMais;
  }

  let columns: ColumnsType<CourseTime> = [
    {
        title: 'Dia da Semana',
        key: 'i_Dia_Da_Semana',
        dataIndex: 'i_Dia_Da_Semana',
        render: (text, rowData: CourseTime, index) => {
          return (
            <span>{LitDiaDaSemanaMaker.PorValorOrNull(rowData.i_Dia_Da_Semana ?? 0)?.descricao}</span>
          );
        },
    },
    {
        title: 'Horário',
        key: 'd_Hora_Inicio',
        dataIndex: 'd_Hora_Inicio',
        render: (text, rowData: CourseTime, index) => {
          return (
            <span>
              <span>De </span>
              <span>{rowData.d_Hora_Inicio?.toLocaleTimeString()}</span>
              <span> até </span>
              <span>{rowData.d_Hora_Fim?.toLocaleTimeString()}</span>
              {rowData.b_E_Hora_Fim_No_Dia_Seguinte && <span> (dia seguinte)</span>}
            </span>
          );
        },
    },
    {
      title: '#',
      key: 'mais',
      dataIndex: 'mais',
      render: (text, rowData: CourseTime, index) => {
        return (
          <Dropdown menu={{ items: renderItensMais(rowData) }} placement="bottomRight" arrow={{ pointAtCenter: true }}>
            <Button icon={<MoreOutlined />}></Button>
          </Dropdown>
        );
      },
    },
  ];


    return (
        <>
            <div className="half-padding">
                <Typography.Title level={5}>Horários</Typography.Title>
            </div>
            <div className='half-padding'>
                <Button
                    type="primary"
                    shape="round"
                    icon={<PlusOutlined />}
                    onClick={() => onOpenAdd()}
                    >Inserir...
                </Button>
            </div>
            <Table
                rowKey={(row) => row.rowKey}
                dataSource={timesTable}
                columns={columns}
                loading={parentIsLoading}
                pagination={undefined}
                />

            <ModalConfirm
                openConfirm={isExcluirModalOpen}
                setOpenConfirm={setIsExcluirModalOpen}
                loading={false}
                onAction={handleDelete}
                isAllowed={true}
                isAllowedLabel="Deseja excluir o Horário? A ação não pode ser desfeita"
                isNotAllowedLabel=""
            />
        </>
    )
}

export default HorariosDeCursoLista;