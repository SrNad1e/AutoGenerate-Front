import { HomeOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Badge, Card, Col, Divider, Row, Tag, Typography } from 'antd';
import moment from 'moment';
import numeral from 'numeral';

import Tabs from '../components/Tabs';

import styles from './styles';

const { Text, Title } = Typography;
const { Grid } = Card;

const EcommerceEdit = () => {
  return (
    <PageContainer title="E-Commerce">
      <Card title={<Title level={3}>Pedido #1</Title>} bordered={false}>
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
              <Badge color="green" text="Pagado" />
            </Col>
            <Col xs={24} md={10} lg={9} xl={12}>
              <Text strong style={styles.textSize}>
                Registro:
              </Text>
            </Col>
            <Col xs={24} md={14} lg={15} xl={12}>
              <Tag style={styles.tagStyle}>
                {moment('2022-05-04T18:10:20.727Z').format(FORMAT_DATE)}
              </Tag>
            </Col>
            <Col xs={24} md={12} lg={12} xl={12}>
              <Text strong style={styles.textSize}>
                Actualizado:
              </Text>
            </Col>
            <Col xs={24} md={12} lg={12} xl={12}>
              <Tag style={styles.tagStyle}>
                {moment('2022-05-04T18:10:20.727Z').format(FORMAT_DATE)}
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
                    Saldo:
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
                  <Text strong>{numeral(1000000).format('$ 0,0')}</Text>
                </Col>
                <Col span={24}>
                  <Text strong>{numeral(10000).format('$ 0,0')}</Text>
                </Col>
                <Col span={24}>
                  <Text strong>{numeral(10000).format('$ 0,0')}</Text>
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
                {'Jotaro Kujo'}
              </Text>
            </Col>
            <Col xs={24} md={4} lg={4} xl={8}>
              {<HomeOutlined style={styles.iconStyle} />}
            </Col>
            <Col xs={24} md={20} lg={20} xl={16}>
              <Text strong style={styles.textSize}>
                {'Calle 20 No. 22-62'}
              </Text>
              <Text strong> {' Medellin, Antioquia'}</Text>
            </Col>
            <Col xs={24} md={4} lg={4} xl={8}>
              {<PhoneOutlined style={styles.iconStyle} />}
            </Col>
            <Col xs={24} md={20} lg={20} xl={16}>
              <Text strong style={styles.textSize}>
                {310017244}
              </Text>
            </Col>
          </Row>
        </Grid>
        <Divider />
      </Card>
      <Col>{<Tabs />}</Col>
    </PageContainer>
  );
};

export default EcommerceEdit;
