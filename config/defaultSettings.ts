import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  primaryColor: '#dc9575',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: false,
  title: 'POS Toulouse',
  pwa: true,
  logo: 'http://localhost:8000/logo.svg',
  headerHeight: 48,
  splitMenus: false,
};

export default Settings;
