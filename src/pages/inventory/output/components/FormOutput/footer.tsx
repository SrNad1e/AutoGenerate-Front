import { Affix, Button, Card, Col, Divider, Row, Space, Typography } from 'antd';

import type { DetailOutput, StockOutput } from '@/graphql/graphql';
import { StatusStockOutput } from '@/graphql/graphql';
import { ActionDetailOutput } from '@/graphql/graphql';

import styles from '../styles.less';
import style from './styles';

const { Title } = Typography;

export type Props = {
  output: Partial<StockOutput> | undefined;
  saveOutput: (status?: StatusStockOutput) => void;
  details: Partial<DetailOutput & { action: ActionDetailOutput }>[];
  allowEdit: boolean;
};

const Footer = ({ output, saveOutput, details, allowEdit }: Props) => {
  const renderResumen = () => {
    return (
      <Space align="center" className={styles.alignCenter}>
        <Title level={3}>
          REFERENCIAS:{' '}
          {details.filter((detail) => detail?.action !== ActionDetailOutput.Delete).length}
          <Divider type="vertical" />
          PRODUCTOS:{' '}
          {details
            .filter((detail) => detail?.action !== ActionDetailOutput.Delete)
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
              type={output?._id ? 'primary' : 'default'}
              danger={!!output?._id}
              onClick={() => saveOutput(StatusStockOutput.Cancelled)}
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
                disabled={!allowEdit}
                style={style.buttonR}
                onClick={() => saveOutput(StatusStockOutput.Open)}
              >
                Guardar
              </Button>
              <Button
                style={style.buttonR}
                type="primary"
                disabled={!allowEdit}
                onClick={() => saveOutput(StatusStockOutput.Confirmed)}
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
