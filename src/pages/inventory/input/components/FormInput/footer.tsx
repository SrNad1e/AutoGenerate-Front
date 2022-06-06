import { Affix, Button, Card, Col, Divider, Row, Space, Typography } from 'antd';

import type { DetailInput, StockInput } from '@/graphql/graphql';

import styles from '../styles.less';

const { Title } = Typography;

export type Props = {
  input: Partial<StockInput> | undefined;
  saveInput: (status?: string) => void;
  details: Partial<DetailInput & { action: string }>[];
  allowEdit: boolean;
};

const Footer = ({ input, saveInput, details, allowEdit }: Props) => {
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
          <Col xs={24} md={3}>
            <Button
              disabled={!allowEdit}
              type={input?._id ? 'primary' : 'default'}
              danger={!!input?._id}
              onClick={() => saveInput('cancelled')}
            >
              Cancelar
            </Button>
          </Col>
          <Col xs={24} md={16}>
            {renderResumen()}
          </Col>
          <Col xs={24} md={5}>
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
