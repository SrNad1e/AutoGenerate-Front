import {
  CheckCircleOutlined,
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
//import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import ModalChangeClient from './ModalChangeClient';
import ModalPayment from './ModalPayment';

const { Title, Text } = Typography;

export type Props = {
  order?: Partial<ORDER.Order>;
  setOrder: (data: Partial<ORDER.Order>) => void;
  product?: Partial<PRODUCT.Product>;
  addProduct: (product: Partial<PRODUCT.Product>, exist?: boolean) => void;
};

const Resumen = ({ order }: Props) => {
  /* const [propsAlertInformation, setPropsAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'warning',
    visible: false
  });*/
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPaymentVisible, setModalPaymentVisible] = useState(false);

  /*const onChangeQuantity = (product: Partial<ORDER.DetailOrder>) => {
    if (product?.quantity) {
      if (product?.quantity > 0) {
        addProduct(product, true)
      }
    }
  };*/

  const closeModal = () => {
    setModalVisible(false);
  };

  const onCloseModalPayment = () => {
    setModalPaymentVisible(false);
  };
  //const deleteProduct

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
      <List
        itemLayout="horizontal"
        style={{ height: '50vh', padding: '10px 2px', overflowY: 'scroll' }}
      >
        <List.Item style={{ borderBottom: 'dashed 1px black' }}>
          <div style={{ width: '100%' }}>
            <Row style={{ width: '100%' }}>
              <Col span={2} style={{ display: 'flex', justifyContent: 'center' }}>
                <Title level={4}>{1}</Title>
              </Col>
              <Col span={3}>
                <Avatar
                  size="large"
                  style={{ backgroundImage: 'url("/noImage.png")', backgroundSize: 'cover' }}
                  src={'https://i.pinimg.com/736x/03/4b/de/034bde783ea726b922100c86547831e8.jpg'}
                  alt={'Azula'}
                  shape="square"
                />
              </Col>
              <Col span={8}>
                <Row>
                  <Col span={24} style={{ display: 'flex', alignItems: 'center', height: 20 }}>
                    <Text style={{ fontSize: 16 }}>{'Susana'}</Text>
                  </Col>
                </Row>
                <Row>
                  <Col span={24} style={{ display: 'flex', alignItems: 'center', height: 20 }}>
                    <Text style={{ fontSize: 12 }}>{'011001010101'}</Text>
                  </Col>
                </Row>
                <Row>
                  <Col
                    span={10}
                    style={{
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      height: 20,
                      minWidth: 55,
                    }}
                  >
                    <Text ellipsis style={{ fontSize: 14 }}>
                      <Text style={{ fontWeight: 'bold', marginRight: 2 }}>Talla</Text> {'XL'}
                    </Text>
                  </Col>
                  <Col span={14}>
                    <Text
                      ellipsis
                      style={{
                        fontSize: 14,
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        height: 20,
                      }}
                    >
                      <Text style={{ fontWeight: 'bold', marginRight: 3 }}>Color</Text> {'Rojo'}
                    </Text>
                  </Col>
                </Row>
              </Col>
              <Col
                span={4}
                style={{
                  display: 'flex',
                  justifyContent: 'right',
                  alignItems: 'center',
                  height: 40,
                }}
              >
                <InputNumber
                  /*onChange={(e: any) =>
                      onChangeQuantity({ ...product, _id:product.product._id , stock: e })
                    }*/
                  min={1}
                  style={{ width: 50 }}
                  value={10}
                />
              </Col>
              <Col
                span={5}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  height: 40,
                  right: 10,
                }}
              >
                <Text style={{ fontSize: 16, lineHeight: 1 }}>
                  {numeral(10000).format('$ 0,0')}
                </Text>
                <Text
                  delete
                  style={{
                    fontSize: 12,
                    lineHeight: 1,
                    fontStyle: 'italic',
                    textAlign: 'right',
                  }}
                >
                  {numeral(15000).format('$ 0,0')}
                </Text>
              </Col>
              <Col
                span={2}
                style={{
                  display: 'flex',
                  justifyContent: 'right',
                  alignItems: 'center',
                  height: 40,
                  right: 10,
                }}
              >
                <Popconfirm
                  title="¿Estás seguro que deseas eliminar?"
                  onConfirm={() => {}}
                  okText="Si, eliminar"
                  cancelText="No"
                >
                  <Button icon={<DeleteOutlined />} danger type="primary" />
                </Popconfirm>
              </Col>
            </Row>
          </div>
        </List.Item>
      </List>
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
            <Col span={24} style={{ bottom: 10 }}>
              <div
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
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
            <Col span={24} style={{ bottom: 10 }}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Title level={5}>{order?.customer?.documentType?.abbreviation} </Title>
                <Text strong>{order?.customer?.document}</Text>
              </div>
            </Col>
          </Row>
        </Col>
        <Col
          span={24}
          style={{
            borderBottom: 'solid 1px black',
            height: 130,
          }}
        >
          <Row>
            <Col span={12} style={{ marginTop: 10 }}>
              <Title level={4} style={{ paddingLeft: 5 }}>
                Total:
              </Title>
            </Col>
            <Col span={12} style={{ display: 'flex', justifyContent: 'right', top: 10 }}>
              <Title level={4} style={{ paddingRight: 5 }}>
                {numeral(order?.summary?.total).format('$ 0,0')}
              </Title>
            </Col>
          </Row>
          <Row>
            <Col span={12} style={{ bottom: 10 }}>
              <Title level={4} style={{ paddingLeft: 5 }}>
                Subtotal:
              </Title>
            </Col>
            <Col span={12} style={{ display: 'flex', justifyContent: 'right', bottom: 10 }}>
              <Title level={4} style={{ paddingRight: 5 }}>
                {numeral(order?.summary?.subtotal).format('$ 0,0')}
              </Title>
            </Col>
          </Row>
          <Row>
            <Col span={12} style={{ display: 'flex', alignItems: 'center', bottom: 20 }}>
              <Title level={4} style={{ paddingLeft: 5 }}>
                Descuento:
              </Title>
            </Col>
            <Col span={12} style={{ display: 'flex', justifyContent: 'right', bottom: 20 }}>
              <Title level={4} style={{ paddingRight: 5 }}>
                {numeral(order?.summary?.discount).format('$ 0,0')}
              </Title>
            </Col>
          </Row>
          <Row>
            <Col
              span={12}
              style={{
                display: 'flex',
                alignItems: 'center',
                bottom: 30,
              }}
            >
              <Title level={4} style={{ paddingLeft: 5 }}>
                Envío:
              </Title>
            </Col>
            <Col span={12} style={{ display: 'flex', justifyContent: 'right', bottom: 30 }}>
              <Title level={4} style={{ paddingRight: 5 }}>
                {'N/A'}
              </Title>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row>
            <Col span={8} style={{ display: 'flex', padding: 15 }}>
              <Button
                icon={<DollarOutlined />}
                type="primary"
                style={{ fontSize: 25, width: 'auto', height: 60, top: 20 }}
                onClick={() => setModalPaymentVisible(true)}
              >
                PAGAR
              </Button>
            </Col>
            <Button
              shape="round"
              icon={<PlusOutlined />}
              size="small"
              type="primary"
              style={{ backgroundColor: 'white', color: '#dc9575', left: 50, top: 35, width: 150 }}
            >
              Agregar Envio
            </Button>
            <Button
              shape="round"
              icon={<PrinterOutlined />}
              size="small"
              type="primary"
              style={{ backgroundColor: 'white', color: '#dc9575', right: 80, top: 70, width: 100 }}
            >
              Imprimir
            </Button>
          </Row>
        </Col>
      </Row>
      <ModalPayment visible={modalPaymentVisible} order={order} onCancel={onCloseModalPayment} />
      <ModalChangeClient visible={modalVisible} onCancel={closeModal} />
    </Card>
  );
};

export default Resumen;
