import { Table, TablePaginationConfig } from 'antd';
import { FilterValue } from 'antd/es/table/interface';
import { FunctionComponent, useEffect, useState } from 'react'

interface Props {
  dataSource: any;
  columns: any;
  pagination: boolean;
  totalCount: number;
  setDataResult: any;
  isLoading?: boolean;
  getData: (page: number | undefined, perPage: number | undefined) => void;
  handleRowKey: (data: any) => number;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

const DataTable: FunctionComponent<Props> = (props) => {

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });

  const {
    getData,
    handleRowKey,
    setDataResult,
    dataSource,
    columns,
    pagination,
    totalCount,
    isLoading,
  } = props;

  useEffect(() => {
    getData(tableParams.pagination?.current, tableParams.pagination?.pageSize);
  }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);

  useEffect(() => {
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: totalCount,
      },
    });
  }, [totalCount]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setTableParams({
      pagination,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      // setDataResult({} as GenericPagingDto<any>);
    }
  };

  return (
    <Table
      rowKey={handleRowKey}
      dataSource={dataSource}
      pagination={pagination ? tableParams.pagination : false}
      columns={columns}
      loading={isLoading}
      onChange={pagination ? handleTableChange : () => undefined}
    />
  )
}

export default DataTable