/* eslint-disable react-hooks/exhaustive-deps */
import { useGetOrder } from '@/hooks/order.hooks';
import {
  ArrowLeftOutlined,
  CloseCircleOutlined,
  HomeOutlined,
  PhoneOutlined,
  PrinterOutlined,
  SendOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Affix,
  Badge,
  Button,
  Card,
  Col,
  Divider,
  Row,
  Space,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import moment from 'moment';
import numeral from 'numeral';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'umi';

import Tabs from '../components/Tabs';
import { StatusType } from '../e-commerce.data';

import styles from './styles';

const { Text, Title } = Typography;
const { Grid } = Card;

const EcommerceForm = () => {
  const { id } = useParams<Partial<{ id: string }>>();
  const history = useHistory();

  const [getOrder, paramsGetOrder] = useGetOrder();

  const total = paramsGetOrder?.data?.orderId?.order?.summary?.total || 0;
  const totalPaid = paramsGetOrder?.data?.orderId.order.summary.totalPaid || 0;
  const balance = total - totalPaid;
  const change = totalPaid - total;

  const onSearchOrder = () => {
    getOrder({
      variables: {
        id: id || '',
      },
    });
  };

  useEffect(() => {
    onSearchOrder();
  }, []);

  return (
    <PageContainer
      title={
        <Space align="center">
          {' '}
          <Tooltip title="Atrás">
            <Button
              type="primary"
              ghost
              icon={<ArrowLeftOutlined />}
              onClick={() => history.goBack()}
            />
          </Tooltip>
          <Divider type="vertical" />
          <> E-Commerce</>
        </Space>
      }
    >
      <Card
        title={<Title level={3}>Pedido #{paramsGetOrder?.data?.orderId?.order?.number}</Title>}
        bordered={false}
      >
        <Grid hoverable={false} style={styles.firstGrid}>
          <Row align="middle" justify="center" gutter={[0, 5]} style={styles.rowFGrid}>
            <Col>
              <Title level={4}>Información</Title>
            </Col>
            <Divider style={styles.noMargin} />
            <Col xs={24} md={8} lg={7} xl={12}>
              <Text strong style={styles.textSize}>
                Estado:
              </Text>
            </Col>
            <Col xs={24} md={16} lg={17} xl={12}>
              <Badge
                color={StatusType[paramsGetOrder?.data?.orderId?.order?.status || '']?.color}
                text={StatusType[paramsGetOrder?.data?.orderId?.order?.status || '']?.text}
              />
            </Col>
            <Col xs={24} md={10} lg={9} xl={12}>
              <Text strong style={styles.textSize}>
                Registro:
              </Text>
            </Col>
            <Col xs={24} md={14} lg={15} xl={12}>
              <Tag style={styles.tagStyle}>
                {moment(paramsGetOrder?.data?.orderId?.order?.createdAt).format(FORMAT_DATE)}
              </Tag>
            </Col>
            <Col xs={24} md={12} lg={12} xl={12}>
              <Text strong style={styles.textSize}>
                Actualizado:
              </Text>
            </Col>
            <Col xs={24} md={12} lg={12} xl={12}>
              <Tag style={styles.tagStyle}>
                {moment(paramsGetOrder?.data?.orderId?.order?.updatedAt).format(FORMAT_DATE)}
              </Tag>
            </Col>
          </Row>
        </Grid>
        <Grid hoverable={false} style={styles.secondGrid}>
          <Row justify="center" align="middle" style={styles.rowSGrid}>
            <Col>
              <Title level={4}>Total del Pedido</Title>
            </Col>
            <Divider style={styles.noMargin} />
            <Col span={12}>
              <Row align="middle">
                <Col span={24}>
                  <Text strong style={styles.textSize}>
                    Total:
                  </Text>
                </Col>
                <Col span={24}>
                  <Text strong style={styles.textSize}>
                    {totalPaid > total ? ' Cambio:' : 'Saldo:'}
                  </Text>
                </Col>
                <Col span={24}>
                  <Text strong style={styles.textSize}>
                    Abonado:
                  </Text>
                </Col>
              </Row>
            </Col>
            <Col span={12} style={styles.textRight}>
              <Row gutter={[0, 6]}>
                <Col span={24}>
                  <Text strong>{numeral(total).format('$ 0,0')}</Text>
                </Col>
                <Col span={24}>
                  <Text strong>
                    {numeral(totalPaid > total ? change : balance).format('$ 0,0')}
                  </Text>
                </Col>
                <Col span={24}>
                  <Text strong>{numeral(totalPaid).format('$ 0,0')}</Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
        <Grid hoverable={false} style={styles.thirdGrid}>
          <Row justify="center" align="middle" gutter={[0, 5]}>
            <Col>
              <Title level={4}>Envío</Title>
            </Col>
            <Divider style={styles.divGrid} />
            <Col xs={24} md={4} lg={4} xl={8}>
              {<UserOutlined style={styles.iconStyle} />}
            </Col>
            <Col xs={24} md={20} lg={20} xl={16}>
              <Text strong style={styles.textSize}>
                {paramsGetOrder?.data?.orderId?.order?.customer?.firstName}{' '}
                {paramsGetOrder?.data?.orderId?.order?.customer?.lastName}
              </Text>
            </Col>
            <Col xs={24} md={4} lg={4} xl={8}>
              {<HomeOutlined style={styles.iconStyle} />}
            </Col>
            <Col xs={24} md={20} lg={20} xl={16}>
              <Space>
                {paramsGetOrder.data?.orderId?.order?.address ? (
                  <Text strong key={1} style={styles.textSize}>
                    {' '}
                    {paramsGetOrder?.data?.orderId?.order?.address?.field1}{' '}
                    {paramsGetOrder?.data?.orderId?.order?.address?.number1}
                    {' # '}
                    {paramsGetOrder?.data?.orderId?.order?.address?.loteNumber}
                    {' - '}
                    {paramsGetOrder?.data?.orderId?.order?.address?.number2}
                  </Text>
                ) : (
                  <Text strong key={1} style={styles.textSize}>
                    No registra Dirección
                  </Text>
                )}
                <Text key={2} strong style={styles.textSize}>
                  {paramsGetOrder?.data?.orderId?.order?.address?.city?.name}
                </Text>
              </Space>
            </Col>
            <Col xs={24} md={4} lg={4} xl={8} style={{ marginBottom: 22 }}>
              {<PhoneOutlined style={styles.iconStyle} />}
            </Col>
            <Col xs={24} md={20} lg={20} xl={16} style={{ marginBottom: 22 }}>
              <Text strong style={styles.textSize}>
                {paramsGetOrder.data?.orderId?.order?.customer?.phone || 'No registra Teléfono'}
              </Text>
            </Col>
          </Row>
        </Grid>
        <Divider />
      </Card>
      <Row gutter={[0, 10]} justify="center">
        <Col style={{ width: '100%' }}>{<Tabs order={paramsGetOrder?.data?.orderId?.order} />}</Col>
        <Col>
          <Affix offsetBottom={10}>
            <Card size="small" style={styles.affixStyle}>
              <Space>
                <Button icon={<CloseCircleOutlined />} type="primary" onClick={() => {}}>
                  Cancelar Pedido
                </Button>
                <Button icon={<PrinterOutlined />} type="primary" onClick={() => {}}>
                  Imprimir pedido
                </Button>
                <Button icon={<SendOutlined />} type="primary" onClick={() => {}}>
                  Enviar Pedido
                </Button>
              </Space>
            </Card>
          </Affix>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default EcommerceForm;
