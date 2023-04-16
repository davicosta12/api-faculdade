import { Typography, Input, Collapse, Tag, Select, Button, Table, Dropdown, Modal, InputNumber, Spin } from 'antd';
import { ArrowLeftOutlined, DeleteFilled, MoreOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { FunctionComponent } from "react"

interface Props {
  openConfirm: boolean;
  setOpenConfirm: (value: boolean) => void;
  onAction: any;
  loading: boolean;
  isAllowed: boolean;
  isAllowedLabel: string;
  isNotAllowedLabel: string;
  isLoadingContent: boolean;
}

const ModalConfirm: FunctionComponent<Props> = (props) => {

  const {
    openConfirm,
    setOpenConfirm,
    onAction,
    loading,
    isAllowed,
    isAllowedLabel,
    isNotAllowedLabel,
    isLoadingContent,
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
      {isLoadingContent ? <Spin /> : <div className="half-padding">
        <div className="half-padding">
          <Typography.Title level={5}>{isAllowed ? isAllowedLabel : isNotAllowedLabel}</Typography.Title>
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
          {isAllowed && <div className="half-padding" >
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
          </div>}
        </div>
      </div>}
    </Modal>
  )
}

export default ModalConfirm