/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Card, Col, Form, Row } from 'antd';
import { useState } from 'react';

import SearchProducts from '../SearchProducts';
import WithCode from '../WithCode';

const FormItem = Form.Item;

export type Props = {
  onChange?: (products: PRODUCT.Product[]) => void;
  value?: PRODUCT.Product[];
};

const SelectProducts = (/*{ onChange, value }: Props*/) => {
  const [withCode, setWithCode] = useState(true);

  const onValuesChange = (values: any) => {
    if (values.withCode) {
      setWithCode(values.withCode === 'true');
    }
  };

  return (
    <Card bordered={false} size="small">
      <Form
        //onFinish={onFinish}
        layout="vertical"
        initialValues={{ withCode: withCode.toString() }}
        onValuesChange={onValuesChange}
      >
        <Row gutter={24}>
          <Col xs={24} lg={5}>
            <FormItem name="withCode" label=" " colon={false}>
              <WithCode />
            </FormItem>
          </Col>
          <Col xs={24} lg={19}>
            <FormItem name="products" label="Productos">
              <SearchProducts disabled={!withCode} />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default SelectProducts;
