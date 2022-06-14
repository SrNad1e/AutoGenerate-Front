import { ActionDetailTransfer } from '@/graphql/graphql';
import type { DetailTransfer, StockTransfer } from '@/graphql/graphql';
import { StatusStockTransfer } from '@/graphql/graphql';
import { Affix, Button, Card, Col, Divider, Row, Space, Typography } from 'antd';
import styles from '../styles.less';

const { Title } = Typography;

type Props = {
  transfer: Partial<StockTransfer> | undefined;
  saveTransfer: (status?: StatusStockTransfer) => void;
  details: Partial<DetailTransfer & { action: ActionDetailTransfer }>[];
  allowEdit: boolean;
};

const Footer = ({ transfer, saveTransfer, details, allowEdit }: Props) => {
  const renderResumen = () => (
    <Space className={styles.centerFooter}>
      <Title level={3}>
        REFERENCIAS:{' '}
        {details.filter((detail) => detail?.action !== ActionDetailTransfer.Delete).length}
        <Divider type="vertical" />
        PRODUCTOS:{' '}
        {details
          .filter((detail) => detail?.action !== ActionDetailTransfer.Delete)
          .reduce((sum, detail) => sum + (detail?.quantity || 0), 0)}
      </Title>
    </Space>
  );

  return (
    <Affix offsetBottom={0}>
      <Card>
        <Row>
          <Col xs={24} md={3}>
            <Button
              disabled={!allowEdit}
              type={transfer?._id ? 'primary' : 'default'}
              danger={!!transfer?._id}
              onClick={() => saveTransfer(StatusStockTransfer.Cancelled)}
            >
              Cancelar
            </Button>
          </Col>
          <Col xs={24} md={16}>
            {renderResumen()}
          </Col>
          <Col xs={24} md={5}>
            <Space align="end" className={styles.alignRight}>
              <Button disabled={!allowEdit} onClick={() => saveTransfer()}>
                Guardar
              </Button>
              <Button
                type="primary"
                disabled={!allowEdit}
                onClick={() => saveTransfer(StatusStockTransfer.Sent)}
              >
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
