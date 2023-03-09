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
} from '@/utils/Desing';
import {
  DollarOutlined,
  DropboxOutlined,
  FileSyncOutlined,
  HomeOutlined,
  PhoneOutlined,
  ShopOutlined,
  FileProtectOutlined,
  MailOutlined,
} from '@/utils/Icon';
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
import { isNumber } from 'lodash';
import Locations from '@/components/direction/Index';
import City from '@/components/SelectCity/SelectCity';

const FormItem = Form.Item;
const { Text } = Typography;
const { Option } = Select;

type Props = {
  visible: boolean;
  onCancel: () => void;
  shop?: Partial<Shop>;
  getShops: any;
};

const ShopForm = ({ visible, onCancel, shop }: Props) => {
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [isMain, setIsMain] = useState(false);
  const [city, setCity] = useState('');

  const isNew = !shop?._id;

  const [form] = Form.useForm();

  const [createShop, paramsCreateShop] = useCreateShop();
  const [updateShop, paramsUpdateShop] = useUpdateShop();

  /**
   * @description Cierra el modal, resetea los campos del form y al alerta de error
   */
  const closeAndClear = () => {
    onCancel();
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
      const phoneString = (values.phone !== null && values.phone.toString()) || '';
      const response = await updateShop({
        variables: {
          input: { ...values, isMain: isMain, phone: phoneString },
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
      onCancel();
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
      const phoneString = (values.phone !== undefined && values.phone.toString()) || undefined;
      const response = await createShop({
        variables: {
          input: { ...values, isMain: isMain, phone: phoneString },
        },
      });
      if (response?.data?.createShop) {
        setAlertInformation({
          message: `Tienda ${response?.data?.createShop?.name} creada correctamente`,
          type: 'success',
          visible: true,
        });
      }
      await onCancel();
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
      width={600}
      okText={isNew ? 'Crear' : 'Actualizar'}
      onCancel={onCancel}
      onOk={isNew ? () => createNewShop() : () => editShop()}
      cancelText="Cancelar"
      destroyOnClose
      title={isNew ? 'Crear Tienda' : 'Actualizar Tienda'}
      okButtonProps={{
        style: styles.buttonR,
        loading: paramsCreateShop?.loading || paramsUpdateShop?.loading,
      }}
      cancelButtonProps={{
        style: styles.buttonR,
        loading: paramsCreateShop?.loading || paramsUpdateShop?.loading,
      }}
    >
      <Form
        form={form}
        layout="vertical"
        style={styles.centerForm}
        initialValues={{
          address: shop?.address,
        }}
      >
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Form.Item
              label={
                <Space>
                  <HomeOutlined />
                  <Text>Ciudad</Text>
                </Space>
              }
            >
              <City setCity={setCity} />
            </Form.Item>
          </Col>

          <Col span={12}>
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
              <Locations
                city={city}
                setValue={(e) =>
                  form.setFieldsValue({
                    address: e,
                  })
                }
                onClear={() =>
                  form.setFieldsValue({
                    address: undefined,
                  })
                }
                defautValue={shop?.address || ''}
                disable={city === '' ? true : false}
              />
              {/* <Input disabled={paramsCreateShop?.loading || paramsUpdateShop?.loading} /> */}
            </FormItem>
          </Col>

          <Col span={12}>
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
          </Col>

          <Col span={12}>
            <FormItem
              name="companyName"
              label={
                <Space>
                  <ShopOutlined />
                  <Text>Nombre Comercial</Text>
                </Space>
              }
            >
              <Input disabled={paramsCreateShop?.loading || paramsUpdateShop?.loading} />
            </FormItem>
          </Col>

          <Col span={12}>
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
              <SelectWarehouses disabled={false} />
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem
              name="warehouseMainId"
              label={
                <Space>
                  <DropboxOutlined />
                  <Text>Centro de Distribución</Text>
                </Space>
              }
            >
              <SelectWarehouses disabled={false} />
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem
              rules={[
                {
                  validator: (_, value) => {
                    if (!value) {
                      return Promise.resolve();
                    }
                    if (isNumber(value)) {
                      return Promise.resolve();
                    }
                    return Promise.resolve();
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
              <InputNumber
                style={{ width: '100%' }}
                disabled={paramsCreateShop?.loading || paramsUpdateShop?.loading}
                controls={false}
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              name="email"
              label={
                <Space>
                  <MailOutlined />
                  <Text>Correo</Text>
                </Space>
              }
            >
              <Input disabled={paramsCreateShop?.loading || paramsUpdateShop?.loading} />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              name="document"
              label={
                <Space>
                  <FileProtectOutlined />
                  <Text>NIT</Text>
                </Space>
              }
            >
              <Input disabled={paramsCreateShop?.loading || paramsUpdateShop?.loading} />
            </FormItem>
          </Col>
          <Col span={12}>
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
                size="small"
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </FormItem>
          </Col>

          {!isNew && (
            <Col span={12}>
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
                  loading={paramsCreateShop?.loading || paramsUpdateShop?.loading}
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
            </Col>
          )}

          <Col span={12}>
            <FormItem name="isMain">
              <Checkbox
                disabled={paramsCreateShop?.loading || paramsUpdateShop?.loading}
                onChange={(e) => onChangeCheckMain(e)}
                defaultChecked={shop?.isMain}
              >
                ¿Es Centro de Distribución?
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
