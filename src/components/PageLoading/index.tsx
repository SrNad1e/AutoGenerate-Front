import React from 'react';
import { Spin } from 'antd'; // loading components from code split
// https://umijs.org/plugin/umi-plugin-react.html#dynamicimport
import logo from '../../assets/logo.svg';
const PageLoading: React.FC = () => (
  <div
    style={{
      paddingTop: 100,
      textAlign: 'center',
    }}
  >
    <picture>
      <img src={logo} alt="logo" style={{ maxWidth: 200 }} />
      <br />
    </picture>
    <Spin size="large" />
  </div>
);

export default PageLoading;
