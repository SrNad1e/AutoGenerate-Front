/* eslint-disable react-hooks/exhaustive-deps */
import {
  Badge,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Typography,
} from 'antd';
import {
  DollarOutlined,
  DropboxOutlined,
  FileSyncOutlined,
  HomeOutlined,
  PhoneOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import type { CheckboxChangeEvent } from 'antd/lib/checkbox';
import type { Shop } from '@/graphql/graphql';
import { useEffect, useState } from 'react';
import { StatusShop } from '@/graphql/graphql';
import { useCreateShop, useUpdateShop } from '@/hooks/shop.hooks';

import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
import { StatusTypeShop } from '../shop.data';
import SelectWarehouses from '@/components/SelectWarehouses';

import styles from '../styles';

const FormItem = Form.Item;
const { Text } = Typography;
const { Option } = Select;

type Props = {
  visible: boolean;
  onCancel: () => void;
  shop?: Partial<Shop>;
};

const ShopForm = ({ visible, onCancel, shop }: Props) => {
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [isMain, setIsMain] = useState(false);

  const isNew = !shop?._id;

  const [form] = Form.useForm();

  const [createShop, paramsCreateShop] = useCreateShop();
  const [updateShop, paramsUpdateShop] = useUpdateShop();

  /**
   * @description Cierra el modal, resetea los campos del form y al alerta de error
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
   * @description se encarga de gestionar si la tienda es centro de distribucion
   * @param e evento del checkbox
   */
  const onChangeCheckMain = (e: CheckboxChangeEvent) => {
    if (e?.target?.checked) {
      setIsMain(true);
    } else {
      setIsMain(false);
    }
  };

  /**
   * @description ejecuta la mutation para actualizar una tienda
   */
  const editShop = async () => {
    const values = await form.validateFields();

    try {
      const response = await updateShop({
        variables: {
          input: { ...values, isMain: isMain },
          id: shop?._id || '',
        },
      });
      if (response?.data?.updateShop) {
        setAlertInformation({
          message: `Tienda ${response?.data?.updateShop?.name} actualizado correctamente`,
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
   * @description funcion ejecutada para crear una nueva tienda
   */
  const createNewShop = async () => {
    const values = await form.validateFields();

    try {
      const response = await createShop({
        variables: {
          input: { ...values, isMain: isMain },
        },
      });
      if (response?.data?.createShop) {
        setAlertInformation({
          message: `Tienda ${response?.data?.createShop?.name} creada correctamente`,
          type: 'success',
          visible: true,
        });
      }
    } catch (error: any) {
      showError(error?.message);
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      ...shop,
      defaultWarehouseId: shop?.defaultWarehouse?._id,
      warehouseMainId: shop?.warehouseMain?._id,
    });
  }, [visible]);

  return (
    <Modal
      visible={visible}
      width={400}
      okText={isNew ? 'Crear' : 'Actualizar'}
      onCancel={closeAndClear}
      onOk={isNew ? () => createNewShop() : () => editShop()}
      cancelText="Cancelar"
      destroyOnClose
      title={isNew ? 'Crear Tienda' : 'Actualizar Tienda'}
      okButtonProps={{
        style: { borderRadius: 5 },
        disabled: paramsCreateShop?.loading || paramsUpdateShop?.loading,
        loading: paramsCreateShop?.loading || paramsUpdateShop?.loading,
      }}
      cancelButtonProps={{
        style: { borderRadius: 5 },
        disabled: paramsCreateShop?.loading || paramsUpdateShop?.loading,
        loading: paramsCreateShop?.loading || paramsUpdateShop?.loading,
      }}
    >
      <Form form={form} layout="vertical" style={styles.centerForm}>
        <Row>
          <Col span={24}>
            <FormItem
              name="address"
              label={
                <Space>
                  <HomeOutlined />
                  <Text>Dirección</Text>
                </Space>
              }
              rules={[
                {
                  required: true,
                  message: 'Este campo no puede estar vacio',
                },
              ]}
            >
              <Input disabled={paramsCreateShop?.loading || paramsUpdateShop?.loading} />
            </FormItem>
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
                  <ShopOutlined />
                  <Text>Nombre</Text>
                </Space>
              }
            >
              <Input
                disabled={paramsCreateShop?.loading || paramsUpdateShop?.loading}
                placeholder="Ingrese nombre de la tienda"
              />
            </FormItem>
            <FormItem
              rules={[
                {
                  required: true,
                  message: 'Este campo no puede estar vacio',
                },
              ]}
              name="defaultWarehouseId"
              label={
                <Space>
                  <DropboxOutlined />
                  <Text>Bodega por Defecto</Text>
                </Space>
              }
            >
              <SelectWarehouses />
            </FormItem>
            <FormItem
              name="warehouseMainId"
              label={
                <Space>
                  <DropboxOutlined />
                  <Text>Bodega Principal</Text>
                </Space>
              }
            >
              <SelectWarehouses />
            </FormItem>
            <FormItem
              rules={[
                {
                  validator: (_, value) => {
                    const number = parseInt(value);

                    if (!value) {
                      return Promise.resolve();
                    }
                    if (!isNaN(number)) {
                      return Promise.resolve();
                    }
                    return Promise.reject();
                  },
                  message: '*Campo numerico',
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
              <Input disabled={paramsCreateShop?.loading || paramsUpdateShop?.loading} />
            </FormItem>
            <FormItem
              name="goal"
              label={
                <Space>
                  <DollarOutlined />
                  <Text>Meta</Text>
                </Space>
              }
            >
              <InputNumber
                disabled={paramsCreateShop?.loading || paramsUpdateShop?.loading}
                min={0}
                step={100}
                style={styles.maxWidth}
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </FormItem>
            {!isNew && (
              <FormItem
                name="status"
                label={
                  <Space>
                    <FileSyncOutlined />
                    <Text>Estado</Text>
                  </Space>
                }
              >
                <Select
                  style={styles.maxWidth}
                  placeholder="Seleccione el Estado"
                  disabled={paramsCreateShop?.loading || paramsUpdateShop?.loading}
                  defaultValue={StatusShop.Active}
                >
                  {Object.keys(StatusTypeShop).map((status) => (
                    <Option key={status}>
                      <Badge
                        color={StatusTypeShop[status].color}
                        text={StatusTypeShop[status].label}
                      />
                    </Option>
                  ))}
                </Select>
              </FormItem>
            )}
            <FormItem name="isMain">
              <Checkbox
                disabled={paramsCreateShop?.loading || paramsUpdateShop?.loading}
                onChange={(e) => onChangeCheckMain(e)}
                defaultChecked={shop?.isMain}
              >
                ¿Es Centro de distribución?
              </Checkbox>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </Modal>
  );
};

export default ShopForm;
