import { Button, Dropdown, Table, Typography } from "antd";
import { FunctionComponent, useState } from "react";
import { MoreOutlined, PlusOutlined } from "@ant-design/icons";

import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import ModalConfirm from "../../../../_commons/ModalConfirm/ModalConfirm";
import CourseTime from "../../../../model/curso/CourseTime";
import { LitDiaDaSemanaMaker } from "../../../../model/literal/lit-dia-da-semana";
import CourseEnrollment from "../../../../model/curso/CourseEnrollment";

interface Props {
    enrollmentsTable: CourseEnrollment[]
    onChangeEnrollmentsTable: (next: CourseEnrollment[]) => void
    parentIsLoading: boolean
    onOpenEdit: (rowData: CourseEnrollment) => void
    onOpenAdd: () => void
}

const MatriculasDeCursoLista: FunctionComponent<Props> = ({
    enrollmentsTable, onChangeEnrollmentsTable,
    parentIsLoading,
    onOpenEdit,
    onOpenAdd,
}: Props) => {
  const [courseEnrollment, setCourseEnrollment] = useState({} as CourseEnrollment);
  const [isExcluirModalOpen, setIsExcluirModalOpen] = useState(false);

  const handleAskForDelete = (rowData: CourseEnrollment) => {
    setCourseEnrollment(rowData);
    setIsExcluirModalOpen(true);
  }

  const handleDelete = () => {
    onChangeEnrollmentsTable(enrollmentsTable.filter(x => x.rowKey !== courseEnrollment.rowKey));
    setCourseEnrollment({} as CourseEnrollment);
    setIsExcluirModalOpen(false);
  }

  const renderItensMais = (rowData: CourseEnrollment) => {
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

  let columns: ColumnsType<CourseEnrollment> = [
    {
        title: 'Nome',
        key: 'studentName',
        dataIndex: 'studentName',
    },
    {
      title: '#',
      key: 'mais',
      dataIndex: 'mais',
      render: (text, rowData: CourseEnrollment, index) => {
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
                <Typography.Title level={5}>Matrículas</Typography.Title>
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
                dataSource={enrollmentsTable}
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
                isAllowedLabel="Deseja excluir a Matrícula? A ação não pode ser desfeita"
                isNotAllowedLabel=""
            />
        </>
    )
}

export default MatriculasDeCursoLista;