import type { BasicLayoutProps } from '@ant-design/pro-layout';
import { useState } from 'react';
import { history, Link, useModel } from 'umi';
import ProLayout from '@ant-design/pro-layout';

import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';

import logoNormal from '../assets/logo.svg';
import styles from './styles.less';
import { ApolloProvider } from '@apollo/client';
import { client } from '@/services/apollo-client';

const loginPath = '/user/login';

const GeneralLayout: React.FC<BasicLayoutProps> = (props) => {
  const [logo] = useState(logoNormal);
  const { initialState } = useModel('@@initialState');

  return (
    <ApolloProvider client={client}>
      <ProLayout
        logo={logo}
        {...props}
        menuProps={{
          theme: 'light',
        }}
        rightContentRender={() => <RightContent />}
        title="TOULOUSE"
        footerRender={() => <Footer />}
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
            breadcrumbName: 'Home',
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
        menuHeaderRender={(logoHeader, title) => (
          <div id="customize_menu_header" className={styles.title}>
            {logoHeader}
            {title}
          </div>
        )}
      />
    </ApolloProvider>
  );
};

export default GeneralLayout;
