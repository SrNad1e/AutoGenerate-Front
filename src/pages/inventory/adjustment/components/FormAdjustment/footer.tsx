import { Affix, Button, Card, Col, Divider, Row, Space, Typography } from 'antd';

import type { DetailAdjustment, StockAdjustment } from '@/graphql/graphql';
import { ActionDetailAdjustment } from '@/graphql/graphql';
import { StatusStockAdjustment } from '@/graphql/graphql';

import styles from '../styles.less';
import style from './styles';

const { Title } = Typography;

export type Props = {
  adjustment: Partial<StockAdjustment> | undefined;
  saveAdjustment: (status?: StatusStockAdjustment) => void;
  details: Partial<DetailAdjustment & { action: string }>[];
  allowEdit: boolean;
};

const Footer = ({ adjustment, saveAdjustment, details, allowEdit }: Props) => {
  const renderResumen = () => {
    return (
      <Space align="center" className={styles.alignCenter}>
        <Title level={3}>
          REFERENCIAS:{' '}
          {details.filter((detail) => detail?.action !== ActionDetailAdjustment.Delete).length}
          <Divider type="vertical" />
          PRODUCTOS:{' '}
          {details
            .filter((detail) => detail?.action !== ActionDetailAdjustment.Delete)
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
              style={style.buttonR}
              disabled={!allowEdit}
              type={adjustment?._id ? 'primary' : 'default'}
              danger={!!adjustment?._id}
              onClick={() => saveAdjustment(StatusStockAdjustment.Cancelled)}
            >
              Cancelar
            </Button>
          </Col>
          <Col xs={24} md={16}>
            {renderResumen()}
          </Col>
          <Col xs={24} md={5}>
            <Space align="end" className={styles.alignRigth}>
              <Button
                style={style.buttonR}
                disabled={!allowEdit}
                onClick={() => saveAdjustment(StatusStockAdjustment.Open)}
              >
                Guardar
              </Button>
              <Button
                style={style.buttonR}
                type="primary"
                disabled={!allowEdit}
                onClick={() => saveAdjustment(StatusStockAdjustment.Confirmed)}
              >
                Confirmar
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>
    </Affix>
  );
};

export default Footer;
