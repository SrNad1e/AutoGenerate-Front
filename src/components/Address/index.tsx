/* eslint-disable react-hooks/exhaustive-deps */
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Checkbox,
  Typography,
  InputNumber,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import type { Address, Customer } from '@/graphql/graphql';
import { useEffect, useState } from 'react';

import SelectCity from '../SelectCity';
import NewAddress from './new';

import styles from './styles';

const FormItem = Form.Item;
const { Option } = Select;
const { Title } = Typography;

type Props = {
  deliveryAddress?: Address[];
  customer?: Customer;
  setDelivery?: any;
};

const AddressDelivery = ({ deliveryAddress, customer, setDelivery }: Props) => {
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [visibleAddress, setVisibleAddress] = useState(true);
  const [count, setCount] = useState(0);

  const [form] = useForm();

  /**
   * @description renderizar una direccion
   * @returns elemento jsx
   */
  const renderAddress = () => (
    <Form layout="vertical" form={form}>
      <Row key={2}>
        <Col span={24}>
          <Row align="middle" gutter={[20, 20]}>
            <Col span={5}>
              <FormItem name="field1">
                <Input
                  placeholder="Carrera"
                  style={styles.directionInput}
                  defaultValue={deliveryAddress && deliveryAddress[count]?.field1}
                />
              </FormItem>
            </Col>
            <Col span={5}>
              <FormItem name="number1">
                <Input
                  placeholder="52"
                  style={styles.directionInput}
                  defaultValue={deliveryAddress && deliveryAddress[count]?.number1}
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
                  defaultValue={deliveryAddress && deliveryAddress[count]?.loteNumber}
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
                  defaultValue={deliveryAddress && deliveryAddress[count]?.number2}
                />
              </FormItem>
            </Col>
            <Col span={7}>
              <FormItem name="extra">
                <Input
                  placeholder="Ejemplo: 2do Piso"
                  style={styles.directionInput}
                  defaultValue={deliveryAddress && deliveryAddress[count]?.extra}
                />
              </FormItem>
            </Col>
            <Col span={7}>
              <FormItem name="neighborhood">
                <Input
                  placeholder="Ejemplo: El Guayabo"
                  style={styles.directionInput}
                  defaultValue={deliveryAddress && deliveryAddress[count]?.neighborhood}
                />
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem name="cityId">
                <SelectCity style={styles.directionInput} disabled={false} />
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem
                label="¿Es Principal?"
                name="isMain"
                colon={false}
                defaultValue={deliveryAddress && deliveryAddress[count]?.isMain}
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
            defaultValue={deliveryAddress && deliveryAddress[count]?.contact}
          >
            <Input style={styles.inputWidth} />
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem
            label="Telefóno del Contacto"
            name="phone"
            defaultValue={deliveryAddress && deliveryAddress[count]?.phone}
          >
            <InputNumber style={{ width: '80%' }} controls={false} />
          </FormItem>
        </Col>
      </Row>
    </Form>
  );

  /**
   * @description indice aumenta dependiendo del numero de direcciones del cliente
   */
  let numberOfAddressesSave = -1;

  /**
   * @description funcion usada para re-renderizar la direccion cada vez que selecciona otra
   */
  const reRender = () => {
    setVisibleAddress(visibleAddress ? false : true);
  };

  /**
   *@description funcion encargada de seleccionar el numero de la direccion y renderizarla
   * @param e numero de direccion seleccionada de la lista de direcciones
   */
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
    if (deliveryAddress !== null) {
      form.setFieldsValue({
        contact: deliveryAddress && deliveryAddress[count]?.contact,
        phone: deliveryAddress && deliveryAddress[count]?.phone,
        cityId: deliveryAddress && deliveryAddress[count]?.city?._id,
      });
    }
  }, [visibleAddress]);

  useEffect(() => {
    if (deliveryAddress !== null && setDelivery) {
      setDelivery({
        city: {
          _id: deliveryAddress && deliveryAddress[count]?.city._id,
          name: deliveryAddress && deliveryAddress[count]?.city?.name,
          state: deliveryAddress && deliveryAddress[count]?.city?.state,
          country: { name: 'Colombia' },
        },
        contact: deliveryAddress && deliveryAddress[count]?.contact,
        extra: deliveryAddress && deliveryAddress[count]?.extra,
        field1: deliveryAddress && deliveryAddress[count]?.field1,
        isMain: deliveryAddress && deliveryAddress[count]?.isMain,
        loteNumber: deliveryAddress && deliveryAddress[count]?.loteNumber,
        neighborhood: deliveryAddress && deliveryAddress[count]?.neighborhood,
        number1: deliveryAddress && deliveryAddress[count]?.number1,
        number2: deliveryAddress && deliveryAddress[count]?.number2,
        phone: deliveryAddress && deliveryAddress[count]?.phone,
        postalCode: deliveryAddress && deliveryAddress[count]?.postalCode,
      });
    }
  }, [visibleAddress]);

  return (
    <>
      <Divider style={styles.dividerMargin}>
        {deliveryAddress && deliveryAddress.length > 0 && (
          <>
            {' '}
            <Select defaultValue={0} onChange={(e) => onChangeAddress(e)}>
              {deliveryAddress?.map(() => {
                numberOfAddressesSave++;
                return (
                  <Option key={1} value={numberOfAddressesSave}>
                    {`Direccion Guardada #${numberOfAddressesSave}`}
                  </Option>
                );
              })}
            </Select>
            <Divider type="vertical" />{' '}
          </>
        )}
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setVisibleCreate(true)}>
          Crear
        </Button>
      </Divider>
      {(deliveryAddress && deliveryAddress?.length > 0) ||
      (customer?.addresses && customer?.addresses?.length > 0) ? (
        visibleAddress && renderAddress()
      ) : (
        <Row>
          <Col offset={7} span={12}>
            <Title level={1}>No Registra Direccción</Title>
          </Col>
        </Row>
      )}
      <NewAddress
        customer={customer}
        visible={visibleCreate}
        onCancel={() => setVisibleCreate(false)}
      />
    </>
  );
};

export default AddressDelivery;
