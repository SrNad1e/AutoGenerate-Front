import { useGetProduct } from '@/hooks/product.hooks';
import { SearchOutlined } from '@ant-design/icons';
import { Alert, Button, Input } from 'antd';
import { useState, useRef, useEffect } from 'react';

import type { Detail, Props as PropsModal } from './Modal';
import ModalSearchProducts from './Modal';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';

const { Search } = Input;

export type Props = {
  barcode?: boolean;
  validateStock?: boolean;
  quantity?: number;
  details: Partial<Detail[]>;
  warehouseId: string | undefined;
  createDetail: (product: Partial<PRODUCT.Product>, quantity: number) => void;
  updateDetail: (productId: string, quantity: number) => void;
  deleteDetail: (productId: string) => void;
};

const SearchProducts = ({
  barcode,
  validateStock = true,
  quantity,
  details = [],
  warehouseId,
  createDetail,
  updateDetail,
  deleteDetail,
}: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [propsAlert, setPropsAlert] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const searchRef = useRef(null);

  const onShowModalError = (message: string) => {
    setPropsAlert({
      message,
      type: 'error',
      visible: true,
    });
  };

  const onCloseAlert = () => {
    setPropsAlert({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  /**
   * @description manejap el error de la consulta
   * @param message error que genera al consulta
   */
  const showError = (message: string) => {
    if (message) {
      onShowModalError(message);
    }
  };

  /**
   * @description callback ejecutado por el customHook
   * @param product producto
   */
  const resultProduct = (product: PRODUCT.Product) => {
    if (product) {
      const exist = details.find((item) => item?.product?._id === product._id);
      if (exist) {
        updateDetail(product._id, exist.quantity + (quantity || 1));
      } else {
        createDetail(product, quantity || 1);
      }
    } else {
      setError('Producto no existe');
    }
    searchRef?.current?.select();
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
    validateStock,
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
      <AlertInformation {...propsAlert} onCancel={onCloseAlert} />
      <ModalSearchProducts {...propsModal} />
      {error && <Alert type="warning" message={error} showIcon />}
    </>
  );
};

export default SearchProducts;
