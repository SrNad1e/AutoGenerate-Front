import { Descriptions, Form, InputNumber } from 'antd';

import styles from '../styles';

const DescriptionsItem = Descriptions.Item;
const FormItem = Form.Item;

const FormShipping = () => {
  return (
    <Descriptions bordered size="small">
      <DescriptionsItem label="Ancho">
        <FormItem
          name="widht"
          style={styles.marginIntial}
          rules={[{ required: true, message: 'Obligatorio' }]}
        >
          <InputNumber min={0} addonAfter="cm" />
        </FormItem>
      </DescriptionsItem>
      <DescriptionsItem label="Alto">
        <FormItem
          style={styles.marginIntial}
          name="height"
          rules={[{ required: true, message: 'Obligatorio' }]}
        >
          <InputNumber min={0} addonAfter="cm" />
        </FormItem>
      </DescriptionsItem>
      <DescriptionsItem label="Largo">
        <FormItem
          style={styles.marginIntial}
          name="long"
          rules={[{ required: true, message: 'Obligatorio' }]}
        >
          <InputNumber min={0} addonAfter="cm" />
        </FormItem>
      </DescriptionsItem>
      <DescriptionsItem label="Peso">
        <FormItem
          name="weight"
          style={styles.marginIntial}
          rules={[{ required: true, message: 'Obligatorio' }]}
        >
          <InputNumber min={0} addonAfter="kg" />
        </FormItem>
      </DescriptionsItem>
      <DescriptionsItem label="Volumen">
        <FormItem
          style={styles.marginIntial}
          name="volume"
          rules={[{ required: true, message: 'Obligatorio' }]}
        >
          <InputNumber min={0} addonAfter="cc" />
        </FormItem>
      </DescriptionsItem>
    </Descriptions>
  );
};

export default FormShipping;
