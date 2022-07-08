/* eslint-disable react-hooks/exhaustive-deps */
import type { PointOfSale } from '@/graphql/graphql';
import { FileSyncOutlined, GroupOutlined, ProfileOutlined, ShopOutlined } from '@ant-design/icons';
import { Col, Form, Input, Modal, Row, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
import styles from '../styles';
import AlertInformation from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import { useCreatePointOfSale, useUpdatePointOfSale } from '@/hooks/pointOfSale.hooks';
import SelectShop from '@/components/SelectShop';
import SelectBox from '@/components/SelectBox';

const FormItem = Form.Item;
const { Text } = Typography;

type Props = {
  visible: boolean;
  onCancel: () => void;
  pointOfSale: PointOfSale;
};

const PointOfSalesForm = ({ pointOfSale, onCancel, visible }: Props) => {
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const isNew = !pointOfSale?._id;
  const [form] = Form.useForm();

  const [createPointOfSale, paramsCreatePointOfSale] = useCreatePointOfSale();
  const [updatePointOfSale, paramsUpdatePointOfSale] = useUpdatePointOfSale();

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
   * @description ejecuta la mutation para actualizar un punto de venta
   */
  const editPos = async () => {
    const values = await form.validateFields();

    try {
      const response = await updatePointOfSale({
        variables: {
          input: values,
          id: pointOfSale?._id || '',
        },
      });
      if (response?.data?.updatePointOfSale) {
        setAlertInformation({
          message: `Punto de venta ${response?.data?.updatePointOfSale?.name} actualizado correctamente`,
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
   * @description ejecuta la mutation para crear un punto de venta
   */
  const createNewPos = async () => {
    const values = await form.validateFields();

    try {
      const response = await createPointOfSale({
        variables: {
          input: { ...values },
        },
      });
      if (response?.data?.createPointOfSale) {
        setAlertInformation({
          message: `Punto de venta ${response?.data?.createPointOfSale?.name} creado correctamente`,
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
      ...pointOfSale,
    });
  }, [visible]);

  return (
    <Modal
      visible={visible}
      width={400}
      okText={isNew ? 'Crear' : 'Actualizar'}
      onCancel={closeAndClear}
      onOk={isNew ? () => createNewPos() : () => editPos()}
      cancelText="Cancelar"
      destroyOnClose
      title={isNew ? 'Crear Punto de venta' : 'Actualizar Punto de venta'}
      cancelButtonProps={{
        style: styles.buttonR,
        disabled: paramsCreatePointOfSale?.loading || paramsUpdatePointOfSale?.loading,
        loading: paramsCreatePointOfSale?.loading || paramsUpdatePointOfSale?.loading,
      }}
      okButtonProps={{
        style: styles.buttonR,
        disabled: paramsCreatePointOfSale?.loading || paramsUpdatePointOfSale?.loading,
        loading: paramsCreatePointOfSale?.loading || paramsUpdatePointOfSale?.loading,
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
                disabled={paramsCreatePointOfSale?.loading || paramsUpdatePointOfSale?.loading}
              />
            </FormItem>
            <FormItem
              rules={[
                {
                  required: true,
                  message: 'Este campo no puede estar vacio',
                },
              ]}
              name="authorizationId"
              label={
                <Space>
                  <FileSyncOutlined />
                  <Text>Autorización</Text>
                </Space>
              }
            >
              <></>
            </FormItem>
            <FormItem
              rules={[
                {
                  required: true,
                  message: 'Este campo no puede estar vacio',
                },
              ]}
              name="shopId"
              label={
                <Space>
                  <ShopOutlined />
                  <Text>Tienda</Text>
                </Space>
              }
            >
              <SelectShop
                disabled={paramsCreatePointOfSale?.loading || paramsUpdatePointOfSale?.loading}
              />
            </FormItem>
            <FormItem
              rules={[
                {
                  required: true,
                  message: 'Este campo no puede estar vacio',
                },
              ]}
              name="boxId"
              label={
                <Space>
                  <GroupOutlined />
                  <Text>Caja</Text>
                </Space>
              }
            >
              <SelectBox
                disabled={paramsCreatePointOfSale?.loading || paramsUpdatePointOfSale?.loading}
              />
            </FormItem>
          </Col>
        </Row>
      </Form>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </Modal>
  );
};

export default PointOfSalesForm;
