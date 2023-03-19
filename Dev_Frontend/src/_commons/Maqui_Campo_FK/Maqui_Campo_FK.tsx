import { Select, Spin } from 'antd';
import { FunctionComponent, useEffect, useState } from "react"
import MaquiService from '../services/MaquiService';
import GenericPagingDto from '../../services/GenericDto/GenericPagingDto';
import GetOptionDto from '../services/dto/GetOptionDto';
import { toast } from 'react-toastify';
import { toastError, toastOptions } from '../../misc/utils/utils';

interface Props {
  descriptionColumn: string;
  queryName: string;
  queryParameterName: string;
  comSelecione: boolean;
  minWidth: number;
  onChangeKey?: (value: number) => void;
}

const Maqui_Campo_FK: FunctionComponent<Props> = (props) => {

  const {
    descriptionColumn,
    queryName,
    queryParameterName,
    comSelecione,
    minWidth,
    onChangeKey
  } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [maquiResult, setMaquiResult] = useState({} as GenericPagingDto<GetOptionDto>);

  const maquiService = new MaquiService();

  const searchAsync = async () => {
    setIsLoading(true);
    const textPayload = search;

    try {
      const _maquiResult = await maquiService.getOptions(descriptionColumn, queryName, queryParameterName, textPayload);
      if (textPayload === search) {
        setMaquiResult(_maquiResult);
      }
    } catch (err: any) {
      toast.error(toastError(err), toastOptions(toast));
    } finally {
      if (textPayload === search) {
        setIsLoading(false);
      }
    }
  }

  const handleChangeKey = (key: string) => {
    setSelectedValue(key);
    if (!isNaN(+key) && onChangeKey) {
      onChangeKey(+key);
    }
  }

  useEffect(() => {
    searchAsync();
  }, []);

  useEffect(() => {
    searchAsync();
  }, [search]);

  let initialArray: {value: string, label: string}[] = comSelecione ? [
    { value: '', label: 'Selecione...' },
  ] : [];

  let options: {value: string, label: string}[] = maquiResult.result ? initialArray.concat(maquiResult.result.map(x => {
    return { value: x.cod + '', label: x.description }
  })) : initialArray;

  return (
    
    <div className="half-padding">
      {maquiResult.result && <Select
        showSearch
        onSearch={(text: string) => setSearch(text)}
        filterOption={false}
        style={{ minWidth: minWidth }}
        options={options}
        notFoundContent={isLoading ? <Spin className='antd-top-padding' /> : null}
        onChange={(key: string) => handleChangeKey(key)}
        value={selectedValue}
      />}
    </div>
  )
}

export default Maqui_Campo_FK