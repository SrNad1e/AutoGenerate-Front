import { Affix, Card, Col, Row, Space, Button, Typography, Divider } from 'antd';

import type { DetailRequest, StockRequest } from '@/graphql/graphql';
import { ActionDetailRequest } from '@/graphql/graphql';
import { StatusStockRequest } from '@/graphql/graphql';

import styles from '../styles.less';
import style from './styles';

const { Title } = Typography;

export type Props = {
  request: Partial<StockRequest> | undefined;
  saveRequest: (status?: StatusStockRequest) => void;
  details: Partial<DetailRequest & { action: string }>[];
  allowEdit: boolean;
};

const Footer = ({ request, saveRequest, details, allowEdit }: Props) => {
  /**
   * @description genera la vista del resumen
   * @returns componente para la vista de resumen
   */
  const renderResumen = () => {
    return (
      <Space align="center" className={styles.alignCenter}>
        <Title level={3}>
          REFERENCIAS:{' '}
          {details.filter((detail) => detail?.action !== ActionDetailRequest.Delete).length}
          <Divider type="vertical" />
          PRODUCTOS:{' '}
          {details
            .filter((detail) => detail?.action !== ActionDetailRequest.Delete)
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
              type={request?._id ? 'primary' : 'default'}
              danger={!!request?._id}
              style={style.buttonR}
              onClick={() => saveRequest(StatusStockRequest.Cancelled)}
            >
              Cancelar
            </Button>
          </Col>
          <Col xs={24} md={16}>
            {renderResumen()}
          </Col>
          <Col xs={24} md={5}>
            <Space className={styles.alignRigth}>
              <Button
                disabled={!allowEdit}
                style={style.buttonR}
                onClick={() => saveRequest(StatusStockRequest.Open)}
              >
                Guardar
              </Button>
              <Button
                type="primary"
                disabled={!allowEdit}
                style={style.buttonR}
                onClick={() => saveRequest(StatusStockRequest.Pending)}
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
