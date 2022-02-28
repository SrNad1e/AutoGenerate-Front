import { Button, Col, Form, Row } from 'antd';

import SelectWarehouses from '@/components/SelectWarehouses';
import { useModel } from 'umi';

export type Props = {
  changeCurrentStep: (value: WAREHOUSE.warehouse) => void;
  label: string;
};

const FormItem = Form.Item;

const SelectWarehouseStep = ({ changeCurrentStep, label }: Props) => {
  const { initialState } = useModel('@@initialState');

  return (
    <Form
      onFinish={(values) => {
        changeCurrentStep(values?.warehouse);
      }}
    >
      <Row justify="center">
        <Col span={10}>
          <FormItem
            name="warehouse"
            label={label}
            rules={[
              { required: true, message: 'Se debe seleccionar una bodega' },
              {
                validator: (_, data: any) => {
                  if (data?._id === initialState?.currentUser?.shop?.defaultWarehouse?._id) {
                    return Promise.reject(new Error('No puedes seleccionar tu bodega'));
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
