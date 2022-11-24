import SelectShop from '@/components/SelectShop';
import { Button, Card, DatePicker, Form, InputNumber, Modal } from 'antd';

export interface Props {
  open: boolean;
}

const FormItem = Form.Item;

const ModalInvoicing = ({ open }: Props) => {
  const [form] = Form.useForm();

  //const {} = useGet

  const getPayments = () => {
    form.validateFields(['shopId', 'date']);
    const shopId = form.getFieldValue('shopId');
    const date = form.getFieldValue('date');

    console.log(date);
    console.log(shopId);
  };

  return (
    <Modal open={open} footer={null}>
      <Form layout="vertical" form={form}>
        <FormItem
          rules={[
            {
              required: true,
              message: 'Debe seleccionar una tienda',
            },
          ]}
          label="Seleccione la tienda"
          name="shopId"
        >
          <SelectShop disabled={false} />
        </FormItem>
        <FormItem
          rules={[
            {
              required: true,
              message: 'Debe seleccionar un mes',
            },
          ]}
          label="Selecciona las fechas"
          name="date"
        >
          <DatePicker picker="month" />
        </FormItem>
        <Button onClick={getPayments} type="primary">
          Consultar Resumen
        </Button>
        <Card></Card>
        <FormItem label="Cuanto desea facturar?">
          <InputNumber style={{ width: '100%' }} autoFocus controls={false} />
        </FormItem>
      </Form>
    </Modal>
  );
};
export default ModalInvoicing;
