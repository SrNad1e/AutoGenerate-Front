import { Descriptions, Form, Input, InputNumber } from 'antd';

import style from '../styles.less';

const FormSend = () => {
  const DescriptionsItem = Descriptions.Item;
  const FormItem = Form.Item;

  return (
    <Form>
      <Descriptions bordered size="small">
        <DescriptionsItem label="Ancho">
          <FormItem
            name="widht"
            className={style.noMargin}
            rules={[{ required: true, message: 'Obligatorio' }]}
          >
            <InputNumber min={0} className={style.styleNumber} step={100} />
            <Input value="cm" disabled className={style.inputStyle} />
          </FormItem>
        </DescriptionsItem>
        <DescriptionsItem label="Alto">
          <FormItem
            name="height"
            className={style.noMargin}
            rules={[{ required: true, message: 'Obligatorio' }]}
          >
            <InputNumber min={0} className={style.styleNumber} step={100} />
            <Input value="cm" disabled className={style.inputStyle} />
          </FormItem>
        </DescriptionsItem>
        <DescriptionsItem label="Largo">
          <FormItem
            name="long"
            className={style.noMargin}
            rules={[{ required: true, message: 'Obligatorio' }]}
          >
            <InputNumber min={0} className={style.styleNumber} step={100} />
            <Input value="cm" disabled className={style.inputStyle} />
          </FormItem>
        </DescriptionsItem>
        <DescriptionsItem label="Peso">
          <FormItem
            name="weight"
            className={style.noMargin}
            rules={[{ required: true, message: 'Obligatorio' }]}
          >
            <InputNumber min={0} className={style.styleNumber} step={100} />
            <Input value="cm" disabled className={style.inputStyle} />
          </FormItem>
        </DescriptionsItem>
        <DescriptionsItem label="Volumen">
          <FormItem
            name="volume"
            className={style.noMargin}
            rules={[{ required: true, message: 'Obligatorio' }]}
          >
            <InputNumber min={0} className={style.styleNumber} step={100} />
            <Input value="cc" disabled className={style.inputStyle} />
          </FormItem>
        </DescriptionsItem>
      </Descriptions>
    </Form>
  );
};

export default FormSend;
