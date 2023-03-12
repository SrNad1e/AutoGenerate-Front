/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Modal } from 'antd';
import { useEffect, useRef, useState } from 'react';

import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
import ReportCloseZ from '@/pages/invoicing/closings/closingZ/reports/closeZ';
import type { CloseZInvoicing } from '@/graphql/graphql';

type Props = {
  visible: boolean;
  onCancel: () => void;
  closeZData?: CloseZInvoicing;
};

const Correction = ({ onCancel, visible, closeZData }: Props) => {
  const [propsAlertInformation, setPropsAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const [form] = Form.useForm();
  const reportRef = useRef(null);

  /**
   * @description se encarga de cerrar la alerta informativa
   */
  const closeAlertInformation = () => {
    setPropsAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
    onCancel();
  };

  useEffect(() => {
    form.resetFields();
  }, [visible]);

  return (
    <Modal
      okText="Corregir"
      cancelText="Cancelar"
      title="Corrección"
      onCancel={onCancel}
      onOk={() => {}}
      open={visible}
      destroyOnClose
      okButtonProps={{
        style: { borderRadius: 5 },
        loading: false,
      }}
      cancelButtonProps={{
        style: { borderRadius: 5 },
        loading: false,
      }}
    >
      <Form form={form} layout="vertical" style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <ReportCloseZ ref={reportRef} data={closeZData} />
        </div>
      </Form>
      <AlertInformation {...propsAlertInformation} onCancel={closeAlertInformation} />
    </Modal>
  );
};

export default Correction;
