/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from 'umi';
import { Col, Row } from 'antd';

import type { DetailOrder, Product } from '@/graphql/graphql';
import SearchProduct from '../components/SearchForm';
import Resumen from '../components/SellResumen';
import { useAddProductsOrder, useGetOrder } from '@/hooks/order.hooks';
import { useEffect, useRef } from 'react';

const PosNew = ({}: DetailOrder) => {
  const { id } = useParams<Partial<{ id: string }>>();

  const refCode = useRef(null);

  const [getOrder, dataOrder] = useGetOrder();
  const [addproducts] = useAddProductsOrder();

  const addProductOrder = (product: Product, quantity: number) => {
    const productExist = dataOrder?.data?.orderId?.details?.find(
      (detail) => detail?.product?._id === product?._id,
    );
    addproducts({
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
  };

  useEffect(() => {
    if (id) {
      getOrder({
        variables: {
          id,
        },
      });
    }
  }, []);

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
        <Resumen addProductOrder={addProductOrder} />
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
        <SearchProduct addProductOrder={addProductOrder} refCode={refCode} />
      </Col>
    </Row>
  );
};

export default PosNew;
