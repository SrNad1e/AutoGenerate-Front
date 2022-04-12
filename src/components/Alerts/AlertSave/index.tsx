import { Button, Col, Modal, Row, Space, Typography } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, WarningOutlined } from '@ant-design/icons';

import { TypesAlert } from '../alert.data';
import { useStyle } from '../styles';

import styles from './index.less';

const { Title } = Typography;

export type Props = {
  message: string;
  visible: boolean;
  type: TYPES;
  onOk: (status?: string) => void;
  onCancel: () => void;
  status?: string;
};

/**
 * @description selecciona el icono dependiendo del tipo
 * @param type tipo de TYPES
 * @param color color del icono
 * @returns elemento react
 */
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

const AlertSave = ({ message, visible, onOk, onCancel, type, status }: Props) => {
  const color = TypesAlert[type]?.color;
  const style = useStyle(color);
  const icon = selectIcon(type, style.general);

  const onFinish = () => {
    onOk(status);
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
            <Button onClick={() => onFinish()} type="primary" size="large">
              Aceptar
            </Button>

            <Button onClick={onCancel} type="primary" size="large">
              Cancelar
            </Button>
          </Space>
        </Col>
      </Row>
    </Modal>
  );
};
export default AlertSave;
