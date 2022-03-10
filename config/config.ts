// https://umijs.org/config/
import { defineConfig } from 'umi';
import { join } from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV, API_URL, CDN_URL, FORMAT_DATE } = process.env;

export default defineConfig({
  define: {
    API_URL: API_URL || 'http://192.168.70.171:8080/graphql',
    CDN_URL: CDN_URL || 'http://cdn.toulouse.com.co',
    FORMAT_DATE: FORMAT_DATE || 'DD/MM/YYYY HH:mm:ss',
  },
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    // default zh-CN
    default: 'es-ES',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      layout: false,
      routes: [
        {
          path: '/user/login',
          layout: false,
          name: 'login',
          component: './user/Login',
        },
        {
          component: '404',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/GeneralLayout',
      layout: false,
      routes: [
        {
          path: '/inventory',
          name: 'Inventario',
          icon: 'dashboard',
          routes: [
            {
              path: '/inventory',
              redirect: '/inventory/transfer/list',
            },
            {
              name: 'Traslados',
              path: '/inventory/transfer',
              routes: [
                {
                  name: 'Lista',
                  path: '/inventory/transfer/list',
                  component: './inventory/transfer/list',
                },
                {
                  name: 'Nuevo',
                  path: '/inventory/transfer/new',
                  component: './inventory/transfer/form',
                },
                {
                  path: '/inventory/transfer/:id',
                  component: './inventory/transfer/form',
                },
              ],
            },
            {
              path: '/inventory',
              redirect: '/inventory/request/list',
            },
            {
              name: 'Solicitudes',
              path: '/inventory/request',
              routes: [
                {
                  name: 'Lista',
                  path: '/inventory/request/list',
                  component: './inventory/request/list',
                },
                {
                  name: 'Nueva',
                  path: '/inventory/request/new',
                  component: './inventory/request/form',
                },
                {
                  path: '/inventory/request/:id',
                  component: './inventory/request/form',
                },
              ],
            },
          ],
        },
        {
          layout: false,
          component: '404',
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  openAPI: [
    {
      requestLibPath: "import { request } from 'umi'",
      // 或者使用在线的版本
      // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
      schemaPath: join(__dirname, 'oneapi.json'),
      mock: false,
    },
    {
      requestLibPath: "import { request } from 'umi'",
      schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      projectName: 'swagger',
    },
  ],
  nodeModulesTransform: {
    type: 'none',
  },
  mfsu: {},
  webpack5: {},
  exportStatic: {},
});
