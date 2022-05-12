import { Button, Col, Divider, Form, Row, Tooltip, Typography } from 'antd';
import { BgColorsOutlined, ColumnHeightOutlined } from '@ant-design/icons';
import { useState } from 'react';

import CreateColors from '@/components/CreateColor';
import CreateSizes from '@/components/CreateSize';
import SelectColor from '@/components/SelectColor';
import SelectSize from '@/components/SelectSize';

const FormItem = Form.Item;
const { Text } = Typography;

const FormAdd = () => {
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
    <Row gutter={16} justify="center">
      <Form layout="inline" style={{ width: '90%' }}>
        <Col xs={24} md={10}>
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
            name="color"
          >
            <SelectColor />
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
            name="size"
          >
            <SelectSize />
          </FormItem>
        </Col>
        <Col xs={24} md={4}>
          <FormItem>
            <Button onClick={() => {}} type="primary">
              Crear
            </Button>
          </FormItem>
        </Col>
        <CreateColors modalVisible={modalColorVisible} onCancel={closeModalColor} />
        <CreateSizes modalVisible={modalSizeVisible} onCancel={closeModalSize} />
      </Form>
    </Row>
  );
};

export default FormAdd;
