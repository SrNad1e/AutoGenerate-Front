import { useGetProduct } from '@/hooks/product.hooks';
import { SearchOutlined } from '@ant-design/icons';
import { Alert, Button, Input } from 'antd';
import { useState, useRef, useEffect } from 'react';
import type { Detail } from './Modal';
import ModalSearchProducts from './Modal';

const { Search } = Input;

export type Props = {
  disabled: boolean;
  details?: Partial<Detail[]>;
  setDetails?: (details: Partial<any[]>) => void;
};

const SearchProducts = ({ disabled, details = [], setDetails }: Props) => {
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
  const resultProduct = (detail: Detail) => {
    searchRef?.current?.select();
    if (setDetails) {
      setDetails([...details, detail]);
    }
  };

  const { getProduct, loading } = useGetProduct(resultProduct, showError);

  useEffect(() => {
    if (!disabled) {
      searchRef?.current?.select();
    }
  }, [disabled]);

  const setVisibleModal = () => {
    setShowModal(!showModal);
  };

  const onPressEnter = (e: any) => {
    setError(undefined);
    getProduct({
      variables: {
        input: {
          barcode: e.target.value,
        },
      },
    });
  };

  return (
    <>
      <Search
        ref={searchRef}
        loading={loading}
        autoComplete="off"
        disabled={disabled}
        onPressEnter={onPressEnter}
        enterButton={
          <Button
            type="primary"
            disabled={!disabled}
            icon={<SearchOutlined onClick={setVisibleModal} />}
          />
        }
        style={{ width: '100%' }}
      />
      <ModalSearchProducts
        visible={showModal}
        details={details}
        setDetails={setDetails}
        onCancel={setVisibleModal}
      />
      {error && <Alert type="warning" message={error} showIcon />}
    </>
  );
};

export default SearchProducts;
