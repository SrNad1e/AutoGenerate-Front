/* eslint-disable react-hooks/exhaustive-deps */
import {
  CarOutlined,
  GlobalOutlined,
  MailOutlined,
  PushpinOutlined,
  ScheduleOutlined,
} from '@ant-design/icons';
import { Col, Form, Input, Modal, Row, Select, Space } from 'antd';
import { useEffect, useState } from 'react';
import type { City } from '@/graphql/graphql';
import { useCreateCities, useUpdateCity } from '@/hooks/cities.hooks';

import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';

import styles from '../styles';
import { Zones } from '../cities.data';

const FormItem = Form.Item;
const { Option } = Select;

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
      countryPrefix: cityData?.country?.prefix,
      countryName: cityData?.country?.name,
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
                placeholder="ITAGÜÍ"
                autoFocus
                disabled={paramsCreateCities.loading || paramsUpdateCity.loading}
              />
            </FormItem>
            <Row>
              <Col span={4}>
                <FormItem
                  rules={[
                    {
                      required: true,
                      message: 'Este campo no puede estar vacio',
                    },
                  ]}
                  name="countryPrefix"
                  label={<Space>{<GlobalOutlined />} País</Space>}
                >
                  <Input
                    placeholder="CO"
                    disabled={paramsCreateCities.loading || paramsUpdateCity.loading}
                  />
                </FormItem>
              </Col>
              <Col span={20}>
                <FormItem
                  rules={[
                    {
                      required: true,
                      message: 'Este campo no puede estar vacio',
                    },
                  ]}
                  name="countryName"
                  label=" "
                  colon={false}
                  noStyle
                >
                  <Input
                    placeholder="Colombia"
                    style={{
                      marginTop: 30,
                      borderLeft: 'none',
                    }}
                    disabled={paramsCreateCities.loading || paramsUpdateCity.loading}
                  />
                </FormItem>
              </Col>
            </Row>
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
                placeholder="ANTIOQUIA"
                disabled={paramsCreateCities.loading || paramsUpdateCity.loading}
              />
            </FormItem>
            <FormItem
              rules={[
                {
                  required: true,
                  message: 'Este campo no puede estar vacio',
                },
                {
                  len: 8,
                  message: 'Código Dane incorrecto',
                },
              ]}
              name="code"
              label={<Space>{<PushpinOutlined />} Código Dane</Space>}
            >
              <Input
                placeholder="00250012"
                disabled={paramsCreateCities.loading || paramsUpdateCity.loading}
              />
            </FormItem>
            <FormItem
              rules={[
                {
                  required: true,
                  message: 'Este campo no puede estar vacio',
                },
                {
                  len: 6,
                  message: 'Código postal no es correcto',
                },
              ]}
              name="defaultPostalCode"
              label={<Space>{<MailOutlined />} Código postal</Space>}
            >
              <Input
                placeholder="0000521"
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
              name="zone"
              label={<Space>{<CarOutlined />} Zona de cobro</Space>}
            >
              <Select
                placeholder="Zona de cobro"
                disabled={paramsCreateCities.loading || paramsUpdateCity.loading}
              >
                {Zones.map((item) => (
                  <Option key={item.zone}>{item.name}</Option>
                ))}
              </Select>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </Modal>
  );
};

export default CitiesForm;
