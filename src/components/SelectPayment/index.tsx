/* eslint-disable react-hooks/exhaustive-deps */
import { Select, Alert } from 'antd';
import { useEffect } from 'react';

import { useGetPayments } from '@/hooks/payment.hooks';
import { Permissions, TypePayment } from '@/graphql/graphql';
import { useModel } from 'umi';

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

  const { initialState } = useModel('@@initialState');
  const canQueryPayments = initialState?.currentUser?.role.permissions.find(
    (permission) => permission.action === Permissions.ReadTreasuryPayments,
  );

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
    if (canQueryPayments) {
      getPayments({
        variables: {
          input: {},
        },
      });
    }
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
        placeholder="Medio de pago"
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
      {!canQueryPayments && (
        <Alert message="No tiene permiso para consultar los pagos" type="error" showIcon />
      )}
      {error && <Alert message={error} type="info" showIcon />}
    </>
  );
};

export default SelectPayment;
