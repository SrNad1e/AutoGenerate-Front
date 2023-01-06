import { Button, Col, Modal, Row, Space, Typography } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, WarningOutlined } from '@ant-design/icons';

import styles from './index.less';
import { useStyle } from '../styles';
import { TypesAlert } from '../alert.data';

const { Title } = Typography;

export type Props = {
  message: string;
  visible: boolean;
  type: TYPES;
  onOk?: any;
  onCancel: () => void;
  arr?: any[];
  transfer?: boolean;
  setDetail?: any;
  onCloseConfirm?: any;
  setUsed?: any;
  keysSelected?: string[];
  details?: any;
  setRequest?: any;
  requestSelected?: any;
  request?: any;
  discardProduct?: any;
  detailRequest?: any[];
  setDetailRequest?: any;
  setRequestSelected?: any;
  used?: string[];
  setSaveDetails?: any;
  setIsDisabled: any;
};

const selectIcon = (type: TYPES, style: React.CSSProperties | undefined): JSX.Element => {
  switch (type) {
    case 'error':
      return <CloseCircleOutlined style={style} />;
    case 'success':
      return <CheckCircleOutlined style={style} />;
    default:
      return <WarningOutlined style={style} />;
  }
};

const AlertConfirm = ({
  message,
  visible,
  onOk,
  setDetail,
  onCancel,
  type,
  arr,
  transfer,
  onCloseConfirm,
  setUsed,
  keysSelected,
  details,
  setRequest,
  requestSelected,
  request,
  discardProduct,
  setDetailRequest,
  setRequestSelected,
  used,
  setSaveDetails,
  setIsDisabled,
}: Props) => {
  const color = TypesAlert[type]?.color;
  const style = useStyle(color);
  const icon = selectIcon(type, style.general);

  const onFinish = async () => {
    if (!transfer) {
      if (onOk) {
        onOk();
        onCancel();
      } else {
        onCancel();
      }
    } else {
      if (discardProduct) {
        setIsDisabled(false);
        onCancel();
      }
      if (arr && !discardProduct) {
        setDetail([...arr, ...details]);
        setSaveDetails([]);
      }
      if (!discardProduct) {
        await onCancel();
        setUsed([...keysSelected, ...used]);
        setRequest(request.concat(requestSelected));
        onCloseConfirm();
        setRequestSelected([]);
      }
    }
  };

  const discard = async (array: any[]) => {
    await array?.shift();
    onCancel();
  };

  const onCloseF = async (detail: any[]) => {
    if (discardProduct) {
      setDetailRequest([...detail?.splice(0, detail.length, detail[0])]);
    }
    onCancel();
  };

  return (
    <Modal centered={true} closable={false} footer={false} visible={visible}>
      <Row gutter={[15, 16]} justify="center" align="middle">
        <Col span={24} className={styles.centerCol}>
          {icon}
        </Col>
        <Col span={24} className={styles.centerCol}>
          <Title level={3}>{message}</Title>
        </Col>
        <Col span={24} className={styles.centerCol}>
          <Space>
            <Button style={{ borderRadius: 5 }} onClick={onFinish} type="primary" size="large">
              Aceptar
            </Button>
            <Button
              style={{ borderRadius: 5 }}
              onClick={transfer ? () => onCloseF(arr) : () => discard(arr)}
              type="ghost"
              danger
              size="large"
            >
              Descartar
            </Button>
          </Space>
        </Col>
      </Row>
    </Modal>
  );
};
export default AlertConfirm;
