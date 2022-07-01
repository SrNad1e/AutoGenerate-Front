import ImageAdmin from '@/components/ImageAdmin';
import type { Payment } from '@/graphql/graphql';
import { Form, Input, Modal, Switch } from 'antd';

const FormItem = Form.Item;

type Props = {
  visible: boolean;
  onCancel: () => void;
  paymentMethod: Payment;
};

const PaymentMethodsForm = ({ onCancel, paymentMethod, visible }: Props) => {
  const isNew = !paymentMethod?._id;
  const [form] = Form.useForm();

  /**
   * @description Cierra el modal, resetea los campos del form y al alerta de error
   */
  const closeAndClear = async () => {
    await onCancel();
    form.resetFields();
  };

  return (
    <Modal
      onCancel={closeAndClear}
      visible={visible}
      okText={isNew ? 'Crear' : 'Actualizar'}
      title={isNew ? 'Crear Medio de Pago' : 'Actualizar Medio de Pago'}
      cancelText="Cancelar"
      destroyOnClose
    >
      <Form form={form}>
        <FormItem label="Color" name="color">
          <Input type="color" />
        </FormItem>
        <FormItem label="Logo" name="logo">
          <ImageAdmin limit={1} disabled={false} />
        </FormItem>
        <FormItem label="Nombre">
          <Input placeholder="Ingrese nombre del medio de pago" />
        </FormItem>
        <FormItem label="Tipo de Pago" />
        {isNew && (
          <FormItem label="Activo">
            <Switch />
          </FormItem>
        )}
      </Form>
    </Modal>
  );
};

export default PaymentMethodsForm;
