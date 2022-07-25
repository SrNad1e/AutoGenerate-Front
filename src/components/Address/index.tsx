/* eslint-disable react-hooks/exhaustive-deps */
import type { Address, Customer } from '@/graphql/graphql';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Form, Input, Row, Select, Checkbox } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useEffect, useState } from 'react';

import NewAddress from './new';

import styles from './styles';

const FormItem = Form.Item;
const { Option } = Select;

type Props = {
  deliveryAddress?: Address[];
  customer?: Customer;
};

const AddressDelivery = ({ deliveryAddress, customer }: Props) => {
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [visibleAddress, setVisibleAddress] = useState(true);
  const [count, setCount] = useState(0);

  const [form] = useForm();

  const closeCreate = () => {
    setVisibleCreate(false);
  };

  let num = -1;

  const renderAddress = () => (
    <Form layout="vertical" form={form}>
      <Row key={2}>
        <Col span={24}>
          <Row align="middle" gutter={[0, 20]}>
            <Col span={5}>
              <FormItem name="field1">
                <Input
                  placeholder="Carrera"
                  style={styles.directionInput}
                  defaultValue={deliveryAddress[count]?.field1}
                />
              </FormItem>
            </Col>
            <Col span={5}>
              <FormItem name="number1">
                <Input
                  placeholder="52"
                  style={styles.directionInput}
                  defaultValue={deliveryAddress[count]?.number1}
                />
              </FormItem>
            </Col>
            <Col span={1}>
              <FormItem> # </FormItem>{' '}
            </Col>
            <Col span={5}>
              <FormItem name="loteNumber">
                <Input
                  placeholder="84a"
                  style={styles.directionInput}
                  defaultValue={deliveryAddress[count]?.loteNumber}
                />
              </FormItem>
            </Col>
            <Col span={1}>
              <FormItem>-</FormItem>
            </Col>
            <Col span={5}>
              <FormItem name="number2">
                <Input
                  placeholder="22"
                  style={styles.directionInput}
                  defaultValue={deliveryAddress[count]?.number2}
                />
              </FormItem>
            </Col>
            <Col span={10}>
              <FormItem name="extra">
                <Input
                  placeholder="Ejemplo: 2do Piso"
                  style={styles.directionInput}
                  defaultValue={deliveryAddress[count]?.extra}
                />
              </FormItem>
            </Col>
            <Col span={10}>
              <FormItem name="neighborhood">
                <Input
                  placeholder="Ejemplo: El Guayabo"
                  style={styles.directionInput}
                  defaultValue={deliveryAddress[count]?.neighborhood}
                />
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem
                label="¿Es Principal?"
                name="isMain"
                colon={false}
                defaultValue={deliveryAddress[count]?.isMain}
              >
                <Checkbox defaultChecked />
              </FormItem>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <FormItem
            label="Nombre del Contacto"
            name="contact"
            defaultValue={deliveryAddress[count]?.contact}
          >
            <Input style={styles.inputWidth} />
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem
            label="Telefóno del Contacto"
            name="phone"
            defaultValue={deliveryAddress[count]?.phone}
          >
            <Input style={styles.inputWidth} />
          </FormItem>
        </Col>
      </Row>
    </Form>
  );

  const reRender = () => {
    setVisibleAddress(visibleAddress ? false : true);
  };

  const onChangeAddress = async (e: number) => {
    if (e >= 0) {
      await reRender();
      setCount(e);
      setVisibleAddress(true);
    } else {
      setVisibleAddress(false);
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      contact: deliveryAddress[count].contact,
      phone: deliveryAddress[count].phone,
    });
  }, []);

  return (
    <>
      <Divider style={styles.dividerMargin}>
        <Select defaultValue={0} onChange={(e) => onChangeAddress(e)}>
          {deliveryAddress?.map(() => {
            num++;
            return (
              <Option key={1} value={num}>
                {`Direccion Guardada #${num}`}
              </Option>
            );
          })}
        </Select>
        <Divider type="vertical" />
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setVisibleCreate(true)}>
          Crear
        </Button>
      </Divider>
      {visibleAddress && renderAddress()}
      <NewAddress customer={customer} visible={visibleCreate} onCancel={closeCreate} />
    </>
  );
};

export default AddressDelivery;
