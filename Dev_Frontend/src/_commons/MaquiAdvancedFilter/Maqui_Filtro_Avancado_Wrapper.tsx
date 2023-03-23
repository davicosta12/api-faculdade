import { Collapse, Tag } from "antd";
import { FunctionComponent } from "react";

interface Props extends React.PropsWithChildren {
    allLabelNames: string[];
    selectedLabelNames: string[];
    onChangeSelectedLabelNames: (nextValue: string[]) => void;
    show: boolean;
    onChangeShow: (nextValue: boolean) => void;
}
  
const Maqui_Filtro_Avancado_Wrapper: FunctionComponent<Props> = (props) => {

  const {
    allLabelNames,
    selectedLabelNames,
    onChangeSelectedLabelNames,
    show,
    onChangeShow,
    children
  } = props;

  const handleChangeActivePanels = (activePanels: string | string[]) => {
    onChangeShow(activePanels.length > 0);
  }

  const handleCheckAvancado = (labelNameChecked: string, checked: boolean) => {
    const nextSelectedLabelNames = checked
      ? [...selectedLabelNames, labelNameChecked]
      : selectedLabelNames.filter(x => x !== labelNameChecked);
    onChangeSelectedLabelNames(nextSelectedLabelNames);
  };

  return (
    <>
        <div className='half-padding'>
        <Collapse
          onChange={handleChangeActivePanels}
          defaultActiveKey={show ? ["filtros-avancados"] : []}
        >
          <Collapse.Panel header="Filtros Avançados" key="filtros-avancados">
            <div className="half-padding">
              <div className="half-padding ">
                {allLabelNames.map(labelName => (
                  <Tag.CheckableTag
                    key={labelName}
                    checked={selectedLabelNames.includes(labelName)}
                    onChange={(checked) => handleCheckAvancado(labelName, checked)}
                  >
                    {labelName}
                  </Tag.CheckableTag>
                ))}
              </div>
              {children}
            </div>
            </Collapse.Panel>
          </Collapse>
        </div>
    </>
  )
}

export default Maqui_Filtro_Avancado_Wrapper;