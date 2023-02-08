/* eslint-disable react-hooks/exhaustive-deps */
import type { BasicLayoutProps } from '@ant-design/pro-layout';
import { useEffect, useState } from 'react';
import { history, Link, useAccess, useModel } from 'umi';
import ProLayout from '@ant-design/pro-layout';

import RightContent from '@/components/RightContent';
//import Footer from '@/components/Footer';

import logoNormal from '../assets/logo.svg';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import { ApolloProvider } from '@apollo/client';
import { client } from '@/services/apollo-client';

import styles from './styles.less';
import './styles.less';
import AlertInformation from '@/components/Alerts/AlertInformation';

const loginPath = '/user/login';

const GeneralLayout: React.FC<BasicLayoutProps> = (props) => {
  const [logo] = useState(logoNormal);
  const [propsAlert, setPropsAlert] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const { initialState } = useModel('@@initialState');

  const { allowPOS, allowERP } = useAccess();

  /**
   * oculta
   */
  const onCloseAlert = () => {
    setPropsAlert({
      message: '',
      type: 'error',
      visible: false,
    });
    history.push(loginPath);
  };

  useEffect(() => {
    if (!allowERP && !allowPOS) {
      setPropsAlert({
        message: 'No tienes acceso, reporta tu problema al administrador',
        type: 'error',
        visible: true,
      });
    } else if (!allowPOS) {
      history.push('/');
    }
  }, []);

  return (
    <ApolloProvider client={client}>
      <ProLayout
        {...props}
        disableContentMargin
        headerHeight={48}
        splitMenus={true}
        navTheme="light"
        layout="top"
        contentWidth="Fixed"
        fixedHeader={false}
        fixSiderbar={true}
        logo={logo}
        rightContentRender={() => <RightContent />}
        title=""
        onPageChange={() => {
          const { location } = history;
          if (!initialState?.currentUser && location.pathname !== loginPath) {
            history.push(loginPath);
          }
        }}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl) {
            return defaultDom;
          }

          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        breadcrumbRender={(routers = []) => [
          {
            path: '/',
            breadcrumbName: 'POS',
          },
          ...routers,
        ]}
        itemRender={(route, params, routes, paths) => {
          const first = routes.indexOf(route) === 0;
          return first ? (
            <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
          ) : (
            <span>{route.breadcrumbName}</span>
          );
        }}
        menuHeaderRender={(logoHeader) => (
          <div id="customize_menu_header" className={styles.title}>
            {<Link to={allowERP ? '/' : '/pos/sales'}>{logoHeader}</Link>}
          </div>
        )}
      />
      <AlertInformation {...propsAlert} onCancel={onCloseAlert} />
    </ApolloProvider>
  );
};

export default GeneralLayout;
