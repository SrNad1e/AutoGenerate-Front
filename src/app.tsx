import React from 'react';
import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig } from 'umi';
import { history } from 'umi';
import { ApolloProvider } from '@apollo/client';

import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import PageLoading from './components/PageLoading';

import { client } from './services/apollo-client';
import { CURRENTUSER } from './graphql/queries/user.queries';

const loginPath = '/user/login';

export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 *
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  fetchUserInfo?: () => Promise<USER.User | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const { data, error } = await client.query({ query: CURRENTUSER });
      if (error) {
        localStorage.removeItem('token');
        history.push(loginPath);
      }
      return data.currentUser;
    } catch {
      history.push(loginPath);
    }
    return undefined;
  };
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }
  return {
    fetchUserInfo,
    settings: {},
  };
}

export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: [],
    menuHeaderRender: undefined,
    children: (children: React.FC) => <ApolloProvider client={client}>{children}</ApolloProvider>,
    ...initialState?.settings,
  };
};
