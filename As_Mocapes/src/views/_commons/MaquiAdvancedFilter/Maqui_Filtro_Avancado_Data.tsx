import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, DatePicker, Input, InputNumber, Modal, Radio, Select, Typography } from "antd";
import moment from "moment";
import { FunctionComponent, useState } from "react";
import { toUTCDateString } from "../../../misc/utils/utils";
import './Maqui.css';

interface Props {
    selectedLabelNames: string[];
    labelName: string;
    inputNameBasis: string;
    onChangeType: (nextValue: string) => void;
    typeValue: string;
    onChangeFilterParams: (ev: any) => void;
    filterParams: any;
    selectMinWidth: number;
}
  
const Maqui_Filtro_Avancado_Data: FunctionComponent<Props> = (props) => {

  const {
    selectedLabelNames,
    labelName,
    inputNameBasis,
    onChangeType,
    typeValue,
    onChangeFilterParams,
    filterParams,
    selectMinWidth
  } = props;

  const [isDateOptionsOpen, setIsDateOptionsOpen] = useState(false);

  const handleChangeMiddleTypeValue = (nextMiddleTypeValue: string) => {
    if (nextMiddleTypeValue === 'exact') {
      onChangeFilterParams({
        ...filterParams,
        [inputNameBasis + 'De']: null,
        [inputNameBasis + 'Ate']: null
      });
      onChangeType(nextMiddleTypeValue);
    } else if (nextMiddleTypeValue === 'interval') {
        onChangeFilterParams({
        ...filterParams,
        [inputNameBasis + 'Exact']: null,
      });
      onChangeType(nextMiddleTypeValue);
    } else if (nextMiddleTypeValue === 'auto-interval') {
      setIsDateOptionsOpen(true);
    }
  }

  const handleChooseDateAutoInterval = (ev: any) => {
    const chosenValue = ev.target.value;
    if (chosenValue === 'last-7d') {
      const yesterday = new Date();
      yesterday.setHours(0);
      yesterday.setTime(yesterday.getTime() - 24 * 60 * 60 * 1000);
      const sevenDaysAgo = new Date(yesterday.getTime() - 6 * 24 * 60 * 60 * 1000);
      onChangeFilterParams({
        ...filterParams,
        [inputNameBasis + 'De']: sevenDaysAgo,
        [inputNameBasis + 'Ate']: yesterday
      });
    } else if (chosenValue === 'last-30d') {
      const yesterday30d = new Date();
      yesterday30d.setHours(0);
      yesterday30d.setTime(yesterday30d.getTime() - 24 * 60 * 60 * 1000);
      const thirtyDaysAgo = new Date(yesterday30d.getTime() - 29 * 24 * 60 * 60 * 1000);
      onChangeFilterParams({
        ...filterParams,
        [inputNameBasis + 'De']: thirtyDaysAgo,
        [inputNameBasis + 'Ate']: yesterday30d
      });
    } else if (chosenValue === 'this-week') {
      const firstDayOfWeek = new Date();
      firstDayOfWeek.setHours(0);
      firstDayOfWeek.setTime(firstDayOfWeek.getTime() - firstDayOfWeek.getDay() * 24 * 60 * 60 * 1000);
      const lastDayOfWeek = new Date(firstDayOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000);
      onChangeFilterParams({
        ...filterParams,
        [inputNameBasis + 'De']: firstDayOfWeek,
        [inputNameBasis + 'Ate']: lastDayOfWeek
      });
    } else if (chosenValue === 'this-month') {
      const firstDayOfMonth = new Date();
      firstDayOfMonth.setDate(1);
      const lastDayOfMonth = new Date(firstDayOfMonth.getTime());
      lastDayOfMonth.setMonth(lastDayOfMonth.getMonth() + 1);
      lastDayOfMonth.setTime(lastDayOfMonth.getTime() - 24 * 60 * 60 * 1000);
      onChangeFilterParams({
        ...filterParams,
        [inputNameBasis + 'De']: firstDayOfMonth,
        [inputNameBasis + 'Ate']: lastDayOfMonth
      });
    }
    onChangeType('auto-interval');
    setIsDateOptionsOpen(false);
  }

  const getValueOfDate = (date: Date | null): any => {
    if (date == null) {
      return null;
    } else {
      return moment(toUTCDateString(date)) as any;
    }
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
            { value: 'auto-interval', label: 'Intervalo Automático' },
          ]}
          onChange={handleChangeMiddleTypeValue}
          value={typeValue}
        />
      </div>
    </div>
    <div className="maqui-filtro-avancado">
      <div className="half-padding">
        {typeValue == 'exact' ?
          <DatePicker
            placeholder=""
            value={ getValueOfDate(filterParams[inputNameBasis + 'Exact'])}
            onChange={(value: any) => {
              if (typeValue === 'exact') {
                onChangeFilterParams({
                  ...filterParams,
                  [inputNameBasis + 'Exact']: value
                });
              }
            }}
          /> :
          <DatePicker
            placeholder="De"
            value={getValueOfDate(filterParams[inputNameBasis + 'De'])}
            onChange={(value: any) => {
              if (typeValue === 'interval') {
                onChangeFilterParams({
                  ...filterParams,
                  [inputNameBasis + 'De']: value
                });
              }
            }}
          />}
      </div>
      {typeValue !== 'exact' &&
        <div className='half-padding'>
          <DatePicker
            placeholder="Até"
            value={getValueOfDate(filterParams[inputNameBasis + 'Ate'])}
            onChange={(value: any) => {
              if (typeValue === 'interval') {
                onChangeFilterParams({
                  ...filterParams,
                  [inputNameBasis + 'Ate']: value
                });
              }
            }}
          />
        </div>}
    </div>
  </>}

  <Modal open={isDateOptionsOpen} footer={null} closable={true} onCancel={() => setIsDateOptionsOpen(false)}>
        <div className="half-padding">
          <div className="half-padding">
            <Typography.Title level={5}>Escolha o intervalo automático</Typography.Title>
          </div>
          
          <Radio.Group onChange={handleChooseDateAutoInterval} className="inscricoes-index-opcoes-data half-padding">
            <Radio value='last-7d' className="half-padding">Últimos 7 dias</Radio>
            <Radio value='last-30d' className="half-padding">Últimos 30 dias</Radio>
            <Radio value='this-week' className="half-padding">Esta Semana</Radio>
            <Radio value='this-month' className="half-padding">Este mês</Radio>
          </Radio.Group>
          <div className="inscricoes-index-botoes-modal">
            <div className="half-padding" >
              <Button shape="round" onClick={() => setIsDateOptionsOpen(false)} icon={<ArrowLeftOutlined/>}>Voltar</Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Maqui_Filtro_Avancado_Data;