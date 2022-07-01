/* eslint-disable react-hooks/exhaustive-deps */
import { GlobalOutlined, ScheduleOutlined } from '@ant-design/icons';
import { Col, Form, Input, Modal, Row, Space } from 'antd';
import { useEffect, useState } from 'react';
import type { City } from '@/graphql/graphql';
import { useCreateCities, useUpdateCity } from '@/hooks/cities.hooks';

import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';

import styles from '../styles';

const FormItem = Form.Item;

type Props = {
  visible: boolean;
  onCancel: () => void;
  cityData: City;
};

const CitiesForm = ({ cityData, onCancel, visible }: Props) => {
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const isNew = !cityData._id;

  const [form] = Form.useForm();

  const [createCities, paramsCreateCities] = useCreateCities();
  const [updateCity, paramsUpdateCity] = useUpdateCity();

  /**
   * @description Cierra el modal, resetea los campos del form
   */
  const closeAndClear = async () => {
    await onCancel();
    form.resetFields();
  };

  /**
   * @description funcion usada para mostrar los errores
   * @param message mensaje de error a mostrar
   */
  const showError = (message: string) => {
    setAlertInformation({
      message,
      type: 'warning',
      visible: true,
    });
  };

  /**
   * @description cierra la alerta y resetea los campos del form
   */
  const closeAlertInformation = () => {
    setAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
    closeAndClear();
  };

  /**
   * @description ejecuta la mutation para actualizar una ciudad
   */
  const editCity = async () => {
    const values = await form.validateFields();
    try {
      const response = await updateCity({
        variables: {
          id: cityData._id,
          input: values,
        },
      });
      if (response?.data?.updateCity) {
        setAlertInformation({
          message: `Ciudad ${response?.data?.updateCity?.name} actualizada correctamente`,
          type: 'success',
          visible: true,
        });
      }
    } catch (e: any) {
      showError(e?.message);
    }
  };

  /**
   * @description ejecuta la mutation para crear una ciudad
   */
  const createNewCity = async () => {
    const values = await form.validateFields();
    try {
      const response = await createCities({
        variables: {
          input: values,
        },
      });
      if (response?.data?.createCity) {
        setAlertInformation({
          message: `Ciudad ${response?.data?.createCity?.name} creada correctamente`,
          type: 'success',
          visible: true,
        });
      }
    } catch (e: any) {
      showError(e?.message);
    }
  };

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({
      ...cityData,
    });
  }, [visible]);

  return (
    <Modal
      visible={visible}
      okText={isNew ? 'Crear' : 'Actualizar'}
      onCancel={closeAndClear}
      onOk={isNew ? () => createNewCity() : () => editCity()}
      cancelText="Cancelar"
      destroyOnClose
      title={isNew ? 'Crear Ciudad' : 'Actualizar Ciudad'}
      okButtonProps={{
        style: styles.buttonR,
        loading: paramsCreateCities.loading || paramsUpdateCity.loading,
        disabled: paramsCreateCities.loading || paramsUpdateCity.loading,
      }}
      cancelButtonProps={{
        style: styles.buttonR,
        loading: paramsCreateCities.loading || paramsUpdateCity.loading,
        disabled: paramsCreateCities.loading || paramsUpdateCity.loading,
      }}
    >
      <Form form={form} layout="vertical" style={styles.centerForm}>
        <Row>
          <Col span={24}>
            <FormItem
              rules={[
                {
                  required: true,
                  message: 'Este campo no puede estar vacio',
                },
              ]}
              name="name"
              label={<Space>{<ScheduleOutlined />} Nombre</Space>}
            >
              <Input
                placeholder="Ingrese nombre"
                disabled={paramsCreateCities.loading || paramsUpdateCity.loading}
              />
            </FormItem>
            <FormItem
              rules={[
                {
                  required: true,
                  message: 'Este campo no puede estar vacio',
                },
              ]}
              name="country"
              label={<Space>{<GlobalOutlined />} Pais</Space>}
            >
              <Input
                placeholder="Ingrese pais"
                disabled={paramsCreateCities.loading || paramsUpdateCity.loading}
              />
            </FormItem>
            <FormItem
              rules={[
                {
                  required: true,
                  message: 'Este campo no puede estar vacio',
                },
              ]}
              name="state"
              label={<Space>{<ScheduleOutlined />} Departamento</Space>}
            >
              <Input
                placeholder="Ingrese departamento"
                disabled={paramsCreateCities.loading || paramsUpdateCity.loading}
              />
            </FormItem>
          </Col>
        </Row>
      </Form>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </Modal>
  );
};

export default CitiesForm;
