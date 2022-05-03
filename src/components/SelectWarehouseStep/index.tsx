import { Button, Col, Form, Row } from 'antd';

import SelectWarehouses from '@/components/SelectWarehouses';

export type Props = {
  changeCurrentStep: (value: string) => void;
  label: string;
  warehouseId?: string;
};

const FormItem = Form.Item;

const SelectWarehouseStep = ({ changeCurrentStep, label, warehouseId }: Props) => {
  return (
    <Form
      onFinish={(values) => {
        changeCurrentStep(values?.warehouse);
      }}
    >
      <Row justify="center">
        <Col span={14}>
          <FormItem
            name="warehouse"
            label={label}
            rules={[
              { required: true, message: 'Se debe seleccionar una bodega' },
              {
                validator: (_, _id: string) => {
                  if (warehouseId) {
                    if (_id === warehouseId) {
                      return Promise.reject(new Error('No puedes seleccionar tu bodega'));
                    }
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <SelectWarehouses />
          </FormItem>
        </Col>
      </Row>
      <Row justify="end">
        <Col>
          <FormItem>
            <Button type="primary" htmlType="submit">
              Siguiente
            </Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
  );
};
export default SelectWarehouseStep;
