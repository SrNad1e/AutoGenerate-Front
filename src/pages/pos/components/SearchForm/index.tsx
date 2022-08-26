import { useGetProducts } from '@/hooks/product.hooks';
import { BarcodeOutlined, DeleteFilled } from '@ant-design/icons';
import { Button, Card, Checkbox, Col, Form, Input, InputNumber, Popconfirm, Row } from 'antd';
import { useModel, useHistory } from 'umi';

import type { FiltersProductsInput, Product, UpdateOrderInput } from '@/graphql/graphql';
import { StatusOrder, StatusProduct } from '@/graphql/graphql';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import ShopItem from '../ItemShop';
import { useState } from 'react';
import AlertInformation from '@/components/Alerts/AlertInformation';

import styles from '../styles';
import './style.less';
import validateCodeBar from '@/libs/validateCodeBar';

const FormItem = Form.Item;

export type Params = {
  addProductOrder: (product: Product, quantity: number) => void;
  refCode: React.Ref<any>;
  editOrder: (params: UpdateOrderInput) => void;
};

const SearchProduct = ({ addProductOrder, refCode, editOrder }: Params) => {
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const { initialState } = useModel('@@initialState');

  const history = useHistory();

  const [form] = Form.useForm();

  const [getProducts, { loading, data }] = useGetProducts();

  /**
   * @description funcion usada por los hooks para mostrar los errores
   * @param message mensaje de error a mostrar
   */
  const showError = (message: string) => {
    setAlertInformation({
      message,
      type: 'error',
      visible: true,
    });
  };

  /**
   * @description ejecuta la consulta para obtener los productos
   * @param filters filtros para obtener los productos
   */
  const onSearch = async (filters: FiltersProductsInput) => {
    const barcode = filters?.name && validateCodeBar(filters?.name);

    return getProducts({
      variables: {
        input: {
          status: StatusProduct.Active,
          warehouseId: initialState?.currentUser?.shop?.defaultWarehouse?._id,
          limit: 20,
          withStock: true,
          ...filters,
          name: barcode,
        },
      },
    });
  };

  /**
   *@description ejecuta la consulta en base a los filtros
   */
  const onFinish = async () => {
    const { withStock = false, name, quantity = 1 } = await form.validateFields();
    try {
      const response = await onSearch({ name, withStock });
      if (response?.data?.products?.totalDocs === 1) {
        addProductOrder(response?.data?.products?.docs[0] as Product, quantity);
      }
    } catch (e: any) {
      showError(e?.message);
    }
  };

  /**
   * @description cierra la alerta y el modal
   */
  const closeAlertInformation = () => {
    setAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  const cancelOrder = async () => {
    try {
      await editOrder({ status: StatusOrder.Cancelled });
      history.push('/pos/sales');
    } catch (e: any) {
      showError(e?.error);
    }
  };

  return (
    <Row>
      <Col span={24}>
        <Card bordered size="small">
          <Form form={form} layout="inline">
            <Row
              gutter={[12, 0]}
              align="middle"
              style={{
                width: '100%',
              }}
            >
              <Col span={2}>
                <BarcodeOutlined
                  style={{
                    fontSize: 30,
                  }}
                />
              </Col>
              <Col span={12}>
                <FormItem name="name">
                  <Input
                    disabled={loading}
                    size="small"
                    placeholder="Código, Referencia"
                    autoFocus
                    ref={refCode}
                    onPressEnter={onFinish}
                  />
                </FormItem>
              </Col>
              <Col span={3}>
                <FormItem valuePropName="checked" name="withStock" initialValue={true}>
                  <Checkbox disabled={loading} defaultChecked>
                    Con Stock
                  </Checkbox>
                </FormItem>
              </Col>
              <Col span={3}>
                <FormItem name="quantity">
                  <InputNumber
                    min={1}
                    disabled={loading}
                    defaultValue={1}
                    size="small"
                    controls={false}
                    style={styles.inputNumberMin}
                  />
                </FormItem>
              </Col>
              <Col span={4}>
                <Popconfirm
                  title="¿Estás seguro que deseas cancelar el carrito?"
                  onConfirm={cancelOrder}
                  okText="Si, cancelar"
                  cancelText="No"
                >
                  <Button
                    loading={loading}
                    style={{ borderRadius: 5 }}
                    danger
                    type="primary"
                    icon={<DeleteFilled />}
                  >
                    Cancelar
                  </Button>
                </Popconfirm>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>
      <Col span={24}>
        <Row style={styles.bodyPadding} gutter={[16, 16]}>
          {data?.products?.docs?.map((product) => (
            <Col key={product?._id}>
              <ShopItem addProductOrder={addProductOrder} product={product as Product} />
            </Col>
          ))}
        </Row>
      </Col>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </Row>
  );
};

export default SearchProduct;
