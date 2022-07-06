/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Form, Input, Modal, Row, Space, Switch, Typography, Image, Card } from 'antd';
import {
  AliyunOutlined,
  HomeOutlined,
  IdcardOutlined,
  PhoneOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { useCreateCompany, useUpdateCompany } from '@/hooks/company.hooks';
import DefaultImage from '@/assets/default.webp';
import type { Company } from '@/graphql/graphql';
import { useEffect, useState } from 'react';

import AlertInformation from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';

import styles from '../styles';

const FormItem = Form.Item;
const { Text } = Typography;

type Props = {
  visible: boolean;
  onCancel: () => void;
  companyData: Company;
};

const CompaniesForm = ({ onCancel, visible, companyData }: Props) => {
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const isNew = !companyData?._id;
  const [form] = Form.useForm();

  const [createCompany, paramsCreateCompany] = useCreateCompany();
  const [updateCompany, paramsUpdateCompany] = useUpdateCompany();

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
   * @description Cierra el modal, resetea los campos del form y al alerta de error
   */
  const closeAndClear = async () => {
    await onCancel();
    form.resetFields();
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
   * @description ejecuta la mutation para actualizar una compañia
   */
  const editCompany = async () => {
    const values = await form.validateFields();

    try {
      const response = await updateCompany({
        variables: {
          input: values,
          id: companyData?._id || '',
        },
      });
      if (response?.data?.updateCompany) {
        setAlertInformation({
          message: `Compañia ${response?.data?.updateCompany?.name} actualizada correctamente`,
          type: 'success',
          visible: true,
        });
      }
    } catch (e: any) {
      if (e?.message) {
        showError(e?.message);
      }
    }
  };

  /**
   * @description ejecuta la mutation para crear una compañia
   */
  const createNewCompany = async () => {
    const values = await form.validateFields();

    try {
      const response = await createCompany({
        variables: {
          input: { ...values },
        },
      });
      if (response?.data?.createCompany) {
        setAlertInformation({
          message: `Compañia ${response?.data?.createCompany?.name} creada correctamente`,
          type: 'success',
          visible: true,
        });
      }
    } catch (e: any) {
      if (e?.message) {
        showError(e?.message);
      }
    }
  };

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({
      ...companyData,
      logo: companyData?.logo ? companyData?.logo : '',
    });
  }, [visible]);

  return (
    <Modal
      visible={visible}
      width={400}
      okText={isNew ? 'Crear' : 'Actualizar'}
      onCancel={closeAndClear}
      onOk={isNew ? () => createNewCompany() : () => editCompany()}
      cancelText="Cancelar"
      destroyOnClose
      title={isNew ? 'Crear Compañia' : 'Actualizar Compañia'}
      cancelButtonProps={{
        style: styles.buttonR,
        disabled: paramsCreateCompany?.loading || paramsUpdateCompany?.loading,
        loading: paramsCreateCompany?.loading || paramsUpdateCompany?.loading,
      }}
      okButtonProps={{
        style: styles.buttonR,
        disabled: paramsCreateCompany?.loading || paramsUpdateCompany?.loading,
        loading: paramsCreateCompany?.loading || paramsUpdateCompany?.loading,
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
              label={
                <Space>
                  <ProfileOutlined />
                  <Text>Nombre</Text>
                </Space>
              }
            >
              <Input
                placeholder="Ingrese nombre"
                disabled={paramsCreateCompany?.loading || paramsUpdateCompany?.loading}
              />
            </FormItem>
            <FormItem
              rules={[
                {
                  required: true,
                  message: 'Este campo no puede estar vacio',
                },
                {
                  validator: (_, value) => {
                    const number = parseInt(value);

                    if (!isNaN(number) && number == value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(new Error('*Solo números'));
                  },
                },
              ]}
              name="document"
              label={
                <Space>
                  <IdcardOutlined />
                  <Text>Documento</Text>
                </Space>
              }
            >
              <Input
                placeholder="Ingrese documento"
                disabled={paramsCreateCompany?.loading || paramsUpdateCompany?.loading}
              />
            </FormItem>
            <FormItem
              rules={[
                {
                  required: true,
                  message: 'Este campo no puede estar vacio',
                },
              ]}
              name="address"
              label={
                <Space>
                  <HomeOutlined />
                  <Text>Dirección</Text>
                </Space>
              }
            >
              <Input
                placeholder="Ingrese dirección"
                disabled={paramsCreateCompany?.loading || paramsUpdateCompany?.loading}
              />
            </FormItem>
            <FormItem
              rules={[
                {
                  required: true,
                  message: 'Este campo no puede estar vacio',
                },
                {
                  validator: (_, value) => {
                    const number = parseInt(value);

                    if (!isNaN(number) && number == value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(new Error('*Solo números'));
                  },
                },
              ]}
              name="phone"
              label={
                <Space>
                  <PhoneOutlined />
                  <Text>Teléfono</Text>
                </Space>
              }
            >
              <Input
                placeholder="Ingrese teléfono"
                disabled={paramsCreateCompany?.loading || paramsUpdateCompany?.loading}
              />
            </FormItem>
            <FormItem
              name="regimenSimplify"
              label={<Text>Régimen Simplificado</Text>}
              valuePropName="checked"
            >
              <Switch disabled={paramsCreateCompany?.loading || paramsUpdateCompany?.loading} />
            </FormItem>
            <FormItem
              rules={[
                {
                  required: true,
                  message: 'Este campo no puede estar vacio',
                },
              ]}
              name="logo"
              label={
                <Space>
                  <AliyunOutlined />
                  <Text>Logo</Text>
                </Space>
              }
            >
              <Input
                placeholder="Ingrese url del logo"
                disabled={paramsCreateCompany?.loading || paramsUpdateCompany?.loading}
              />
            </FormItem>
            {!isNew && (
              <Card bodyStyle={{ display: 'flex', justifyContent: 'center' }}>
                <Image
                  src={companyData?.logo}
                  style={{ maxWidth: 150, maxHeight: 110 }}
                  fallback={DefaultImage}
                />
              </Card>
            )}
          </Col>
        </Row>
      </Form>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </Modal>
  );
};

export default CompaniesForm;
