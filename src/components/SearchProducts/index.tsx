import { useGetProduct } from '@/hooks/product.hooks';
import { SearchOutlined } from '@ant-design/icons';
import { Alert, Button, Input } from 'antd';
import { useState, useRef, useEffect } from 'react';

import type { Detail, Props as PropsModal } from './Modal';
import ModalSearchProducts from './Modal';

const { Search } = Input;

export type Props = {
  barcode?: boolean;
  details: Partial<Detail[]>;
  warehouseId: string;
  createDetail: (product: Partial<PRODUCT.Product>, quantity: number) => void;
  updateDetail: (productId: string, quantity: number) => void;
  deleteDetail: (productId: string) => void;
};

const SearchProducts = ({
  barcode,
  details = [],
  warehouseId,
  createDetail,
  updateDetail,
  deleteDetail,
}: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const searchRef = useRef(null);

  /**
   * @description maneja el error de la consulta
   * @param message error que genera al consulta
   */
  const showError = (message: string) => {
    if (message) {
      setError('Producto no existe');
    }
  };

  /**
   * @description callback ejecutado por el customHook
   * @param product producto
   */
  const resultProduct = () => {
    searchRef?.current?.select();
    //TODO: implentar agregar productos al detalle
  };

  const { getProduct, loading } = useGetProduct(resultProduct, showError);

  const setVisibleModal = () => {
    setShowModal(!showModal);
  };

  /**
   * @description se encarga de ejecutar la busqueda del producto
   * @param e evento del input
   */
  const onPressEnter = (e: any) => {
    setError(undefined);
    getProduct({
      variables: {
        input: {
          barcode: e.target.value,
          warehouseId,
        },
      },
    });
  };

  useEffect(() => {
    if (barcode) {
      searchRef?.current?.select();
    }
  }, [barcode]);

  const propsModal: PropsModal = {
    visible: showModal,
    details,
    createDetail,
    updateDetail,
    deleteDetail,
    onCancel: setVisibleModal,
    warehouseId,
  };

  return (
    <>
      <Search
        ref={searchRef}
        loading={loading}
        autoComplete="off"
        disabled={!barcode}
        onPressEnter={onPressEnter}
        enterButton={
          <Button
            type="primary"
            disabled={barcode}
            icon={<SearchOutlined onClick={setVisibleModal} />}
          />
        }
        style={{ width: '100%' }}
      />
      <ModalSearchProducts {...propsModal} />
      {error && <Alert type="warning" message={error} showIcon />}
    </>
  );
};

export default SearchProducts;
