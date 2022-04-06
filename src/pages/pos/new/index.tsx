import { Col, Row } from 'antd';
import { useState } from 'react';
import Resumen from '../components/Resumen';
//import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
//import { useGetOrder } from "@/hooks/order.hooks";
import SearchProduct from '../components/SearchProduct';

const PosNew = () => {
  const [order, setOrder] = useState<Partial<ORDER.Order>>();
  /*const [, setPropsAlert] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });*/

  /*const onShowError = (message: string) => {
    setPropsAlert({
      message,
      type: 'error',
      visible: true,
    });
  };*/

  /* const onCloseAlert = () => {
    setPropsAlert({
      message: '',
      type: 'error',
      visible: false,
    });
  };*/

  /*const currentOrder = (data: Partial<ORDER.Order>) => {
    setOrder(data);
  };

  const showError = (message: string) => {
    onShowError(message)
  }*/

  //const {getOrder, loadingGetOne} = useGetOrder(currentOrder, showError);

  return (
    <Row style={{ height: '90vh' }}>
      <Col xxl={6} lg={8}>
        <Resumen order={order} setOrder={setOrder} />
      </Col>
      <Col xxl={18} lg={16}>
        <SearchProduct />
      </Col>
    </Row>
  );
};

export default PosNew;
