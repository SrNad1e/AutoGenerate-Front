import { Alert, Button, Form, InputNumber, Modal, Typography } from 'antd';
import { useState } from 'react';
import numeral from 'numeral';

import type { CashRegister } from '@/graphql/graphql';

import styles from './styles';

const FormItem = Form.Item;
const { Title } = Typography;

export type Props = {
  onOk: (cash: CashRegister) => void;
  onCancel: () => void;
  visible: boolean;
};

const FormClosingX = ({ onCancel, onOk, visible }: Props) => {
  const [error, setError] = useState('');
  const [total, setTotal] = useState(0);

  const [form] = Form.useForm();

  const getTotal = () => {
    const values = form.getFieldsValue();

    const keys = Object.keys(values);
    setTotal(keys.reduce((sum, item) => sum + values[item] * parseInt(item.slice(1)), 0) || 0);
  };

  const onFinish = async () => {
    const values = form.getFieldsValue();

    if (total > 0) {
      onOk(values);
    } else {
      setError('El arqueo no puede estar en 0');
    }
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    },
  };

  return (
    <Modal
      visible={visible}
      title="Arqueo de dinero"
      onCancel={onCancel}
      destroyOnClose
      footer={
        <>
          <Button onClick={onCancel}>Cancelar</Button>
          <Button type="primary" onClick={onFinish}>
            Aceptar
          </Button>
        </>
      }
    >
      <Form
        onChange={getTotal}
        initialValues={{
          M50: 0,
          M100: 0,
          M200: 0,
          M500: 0,
          B1000: 0,
          B2000: 0,
          B5000: 0,
          B10000: 0,
          B20000: 0,
          B50000: 0,
          B100000: 0,
        }}
        form={form}
        {...formItemLayout}
      >
        <FormItem label="Moneda - $50" name="M50" style={styles.formMargin}>
          <InputNumber controls={false} style={styles.inputWidth} min={0} autoFocus />
        </FormItem>
        <FormItem label="Moneda - $100" name="M100" style={styles.formMargin}>
          <InputNumber controls={false} style={styles.inputWidth} min={0} />
        </FormItem>
        <FormItem label="Moneda - $200" name="M200" style={styles.formMargin}>
          <InputNumber controls={false} style={styles.inputWidth} min={0} />
        </FormItem>
        <FormItem label="Moneda - $500" name="M500" style={styles.formMargin}>
          <InputNumber controls={false} style={styles.inputWidth} min={0} />
        </FormItem>
        <FormItem label="Moneda/Billete - $1.000" name="B1000" style={styles.formMargin}>
          <InputNumber controls={false} style={styles.inputWidth} min={0} />
        </FormItem>
        <FormItem label="Billete - $2.000" name="B2000" style={styles.formMargin}>
          <InputNumber controls={false} style={styles.inputWidth} min={0} />
        </FormItem>
        <FormItem label="Billete - $5.000" name="B5000" style={styles.formMargin}>
          <InputNumber controls={false} style={styles.inputWidth} min={0} />
        </FormItem>
        <FormItem label="Billete - $10.000" name="B10000" style={styles.formMargin}>
          <InputNumber controls={false} style={styles.inputWidth} min={0} />
        </FormItem>
        <FormItem label="Billete - $20.000" name="B20000" style={styles.formMargin}>
          <InputNumber controls={false} style={styles.inputWidth} min={0} />
        </FormItem>
        <FormItem label="Billete - $50.000" name="B50000" style={styles.formMargin}>
          <InputNumber controls={false} style={styles.inputWidth} min={0} />
        </FormItem>
        <FormItem label="Billete - $100.000" name="B100000">
          <InputNumber controls={false} style={styles.inputWidth} min={0} />
        </FormItem>
      </Form>
      {error && <Alert message={error} type="error" showIcon />}
      <Title level={4} style={styles.titleAlign}>
        Total: {numeral(total).format('$ 0,0')}
      </Title>
    </Modal>
  );
};

export default FormClosingX;
