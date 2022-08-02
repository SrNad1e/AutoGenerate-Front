/* eslint-disable react-hooks/exhaustive-deps */
import { Checkbox, Col, Form, Input, Modal, Row } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import type { Customer } from '@/graphql/graphql';
import { useUpdateCustomer } from '@/hooks/customer.hooks';
import { useEffect, useState } from 'react';

import SelectCity from '../SelectCity';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';

import styles from './styles';

const FormItem = Form.Item;

type Props = {
  visible: boolean;
  onCancel: () => void;
  customer: Customer;
};

const NewAddress = ({ visible, onCancel, customer }: Props) => {
  const [propsAlertInformation, setPropsAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [createAddress, setCreateAddress] = useState<any[]>([]);

  const [form] = useForm();

  const [updateCustomer, paramsUpdateCustomer] = useUpdateCustomer();

  /**
   * @description se encarga de cerrar la alerta informativa
   */
  const closeAlertInformation = () => {
    setPropsAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  /**
   * @description funcion usada por los hook para mostrar los errores
   * @param message mensaje de error a mostrar
   */
  const showError = (message: string) => {
    setPropsAlertInformation({
      message,
      type: 'error',
      visible: true,
    });
  };

  /**
   * @description array donde se almacenan las direcciones del cliente
   */
  const addressesCustomer: any = customer?.addresses?.map((index) => ({
    cityId: index.city._id,
    contact: index.contact,
    extra: index.extra,
    field1: index.field1,
    isMain: index.isMain,
    loteNumber: index.loteNumber,
    neighborhood: index.neighborhood,
    number1: index.number1,
    number2: index.number2,
    phone: index.phone,
  }));

  /**
   * @description funcion usada para agregarle una direccion al cliente
   */
  const onOk = async () => {
    const values = await form.validateFields();
    try {
      const response = await updateCustomer({
        variables: {
          id: customer._id,
          input: { addresses: [...createAddress, { ...values }] },
        },
      });
      if (response?.data) {
        setPropsAlertInformation({
          message: 'Dirección agregada correctamente',
          type: 'success',
          visible: true,
        });
      }
    } catch (error: any) {
      showError(error?.message);
    }
  };

  useEffect(() => {
    setCreateAddress(addressesCustomer);
  }, []);

  return (
    <Modal
      visible={visible}
      title="Crear Dirección"
      cancelText="Cancelar"
      okText="Aceptar"
      onCancel={onCancel}
      onOk={onOk}
      cancelButtonProps={{ loading: paramsUpdateCustomer.loading }}
      okButtonProps={{ loading: paramsUpdateCustomer.loading }}
      width={700}
    >
      {' '}
      <Form layout="vertical" form={form}>
        <Row key={2}>
          <Col span={24}>
            <Row align="middle" gutter={[20, 20]}>
              <Col span={5}>
                <FormItem name="field1">
                  <Input
                    disabled={paramsUpdateCustomer?.loading}
                    placeholder="Carrera"
                    style={styles.directionInput}
                  />
                </FormItem>
              </Col>
              <Col span={5}>
                <FormItem name="number1">
                  <Input
                    disabled={paramsUpdateCustomer?.loading}
                    placeholder="52"
                    style={styles.directionInput}
                  />
                </FormItem>
              </Col>
              <Col span={1}>
                <FormItem> # </FormItem>{' '}
              </Col>
              <Col span={5}>
                <FormItem name="loteNumber">
                  <Input
                    disabled={paramsUpdateCustomer?.loading}
                    placeholder="84a"
                    style={styles.directionInput}
                  />
                </FormItem>
              </Col>
              <Col span={1}>
                <FormItem>-</FormItem>
              </Col>
              <Col span={5}>
                <FormItem name="number2">
                  <Input
                    disabled={paramsUpdateCustomer?.loading}
                    placeholder="22"
                    style={styles.directionInput}
                  />
                </FormItem>
              </Col>
              <Col span={7}>
                <FormItem name="extra">
                  <Input
                    disabled={paramsUpdateCustomer?.loading}
                    placeholder="Ejemplo: 2do Piso"
                    style={styles.directionInput}
                  />
                </FormItem>
              </Col>
              <Col span={7}>
                <FormItem name="neighborhood">
                  <Input
                    disabled={paramsUpdateCustomer?.loading}
                    placeholder="Ejemplo: El Guayabo"
                    style={styles.directionInput}
                  />
                </FormItem>
              </Col>
              <Col span={7}>
                <FormItem name="cityId">
                  <SelectCity
                    style={styles.directionInput}
                    disabled={paramsUpdateCustomer?.loading}
                  />
                </FormItem>
              </Col>
              <Col span={3}>
                <FormItem label="¿Es Principal?" name="isMain" colon={false}>
                  <Checkbox defaultChecked />
                </FormItem>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <FormItem label="Nombre del Contacto" name="contact">
              <Input style={styles.inputWidth} disabled={paramsUpdateCustomer?.loading} />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="Telefóno del Contacto" name="phone">
              <Input style={styles.inputWidth} disabled={paramsUpdateCustomer?.loading} />
            </FormItem>
          </Col>
        </Row>
      </Form>
      <AlertInformation {...propsAlertInformation} onCancel={closeAlertInformation} />
    </Modal>
  );
};

export default NewAddress;
