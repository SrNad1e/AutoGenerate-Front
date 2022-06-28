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
    COMPANY_ID: COMPANY_ID || '629facb5e4251f089ecd274f',
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
          component: './exception/404',
        },
      ],
    },
    {
      path: '/pos',
      component: '../layouts/POSLayout',
      layout: false,
      access: 'allowOption',
      routes: [
        {
          path: '/pos/sales',
          name: 'POS',
          icon: 'shop',
          component: './pos/list',
          access: 'allowOption',
        },
        {
          name: 'Cierre X',
          path: '/pos/closes/closingX',
          component: './invoicing/closings/closingX/list',
          access: 'allowOption',
        },
        {
          name: 'Cierre Z',
          path: '/pos/closes/closingZ',
          component: './invoicing/closings/closingZ/list',
          access: 'allowOption',
        },
        {
          path: '/pos/sales/:id',
          component: './pos/new',
          access: 'allowOption',
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
          access: 'allowOption',
          routes: [
            {
              name: 'Solicitudes',
              path: '/inventory/request',
              access: 'allowOption',
              routes: [
                {
                  name: 'Lista',
                  path: '/inventory/request/list',
                  component: './inventory/request/list',
                  access: 'allowOption',
                },
                {
                  name: 'Nueva',
                  path: '/inventory/request/new',
                  component: './inventory/request/form',
                  access: 'allowOption',
                },
                {
                  path: '/inventory/request/:id',
                  component: './inventory/request/form',
                  access: 'allowOption',
                },
              ],
            },
            {
              name: 'Ajustes',
              path: '/inventory/adjustment',
              access: 'allowOption',
              routes: [
                {
                  name: 'Lista',
                  path: '/inventory/adjustment/list',
                  component: './inventory/adjustment/list',
                  access: 'allowOption',
                },
                {
                  name: 'Nuevo',
                  path: '/inventory/adjustment/new',
                  component: './inventory/adjustment/form',
                  access: 'allowOption',
                },
                {
                  path: '/inventory/adjustment/:id',
                  component: './inventory/adjustment/form',
                  access: 'allowOption',
                },
              ],
            },
            {
              name: 'Entradas',
              path: '/inventory/input',
              access: 'allowOption',
              routes: [
                {
                  name: 'Lista',
                  path: '/inventory/input/list',
                  component: './inventory/input/list',
                  access: 'allowOption',
                },
                {
                  name: 'Nueva',
                  path: '/inventory/input/new',
                  component: './inventory/input/form',
                  access: 'allowOption',
                },
                {
                  path: '/inventory/input/:id',
                  component: './inventory/input/form',
                  access: 'allowOption',
                },
              ],
            },
            {
              name: 'Salidas',
              path: '/inventory/output',
              access: 'allowOption',
              routes: [
                {
                  name: 'Lista',
                  path: '/inventory/output/list',
                  component: './inventory/output/list',
                  access: 'allowOption',
                },
                {
                  name: 'Nueva',
                  path: '/inventory/output/new',
                  component: './inventory/output/form',
                  access: 'allowOption',
                },
                {
                  path: '/inventory/output/:id',
                  component: './inventory/output/form',
                  access: 'allowOption',
                },
              ],
            },
            {
              name: 'Configuraciones',
              path: '/inventory/configurations',
              access: 'allowOption',
              routes: [
                {
                  name: 'Referencias',
                  path: '/inventory/configurations/reference',
                  component: './inventory/configurations/reference/list',
                  access: 'allowOption',
                },
                {
                  path: '/inventory/configurations/reference/new',
                  component: './inventory/configurations/reference/form',
                  access: 'allowOption',
                },
                {
                  path: '/inventory/configurations/reference/:id',
                  component: './inventory/configurations/reference/form',
                  access: 'allowOption',
                },
                {
                  name: 'Colores',
                  path: '/inventory/configurations/color',
                  component: './inventory/configurations/color/list',
                  access: 'allowOption',
                },
                {
                  name: 'Categorias',
                  path: '/inventory/configurations/categories',
                  component: './inventory/configurations/categories/list',
                  access: 'allowOption',
                },
                {
                  name: 'Tallas',
                  path: '/inventory/configurations/size',
                  component: './inventory/configurations/size/list',
                  access: 'allowOption',
                },
                {
                  name: 'Atributos',
                  path: '/inventory/configurations/attribs',
                  component: './inventory/configurations/attribs/list',
                  access: 'allowOption',
                },
                {
                  name: 'Marcas',
                  path: '/inventory/configurations/brand',
                  component: './inventory/configurations/brand/list',
                  access: 'allowOption',
                },
              ],
            },
            {
              name: 'Traslados',
              path: '/inventory/transfer',
              access: 'allowOption',
              routes: [
                {
                  name: 'Lista',
                  path: '/inventory/transfer/list',
                  component: './inventory/transfer/list',
                  access: 'allowOption',
                },
                {
                  name: 'Nuevo',
                  path: '/inventory/transfer/new',
                  component: './inventory/transfer/form',
                  access: 'allowOption',
                },
                {
                  path: '/inventory/transfer/confirm/:id',
                  component: './inventory/transfer/confirm',
                  access: 'allowOption',
                },
                {
                  path: '/inventory/transfer/:id',
                  component: './inventory/transfer/form',
                  access: 'allowOption',
                },
              ],
            },
          ],
        },
        {
          name: 'Facturación',
          path: '/invoicing',
          icon: 'container',
          access: 'allowOption',
          routes: [
            {
              name: 'POS',
              path: '/pos/sales',
              access: 'allowOption',
            },
            {
              name: 'E-Commerce',
              path: '/invoicing/e-commerce',
              component: './invoicing/e-commerce/list',
            },
            {
              name: 'Devoluciones',
              path: '/invoicing/return',
              component: './invoicing/return/list',
              access: 'allowOption',
            },
            {
              name: 'Cierres',
              path: '/invoicing/closings',
              access: 'allowOption',
              routes: [
                {
                  name: 'Cierre X',
                  path: '/invoicing/closings/closingX',
                  component: './invoicing/closings/closingX/list',
                  access: 'allowOption',
                },
                {
                  name: 'Cierre Z',
                  path: '/invoicing/closings/closingZ',
                  component: './invoicing/closings/closingZ/list',
                  access: 'allowOption',
                },
              ],
            },
          ],
        },
        {
          name: 'Configuraciones',
          path: '/configurations',
          icon: 'setting',
          access: 'allowOption',
          routes: [
            {
              name: 'Usuarios',
              path: '/configurations/users',
              component: './configurations/users/list',
              access: 'allowOption',
            },
            {
              name: 'Roles',
              path: '/configurations/roles',
              access: 'allowOption',
              routes: [
                {
                  name: 'Lista',
                  path: '/configurations/roles/list',
                  component: './configurations/roles/list',
                  access: 'allowOption',
                },
                {
                  name: 'Nuevo',
                  path: '/configurations/roles/new',
                  component: './configurations/roles/form',
                  access: 'allowOption',
                },
                {
                  path: '/configurations/roles/:id',
                  component: './configurations/roles/form',
                  access: 'allowOption',
                },
              ],
            },
          ],
        },
        {
          path: '/:id',
          component: './exception/404',
        },
        {
          path: '/:id/:id',
          component: './exception/404',
        },
        {
          path: '/:id/:id/:id',
          component: './exception/404',
        },
      ],
    },
    {
      component: './exception/404',
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
