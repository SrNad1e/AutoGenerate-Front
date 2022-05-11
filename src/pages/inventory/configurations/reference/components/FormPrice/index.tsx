import { Descriptions, Form, Input, InputNumber } from 'antd';

import style from '../styles.less';

const FormPrice = () => {
  const DescriptionsItem = Descriptions.Item;
  const FormItem = Form.Item;

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
