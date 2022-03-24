import { Space, Typography } from 'antd';
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
    <Space className={className}>
      <span
        className={styles.action}
        onClick={() => {
          window.open('https://sites.google.com/luckywoman.com.co/documentacin-pos-toulouse/');
        }}
      >
        <QuestionCircleOutlined />
      </span>
      <Text>
        {initialState?.currentUser?.role.name} / {initialState?.currentUser?.shop.name}{' '}
      </Text>
      <Avatar />
    </Space>
  );
};

export default GlobalHeaderRight;
