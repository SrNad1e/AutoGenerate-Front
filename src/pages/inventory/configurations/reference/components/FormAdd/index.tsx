import { Button, Col, Divider, Form, Row, Tooltip } from 'antd';
import { BgColorsOutlined } from '@ant-design/icons';

import CreateColors from '@/components/CreateColor';
import SelectColor from '@/components/SelectColor';
import SelectSize from '@/components/SelectSize';
import { useState } from 'react';

import style from '../styles.less';

const FormAdd = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const FormItem = Form.Item;

  /**
   * @description se encarga de cerrar el modal para crear color
   */
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <Row gutter={16} className={style.formAdd}>
      <Form layout="inline">
        <Col>
          <FormItem
            className={style.inputColor}
            label={
              <>
                <Tooltip title="Agregar nuevo Color">
                  <Button
                    icon={<BgColorsOutlined />}
                    type="primary"
                    style={{ marginRight: 10 }}
                    shape="circle"
                    onClick={() => setModalVisible(true)}
                  />
                </Tooltip>
                Color
              </>
            }
            rules={[{ required: true, message: 'Obligatorio' }]}
            name="color"
          >
            <SelectColor />
          </FormItem>
        </Col>
        <Col>
          <FormItem />
        </Col>
        <Col>
          <FormItem
            className={style.inputSize}
            label="Talla"
            rules={[{ required: true, message: 'Obligatorio' }]}
            name="size"
          >
            <SelectSize />
          </FormItem>
        </Col>
        <Col>
          <FormItem>
            <Divider type="vertical" />
            <Button onClick={() => {}} type="primary">
              Agregar
            </Button>
          </FormItem>
        </Col>
      </Form>
      <CreateColors modalVisible={modalVisible} onCancel={closeModal} />
    </Row>
  );
};

export default FormAdd;
