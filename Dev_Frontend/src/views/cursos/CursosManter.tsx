import { ArrowLeftOutlined, SaveFilled } from "@ant-design/icons";
import { Typography, Input, Button, InputNumber } from "antd";
import { useParams } from "react-router-dom";
import NavigationWrapper from "../_navigation/NavigationWrapper";

function CursosManter(props: { eAlteracao: boolean }) {

  const { id } = useParams();
  
  return (
      
    <NavigationWrapper>
      <div className="half-padding">
        <div className="half-padding">
          <Typography.Title level={3}>{props.eAlteracao ? "Alteração de Curso" : "Inserção de Curso"}</Typography.Title>
        </div>
        <div className="half-padding">
          <Input placeholder="Nome" />
        </div>
        <div className="half-padding">
          <InputNumber placeholder="Limite de Semestres" />
        </div>
        <div className="agrupar-horizontalmente">
          <div className="half-padding" >
            <Button shape="round" icon={<ArrowLeftOutlined/>}>Voltar</Button>
          </div>
          <div className="half-padding" >
            <Button type="primary" shape="round" icon={<SaveFilled/>}>Confirmar</Button>
          </div>
        </div>
      </div>
    </NavigationWrapper>
  )
}

export default CursosManter;
