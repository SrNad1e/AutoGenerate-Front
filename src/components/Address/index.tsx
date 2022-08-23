import type { Address } from '@/graphql/graphql';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select, Checkbox, Space } from 'antd';
import { useState } from 'react';
import SelectCity from '../SelectCity';

import styles from './styles';

const FormItem = Form.Item;
const { Option } = Select;

type Props = {
  addresses: Address[];
  setAddresses: (addresses: Address[]) => void;
};

const DeliveryAddress = ({ addresses, setAddresses }: Props) => {
  const [allowEdit, setAllowEdit] = useState(false);
  const [indexSelected, setIndexSelected] = useState<string | null>(null);
  const [canSave, setCanSave] = useState(0);

  const [form] = Form.useForm();

  const setNewAddress = () => {
    setAllowEdit(true);
    setIndexSelected(null);
    form.resetFields();
  };

  const saveAddress = async () => {
    const values = await form.validateFields();
    setAddresses([...addresses, values]);
    form.resetFields();
  };

  const updateAddress = async () => {
    const values = await form.validateFields();
    setAddresses(
      addresses.map((item, key) => {
        if (key.toString() === indexSelected) {
          return {
            ...item,
            ...values,
          };
        }
        return item;
      }),
    );
  };

  const onChangeSelect = (key: string) => {
    form.setFieldsValue(addresses[parseInt(key)]);
    setIndexSelected(key);
    setAllowEdit(false);
  };

  const renderButtonOptions = () => {
    if (!indexSelected) {
      return (
        <Button disabled={canSave === 0} type="primary" onClick={saveAddress}>
          Guardar
        </Button>
      );
    }

    if (!allowEdit) {
      return (
        <Button onClick={() => setAllowEdit(true)} type="primary">
          Editar
        </Button>
      );
    }
    return (
      <Button onClick={updateAddress} type="primary">
        Actualizar
      </Button>
    );
  };

  return (
    <Space direction="vertical" size={20}>
      <Row gutter={12}>
        <Col span={20}>
          <Select
            style={{ width: '100%' }}
            onChange={onChangeSelect}
            value={indexSelected}
            placeholder="Seleccione una dirección guardada"
            disabled={addresses.length === 0}
          >
            {addresses?.map(({ city, field1, loteNumber, number1, number2, extra }, key) => (
              <Option key={key.toString()}>
                {field1} {number1} # {number2} - {loteNumber} {extra} / {city?.name}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={4}>
          <Button type="primary" icon={<PlusOutlined />} onClick={setNewAddress} />
        </Col>
      </Row>
      <Form form={form} layout="vertical">
        <Row>
          <Col span={24}>
            <FormItem label="Dirección">
              <Row align="middle" gutter={[30, 20]}>
                <Col span={5}>
                  <FormItem name="field1">
                    <Input
                      disabled={!allowEdit}
                      placeholder="Carrera"
                      style={styles.directionInput}
                      onClick={() => setCanSave(1)}
                    />
                  </FormItem>
                </Col>
                <Col span={5}>
                  <FormItem name="number1">
                    <Input disabled={!allowEdit} placeholder="52" style={styles.directionInput} />
                  </FormItem>
                </Col>
                <Col span={1}>#</Col>
                <Col span={5}>
                  <FormItem name="number2">
                    <Input disabled={!allowEdit} placeholder="84a" style={styles.directionInput} />
                  </FormItem>
                </Col>
                <Col span={1}>-</Col>
                <Col span={5}>
                  <FormItem name="loteNumber">
                    <Input disabled={!allowEdit} placeholder="22" style={styles.directionInput} />
                  </FormItem>
                </Col>
                <Col span={15}>
                  <FormItem name="cityId">
                    <SelectCity disabled={!allowEdit} />
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem
                    label="¿Es Principal?"
                    name="isMain"
                    colon={false}
                    valuePropName="checked"
                  >
                    <Checkbox defaultChecked disabled={!allowEdit} />
                  </FormItem>
                </Col>
                <Col span={10}>
                  <FormItem name="extra">
                    <Input
                      disabled={!allowEdit}
                      placeholder="Ejemplo: 2do Piso"
                      style={styles.directionInput}
                    />
                  </FormItem>
                </Col>
                <Col span={10}>
                  <FormItem name="neighborhood">
                    <Input
                      disabled={!allowEdit}
                      placeholder="Ejemplo: El Guayabo"
                      style={styles.directionInput}
                    />
                  </FormItem>
                </Col>
              </Row>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="Nombre del Contacto" name="contact">
              <Input disabled={!allowEdit} style={styles.inputWidth} />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="Telefóno del Contacto" name="phone">
              <Input disabled={!allowEdit} style={styles.inputWidth} />
            </FormItem>
          </Col>
          <Col span={5} offset={19}>
            <FormItem>{renderButtonOptions()}</FormItem>
          </Col>
        </Row>
      </Form>
    </Space>
  );
};

export default DeliveryAddress;
