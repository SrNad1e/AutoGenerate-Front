import { Col, Row } from 'antd';

import type { DetailOrder } from '@/graphql/graphql';
import SearchProduct from '../components/SearchForm';
import Resumen from '../components/SellResumen';

const PosNew = ({}: DetailOrder) => {
  return (
    <Row>
      <Col
        xs={12}
        md={8}
        lg={8}
        style={{
          borderRight: 'solid 1px black',
        }}
      >
        <Resumen />
      </Col>
      <Col xs={12} md={16} lg={16}>
        <SearchProduct />
      </Col>
    </Row>
  );
};

export default PosNew;
