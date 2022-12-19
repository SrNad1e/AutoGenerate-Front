import { Descriptions, Form, InputNumber } from 'antd';
import { useEffect } from 'react';

import styles from '../styles';

const DescriptionsItem = Descriptions.Item;
const FormItem = Form.Item;

type Props = {
  missingValue: boolean;
  form: any;
};

const FormShipping = ({ missingValue, form }: Props) => {
  useEffect(() => {
    if (missingValue) {
      form.validateFields();
    }
  }, [missingValue]);

  return (
    <Descriptions bordered size="small">
      <DescriptionsItem label="Ancho" span={1}>
        <FormItem
          name="width"
          style={styles.marginIntial}
          rules={[{ required: true, message: 'Obligatorio' }]}
        >
          <InputNumber min={0} addonAfter="cm" />
        </FormItem>
      </DescriptionsItem>
      <DescriptionsItem label="Alto" span={2}>
        <FormItem
          style={styles.marginIntial}
          name="height"
          rules={[{ required: true, message: 'Obligatorio' }]}
        >
          <InputNumber min={0} addonAfter="cm" />
        </FormItem>
      </DescriptionsItem>
      <DescriptionsItem label="Largo" span={1}>
        <FormItem
          style={styles.marginIntial}
          name="long"
          rules={[{ required: true, message: 'Obligatorio' }]}
        >
          <InputNumber min={0} addonAfter="cm" />
        </FormItem>
      </DescriptionsItem>
      <DescriptionsItem label="Peso" span={2}>
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
