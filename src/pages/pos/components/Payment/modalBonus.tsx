import { Alert, Input, Modal, Space, Typography } from 'antd';

import type { PaymentOrder, Payment as PaymentModel } from '@/graphql/graphql';
import { StatusCoupon } from '@/graphql/graphql';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import { useGetCoupon } from '@/hooks/coupon.hooks';
import moment from 'moment';
import { useRef, useState } from 'react';
import AlertInformation from '@/components/Alerts/AlertInformation';

const { Title } = Typography;

export type Params = {
  visible: boolean;
  payments: PaymentOrder[];
  onCancel: () => void;
  setPayments: (payments: PaymentOrder[]) => void;
  payment?: PaymentModel;
};

const ModalBonus = ({ payment, visible, setPayments, payments, onCancel }: Params) => {
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const inputRef = useRef(null);

  const [getCoupon, { error, loading }] = useGetCoupon();

  /**
   * @description funcion usada por los hooks para mostrar los errores
   * @param message mensaje de error a mostrar
   */
  const onShowError = (message: string) => {
    setAlertInformation({
      message,
      type: 'error',
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

  const onSearch = async (e: any) => {
    inputRef?.current?.select();

    if (e?.target?.value) {
      const response = await getCoupon({
        variables: {
          input: {
            code: e?.target?.value,
          },
        },
      });

      if (response?.data?.coupon) {
        if (moment().isAfter(response?.data?.coupon?.expiration)) {
          onShowError('El bono se encuentra vencido');
        } else if (response?.data?.coupon?.status === StatusCoupon.Redeemed) {
          onShowError('El bono ya se redimió');
        } else if (response?.data?.coupon?.status === StatusCoupon.Inactive) {
          onShowError('El bono se encuentra inactivo');
        } else {
          setPayments(
            payments.concat({
              payment,
              total: response?.data?.coupon?.value,
              code: e?.target?.value,
            } as PaymentOrder),
          );
          onCancel();
        }
      }
    }
  };

  return (
    <Modal centered destroyOnClose onCancel={onCancel} footer={false} visible={visible}>
      <Space direction="vertical" align="center" style={{ width: '100%' }}>
        <Title level={3}>DIGITA EL BONO</Title>
        <Input ref={inputRef} disabled={loading} size="large" autoFocus onPressEnter={onSearch} />
        {error && <Alert type="warning" showIcon message={error?.message} />}
      </Space>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </Modal>
  );
};

export default ModalBonus;
