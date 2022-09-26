/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Form, Input, Modal, Row, Space, Typography } from 'antd';
import { useState } from 'react';
import type { VerifiedProductTransferErrorInput } from '@/graphql/graphql';
import { MessageOutlined } from '@ant-design/icons';
import { useVerifiedProductTransfersError } from '@/hooks/transfer.hooks';

import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';

const FormItem = Form.Item;
const { Text } = Typography;
const { TextArea } = Input;

type Props = {
  visible: boolean;
  onCancel: () => void;
  dataVerified: VerifiedProductTransferErrorInput;
  onCloseProducts: () => void;
};

const Reason = ({ onCancel, visible, dataVerified, onCloseProducts }: Props) => {
  const [propsAlertInformation, setPropsAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const [form] = Form.useForm();

  const [verifiedProduct, paramsVerifiedProduct] = useVerifiedProductTransfersError();

  /**
   * @description funcion usada por los hook para mostrar los errores
   * @param message mensaje de error a mostrar
   */
  const messageError = (message: string) => {
    setPropsAlertInformation({
      message,
      type: 'error',
      visible: true,
    });
  };

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
    onCloseProducts();
  };

  /**
   * @description funcion usada para ejecuar la mutacion de verificacion de productos
   */
  const onVerifiedProduct = async () => {
    const values = await form.validateFields();
    try {
      const response = await verifiedProduct({
        variables: {
          input: {
            productId: dataVerified?.productId,
            reason: values?.reason,
            returnInventory: dataVerified?.returnInventory,
            stockTransferErrorId: dataVerified?.stockTransferErrorId,
          },
        },
      });
      if (response?.data?.verifiedProductStockTransfer) {
        setPropsAlertInformation({
          message: 'Producto Verificado Correctamente',
          type: 'success',
          visible: true,
        });
      }
    } catch (error: any) {
      messageError(error?.message);
    }
  };

  return (
    <Modal
      okText="Verificar"
      cancelText="Cancelar"
      title="Verificación"
      onCancel={onCancel}
      onOk={onVerifiedProduct}
      visible={visible}
      destroyOnClose
      okButtonProps={{
        style: { borderRadius: 5 },
        loading: paramsVerifiedProduct?.loading,
      }}
      cancelButtonProps={{
        style: { borderRadius: 5 },
        loading: paramsVerifiedProduct?.loading,
      }}
    >
      <Form form={form} layout="vertical" style={{ display: 'flex', justifyContent: 'center' }}>
        <Row>
          <Col>
            <FormItem
              label={
                <Space>
                  <MessageOutlined />
                  <Text>Razón</Text>
                </Space>
              }
              name="reason"
              rules={[{ required: true, message: 'Campo obligatorio', min: 1 }]}
            >
              <TextArea
                disabled={paramsVerifiedProduct?.loading}
                showCount
                maxLength={150}
                style={{ height: 120 }}
              />
            </FormItem>
          </Col>
        </Row>
      </Form>
      <AlertInformation {...propsAlertInformation} onCancel={closeAlertInformation} />
    </Modal>
  );
};

export default Reason;
