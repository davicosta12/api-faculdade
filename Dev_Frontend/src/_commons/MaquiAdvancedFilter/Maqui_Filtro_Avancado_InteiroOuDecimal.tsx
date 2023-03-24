import { Input, InputNumber, Select, Typography } from "antd";
import { FunctionComponent } from "react";
import './Maqui.css';

interface Props {
    eTipoInteiro: boolean;
    selectedLabelNames: string[];
    labelName: string;
    inputNameBasis: string;
    onChangeType: (nextValue: string) => void;
    typeValue: string;
    onChangeFilterParams: (ev: any) => void;
    filterParams: any;
    selectMinWidth: number;
}
  
const Maqui_Filtro_Avancado_InteiroOuDecimal: FunctionComponent<Props> = (props) => {

  const {
    eTipoInteiro,
    selectedLabelNames,
    labelName,
    inputNameBasis,
    onChangeType,
    typeValue,
    onChangeFilterParams,
    filterParams,
    selectMinWidth
  } = props;

  const inputProps = eTipoInteiro ?
    {} :
    {
      decimalSeparator: ',',
      formatter: (value: any) => (value + '').replaceAll('.', ',')
    }

  return (
    <>
      {selectedLabelNames.includes(labelName) && <>
    <div className="maqui-filtro-avancado">
      <div className="half-padding">
        <Typography.Text>{labelName}</Typography.Text>
      </div>
      <div className='half-padding'>
        <Select
          style={{ minWidth: selectMinWidth }}
          options={[
            { value: 'exact', label: 'Exato' },
            { value: 'interval', label: 'Intervalo' },
          ]}
          onChange={(value: string) => {
            if (value === 'exact') {
              onChangeFilterParams({
                ...filterParams,
                [inputNameBasis + 'De']: null,
                [inputNameBasis + 'Ate']: null
              });
            }
            else if (value === 'interval') {
                onChangeFilterParams({
                ...filterParams,
                [inputNameBasis + 'Exact']: null,
              });
            }
            onChangeType(value);
          }}
          value={typeValue}
        />
      </div>
    </div>
    <div className="maqui-filtro-avancado">
      <div className="half-padding">
        {typeValue == 'exact' ?
          <InputNumber
            placeholder=""
            value={filterParams[inputNameBasis + 'Exact']}
            onChange={(value: any) => {
              if (typeValue === 'exact') {
                onChangeFilterParams({
                  ...filterParams,
                  [inputNameBasis + 'Exact']: value
                });
              }
            }}
            {...inputProps}
          /> :
          <InputNumber
            placeholder="De"
            value={filterParams[inputNameBasis + 'De']}
            onChange={(value: any) => {
              if (typeValue === 'interval') {
                onChangeFilterParams({
                  ...filterParams,
                  [inputNameBasis + 'De']: value
                });
              }
            }}
            {...inputProps}
          />}
      </div>
      {typeValue !== 'exact' &&
        <div className='half-padding'>
          <InputNumber
            placeholder="Até"
            value={filterParams[inputNameBasis + 'Ate']}
            onChange={(value: any) => {
              if (typeValue === 'interval') {
                onChangeFilterParams({
                  ...filterParams,
                  [inputNameBasis + 'Ate']: value
                });
              }
            }}
            {...inputProps}
          />
        </div>}
    </div>
  </>}
    </>
  )
}

export default Maqui_Filtro_Avancado_InteiroOuDecimal;