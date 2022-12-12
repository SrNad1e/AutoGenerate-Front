import { Button, Col, Modal, Row, Space, Typography } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, WarningOutlined } from '@ant-design/icons';

import styles from './index.less';

const { Title } = Typography;

export type Props = {
  message: string;
  visible: boolean;
  type: TYPES;
  onOk?: any;
  onCancel?: () => void;
  arr?: any[];
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

const AlertConfirm = ({ message, visible, onOk, onCancel, type, arr }: Props) => {
  const icon = selectIcon(type, styles.general);

  const onFinish = () => {
    if (onOk) {
      onOk();
      onCancel();
    } else {
      onCancel();
    }
  };

  const discard = async (array: any[]) => {
    await array?.shift();
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
              onClick={() => discard(arr)}
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
