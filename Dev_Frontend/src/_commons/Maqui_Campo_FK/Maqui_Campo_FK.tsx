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
  codValue?: number | undefined;
  onChangeCodValue?: (value: number | undefined) => void;
}

const Maqui_Campo_FK: FunctionComponent<Props> = (props) => {

  const {
    descriptionColumn,
    queryName,
    queryParameterName,
    comSelecione,
    minWidth,
    codValue,
    onChangeCodValue
  } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [maquiResult, setMaquiResult] = useState({} as GenericPagingDto<GetOptionDto>);
  const [appendedOption, setAppendedOption] = useState<{value: string, label: string} | undefined>(undefined);
  const [options, setOptions] = useState<{value: string, label: string}[]>([]);

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

  const searchOptionAsync = async () => {

    setIsLoading(true);
    const codPayload = codValue;

    try {
      const _option = await maquiService.getOptionByCod(codPayload ?? 0, descriptionColumn, queryName);
      if (codPayload === codValue) {
        setAppendedOption({ value: _option.cod + '', label: _option.description });
      }
    } catch (err: any) {
      toast.error(toastError(err), toastOptions(toast));
    } finally {
      if (codPayload === codValue) {
        setIsLoading(false);
      }
    }
  }

  const handleChangeKey = (key: string) => {
    setSelectedValue(key);
    if (key !== '' && !isNaN(+key) && onChangeCodValue) {
      console.log('onChangeCodValue');
      console.log(+key);
      
      onChangeCodValue(+key);
    } else {
      if (onChangeCodValue) {
        console.log('onChangeCodValue');
        console.log(undefined);
        onChangeCodValue(undefined);
      }
    }
  }

  useEffect(() => {
    searchAsync();
  }, []);

  useEffect(() => {
    searchAsync();
  }, [search]);

  useEffect(() => {
    if (codValue === undefined) {
      setSelectedValue('');
    } else {
      const alreadyFound = options.find(x => x.value === codValue + '');
      if (alreadyFound) {
        setSelectedValue(codValue + '')
      } else {
        searchOptionAsync();
      }
    }
  }, [codValue])

  let initialArray: {value: string, label: string}[] = comSelecione ? [
    { value: '', label: 'Selecione...' },
  ] : [];

  useEffect(() => {
    let optionsCalc: {value: string, label: string}[] = [...initialArray];
    if (maquiResult.result) {
      optionsCalc = optionsCalc.concat(maquiResult.result.map(x => 
        ({ value: x.cod + '', label: x.description })
      ));
    }
    if (appendedOption) {
      optionsCalc = optionsCalc.concat([appendedOption]);
    }
    console.log('optionsCalc:')
    console.log(optionsCalc);
    
    setOptions(optionsCalc);
  }, [maquiResult, appendedOption]);

  useEffect(() => {
    console.log('verifying... codValue')
    console.log(codValue);
    
    if (codValue !== undefined && (codValue + '') !== selectedValue) {
      setSelectedValue(codValue + '');
    }
  }, [options]);

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