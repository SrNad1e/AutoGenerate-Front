import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row } from 'antd';

import SaveOrder from '../SaveOrder';

import styles from '../styles';

const NewOrder = () => {
  return (
    <>
      <Row style={styles.marginLayout}>
        <Col xs={4} md={4} xl={4}>
          <Card onClick={() => {}} hoverable style={styles.cardStyle}>
            <Row gutter={24}>
              <Col span={7}>
                <ShoppingCartOutlined style={styles.iconStyle} />
              </Col>
              <Col span={17}>
                <Button shape="round" type="primary" size="large">
                  Nuevo Pedido
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row style={styles.marginLayout}>
        <Col>
          <SaveOrder />
        </Col>
      </Row>
    </>
  );
};

export default NewOrder;
