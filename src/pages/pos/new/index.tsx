import {
  CheckCircleOutlined,
  DollarOutlined,
  PlusOutlined,
  //PrinterOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Popconfirm, Row, Tag, Tooltip, Typography } from 'antd';

const { Title, Text } = Typography;

const PosList = () => {
  return (
    <Card
      style={{ height: '95vh', border: 'solid 2px black', width: '25%', borderRadius: '1%' }}
      bodyStyle={{ padding: 0, paddingTop: 5 }}
    >
      <Row
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
        }}
      >
        <Col span={18} style={{ paddingLeft: 20 }}>
          <Title level={4}>Productos:</Title>
        </Col>
        <Col span={6}>
          <Title level={4}>Total: {'2 Mil'}</Title>
        </Col>
      </Row>
      <Row style={{ height: '35vh', paddingTop: 500 }}>
        <Col
          span={24}
          style={{
            borderBottom: 'solid 1px black',
            borderTop: 'solid 1px black',
            padding: 5,
            backgroundColor: 'floralwhite',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Title level={5}>Cliente:</Title>
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
            <Col span={24} style={{ marginTop: 5 }}>
              <div
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
              >
                <Text>
                  {'Camilo'} {'Nobody'}
                </Text>
                <div>
                  <Tooltip title={'Activo'}>
                    {' '}
                    <Tag color={'#87d068'}>
                      <CheckCircleOutlined />
                    </Tag>
                  </Tooltip>
                </div>
              </div>
            </Col>
            <Col span={24}>
              <Text>{'CC. 10075233104'}</Text>
            </Col>
          </Row>
        </Col>
        <Col
          span={24}
          style={{
            backgroundColor: 'floralwhite',
            borderBottom: 'solid 1px black',
            height: '19vh',
          }}
        >
          <Row style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
            <Col span={12} style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <Title level={5} style={{ fontSize: 18, paddingLeft: 5 }}>
                Total:
              </Title>
            </Col>
            <Col
              span={12}
              style={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}
            >
              <Text style={{ fontSize: 18, paddingRight: 5 }}>{'$ 2000'}</Text>
            </Col>
          </Row>
          <Row style={{ display: 'flex', alignItems: 'center' }}>
            <Col span={12} style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <Title level={5} style={{ fontSize: 18, paddingLeft: 5 }}>
                Subtotal:
              </Title>
            </Col>
            <Col
              span={12}
              style={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}
            >
              <Text style={{ fontSize: 18, paddingRight: 5 }}>{'$ 2000'}</Text>
            </Col>
          </Row>
          <Row style={{ display: 'flex', alignItems: 'center' }}>
            <Col span={12} style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <Title level={5} style={{ fontSize: 18, paddingLeft: 5 }}>
                Descuento:
              </Title>
            </Col>
            <Col
              span={12}
              style={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}
            >
              <Text style={{ fontSize: 18, paddingRight: 5 }}>{'$ 0'}</Text>
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
              <Title level={5} style={{ fontSize: 18, paddingLeft: 5 }}>
                Envío:
              </Title>
            </Col>
            <Col span={12} style={{ display: 'flex', justifyContent: 'right' }}>
              <Text style={{ fontSize: 18, paddingRight: 5 }}>{'N/A'}</Text>
            </Col>
            <Col span={12} style={{ marginBottom: 10, display: 'flex', justifyContent: 'right' }}>
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
        <Col
          span={24}
          style={{
            height: '9vh',
            marginBottom: 20,
            backgroundColor: 'floralwhite',
          }}
        >
          <Row style={{ display: 'flex', alignItems: 'center' }}>
            <Col span={12} style={{ display: 'flex', alignItems: 'center', paddingTop: 19 }}>
              <Button
                shape="round"
                icon={<DollarOutlined />}
                type="primary"
                style={{ fontSize: 25, padding: 15, width: 'auto', height: 'auto' }}
                onClick={() => {}}
              >
                PAGAR
              </Button>
            </Col>
            <Col
              span={12}
              style={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}
            >
              <Text style={{ fontSize: 18, paddingRight: 5 }}>{'$ 2000'}</Text>
            </Col>
          </Row>
          <Row style={{ display: 'flex', alignItems: 'center' }}>
            <Col span={12} style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <Title level={5} style={{ fontSize: 18, paddingLeft: 5 }}>
                Subtotal:
              </Title>
            </Col>
            <Col
              span={12}
              style={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}
            >
              <Text style={{ fontSize: 18, paddingRight: 5 }}>{'$ 2000'}</Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default PosList;
