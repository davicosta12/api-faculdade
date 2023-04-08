import { Select, Spin, Typography } from 'antd';
import { FunctionComponent, useEffect, useState } from "react"
import MaquiService from '../services/MaquiService';
import GenericPagingDto from '../../services/GenericDto/GenericPagingDto';
import GetOptionDto from '../services/dto/GetOptionDto';
import { toast } from 'react-toastify';
import { toastError, toastOptions } from '../../misc/utils/utils';
import { DatePicker, InputNumber } from "antd";
import { FieldRenderProps } from 'react-final-form';
import { ContainerFormMessageError, FormMessageError, Label, RequiredSpan } from "../../layout/general";

interface Props extends FieldRenderProps<any, HTMLElement> {
  label: string;
  descriptionColumn: string;
  queryName: string;
  queryParameterName: string;
  comSelecione: boolean;
}

export const FinalInputFK: FunctionComponent<Props> = ({
  input: { name, onChange, onBlur, type, value },
  meta: { touched, active, initial, error, dirty, },
  label,
  descriptionColumn,
  queryName,
  queryParameterName,
  comSelecione,
  ...custom
}: Props) => {

  const inputStyles = {
    width: '100%',
    marginTop: 3,
    ...custom.styles
  };

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
    const codPayload = value;

    try {
      const _option = await maquiService.getOptionByCod(codPayload ?? 0, descriptionColumn, queryName);
      if (codPayload === value) {
        setAppendedOption({ value: _option.cod + '', label: _option.description });
      }
    } catch (err: any) {
      toast.error(toastError(err), toastOptions(toast));
    } finally {
      if (codPayload === value) {
        setIsLoading(false);
      }
    }
  }

  const handleChangeKey = (key: string) => {
    setSelectedValue(key);
    if (key !== '' && !isNaN(+key)) {
      onChange(key);
      // onChangeCodValue(+key);
    } else {
      onChange(undefined);
      // onChangeCodValue(undefined);
    }
  }

  useEffect(() => {
    searchAsync();
  }, []);

  useEffect(() => {
    searchAsync();
  }, [search]);

  useEffect(() => {
    if (value === undefined || value === '') {
      setSelectedValue('');
    } else {
      const alreadyFound = options.find(x => x.value === value + '');
      if (alreadyFound) {
        setSelectedValue(value + '')
      } else {
        searchOptionAsync();
      }
    }
  }, [value])

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
    
    setOptions(optionsCalc);
  }, [maquiResult, appendedOption]);

  useEffect(() => {
    if (value !== undefined && (value + '') !== selectedValue) {
      setSelectedValue(value + '');
    }
  }, [options]);

  return (
    <>
      {custom.required && <RequiredSpan>*</RequiredSpan>}
      <Label htmlFor={name}> {label} </Label>
      {maquiResult.result ? <Select
        id={name}
        showSearch
        onSearch={(text: string) => setSearch(text)}
        filterOption={false}
        style={inputStyles}
        options={options}
        notFoundContent={isLoading ? <Spin className='antd-top-padding' /> : null}
        onChange={(key: string) => handleChangeKey(key)}
        value={selectedValue}
        onBlur={(event) => onBlur(event)}
        status={error && touched ? 'error' : ''}
        /> : <Spin className='antd-top-padding' /> }
      {error && touched && custom.required
        ?
        <ContainerFormMessageError>
          <FormMessageError>{error}</FormMessageError>
        </ContainerFormMessageError> : null}
    </>
  )
}