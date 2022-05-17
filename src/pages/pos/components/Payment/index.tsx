import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DollarCircleFilled,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Divider, Image, Modal, Row, Tag, Tooltip, Typography } from 'antd';
import { useState } from 'react';
import numeral from 'numeral';

import SelectCustomer from '../SelectCustomer';

import styles from '../styles';

export type Props = {
  visible: boolean;
  onCancel: () => void;
};

const { Title, Text } = Typography;

const ModalPayment = ({ visible, onCancel }: Props) => {
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
      footer={false}
      width={1200}
    >
      <Row>
        <Col span={12} style={styles.divider}>
          <Row>
            <Col span={2}>
              <DollarCircleFilled style={styles.iconSaveStyle} />
            </Col>
            <Col span={22}>
              <Title level={3}>Pago y Factura</Title>
            </Col>
          </Row>
          <Row gutter={[0, 10]}>
            <Card onClick={() => {}} hoverable style={styles.cardCash}>
              <Row>
                <Col span={24} style={styles.centeredContent}>
                  <Image
                    preview={false}
                    src="https://api.toulouse.com.co/uploads/media/2021/11/29/61a5274d032ed5607f7ce7e0/money-bag.png"
                    style={styles.imageSize}
                  />
                </Col>
                <Col span={24} style={styles.centeredContent}>
                  <Title style={styles.textColor} level={2}>
                    Efectivo
                  </Title>
                </Col>
              </Row>
            </Card>
            <Card onClick={() => {}} hoverable style={styles.cardBank}>
              <Row>
                <Col span={24} style={styles.centeredContent}>
                  <Image
                    preview={false}
                    src="https://api.toulouse.com.co/uploads/media/2021/11/29/61a5275a032ed5607f7ce83e/bancolombia%20logo.png"
                    style={styles.imageSize}
                  />
                </Col>
                <Col span={24} style={styles.centeredContent}>
                  <Title style={styles.textColor} level={2}>
                    Bancolombia
                  </Title>
                </Col>
              </Row>
            </Card>
            <Card onClick={() => {}} hoverable style={styles.cardCredit}>
              <Row>
                <Col span={24} style={styles.centeredContent}>
                  <Image
                    preview={false}
                    src="https://api.toulouse.com.co/uploads/media/2021/11/18/6196427e9743d85db80e8957/credit-card.png"
                    style={styles.imageSize}
                  />
                </Col>
                <Col span={24} style={styles.centeredContent}>
                  <Title style={styles.textColor} level={2}>
                    Credito
                  </Title>
                </Col>
              </Row>
            </Card>
            <Card onClick={() => {}} hoverable style={styles.cardCoupon}>
              <Row>
                <Col span={24} style={styles.centeredContent}>
                  <Image
                    preview={false}
                    src="https://api.toulouse.com.co/uploads/media/2021/11/29/61a52763032ed5607f7cec11/cupon.jpg"
                    style={styles.imageSize}
                  />
                </Col>
                <Col span={24} style={styles.centeredContent}>
                  <Title style={styles.textColor} level={2}>
                    Cupon
                  </Title>
                </Col>
              </Row>
            </Card>
          </Row>
        </Col>
        <Col span={12} style={styles.paddingModal}>
          <Row>
            <Col span={24}>
              <Row style={styles.contentStyle}>
                <Title level={3}>Cliente:</Title>
                <Button
                  onClick={() => setModalVisible(true)}
                  icon={<UserOutlined />}
                  shape="round"
                  size="small"
                  type="primary"
                  style={styles.customerChange}
                >
                  Cambiar
                </Button>
              </Row>
            </Col>
          </Row>
          <Row gutter={[10, 0]}>
            <Col style={styles.customerData}>
              <Title level={5}>
                {'Jose'} {'Rodriguez'}
              </Title>
            </Col>
            <Col span={16}>
              <Tag color="volcano">{'Mayorista'}</Tag>
              <Tooltip title={'activo' ? 'Activo' : 'Inactivo'}>
                <Tag style={styles.tagSize} color={'activo' ? '#87d068' : 'red'}>
                  {'activo' ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
                </Tag>
              </Tooltip>
            </Col>
            <Col style={styles.customerData}>
              <Title level={5}>{'CC.'} </Title>
            </Col>
            <Col>
              <Text strong>{'01100001'}</Text>
            </Col>
          </Row>
          <Title style={styles.buttonSendMargin} level={3}>
            Pagos
          </Title>
          <Divider style={styles.dividerColor} />
          <Row style={{ lineHeight: 1 }}>
            <Col span={19}>
              <Text>Total pagos</Text>
            </Col>
            <Col span={5}>
              <Text style={styles.textTotal}>{numeral(10000).format('$ 0,0')}</Text>
            </Col>
            <Col span={19}>
              <Text>Saldo</Text>
            </Col>
            <Col span={5}>
              <Text style={styles.textTotal}>{numeral(12000).format('$ 0,0')}</Text>
            </Col>
            <Col span={19}>
              <Text>Cambio</Text>
            </Col>
            <Col span={5}>
              <Text style={styles.textTotal}>{numeral(2000).format('$ 0,0')}</Text>
            </Col>
          </Row>
          <Divider style={styles.dividerColor} />
          <Row gutter={[0, 8]} style={{ lineHeight: 1 }}>
            <Col span={19}>
              <Text>Total compra</Text>
            </Col>
            <Col span={5}>
              <Text style={styles.textTotal}>{numeral(12000).format('$ 0,0')}</Text>
            </Col>
            <Col span={21}>
              <Text>Subtotal</Text>
            </Col>
            <Col span={3}>
              <Text>{numeral(12000).format('$ 0,0')}</Text>
            </Col>
            <Col span={21}>
              <Text>Descuento</Text>
            </Col>
            <Col span={3}>
              <Text>{numeral(1000).format('$ 0,0')}</Text>
            </Col>
            <Col span={21}>
              <Text>Envío</Text>
            </Col>
            <Col span={2}>
              <Text>{numeral(0).format('$ 0,0')}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={styles.alignRight}>
              <Button type="primary" style={styles.payButton}>
                <DollarCircleFilled /> Facturar
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <SelectCustomer visible={modalVisible} onCancel={closeModal} />
    </Modal>
  );
};

export default ModalPayment;
