/* eslint-disable react-hooks/exhaustive-deps */
import { Select, Alert } from 'antd';
import { useEffect } from 'react';

import { useGetPayments } from '@/hooks/payment.hooks';
import { TypePayment } from '@/graphql/graphql';

const { Option } = Select;

export type Params = {
  onChange?: (id: string) => void;
  value?: string;
  disabled: boolean;
  bonus?: boolean;
  credit?: boolean;
};

const SelectPayment = ({ onChange, disabled, value, bonus = false, credit = false }: Params) => {
  const [getPayments, { loading, data, error }] = useGetPayments();

  /**
   * @description se encarga de consultar con base a un comodín
   * @param name comodín de coincidencia en el nombre
   */
  const onSearch = (name: string) => {
    getPayments({
      variables: {
        input: {
          name,
        },
      },
    });
  };

  useEffect(() => {
    getPayments({
      variables: {
        input: {},
      },
    });
  }, []);

  let dataSource = bonus
    ? data?.payments?.docs
    : data?.payments?.docs.filter((payment) => payment.type !== TypePayment.Bonus);

  dataSource = credit
    ? dataSource
    : dataSource?.filter((payment) => payment.type !== TypePayment.Credit);

  return (
    <>
      <Select
        style={{ width: '100%' }}
        showSearch
        allowClear
        loading={loading}
        placeholder="Seleccione el metodo de pago"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        disabled={disabled}
        value={value}
      >
        {dataSource?.map(({ _id, name }) => (
          <Option key={_id} value={_id}>
            {name}
          </Option>
        ))}
      </Select>
      {error && <Alert message={error} type="info" showIcon />}
    </>
  );
};

export default SelectPayment;
