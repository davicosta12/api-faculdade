import { Typography, Input, Collapse, Tag, Select, Button, Table, Dropdown, Modal, InputNumber } from 'antd';
import { ArrowLeftOutlined, DeleteFilled, MoreOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { FunctionComponent } from "react"

interface Props {
  openConfirm: boolean;
  setOpenConfirm: (value: boolean) => void;
  onAction: any;
  loading: boolean;
}

const ModalConfirm: FunctionComponent<Props> = (props) => {

  const {
    openConfirm,
    setOpenConfirm,
    onAction,
    loading
  } = props;

  const handleAction = () => {
    onAction();
  }

  return (
    <Modal
      open={openConfirm}
      footer={null}
      closable={true}
      onCancel={() => setOpenConfirm(false)}
    >
      <div className="half-padding">
        <div className="half-padding">
          <Typography.Title level={5}>Deseja excluir o Curso? A ação não pode ser desfeita.</Typography.Title>
        </div>
        <div className="cursos-index-botoes-modal">
          <div className="half-padding" >
            <Button
              shape="round"
              onClick={() => setOpenConfirm(false)}
              icon={<ArrowLeftOutlined />}
            >Voltar
            </Button>
          </div>
          <div className="half-padding" >
            <Button
              danger
              type="primary"
              shape="round"
              icon={<DeleteFilled />}
              loading={loading}
              onClick={handleAction}
            >
              Excluir
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ModalConfirm