import { SaveOutlined } from '@ant-design/icons';
import { Button, Card, Col, Descriptions, Divider, Row, Select, Typography, Image } from 'antd';
import { useState } from 'react';
import numeral from 'numeral';

import Payments from '../Payments';
import Products from '../Products';

import styles from '../styles';
import type { Order } from '@/graphql/graphql';
import AddressDelivery from '@/components/Address';

const DescriptionItem = Descriptions.Item;
const { Option } = Select;
const { Text } = Typography;

type Props = {
  order: Order;
};

const Tabs = ({ order }: Props) => {
  const [activeTabKey, setActiveTabKey] = useState('1');

  const onTabChange = (key: any) => {
    setActiveTabKey(key);
  };

  const cardTab = [
    {
      key: '1',
      tab: 'Productos',
    },
    {
      key: '2',
      tab: 'Pagos',
    },
    {
      key: '3',
      tab: 'Envío',
    },
  ];

  const contentTab = {
    1: <Products orderdata={order} />,
    2: <Payments orderData={order} />,
    3: (
      <>
        <AddressDelivery deliveryAddress={order?.customer?.addresses} customer={order?.customer} />
        <Divider>Métodos de Envío</Divider>
        <Row>
          <Col>
            <Descriptions>
              <DescriptionItem label="Método de envío" span={3}>
                <Select style={styles.deliverySelect}>
                  <Option>
                    <>
                      <Image
                        width="18px"
                        src={
                          'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/modern-pop-lofi-music-cover-art-design-template-f6db8ab55ee30bac80c523b3129a268d_screen.jpg?ts=1635274786'
                        }
                        alt="logo"
                      />
                      <Divider type="vertical" />
                      {'Recoger en tienda'}
                    </>
                  </Option>
                </Select>
              </DescriptionItem>
              <DescriptionItem label={<Text strong>Precio</Text>} span={1}>
                <Text italic>{numeral(10000).format('$ 0,0')}</Text>
              </DescriptionItem>
              <DescriptionItem label={<Text strong>Tiempo de Entrega</Text>} span={1}>
                <Text italic>{'10 Dias'}</Text>
              </DescriptionItem>
            </Descriptions>
          </Col>
          <Col xs={5} md={4} lg={4} offset={19}>
            <Button type="primary" icon={<SaveOutlined />}>
              Guardar
            </Button>
          </Col>
        </Row>
      </>
    ),
  };
  return (
    <Card bordered={false} tabList={cardTab} activeTabKey={activeTabKey} onTabChange={onTabChange}>
      {contentTab[activeTabKey]}
    </Card>
  );
};

export default Tabs;
