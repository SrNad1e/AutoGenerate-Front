import React, { useCallback } from 'react';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuInfo } from 'rc-menu/lib/interface';
import { Avatar, Menu, Spin, Typography } from 'antd';
import { history, useModel } from 'umi';
import { stringify } from 'querystring';

import HeaderDropdown from '../HeaderDropdown';
import { outLogin } from '@/services/ant-design-pro/api';

import styles from './index.less';

//TODO: pendiente implementar modal para actualizar datos de usuario

const { Text } = Typography;

/**
 * @description remueve el token y envian hacia la pagina de login
 */
const loginOut = async () => {
  await outLogin();
  const { query = {}, pathname } = history.location;
  const { redirect } = query;
  localStorage.removeItem('token');

  // Note: There may be security issues, please note
  if (window.location.pathname !== '/user/login' && !redirect) {
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: pathname,
      }),
    });
  }
};

/**
 * @description se encargar de crear el menu de avatar
 * @returns
 */
const AvatarDropdown: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');

  /**
   * @description se encarga de agregar funciones a las opciones
   */
  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        setInitialState((s) => ({ ...s, currentUser: undefined }));
        loginOut();
        return;
      }

      //TODO: pendiente opcion de actualizar usuario
    },
    [setInitialState],
  );

  /**
   * @description componente para la espera de carga
   */
  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.name) {
    return loading;
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="update">
        <UserOutlined />
        <Text>Actualizar datos</Text>
      </Menu.Item>
      <Menu.Item key="logout">
        <LogoutOutlined />
        <Text>Salir</Text>
      </Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} icon={<UserOutlined />} alt="avatar" />
        <span className={`${styles.name} anticon`}>{currentUser.name}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
