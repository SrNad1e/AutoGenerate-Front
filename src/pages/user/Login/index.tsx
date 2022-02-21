import React from 'react';
import { Col, Row } from 'antd';

import styles from './index.less';
import FormLogin from '@/components/FormLogin';

const Login: React.FC = () => (
  <Row>
    <Col xs={0} sm={0} md={14} lg={15} xxl={17}>
      <div className={styles.container} />
    </Col>
    <Col xs={24} sm={24} md={10} lg={9} xxl={7} className={styles.login}>
      <FormLogin />
    </Col>
  </Row>
);

export default Login;
