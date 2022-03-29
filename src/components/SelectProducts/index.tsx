/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Card, Col, Form, InputNumber, Row } from 'antd';
import { useState } from 'react';

import SearchProducts from '../SearchProducts';
import type { Detail } from '../SearchProducts/Modal';
import WithCode from '../WithCode';

const FormItem = Form.Item;

export type Props = {
  validateStock?: boolean;
  details: Partial<Detail[]>;
  warehouseId: string | undefined;
  createDetail: (product: Partial<PRODUCT.Product>, quantity: number) => void;
  updateDetail: (productId: string, quantity: number) => void;
  deleteDetail: (productId: string) => void;
};

type FormValues = {
  withCode: string;
  quantity: number;
};

const SelectProducts = (props: Props) => {
  const [withCode, setWithCode] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const onValuesChange = (values: FormValues) => {
    if (values.withCode) {
      setWithCode(values.withCode === 'true');
    }

    if (values.quantity) {
      setQuantity(values.quantity);
    }
  };

  return (
    <Card bordered={false} size="small">
      <Form
        layout="vertical"
        initialValues={{ withCode: withCode.toString(), quantity: 1 }}
        onValuesChange={onValuesChange}
      >
        <Row gutter={24}>
          <Col xs={24} lg={5}>
            <FormItem name="withCode" label=" " colon={false}>
              <WithCode />
            </FormItem>
          </Col>
          <Col xs={24} lg={16}>
            <FormItem label="Productos">
              <SearchProducts {...props} barcode={withCode} quantity={quantity} />
            </FormItem>
          </Col>
          <Col xs={24} lg={3}>
            <FormItem label="Cantidad" name="quantity">
              <InputNumber min={1} />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default SelectProducts;
