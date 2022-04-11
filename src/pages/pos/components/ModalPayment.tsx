import { CheckCircleOutlined, DollarCircleFilled, UserOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, Modal, Row, Tag, Tooltip } from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import { useState } from 'react';
import numeral from 'numeral';
import ModalChangeClient from './ModalChangeClient';

export type Props = {
  order?: Partial<ORDER.Order>;
  visible: boolean;
  onCancel: () => void;
};

const ModalPayment = ({ order, visible, onCancel }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <Modal
      centered
      visible={visible}
      onCancel={onCancel}
      destroyOnClose
      zIndex={2}
      bodyStyle={{ backgroundColor: 'white' }}
      footer={false}
      width={1200}
    >
      <Row>
        <Col span={12} style={{ padding: '0 35px', borderRight: 'solid 2px black' }}>
          <Row
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <Col span={2}>
              {' '}
              <DollarCircleFilled style={{ fontSize: 25 }} />
            </Col>
            <Col span={21}>
              <Title level={3} style={{ margin: 0, padding: 0 }}>
                Pago y Factura
              </Title>
            </Col>
          </Row>

          <Row style={{ marginBottom: 20 }}>
            <Card style={{ borderRadius: 5, backgroundColor: 'rgb(142, 184, 147)', width: '49%' }}>
              <Row>
                <Col span={24}>
                  <img
                    src="https://api.toulouse.com.co/uploads/media/2021/11/29/61a5274d032ed5607f7ce7e0/money-bag.png"
                    height="40px"
                    style={{ marginBottom: 10, paddingLeft: 75 }}
                  />
                  <br />
                  <Title level={2} style={{ color: 'white', paddingLeft: 50 }}>
                    {'Efectivo'}
                  </Title>
                </Col>
              </Row>
            </Card>
            <Card
              style={{
                borderRadius: 5,
                backgroundColor: 'rgb(237, 240, 71)',
                marginLeft: 10,
                width: '49%',
              }}
            >
              <Row>
                <Col span={24}>
                  <img
                    src="https://api.toulouse.com.co/uploads/media/2021/11/29/61a5275a032ed5607f7ce83e/bancolombia%20logo.png"
                    height="30px"
                    style={{ marginBottom: 10 }}
                  />
                  <br />
                  <Title level={2} style={{ color: 'white', padding: 5 }}>
                    {'Bancolombia'}
                  </Title>
                </Col>
              </Row>
            </Card>
          </Row>

          <Row style={{ marginBottom: 20 }}>
            <Card style={{ borderRadius: 5, backgroundColor: 'rgb(229, 160, 82)', width: '49%' }}>
              <Row>
                <Col span={24}>
                  <img
                    src="https://api.toulouse.com.co/uploads/media/2021/11/18/6196427e9743d85db80e8957/credit-card.png"
                    height="40px"
                    style={{ marginBottom: 10, paddingLeft: 75 }}
                  />
                  <br />
                  <Title level={2} style={{ color: 'white', paddingLeft: 50 }}>
                    {'Credito'}
                  </Title>
                </Col>
              </Row>
            </Card>
            <Card
              style={{
                borderRadius: 5,
                backgroundColor: 'rgb(243, 57, 57)',
                marginLeft: 10,
                width: '49%',
              }}
            >
              <Row>
                <Col span={24}>
                  <img
                    src="https://api.toulouse.com.co/uploads/media/2021/11/29/61a52763032ed5607f7cec11/cupon.jpg"
                    height="40px"
                    style={{ marginBottom: 10, paddingLeft: 75 }}
                  />
                  <br />
                  <Title level={2} style={{ color: 'white', paddingLeft: 50 }}>
                    {'Cupon'}
                  </Title>
                </Col>
              </Row>
            </Card>
          </Row>
        </Col>
        <Col span={12} style={{ padding: '0 35px', paddingTop: 42 }}>
          <Row
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              marginLeft: '-10px',
            }}
          >
            <Col span={24} style={{ border: 'solid 1 px black', padding: 5 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Title level={3}>Cliente:</Title>
                <Button
                  onClick={() => setModalVisible(true)}
                  icon={<UserOutlined />}
                  shape="round"
                  size="small"
                  type="primary"
                  style={{ backgroundColor: 'white', color: '#dc9575' }}
                >
                  Cambiar
                </Button>
              </div>
              <Row>
                <Col span={24} style={{ marginTop: 5 }}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Title level={5}>
                      {order?.customer?.firstName} {order?.customer?.lastName}
                    </Title>
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
                <Col span={12}>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Title level={5}>{order?.customer?.documentType?.abbreviation} </Title>
                    <Text strong>{order?.customer?.document}</Text>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row gutter={[8, 8]} style={{ marginTop: 20 }}>
            <Title level={3}>Pagos</Title>
          </Row>
          <Divider style={{ width: '100%', backgroundColor: 'black' }} />
          <Row gutter={[8, 8]} style={{ lineHeight: 1 }}>
            <Col span={12} style={{ height: 30, display: 'flex', alignItems: 'center' }}>
              <Text style={{ fontSize: 15 }}>Total pagos</Text>
            </Col>
            <Col span={12} style={{ display: 'flex', justifyContent: 'right' }}>
              <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
                {numeral(10000).format('$ 0,0')}
              </Text>
            </Col>
            <Col span={12} style={{ height: 30, display: 'flex', alignItems: 'center' }}>
              <Text style={{ fontSize: 15 }}>Saldo</Text>
            </Col>
            <Col span={12} style={{ display: 'flex', justifyContent: 'right' }}>
              <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
                {numeral(12000).format('$ 0,0')}
              </Text>
            </Col>
            <Col span={12} style={{ height: 30, display: 'flex', alignItems: 'center' }}>
              <Text style={{ fontSize: 15 }}>Cambio</Text>
            </Col>
            <Col span={12} style={{ display: 'flex', justifyContent: 'right' }}>
              <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
                {numeral(2000).format('$ 0,0')}
              </Text>
            </Col>
          </Row>
          <Divider style={{ width: '100%', backgroundColor: 'black' }} />
          <Row gutter={[8, 8]} style={{ lineHeight: 1 }}>
            <Col span={12} style={{ height: 30, display: 'flex', alignItems: 'center' }}>
              <Text style={{ fontSize: 15 }}>Total compra</Text>
            </Col>
            <Col span={12} style={{ display: 'flex', justifyContent: 'right' }}>
              <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
                {numeral(12000).format('$ 0,0')}
              </Text>
            </Col>
            <Col span={12}>
              <Text style={{ fontSize: 15 }}>Subtotal</Text>
            </Col>
            <Col span={12} style={{ display: 'flex', justifyContent: 'right' }}>
              <Text style={{ fontSize: 15 }}>{numeral(12000).format('$ 0,0')}</Text>
            </Col>
            <Col span={12}>
              <Text style={{ fontSize: 15 }}>Descuento</Text>
            </Col>
            <Col span={12} style={{ display: 'flex', justifyContent: 'right' }}>
              <Text style={{ fontSize: 15 }}>{numeral(1000).format('$ 0,0')}</Text>
            </Col>
            <Col span={12}>
              <Text style={{ fontSize: 15 }}>Envío</Text>
            </Col>
            <Col span={12} style={{ display: 'flex', justifyContent: 'right' }}>
              <Text style={{ fontSize: 15 }}>{numeral(0).format('$ 0,0')}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ display: 'flex', justifyContent: 'right', marginTop: 20 }}>
              <Button type="primary" style={{ fontSize: 25, height: 'auto', padding: '10px 25px' }}>
                <DollarCircleFilled /> Facturar
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <ModalChangeClient visible={modalVisible} onCancel={closeModal} />
    </Modal>
  );
};

export default ModalPayment;
