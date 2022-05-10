import { Descriptions, Form, Input, InputNumber } from 'antd';
import DescriptionsItem from 'antd/lib/descriptions/Item';
import FormItem from 'antd/lib/form/FormItem';

import style from '../styles.less';

const FormPrice = () => {
  return (
    <Form>
      <Descriptions bordered size="small">
        <DescriptionsItem label="Precio">
          <FormItem
            name="price"
            className={style.noMargin}
            rules={[{ required: true, message: 'Obligatorio' }]}
          >
            <Input value="$" disabled className={style.inputWidth} />
            <InputNumber min={0} className={style.styleNumber} step={100} />
          </FormItem>
        </DescriptionsItem>
        <DescriptionsItem label="Costo">
          <FormItem
            name="cost"
            className={style.noMargin}
            rules={[{ required: true, message: 'Obligatorio' }]}
          >
            <Input value="$" disabled className={style.inputWidth} />
            <InputNumber min={0} className={style.styleNumber} step={100} />
          </FormItem>
        </DescriptionsItem>
      </Descriptions>
    </Form>
  );
};

export default FormPrice;
