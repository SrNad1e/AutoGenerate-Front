import { Col, DatePicker, Form, Input, InputNumber, Modal, Row, Space, Typography } from 'antd';
import {
  AuditOutlined,
  CalendarOutlined,
  DollarOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import { useCreateCoupon } from '@/hooks/coupon.hooks';
import { useState } from 'react';

import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';

import styles from '../styles';

const FormItem = Form.Item;
const { Text } = Typography;

type Props = {
  visible: boolean;
  onCancel: () => void;
};

const CouponForm = ({ visible, onCancel }: Props) => {
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const [form] = Form.useForm();

  const [createCoupon, paramsCreateCoupon] = useCreateCoupon();

  /**
   * @description Cierra el modal, resetea los campos del form y al alerta de error
   */
  const closeAndClear = async () => {
    await onCancel();
    form.resetFields();
  };

  /**
   * @description cierra la alerta y resetea los campos del form
   */
  const closeAlertInformation = () => {
    setAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
    closeAndClear();
  };

  /**
   * @description funcion usada para mostrar los errores
   * @param message mensaje de error a mostrar
   */
  const showError = (message: string) => {
    setAlertInformation({
      message,
      type: 'warning',
      visible: true,
    });
  };

  /**
   * @description funcion ejecutada para crear un nuevo cupon
   */
  const createNewCoupon = async () => {
    const values = await form.validateFields();
    try {
      const response = await createCoupon({
        variables: {
          input: {
            ...values,
          },
        },
      });
      if (response.data?.createCoupon) {
        setAlertInformation({
          message: `Cupón No.${response.data.createCoupon.number} creado correctamente`,
          visible: true,
          type: 'success',
        });
      }
    } catch (error: any) {
      showError(error?.message);
    }
  };

  return (
    <Modal
      visible={visible}
      width={400}
      okText="Crear"
      onCancel={onCancel}
      onOk={() => createNewCoupon()}
      cancelText="Cancelar"
      destroyOnClose
      title="Crear Cupón"
      cancelButtonProps={{
        style: styles.buttonR,
        disabled: paramsCreateCoupon?.loading,
        loading: paramsCreateCoupon?.loading,
      }}
      okButtonProps={{
        style: styles.buttonR,
        disabled: paramsCreateCoupon?.loading,
        loading: paramsCreateCoupon?.loading,
      }}
    >
      <Form form={form} layout="vertical" style={styles.centerForm}>
        <Row>
          <Col span={24}>
            <FormItem
              name="title"
              label={
                <Space>
                  <AuditOutlined />
                  <Text>Título</Text>
                </Space>
              }
              rules={[
                {
                  required: true,
                  message: 'Este campo no puede estar vacio',
                },
              ]}
            >
              <Input placeholder="Ingrese título" disabled={paramsCreateCoupon?.loading} />
            </FormItem>
            <FormItem
              rules={[
                {
                  required: true,
                  message: 'Este campo no puede estar vacio',
                },
              ]}
              name="message"
              label={
                <Space>
                  <MessageOutlined />
                  <Text>Mensaje</Text>
                </Space>
              }
            >
              <Input placeholder="Ingrese mensaje" disabled={paramsCreateCoupon?.loading} />
            </FormItem>
            <FormItem
              rules={[
                {
                  required: true,
                  message: 'Este campo no puede estar vacio',
                },
              ]}
              name="expiration"
              label={
                <Space>
                  <CalendarOutlined />
                  <Text>Expiración</Text>
                </Space>
              }
            >
              <DatePicker placeholder="Ingrese Fecha" disabled={paramsCreateCoupon?.loading} />
            </FormItem>
            <FormItem
              rules={[
                {
                  required: true,
                  message: 'Este campo no puede estar vacio',
                },
              ]}
              name="value"
              label={
                <Space>
                  <DollarOutlined />
                  <Text>Valor</Text>
                </Space>
              }
            >
              <InputNumber
                disabled={paramsCreateCoupon?.loading}
                style={styles.maxWidth}
                min={1}
                step={100}
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </FormItem>
          </Col>
        </Row>
      </Form>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </Modal>
  );
};

export default CouponForm;
