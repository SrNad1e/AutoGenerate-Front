import { CheckCircleOutlined, CloseCircleOutlined, WarningOutlined } from '@ant-design/icons';
import { Button, Col, Modal, Row, Typography } from 'antd';
import { TypesAlert } from '../alert.data';

import styles from './index.less';

const { Title } = Typography;

/**
 * @description selecciona el icono dependiendo del tipo
 * @param type tipo de TYPES
 * @param color color del icono
 * @returns elemento react
 */
const selectIcon = (type: TYPES, color: string): JSX.Element => {
  const style: React.CSSProperties | undefined = {
    color,
    fontSize: 50,
  };
  switch (type) {
    case 'error':
      return <CloseCircleOutlined style={style} />;
    case 'success':
      return <CheckCircleOutlined style={style} />;
    default:
      return <WarningOutlined style={style} />;
  }
};

const AlertInformation = ({
  visible = false,
  type = 'error',
  message = '',
  onCancel,
}: ALERT.AlertInformationProps) => {
  const color = TypesAlert[type]?.color;
  const icon = selectIcon(type, color);
  return (
    <Modal
      bodyStyle={{ padding: '30px 0' }}
      centered
      closable={false}
      visible={visible}
      footer={false}
    >
      <Row className={styles.body} gutter={[16, 16]}>
        <Col span={24}>{icon}</Col>
        <Col span={24}>
          <Title level={3}>{message}</Title>
        </Col>
        <Col span={24}>
          <Button
            onClick={onCancel}
            color={color}
            type="primary"
            className={styles.button}
            size="large"
            style={{
              backgroundColor: color,
              borderColor: color,
            }}
          >
            Aceptar
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};
export default AlertInformation;
