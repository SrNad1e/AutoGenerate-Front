// https://umijs.org/config/
import { defineConfig } from 'umi';
import { join } from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV, API_URL, CDN_URL, FORMAT_DATE, FORMAT_DATE_API, COMPANY_ID } = process.env;

export default defineConfig({
  define: {
    API_URL: API_URL || 'http://192.168.70.254:8080',
    CDN_URL: CDN_URL || 'https://toulouse-storage.s3.amazonaws.com',
    COMPANY_ID: COMPANY_ID || '6272be07347a97305f806f35',
    FORMAT_DATE: FORMAT_DATE || 'DD/MM/YYYY HH:mm:ss',
    FORMAT_DATE_API: FORMAT_DATE_API || 'YYYY/MM/DD',
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
      path: '/pos',
      component: '../layouts/POSLayout',
      layout: false,
      routes: [
        {
          path: '/pos',
          name: 'POS',
          icon: 'shop',
          component: './pos/list',
        },
        {
          path: '/pos/:id',
          component: './pos/new',
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
            {
              name: 'Ajustes',
              path: '/inventory/adjustment',
              routes: [
                {
                  name: 'Lista',
                  path: '/inventory/adjustment/list',
                  component: './inventory/adjustment/list',
                },
                {
                  name: 'Nueva',
                  path: '/inventory/adjustment/new',
                  component: './inventory/adjustment/form',
                },
                {
                  path: '/inventory/adjustment/:id',
                  component: './inventory/adjustment/form',
                },
              ],
            },
            {
              name: 'Entradas',
              path: '/inventory/input',
              routes: [
                {
                  name: 'Lista',
                  path: '/inventory/input/list',
                  component: './inventory/input/list',
                },
                {
                  name: 'Nueva',
                  path: '/inventory/input/new',
                  component: './inventory/input/form',
                },
                {
                  path: '/inventory/input/:id',
                  component: './inventory/input/form',
                },
              ],
            },
            {
              name: 'Salidas',
              path: '/inventory/output',
              routes: [
                {
                  name: 'Lista',
                  path: '/inventory/output/list',
                  component: './inventory/output/list',
                },
                {
                  name: 'Nueva',
                  path: '/inventory/output/new',
                  component: './inventory/output/form',
                },
                {
                  path: '/inventory/output/:id',
                  component: './inventory/output/form',
                },
              ],
            },
            {
              name: 'Configuraciones',
              path: '/inventory/configurations',
              routes: [
                {
                  name: 'Referencias',
                  path: '/inventory/configurations/reference',
                  component: './inventory/configurations/reference/list',
                },
                {
                  name: 'Colores',
                  path: '/inventory/configurations/color',
                  component: './inventory/configurations/color/list',
                },
                {
                  name: 'Categorias',
                  path: '/inventory/configurations/categories',
                  component: './inventory/configurations/categories/list',
                },
                {
                  name: 'Tallas',
                  path: '/inventory/configurations/size',
                  component: './inventory/configurations/size/list',
                },
                {
                  name: 'Atributos',
                  path: '/inventory/configurations/attribs',
                  component: './inventory/configurations/attribs/list',
                },
                {
                  name: 'Marcas',
                  path: '/inventory/configurations/brand',
                  component: './inventory/configurations/brand/list',
                },
                {
                  path: '/inventory/configurations/reference/new',
                  component: './inventory/configurations/reference/form',
                },
                {
                  path: '/inventory/configurations/reference/:id',
                  component: './inventory/configurations/reference/form',
                },
              ],
            },
          ],
        },
        {
          name: 'Facturación',
          path: '/billing',
          icon: 'container',
          routes: [
            {
              name: 'Devoluciones',
              path: '/billing/return',
              component: './billing/return/list',
            },
            {
              name: 'E-Commerce',
              path: '/billing/e-commerce',
              component: './billing/e-commerce/list',
            },
            {
              path: '/billing/e-commerce/:id',
              component: './billing/e-commerce/edit',
            },
            {
              name: 'Cierres',
              path: '/billing/closings',
              routes: [
                {
                  name: 'Cierre X',
                  path: '/billing/closings/closingX',
                  component: './billing/closings/closingX/list',
                },
                {
                  name: 'Cierre Z',
                  path: '/billing/closings/closingZ',
                  component: './billing/closings/closingZ/list',
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
