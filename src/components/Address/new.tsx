import type { Customer } from '@/graphql/graphql';
import { useUpdateCustomer } from '@/hooks/customer.hooks';
import { Checkbox, Col, Form, Input, Modal, Row } from 'antd';
import { useForm } from 'antd/lib/form/Form';

import styles from './styles';

const FormItem = Form.Item;

type Props = {
  visible: boolean;
  onCancel: () => void;
  customer: Customer;
};

const NewAddress = ({ visible, onCancel, customer }: Props) => {
  const [form] = useForm();
  const [updateCustomer /*paramsUpdateCustomer*/] = useUpdateCustomer();

  const onOk = async () => {
    const values = await form.validateFields();

    try {
      const response = await updateCustomer({
        variables: {
          id: customer._id,
          input: { addresses: [...customer?.addresses, { ...values }] },
        },
      });
      if (response?.data) {
        console.log('Creado correctamente');
      }
    } catch (error: any) {
      console.log(customer);
    }
  };

  return (
    <Modal
      visible={visible}
      title="Crear Dirección"
      cancelText="Cancelar"
      okText="Aceptar"
      onCancel={onCancel}
      onOk={onOk}
      width={700}
    >
      {' '}
      <Form layout="vertical" form={form}>
        <Row key={2}>
          <Col span={24}>
            <Row align="middle" gutter={[0, 20]}>
              <Col span={5}>
                <FormItem name="field1">
                  <Input placeholder="Carrera" style={styles.directionInput} />
                </FormItem>
              </Col>
              <Col span={5}>
                <FormItem name="number1">
                  <Input placeholder="52" style={styles.directionInput} />
                </FormItem>
              </Col>
              <Col span={1}>
                <FormItem> # </FormItem>{' '}
              </Col>
              <Col span={5}>
                <FormItem name="loteNumber">
                  <Input placeholder="84a" style={styles.directionInput} />
                </FormItem>
              </Col>
              <Col span={1}>
                <FormItem>-</FormItem>
              </Col>
              <Col span={5}>
                <FormItem name="number2">
                  <Input placeholder="22" style={styles.directionInput} />
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem name="extra">
                  <Input placeholder="Ejemplo: 2do Piso" style={styles.directionInput} />
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem name="neighborhood">
                  <Input placeholder="Ejemplo: El Guayabo" style={styles.directionInput} />
                </FormItem>
              </Col>
              <Col span={4}>
                <FormItem label="¿Es Principal?" name="isMain" colon={false}>
                  <Checkbox defaultChecked />
                </FormItem>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <FormItem label="Nombre del Contacto" name="contact">
              <Input style={styles.inputWidth} />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="Telefóno del Contacto" name="phone">
              <Input style={styles.inputWidth} />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default NewAddress;
