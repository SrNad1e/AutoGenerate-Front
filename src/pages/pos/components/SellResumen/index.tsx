import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  DollarOutlined,
  PlusOutlined,
  PrinterOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Col,
  InputNumber,
  List,
  Popconfirm,
  Row,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import numeral from 'numeral';
import { useState } from 'react';

import ModalChangeClient from '../ChangeCustomer';
import ModalPayment from '../Payment';

import styles from '../styles';
import style from '../styles.less';

const { Title, Text } = Typography;
const ListItem = List.Item;

const Resumen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPaymentVisible, setModalPaymentVisible] = useState(false);

  /**
   * @description cierra el modal de cambio de cliente
   */
  const closeModal = () => {
    setModalVisible(false);
  };

  /**
   * @description cierra el modal de pago
   */
  const onCloseModalPayment = () => {
    setModalPaymentVisible(false);
  };

  return (
    <Card style={styles.cardSize} bodyStyle={styles.cardPadding}>
      <Row>
        <Col span={12}>
          <Title level={4}>Productos:</Title>
        </Col>
        <Col span={12}>
          <Title level={4}>Total: {1}</Title>
        </Col>
      </Row>
      <List itemLayout="horizontal" size="small" style={styles.listSize}>
        <ListItem style={styles.listBorderBottom}>
          <Card bordered={false} bodyStyle={styles.bodyPadding}>
            <Row gutter={[20, 0]} align="middle">
              <Col>
                <Title level={4}>{1}</Title>
              </Col>
              <Col>
                <Avatar
                  size={70}
                  style={styles.imageBorder}
                  src={'https://i.pinimg.com/736x/03/4b/de/034bde783ea726b922100c86547831e8.jpg'}
                  alt={'Azula'}
                  shape="square"
                />
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Row>
                  <Col span={24}>
                    <Text style={styles.textSize}>{'Susana'}</Text>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Text style={styles.textSize}>{'10010101'}</Text>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Text>
                      <Text strong>Talla</Text> {'L'}
                    </Text>
                  </Col>
                  <Col span={24}>
                    <Text>
                      <Text strong>Color</Text> {'Rojo'}
                    </Text>
                  </Col>
                </Row>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Row gutter={[40, 0]} align="middle">
                  <Col span={11} style={{}}>
                    <InputNumber min={1} style={styles.inputNumberWidth} />
                  </Col>
                  <Col span={13} style={styles.priceStyle}>
                    <Text style={styles.textSize}>{numeral(10000).format('$ 0,0')}</Text>
                    <Text className={style.discountStyle}>{numeral(2000).format('$ 0,0')}</Text>
                    <Popconfirm
                      title="¿Estás seguro que deseas eliminar?"
                      onConfirm={() => {}}
                      okText="Si, eliminar"
                      cancelText="No"
                    >
                      <Button style={styles.alignIcon} icon={<DeleteOutlined />} danger />
                    </Popconfirm>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </ListItem>
      </List>
      <Row>
        <Col span={24} style={styles.customerTop}>
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
      <Row gutter={[10, 0]} style={styles.listBorderBottom}>
        <Col style={styles.customerData}>
          <Title level={5}>
            {'Jose'} {'Rodriguez'}
          </Title>
        </Col>
        <Col span={14}>
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
      <Col style={styles.totalContainer}>
        <Row>
          <Col md={19} lg={19}>
            <Title level={4}>Total:</Title>
          </Col>
          <Col md={5} lg={5}>
            <Title level={4}>{numeral(10000).format('$ 0,0')}</Title>
          </Col>
        </Row>
        <Row>
          <Col md={19} lg={19} style={styles.totalStyle}>
            <Title level={4}>Subtotal:</Title>
          </Col>
          <Col md={5} lg={5} style={styles.totalStyle}>
            <Title level={4}>{numeral(8000).format('$ 0,0')}</Title>
          </Col>
        </Row>
        <Row>
          <Col md={19} lg={19} style={styles.discountStyle}>
            <Title level={4}>Descuento:</Title>
          </Col>
          <Col md={5} lg={5} style={styles.discountStyle}>
            <Title level={4}>{numeral(2000).format('$ 0,0')}</Title>
          </Col>
        </Row>
        <Row>
          <Col md={19} lg={19} style={styles.sendStyle}>
            <Title level={4}>Envío:</Title>
          </Col>
          <Col md={5} lg={5} style={styles.sendStyle}>
            <Title level={4}>{'N/A'}</Title>
          </Col>
        </Row>
      </Col>
      <Row>
        <Col xs={12} md={12} lg={12}>
          <Button
            icon={<DollarOutlined />}
            type="primary"
            style={styles.payButton}
            onClick={() => setModalPaymentVisible(true)}
          >
            PAGAR
          </Button>
        </Col>
        <Col xs={12} md={12} lg={12}>
          <Row>
            <Col style={styles.buttonSendMargin}>
              <Button
                shape="round"
                icon={<PlusOutlined />}
                size="small"
                type="primary"
                style={styles.customerChange}
              >
                Agregar Envio
              </Button>
            </Col>
            <Col style={styles.buttonSendMargin}>
              <Button
                shape="round"
                icon={<PrinterOutlined />}
                size="small"
                type="primary"
                style={styles.customerChange}
              >
                Imprimir
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <ModalPayment visible={modalPaymentVisible} onCancel={onCloseModalPayment} />
      <ModalChangeClient visible={modalVisible} onCancel={closeModal} />
    </Card>
  );
};

export default Resumen;
