import {
  CheckCircleOutlined,
  DollarOutlined,
  PlusOutlined,
  PrinterOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Popconfirm, Row, Tag, Tooltip, Typography } from 'antd';
import numeral from 'numeral';

const { Title, Text } = Typography;

export type Props = {
  order?: Partial<ORDER.Order>;
  setOrder: (data: Partial<ORDER.Order>) => void;
};

const Resumen = ({ order }: Props) => {
  return (
    <Card
      style={{ borderRight: 'solid 2px black' }}
      bodyStyle={{ padding: 0, paddingTop: 10, paddingLeft: 10, height: '95vh' }}
    >
      <Row
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          height: '50%',
          overflowY: 'scroll',
        }}
      >
        <Col span={18}>
          <Title level={4}>Productos:</Title>
        </Col>
        <Col span={6}>
          <Title level={4}>
            Total: {order?.details?.reduce((sum, details) => sum + details.quantity, 0)}
          </Title>
        </Col>
      </Row>
      <Row>
        <Col
          span={24}
          style={{
            borderBottom: 'solid 1px black',
            borderTop: 'solid 1px black',
            padding: 5,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Title level={3}>Cliente:</Title>
            <Popconfirm
              title={'Estas seguro?'}
              onConfirm={() => {}}
              okText="Cambiar"
              cancelText="Cancelar"
            >
              <Button
                icon={<UserOutlined />}
                shape="round"
                size="small"
                type="primary"
                style={{ backgroundColor: 'white', color: '#dc9575' }}
              >
                Cambiar
              </Button>
            </Popconfirm>
          </div>
          <Row>
            <Col span={24}>
              <div
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
              >
                <Text>
                  {order?.customer?.firstName} {order?.customer?.lastName}
                </Text>
                <div>
                  <Tag color="volcano">{order?.customer?.type?.name}</Tag>
                  <Tooltip title={'Activo'}>
                    <Tag color={'#87d068'}>
                      <CheckCircleOutlined />
                    </Tag>
                  </Tooltip>
                </div>
              </div>
            </Col>
            <Col span={24} style={{ marginTop: 10 }}>
              <div
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
              >
                <Title level={5}>CC.</Title>
                <Text>{order?.customer?.document}</Text>
              </div>
            </Col>
          </Row>
        </Col>
        <Col
          span={24}
          style={{
            borderBottom: 'solid 1px black',
          }}
        >
          <Row style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
            <Col span={12} style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <Title level={4} style={{ paddingLeft: 5 }}>
                Total:
              </Title>
            </Col>
            <Col
              span={12}
              style={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}
            >
              <Title level={4} style={{ paddingRight: 5 }}>
                {numeral(order?.summary?.total).format('$ 0,0')}
              </Title>
            </Col>
          </Row>
          <Row style={{ display: 'flex', alignItems: 'center' }}>
            <Col span={12} style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <Title level={4} style={{ paddingLeft: 5 }}>
                Subtotal:
              </Title>
            </Col>
            <Col
              span={12}
              style={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}
            >
              <Title level={4} style={{ paddingRight: 5 }}>
                {numeral(order?.summary?.subtotal).format('$ 0,0')}
              </Title>
            </Col>
          </Row>
          <Row style={{ display: 'flex', alignItems: 'center' }}>
            <Col span={12} style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <Title level={4} style={{ paddingLeft: 5 }}>
                Descuento:
              </Title>
            </Col>
            <Col
              span={12}
              style={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}
            >
              <Title level={4} style={{ paddingRight: 5 }}>
                {numeral(order?.summary?.discount).format('$ 0,0')}
              </Title>
            </Col>
          </Row>
          <Row style={{ display: 'flex', alignItems: 'center' }}>
            <Col
              span={12}
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Title level={4} style={{ paddingLeft: 5 }}>
                Envío:
              </Title>
            </Col>
            <Col span={12} style={{ display: 'flex', justifyContent: 'right' }}>
              <Title level={4} style={{ paddingRight: 5 }}>
                {'N/A'}
              </Title>
            </Col>
            <Col
              span={12}
              style={{ display: 'flex', justifyContent: 'right', marginLeft: 20, marginBottom: 10 }}
            >
              <Button
                shape="round"
                icon={<PlusOutlined />}
                size="small"
                type="primary"
                style={{ backgroundColor: 'white', color: '#dc9575' }}
              >
                Agregar Envio
              </Button>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row style={{ display: 'flex', alignItems: 'center' }}>
            <Col
              span={8}
              style={{ display: 'flex', alignItems: 'center', padding: 15, marginTop: 10 }}
            >
              <Button
                icon={<DollarOutlined />}
                type="primary"
                style={{ fontSize: 25, padding: 15, width: 'auto', height: 'auto' }}
                onClick={() => {}}
              >
                PAGAR
              </Button>
            </Col>
            <Col
              span={10}
              style={{
                display: 'flex',
                justifyContent: 'right',
                marginLeft: 20,
              }}
            >
              <Button
                shape="round"
                icon={<PrinterOutlined />}
                size="small"
                type="primary"
                style={{ backgroundColor: 'white', color: '#dc9575', width: 150 }}
              >
                Imprimir
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default Resumen;
