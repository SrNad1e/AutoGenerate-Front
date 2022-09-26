import React, { useCallback } from 'react';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuInfo } from 'rc-menu/lib/interface';
import { Avatar, Col, Menu, Row, Spin, Typography } from 'antd';
import { history, useModel } from 'umi';
import { stringify } from 'querystring';

import HeaderDropdown from '../HeaderDropdown';

import styles from './index.less';
import './index.less';

//TODO: pendiente implementar modal para actualizar datos de usuario

const { Text } = Typography;

/**
 * @description remueve el token y envian hacia la pagina de login
 */
const loginOut = async () => {
  const { query = {}, pathname } = history.location;
  const { redirect } = query;
  sessionStorage.removeItem('token');

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
      <Row
        align="middle"
        /*className={` ${styles.account}`}*/
        style={{ cursor: 'pointer', alignItems: 'center', display: 'flex', height: 48 }}
      >
        <Col>
          <Avatar
            size="small"
            style={{ backgroundColor: 'white' }}
            icon={<UserOutlined style={{ color: '#dc9575' }} />}
            alt="avatar"
          />
        </Col>
        <Col>
          <Text /*className={`${styles.name} `}*/>{currentUser.name}</Text>
        </Col>
      </Row>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
