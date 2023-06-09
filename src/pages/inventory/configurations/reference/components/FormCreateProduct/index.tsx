import { Button, Col, Divider, Form, Row, Tooltip, Typography } from 'antd';
import { BgColorsOutlined, ColumnHeightOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd/es/form/Form';
import { useState } from 'react';

import CreateColors from '@/components/CreateColor';
import CreateSizes from '@/components/CreateSize';
import SelectListColor from '@/components/SelectListColor';
import SelectListSize from '@/components/SelectListSize';
import type { Color, Size } from '@/graphql/graphql';

const FormItem = Form.Item;
const { Text } = Typography;

export type Params = {
  onFinish: (values: { colors: Color[]; sizes: Size[] }) => void;
  disabled: boolean;
  form:
    | FormInstance<{
        colors: Color[];
        sizes: Size[];
      }>
    | undefined;
};

const FormCreateProduct = ({ onFinish, form, disabled }: Params) => {
  const [modalColorVisible, setModalColorVisible] = useState(false);
  const [modalSizeVisible, setModalSizeVisible] = useState(false);

  /**
   * @description se encarga de cerrar el modal para crear color
   */
  const closeModalColor = () => {
    setModalColorVisible(false);
  };

  /**
   * @description se encarga de cerrar el modal para crear color
   */
  const closeModalSize = () => {
    setModalSizeVisible(false);
  };

  return (
    <Form
      disabled={disabled}
      form={form}
      onFinish={onFinish}
      layout="horizontal"
      style={{ width: '90%' }}
    >
      <Row gutter={[16, 10]} justify="center">
        <Col xs={24} md={12}>
          <FormItem
            label={
              <>
                <Tooltip title="Crear nuevo color">
                  <Button
                    icon={<BgColorsOutlined />}
                    type="primary"
                    shape="circle"
                    onClick={() => setModalColorVisible(true)}
                  />
                </Tooltip>
                <Divider type="vertical" />
                <Text>Color</Text>
              </>
            }
            rules={[{ required: true, message: 'Obligatorio' }]}
            name="colors"
          >
            <SelectListColor disabled={disabled} />
          </FormItem>
        </Col>
        <Col xs={24} md={10}>
          <FormItem
            label={
              <>
                <Tooltip title="Crear nueva talla">
                  <Button
                    icon={<ColumnHeightOutlined />}
                    type="primary"
                    shape="circle"
                    onClick={() => setModalSizeVisible(true)}
                  />
                </Tooltip>
                <Divider type="vertical" />
                <Text>Talla</Text>
              </>
            }
            rules={[{ required: true, message: 'Obligatorio' }]}
            name="sizes"
          >
            <SelectListSize disabled={disabled} />
          </FormItem>
        </Col>
        <Col xs={24} md={2}>
          <Button type="primary" style={{ borderRadius: 5 }} htmlType="submit">
            Crear
          </Button>
        </Col>
      </Row>
      <CreateColors modalVisible={modalColorVisible} onCancel={closeModalColor} />
      <CreateSizes modalVisible={modalSizeVisible} onCancel={closeModalSize} />
    </Form>
  );
};

export default FormCreateProduct;
