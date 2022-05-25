import { Alert, Button, Form, InputNumber, Modal, Typography } from 'antd';
import { useState } from 'react';
import numeral from 'numeral';

import styles from './styles';

const FormItem = Form.Item;
const { Title } = Typography;

type Props = {
  onOk: (cash: any) => void;
  onCancel: () => void;
  visible: boolean;
};

const FormClosingZ = ({ onCancel, onOk, visible }: Props) => {
  const [error, setError] = useState('');
  const [cash, setCash] = useState({
    50: 0,
    100: 0,
    200: 0,
    500: 0,
    1000: 0,
    2000: 0,
    5000: 0,
    10000: 0,
    20000: 0,
    50000: 0,
    100000: 0,
  });

  const getTotal = () => {
    const values = Object.values(cash);
    return values.reduce((a, b) => a + b, 0);
  };

  const onFinish = () => {
    if (getTotal() > 0) {
      onOk(cash);
    }
    setError('El arqueo no puede estar en 0');
  };

  const onChange = (quantity: number, type: number) => {
    setError('');
    const tempCash = { ...cash };
    tempCash[type] = quantity * type;
    setCash(tempCash);
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
          <Button onClick={() => onCancel()}>Cancelar</Button>
          <Button type="primary" disabled={getTotal() <= 0} onClick={() => onFinish()}>
            Aceptar
          </Button>
        </>
      }
    >
      <Form {...formItemLayout}>
        <FormItem label="Moneda - $50" style={styles.formMargin}>
          <InputNumber
            controls={false}
            style={styles.inputWidth}
            min={0}
            autoFocus
            onChange={(e: number) => onChange(e, 50)}
          />
        </FormItem>
        <FormItem label="Moneda - $100" style={styles.formMargin}>
          <InputNumber
            controls={false}
            style={styles.inputWidth}
            min={0}
            onChange={(e: number) => onChange(e, 100)}
          />
        </FormItem>
        <FormItem label="Moneda - $200" style={styles.formMargin}>
          <InputNumber
            controls={false}
            style={styles.inputWidth}
            min={0}
            onChange={(e: number) => onChange(e, 200)}
          />
        </FormItem>
        <FormItem label="Moneda - $500" style={styles.formMargin}>
          <InputNumber
            controls={false}
            style={styles.inputWidth}
            min={0}
            onChange={(e: number) => onChange(e, 500)}
          />
        </FormItem>
        <FormItem label="Moneda/Billete - $1.000" style={styles.formMargin}>
          <InputNumber
            controls={false}
            style={styles.inputWidth}
            min={0}
            onChange={(e: number) => onChange(e, 1000)}
          />
        </FormItem>
        <FormItem label="Billete - $2.000" style={styles.formMargin}>
          <InputNumber
            controls={false}
            style={styles.inputWidth}
            min={0}
            onChange={(e: number) => onChange(e, 2000)}
          />
        </FormItem>
        <FormItem label="Billete - $5.000" style={styles.formMargin}>
          <InputNumber
            controls={false}
            style={styles.inputWidth}
            min={0}
            onChange={(e: number) => onChange(e, 5000)}
          />
        </FormItem>
        <FormItem label="Billete - $10.000" style={styles.formMargin}>
          <InputNumber
            controls={false}
            style={styles.inputWidth}
            min={0}
            onChange={(e: number) => onChange(e, 10000)}
          />
        </FormItem>
        <FormItem label="Billete - $20.000" style={styles.formMargin}>
          <InputNumber
            controls={false}
            style={styles.inputWidth}
            min={0}
            onChange={(e: number) => onChange(e, 20000)}
          />
        </FormItem>
        <FormItem label="Billete - $50.000" style={styles.formMargin}>
          <InputNumber
            controls={false}
            style={styles.inputWidth}
            min={0}
            onChange={(e: number) => onChange(e, 50000)}
          />
        </FormItem>
        <FormItem label="Billete - $100.000">
          <InputNumber
            controls={false}
            style={styles.inputWidth}
            min={0}
            onChange={(e: number) => onChange(e, 100000)}
          />
        </FormItem>
      </Form>
      {error && <Alert message={error} type="error" showIcon />}
      <Title level={4} style={styles.titleAlign}>
        Total: {numeral(getTotal()).format('$ 0,0')}{' '}
      </Title>
    </Modal>
  );
};

export default FormClosingZ;
