/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Card, Col, Form, Row } from 'antd';
import { useState } from 'react';

import SearchProducts from '../SearchProducts';
import type { Detail } from '../SearchProducts/Modal';
import WithCode from '../WithCode';

const FormItem = Form.Item;

export type Props = {
  barcode?: boolean;
  details: Partial<Detail[]>;
  warehouseId: string | undefined;
  createDetail: (product: Partial<PRODUCT.Product>, quantity: number) => void;
  updateDetail: (productId: string, quantity: number) => void;
  deleteDetail: (productId: string) => void;
};

type FormValues = {
  withCode: string;
};

const SelectProducts = (props: Props) => {
  const [withCode, setWithCode] = useState(true);

  const onValuesChange = (values: FormValues) => {
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
            <FormItem label="Productos">
              <SearchProducts {...props} />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default SelectProducts;
