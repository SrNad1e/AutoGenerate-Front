import { Col, Row, Typography } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { useModel } from 'umi';

import Avatar from './AvatarDropdown';

import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

const { Text } = Typography;

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <>
      <span
        className={styles.action}
        onClick={() => {
          window.open('https://sites.google.com/luckywoman.com.co/documentacin-pos-toulouse/');
        }}
        style={{ marginRight: 5 }}
      >
        <QuestionCircleOutlined />
      </span>
      <Row gutter={15} className={className}>
        <Col xs={0} md={24}>
          <Text style={{ fontSize: 13 }}>
            {initialState?.currentUser?.role.name} / {initialState?.currentUser?.shop.name}
          </Text>
        </Col>
      </Row>
      <Row className={className} style={{ marginRight: 8 }}>
        <Col span={24}>
          <Avatar />
        </Col>
      </Row>
    </>
  );
};

export default GlobalHeaderRight;
