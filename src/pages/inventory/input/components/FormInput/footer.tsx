import { Affix, Button, Card, Col, Divider, Row, Space, Typography } from 'antd';
import styles from '../styles.less';

const { Title } = Typography;

export type Props = {
  input: Partial<INPUT.Input> | undefined;
  saveInput: (status?: string) => void;
  details: Partial<INPUT.DetailInputProps[]>;
};

const Footer = ({ input, saveInput, details }: Props) => {
  const allowEdit = input?.status === 'open';

  const renderResumen = () => {
    return (
      <Space align="center" className={styles.alignCenter}>
        <Title level={3}>
          REFERENCIAS: {details.filter((detail) => detail?.action !== 'delete').length}
          <Divider type="vertical" />
          PRODUCTOS:{' '}
          {details
            .filter((detail) => detail?.action !== 'delete')
            .reduce((sum, detail) => sum + (detail?.quantity || 0), 0)}
        </Title>
      </Space>
    );
  };

  return (
    <Affix offsetBottom={0}>
      <Card>
        <Row>
          <Col span={4}>
            <Button
              disabled={!allowEdit}
              type={input?._id ? 'primary' : 'default'}
              danger={!!input?._id}
              onClick={() => saveInput('cancelled')}
            >
              Cancelar
            </Button>
          </Col>
          <Col span={16}>{renderResumen()}</Col>
          <Col span={4}>
            <Space align="end" className={styles.alignRigth}>
              <Button disabled={!allowEdit} onClick={() => saveInput()}>
                Guardar
              </Button>
              <Button type="primary" disabled={!allowEdit} onClick={() => saveInput('confirmed')}>
                Enviar
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>
    </Affix>
  );
};

export default Footer;
