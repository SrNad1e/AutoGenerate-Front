import type { InvoicingMutation } from '@/graphql/graphql';
import { CloseCircleOutlined } from '@ant-design/icons';
import type { ApolloError } from '@apollo/client';
import numeral from 'numeral';
import { Button, Col, Modal, Row, Space, Typography } from 'antd';

const { Title, Text } = Typography;

export interface Props {
  open: boolean;
  onCancel: () => void;
  generateCloseDaily: () => void;
  data: InvoicingMutation | null | undefined;
  error: ApolloError | undefined;
  loading: boolean;
}

const AlertSuccess = ({ open, onCancel, generateCloseDaily, data, error, loading }: Props) => {
  const footer = error ? (
    <Space>
      <Button loading={loading} onClick={onCancel}>
        Cerrar
      </Button>
    </Space>
  ) : (
    <Space>
      <Button loading={loading} type="primary" onClick={() => generateCloseDaily()}>
        Generar cierres
      </Button>
      <Button onClick={onCancel}>Cerrar</Button>
    </Space>
  );

  return (
    <Modal
      title={error ? 'Error al generar' : 'Facturación generada'}
      open={open}
      onCancel={onCancel}
      footer={footer}
      centered
    >
      {error ? (
        <Row justify="center">
          <Col
            span={24}
            style={{
              textAlign: 'center',
              fontSize: 50,
              color: 'red',
            }}
          >
            <CloseCircleOutlined />
          </Col>
          <Col span={24}>
            <Title
              style={{
                textAlign: 'center',
              }}
              level={3}
            >
              {error.message}
            </Title>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col span={24}>
            <Title
              level={4}
              style={{
                textAlign: 'center',
              }}
            >
              RESUMEN FACTURACIÓN
            </Title>
          </Col>
          <Col span={12}>
            <Title level={5}>Facturas por bancos</Title>
          </Col>
          <Col span={12}>
            <Text
              style={{
                width: '100%',
                textAlign: 'right',
              }}
            >
              {data?.invoicing?.invoiceQuantityBank}
            </Text>
          </Col>
          <Col span={12}>
            <Title level={5}>Facturas por efectivo</Title>
          </Col>
          <Col span={12}>
            <Text
              style={{
                width: '100%',
                textAlign: 'right',
              }}
            >
              {data?.invoicing?.invoiceQuantityCash}
            </Text>
          </Col>
          <Col span={12}>
            <Title level={5}>Total Bancos</Title>
          </Col>
          <Col span={12}>
            <Text
              style={{
                width: '100%',
                textAlign: 'right',
              }}
            >
              {numeral(data?.invoicing?.valueInvoicingBank).format('$ 0,0')}
            </Text>
          </Col>
          <Col span={12}>
            <Title level={5}>Total efectivo</Title>
          </Col>
          <Col span={12}>
            <Text
              style={{
                width: '100%',
                textAlign: 'right',
              }}
            >
              {numeral(data?.invoicing?.valueInvoicingCash).format('$ 0,0')}
            </Text>
          </Col>
        </Row>
      )}
    </Modal>
  );
};

export default AlertSuccess;
