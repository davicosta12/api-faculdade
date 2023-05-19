import { Button, Dropdown, Table, Typography } from "antd";
import { FunctionComponent, useState } from "react";
import PeriodConfiguration from "../../model/configuration/PeriodConfiguration";
import { MoreOutlined, PlusOutlined } from "@ant-design/icons";

import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import ModalConfirm from "../../_commons/ModalConfirm/ModalConfirm";

interface Props {
    periodsTable: PeriodConfiguration[]
    onChangePeriodsTable: (next: PeriodConfiguration[]) => void
    parentIsLoading: boolean
    onOpenEdit: (rowData: PeriodConfiguration) => void
    onOpenAdd: () => void
}

const ConfiguracoesDePeriodoLista: FunctionComponent<Props> = ({
    periodsTable, onChangePeriodsTable,
    parentIsLoading,
    onOpenEdit,
    onOpenAdd,
}: Props) => {
  const [periodConfiguration, setPeriodConfiguration] = useState({} as PeriodConfiguration);
  const [isExcluirModalOpen, setIsExcluirModalOpen] = useState(false);

  const handleAskForDelete = (rowData: PeriodConfiguration) => {
    setPeriodConfiguration(rowData);
    setIsExcluirModalOpen(true);
  }

  const handleDelete = () => {
    onChangePeriodsTable(periodsTable.filter(x => x.rowKey !== periodConfiguration.rowKey));
    setPeriodConfiguration({} as PeriodConfiguration);
    setIsExcluirModalOpen(false);
  }

  const renderItensMais = (rowData: PeriodConfiguration) => {
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

  let columns: ColumnsType<PeriodConfiguration> = [
    {
      title: 'Nome',
      dataIndex: 's_Nome',
      key: 's_Nome',
    },
    {
      title: 'Sigla',
      dataIndex: 'c_Sigla',
      key: 'c_Sigla',
    },
    {
      title: '#',
      key: 'mais',
      dataIndex: 'mais',
      render: (text, rowData: PeriodConfiguration, index) => {
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
                <Typography.Title level={5}>Períodos</Typography.Title>
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
                dataSource={periodsTable}
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
                isAllowedLabel="Deseja excluir o Período? A ação não pode ser desfeita"
                isNotAllowedLabel=""
            />
        </>
    )
}

export default ConfiguracoesDePeriodoLista;