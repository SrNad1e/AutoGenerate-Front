import { SearchOutlined } from '@ant-design/icons';
import { Alert, Button, Input } from 'antd';
import { useState, useRef, useEffect } from 'react';

import type { Props as PropsModal } from './Modal';
import ModalSearchProducts from './Modal';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
import { useGetProduct } from '@/hooks/product.hooks';
import type { DetailRequest, Product } from '@/graphql/graphql';
import validateCodeBar from '@/libs/validateCodeBar';

const { Search } = Input;

export type Props = {
  barcode?: boolean;
  validateStock?: boolean;
  quantity?: number;
  details?: Partial<DetailRequest & { action: string }>[];
  warehouseId: string | undefined;
  createDetail: (product: Product, quantity: number) => void;
  updateDetail: (product: Product, quantity: number) => void;
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

  const [getProduct, { loading }] = useGetProduct();

  const searchRef = useRef(null);

  const onCloseAlert = () => {
    setPropsAlert({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  const setVisibleModal = () => {
    setShowModal(!showModal);
  };

  /**
   * @description se encarga de ejecutar la busqueda del producto
   * @param e evento del input
   */
  const onPressEnter = async (e: any) => {
    setError(undefined);
    const value = validateCodeBar(e?.target?.value);
    const response = await getProduct({
      variables: {
        input: {
          status: 'active',
          barcode: value,
          warehouseId,
        },
      },
    });

    if (response?.data?.product) {
      const exist = details.find((item) => item?.product?._id === response?.data?.product?._id);
      if (exist) {
        updateDetail(response?.data?.product as Product, (exist?.quantity || 0) + (quantity || 1));
      } else {
        createDetail(response?.data?.product as Product, quantity || 1);
      }
    } else {
      setError('Producto no existe o no se encuentra activo');
    }
    searchRef?.current?.select();
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
