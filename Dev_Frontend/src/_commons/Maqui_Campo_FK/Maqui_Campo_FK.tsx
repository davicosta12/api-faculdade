import { Select } from 'antd';
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
  minWidth: number;
  onChangeKey?: (value: number) => void;
}

const Maqui_Campo_FK: FunctionComponent<Props> = (props) => {

  const {
    descriptionColumn,
    queryName,
    queryParameterName,
    minWidth,
    onChangeKey
  } = props;

  const [search, setSearch] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [maquiResult, setMaquiResult] = useState({} as GenericPagingDto<GetOptionDto>);

  const maquiService = new MaquiService();

  const searchAsync = async () => {
    const textPayload = search;

    try {
      const _maquiResult = await maquiService.getOptions(descriptionColumn, queryName, queryParameterName, textPayload);
      if (textPayload === search) {
        setMaquiResult(_maquiResult);
      }
    }
    catch (err: any) {
      toast.error(toastError(err), toastOptions(toast));
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

  return (
    
    <div className="half-padding">
      {maquiResult.result && <Select
        showSearch
        onSearch={(text: string) => setSearch(text)}
        optionFilterProp="children"
        style={{ minWidth: minWidth }}
        options={[
          { value: '', label: 'Selecione...' },
        ].concat(maquiResult.result.map(x => {
          return { value: x.cod + '', label: x.description }
        }))}
        onChange={(key: string) => handleChangeKey(key)}
        value={selectedValue}
      />}
    </div>
  )
}

export default Maqui_Campo_FK