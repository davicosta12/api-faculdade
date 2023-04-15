import { Input, Select, Typography } from "antd";
import { FunctionComponent } from "react";
import SortableColumn from "./SortableColumn";

interface Props {
    allColumns: SortableColumn[];
    onChangeFilterParams: (ev: any) => void;
    filterParams: any;
    selectMinWith: number;
}
  
const Maqui_Ordenar_Por: FunctionComponent<Props> = (props) => {

  const {
    allColumns,
    onChangeFilterParams,
    filterParams,
    selectMinWith
  } = props;

  let orderOptions = [{ value: '', label: 'Nada' }];
  for (let iColumn of allColumns) {
    orderOptions.push({ value: iColumn.dbColumnName + '--asc', label: iColumn.description + " Crescente" });
    orderOptions.push({ value: iColumn.dbColumnName + '--desc', label: iColumn.description + " Decrescente" });
  }

  return (
      <div className="maqui-filtro-avancado">
        <div className='half-padding'>
          <Typography.Text>Ordenar por</Typography.Text>
        </div>
        <div className='half-padding'>
          <Select
            style={{ minWidth: selectMinWith }}
            options={orderOptions}
            onChange={(value: string) => onChangeFilterParams({ ...filterParams, fieldOrderLabel: value })}
            value={filterParams.fieldOrderLabel}
          />
        </div>
      </div>
  )
}

export default Maqui_Ordenar_Por;