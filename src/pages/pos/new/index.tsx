/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from 'umi';
import { Col, Row } from 'antd';
import { useEffect, useRef, useState } from 'react';

import type { Product, UpdateOrderInput } from '@/graphql/graphql';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import SearchProduct from '../components/SearchForm';
import Resumen from '../components/SellResumen';
import { useAddProductsOrder, useGetOrder, useUpdateOrder } from '@/hooks/order.hooks';
import AlertLoading from '@/components/Alerts/AlertLoading';
import AlertInformation from '@/components/Alerts/AlertInformation';
import SelectCustomer from '../components/SelectCustomer';

const PosNew = () => {
  const [modalCustomerVisible, setModalCustomerVisible] = useState(false);
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const { id } = useParams<Partial<{ id: string }>>();

  const refCode = useRef(null);

  const [getOrder, { data, loading, error }] = useGetOrder();
  const [addproducts, dataProducts] = useAddProductsOrder();
  const [updateOrder] = useUpdateOrder();

  /**
   * @description cierra el modal de cambio de cliente
   */
  const closeModalCustomer = () => {
    setModalCustomerVisible(false);
  };

  /**
   * @description funcion usada por los hooks para mostrar los errores
   * @param message mensaje de error a mostrar
   */
  const showError = (message: string) => {
    setAlertInformation({
      message,
      type: 'error',
      visible: true,
    });
  };

  /**
   * @description funcion usada por los hooks para mostrar los errores
   * @param message mensaje de error a mostrar
   */
  const showErrorRedirect = (message: string, redirect: string) => {
    setAlertInformation({
      message,
      type: 'error',
      redirect,
      visible: true,
    });
  };

  /**
   * @description cierra la alerta y el modal
   */
  const closeAlertInformation = () => {
    setAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  const editOrder = async (params: UpdateOrderInput) => {
    try {
      if (id) {
        const response = await updateOrder({
          variables: {
            id,
            input: params,
          },
        });
        setModalCustomerVisible(false);
        return response?.data?.updateOrder;
      }
    } catch (e: any) {
      if (e?.message) {
        showError(e?.message);
      }
      return e;
    }
  };

  const addProductOrder = async (product: Product, quantity: number) => {
    try {
      const productExist = data?.orderId?.details?.find(
        (detail) => detail?.product?._id === product?._id,
      );
      await addproducts({
        variables: {
          input: {
            orderId: id || '',
            details: [
              {
                productId: product?._id || '',
                action: quantity === 0 ? 'delete' : productExist ? 'update' : 'create',
                quantity: productExist ? productExist?.quantity + quantity : quantity,
              },
            ],
          },
        },
      });
      refCode?.current?.select();
    } catch (e: any) {
      showError(e.message);
    }
  };

  const order = async () => {
    if (id) {
      const response = await getOrder({
        variables: {
          id,
        },
      });

      if (response?.data?.orderId?.status && response?.data?.orderId?.status !== 'open') {
        showErrorRedirect(`El pedido ya se encuentra finalizado`, '/pos');
      }
    }
  };

  useEffect(() => {
    order();
  }, []);

  useEffect(() => {
    if (error) {
      showErrorRedirect(`Error al cargar el pedido, ${error.message}`, '/pos');
    }
  }, [error]);

  return (
    <Row
      style={{
        height: '95vh',
        overflow: 'hidden',
      }}
    >
      <Col
        xs={12}
        md={8}
        lg={8}
        style={{
          height: '100%',
          borderRight: 'solid 1px black',
        }}
      >
        <Resumen
          setModalCustomerVisible={setModalCustomerVisible}
          editOrder={editOrder}
          addProductOrder={addProductOrder}
        />
      </Col>
      <Col
        style={{
          height: '100%',
          overflowY: 'scroll',
          overflowX: 'hidden',
        }}
        xs={12}
        md={16}
        lg={16}
      >
        <SearchProduct editOrder={editOrder} addProductOrder={addProductOrder} refCode={refCode} />
      </Col>
      <SelectCustomer
        editOrder={editOrder}
        visible={modalCustomerVisible}
        onCancel={closeModalCustomer}
      />
      <AlertLoading
        message={
          dataProducts ? 'Actualizando productos del pedido' : 'Cargando pedido, espere porfavor'
        }
        visible={loading || dataProducts?.loading}
      />
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </Row>
  );
};

export default PosNew;
