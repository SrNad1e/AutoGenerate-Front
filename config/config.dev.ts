// https://umijs.org/config/
import { defineConfig } from 'umi';

export default defineConfig({
  plugins: [
    // https://github.com/zthxxx/react-dev-inspector
    'react-dev-inspector/plugins/umi/react-inspector',
  ],
  define: {
    // API_URL: 'http://192.168.70.254:8080',
    API_URL: 'http://localhost:8080',
    CDN_URL: 'https://toulouse-storage.s3.amazonaws.com',
    FORMAT_DATE: 'DD/MM/YYYY HH:mm:ss',
    FORMAT_DATE_API: 'YYYY/MM/DD HH:mm:ss',
  },
  // https://github.com/zthxxx/react-dev-inspector#inspector-loader-props
  inspectorConfig: {
    exclude: [],
    babelPlugins: [],
    babelOptions: {},
  },
});
