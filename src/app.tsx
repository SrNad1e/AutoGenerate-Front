import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig } from 'umi';
import { history } from 'umi';

import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import PageLoading from './components/PageLoading';
import { client } from './services/apollo-client';
import type { User } from './graphql/graphql';
import { CurrentUserDocument } from './graphql/graphql';

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
  currentUser?: User;
  fetchUserInfo?: () => Promise<User | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const { data, error } = await client.query({ query: CurrentUserDocument });
      if (error) {
        sessionStorage.removeItem('token');
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
    ...initialState?.settings,
  };
};
