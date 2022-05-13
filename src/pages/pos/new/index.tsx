import { Col, Row } from 'antd';

import SearchProduct from '../components/SearchForm';
import Resumen from '../components/SellResumen';

const PosNew = () => {
  return (
    <Row>
      <Col xs={12} md={8} lg={8}>
        <Resumen />
      </Col>
      <Col xs={12} md={16} lg={16}>
        <SearchProduct />
      </Col>
    </Row>
  );
};

export default PosNew;
