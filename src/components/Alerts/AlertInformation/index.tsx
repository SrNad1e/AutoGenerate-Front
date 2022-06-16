import { CheckCircleOutlined, CloseCircleOutlined, WarningOutlined } from '@ant-design/icons';
import { Button, Col, Modal, Row, Typography } from 'antd';
import { useHistory } from 'umi';

import { TypesAlert } from '../alert.data';
import { useStyle } from '../styles';

const { Title } = Typography;

export type Props = {
  visible: boolean | undefined;
  message: string | undefined | React.ReactElement;
  type: TYPES;
  onCancel?: () => void;
  redirect?: string;
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

const AlertInformation = ({
  visible = false,
  type = 'error',
  message = '',
  onCancel,
  redirect,
}: Props) => {
  const color = TypesAlert[type]?.color;
  const style = useStyle(color);
  const icon = selectIcon(type, style.general);
  const history = useHistory();

  const onClick = () => {
    if (redirect) {
      history.push(redirect);
    } else {
      if (onCancel) {
        onCancel();
      }
    }
  };

  return (
    <Modal
      style={{ justifyContent: 'center' }}
      bodyStyle={style.bodyStyle}
      centered={true}
      closable={false}
      visible={visible}
      footer={false}
      width={500}
    >
      <Row gutter={[16, 16]}>
        <Col span={24} style={style.col}>
          {icon}
        </Col>
        <Col span={24} style={style.col}>
          <Title level={3} style={{ padding: 20 }}>
            {message}
          </Title>
        </Col>
        <Col span={24}>
          <Button onClick={onClick} color={color} type="primary" size="large" style={style.button}>
            Aceptar
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};
export default AlertInformation;
