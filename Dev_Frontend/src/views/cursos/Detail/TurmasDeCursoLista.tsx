import { Button, Dropdown, Table, Typography } from "antd";
import { FunctionComponent, useState } from "react";
import { MoreOutlined, PlusOutlined } from "@ant-design/icons";

import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import ModalConfirm from "../../../_commons/ModalConfirm/ModalConfirm";
import CourseClassroom from "../../../model/curso/CourseClassroom";
import { LitModalidadeMaker } from "../../../model/literal/lit-modalidade";

interface Props {
    classroomsTable: CourseClassroom[]
    onChangeClassroomsTable: (next: CourseClassroom[]) => void
    parentIsLoading: boolean
    onOpenEdit: (rowData: CourseClassroom) => void
    onOpenAdd: () => void
}

const TurmasDeCursoLista: FunctionComponent<Props> = ({
    classroomsTable, onChangeClassroomsTable,
    parentIsLoading,
    onOpenEdit,
    onOpenAdd,
}: Props) => {
  const [classroom, setClassroom] = useState({} as CourseClassroom);
  const [isExcluirModalOpen, setIsExcluirModalOpen] = useState(false);

  const handleAskForDelete = (rowData: CourseClassroom) => {
    setClassroom(rowData);
    setIsExcluirModalOpen(true);
  }

  const handleDelete = () => {
    onChangeClassroomsTable(classroomsTable.filter(x => x.rowKey !== classroom.rowKey));
    setClassroom({} as CourseClassroom);
    setIsExcluirModalOpen(false);
  }

  const renderItensMais = (rowData: CourseClassroom) => {
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

  let columns: ColumnsType<CourseClassroom> = [
    {
      title: 'Data Início',
      dataIndex: 'd_Data_Inicio',
      key: 'd_Data_Inicio',
    },
    {
      title: 'Data Fim',
      dataIndex: 'd_Data_Fim',
      key: 'd_Data_Fim',
    },
    {
        title: 'Modalidade',
        key: 'i_Modalidade',
        dataIndex: 'i_Modalidade',
        render: (text, rowData: CourseClassroom, index) => {
          return (
            <span>{LitModalidadeMaker.PorValorOrNull(rowData.i_Modalidade ?? 0)?.descricao}</span>
          );
        },
    },
    {
      title: '#',
      key: 'mais',
      dataIndex: 'mais',
      render: (text, rowData: CourseClassroom, index) => {
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
                <Typography.Title level={5}>Turmas</Typography.Title>
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
                dataSource={classroomsTable}
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
                isAllowedLabel="Deseja excluir a Turma? A ação não pode ser desfeita"
                isNotAllowedLabel=""
            />
        </>
    )
}

export default TurmasDeCursoLista;