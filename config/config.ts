// https://umijs.org/config/
import { defineConfig } from 'umi';
import { join } from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV, API_URL, CDN_URL, FORMAT_DATE, FORMAT_DATE_API } = process.env;

export default defineConfig({
  define: {
    API_URL: API_URL || 'http://ecs-alb-cirotex-cluster-154363975.us-east-1.elb.amazonaws.com',
    CDN_URL: CDN_URL || 'https://toulouse-storage.s3.amazonaws.com',
    FORMAT_DATE: FORMAT_DATE || 'DD/MM/YYYY HH:mm:ss',
    FORMAT_DATE_API: FORMAT_DATE_API || 'YYYY/MM/DD HH:mm:ss',
    USER_ADMIN: 'master',
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
          name: 'Traslados',
          path: '/pos/transfer',
          icon: 'audit',
          access: 'allowOption',
          routes: [
            {
              name: 'Lista',
              path: '/pos/transfer/list',
              component: './inventory/transfer/list',
              access: 'allowOption',
            },
            {
              name: 'Nuevo',
              path: '/pos/transfer/new',
              component: './inventory/transfer/form',
              access: 'allowOption',
            },
            {
              path: '/pos/transfer/confirm/:id',
              component: './inventory/transfer/confirm',
              access: 'allowOption',
            },
            {
              path: '/pos/transfer/:id',
              component: './inventory/transfer/form',
              access: 'allowOption',
            },
          ],
        },
        {
          name: 'Devoluciones',
          path: '/pos/return',
          icon: 'retweet',
          component: './invoicing/return/list',
          access: 'allowOption',
        },
        {
          name: 'Cierre Z',
          path: '/pos/closes/closingZ',
          icon: 'closeCircle',
          component: './invoicing/closings/closingZ/list',
          access: 'allowOption',
        },
        {
          name: 'Solicitudes',
          path: '/pos/request',
          icon: 'fileAdd',
          access: 'allowOption',
          routes: [
            {
              name: 'Lista',
              path: '/pos/request/list',
              component: './inventory/request/list',
              access: 'allowOption',
            },
            {
              name: 'Nueva',
              path: '/pos/request/new',
              component: './inventory/request/form',
              access: 'allowOption',
            },
            {
              path: '/pos/request/:id',
              component: './inventory/request/form',
              access: 'allowOption',
            },
          ],
        },
        {
          name: 'Egresos',
          path: '/pos/expenses',
          icon: 'fund',
          component: './treasury/expenses/list',
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
          path: '/dashboard',
          name: 'Dashboard',
          icon: 'barChart',
          component: './dashboard/list',
        },
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
              name: 'Informes',
              path: '/inventory/reports',
              access: 'allowOption',
              routes: [
                {
                  name: 'Inventarios',
                  path: '/inventory/reports/inventories',
                  component: './inventory/reports/inventories',
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
                  name: 'Categorias',
                  path: '/inventory/configurations/categories',
                  component: './inventory/configurations/categories/list',
                  access: 'allowOption',
                },
                {
                  name: 'Atributos',
                  path: '/inventory/configurations/attribs',
                  component: './inventory/configurations/attribs/list',
                  access: 'allowOption',
                },
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
                  name: 'Tallas',
                  path: '/inventory/configurations/size',
                  component: './inventory/configurations/size/list',
                  access: 'allowOption',
                },
                {
                  name: 'Colores',
                  path: '/inventory/configurations/color',
                  component: './inventory/configurations/color/list',
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
              access: 'allowEcomerce',
              routes: [
                {
                  path: '/invoicing/e-commerce',
                  component: './invoicing/e-commerce/list',
                },
                {
                  path: '/invoicing/e-commerce/:id',
                  component: './invoicing/e-commerce/form',
                },
              ],
            },
            {
              name: 'Devoluciones',
              path: '/invoicing/return',
              component: './invoicing/return/list',
              access: 'allowOption',
            },
            {
              name: 'Reporte Ventas',
              path: '/invoicing/sales',
              component: './invoicing/sales/list',
            },
            {
              name: 'Pedidos',
              path: '/invoicing/order',
              component: './invoicing/order/list',
              // access: 'allowOption',
            },
            {
              name: 'Cierres Fiscales',
              path: '/invoicing/fiscalClose',
              component: './invoicing/fiscalClose/list',
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
            {
              name: 'Facturas',
              path: '/invoicing/invoice',
              component: './invoicing/invoice/list',
            },
          ],
        },
        {
          name: 'CRM',
          path: '/crm',
          icon: 'radarChart',
          access: 'allowOption',
          routes: [
            {
              name: 'Clientes',
              path: '/crm/customer',
              component: './crm/customers/list',
              access: 'allowOption',
            },
            {
              name: 'Cupones',
              path: '/crm/coupon',
              component: './crm/coupons/list',
              access: 'allowOption',
            },
            {
              name: 'Ciudades',
              path: '/crm/cities',
              component: './crm/cities/list',
              access: 'allowOption',
            },
            {
              name: 'Descuentos',
              path: '/crm/discount',
              component: './crm/discounts/list',
              access: 'allowOption',
            },
          ],
        },
        {
          name: 'Tesoreria',
          path: '/treasury',
          icon: 'gold',
          access: 'allowOption',
          routes: [
            {
              name: 'Egresos',
              path: '/treasury/expenses',
              component: './treasury/expenses/list',
              access: 'allowOption',
            },
            {
              name: 'Cajas',
              path: '/treasury/boxes',
              component: './treasury/boxes/list',
              access: 'allowOption',
            },
            {
              name: 'Medios de Pago',
              path: '/treasury/paymentMethods',
              component: './treasury/paymentMethods/list',
              access: 'allowOption',
            },
            {
              name: 'Recibo de Cajas',
              path: '/treasury/cashReceipt',
              component: './treasury/cashReceipt/list',
              access: 'allowOption',
            },
          ],
        },
        {
          name: 'Carteras',
          path: '/credits',
          icon: 'wallet',
          access: 'allowOption',
          routes: [
            {
              name: 'Creditos',
              path: '/credits/list',
              component: './credits/list',
              access: 'allowOption',
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
              name: 'Historial de Metas',
              path: '/configurations/goalHistory',
              component: './configurations/goalHistory/list',
            },
            {
              name: 'Tiendas',
              path: '/configurations/shop',
              component: './configurations/shop/list',
              access: 'allowOption',
            },
            {
              name: 'Bodegas',
              path: '/configurations/warehouse',
              component: './configurations/warehouse/list',
              access: 'allowOption',
            },

            {
              name: 'Envios',
              path: '/configurations/envio',
              routes: [
                {
                  name: 'Zona',
                  path: '/configurations/envio/zone',
                  component: './configurations/envio/zone/list',
                },
                {
                  name: 'Regiones',
                  path: '/configurations/envio/region',
                  component: './configurations/envio/region/list',
                },
              ],
            },

            {
              name: 'Usuarios',
              path: '/configurations/users',
              access: 'allowOption',

              routes: [
                {
                  name: 'Usuarios ERP',
                  path: '/configurations/users/list',
                  component: './configurations/users/list',
                },
                {
                  name: 'Usuarios WEB',
                  path: '/configurations/users/web',
                  component: './configurations/users/usersErp',
                },
              ],
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
            {
              name: 'Compañias',
              path: '/configurations/companies',
              component: './configurations/companies/list',
              access: 'allowCompany',
            },
            {
              name: 'Puntos de Venta',
              path: '/configurations/pointOfSale',
              component: './configurations/pointOfSales/list',
              access: 'allowOption',
            },
            {
              name: 'Autorización DIAN',
              path: '/configurations/authorizationDian',
              component: './configurations/authorizationDian/list',
              access: 'allowOption',
            },
          ],
        },
        {
          layout: false,
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
