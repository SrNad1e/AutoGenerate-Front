/* eslint-disable react-hooks/exhaustive-deps */
import { message as messages } from 'antd';
import {
  Avatar,
  Badge,
  Button,
  Col,
  Divider,
  Form,
  Image,
  Input,
  InputNumber,
  Row,
  Space,
  Switch,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table/interface';
import Icon, {
  BarcodeOutlined,
  DeleteOutlined,
  EditOutlined,
  MinusOutlined,
  PlusOutlined,
  RetweetOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';
import numeral from 'numeral';
import { useEffect, useState } from 'react';
import type { DetailAddProductsOrderInput, DetailOrder, Order, Product } from '@/graphql/graphql';
import { useAddProductsOrder, useConfirmProductOrder } from '@/hooks/order.hooks';
import { StatusOrder } from '@/graphql/graphql';
import { StatusOrderDetail } from '@/graphql/graphql';
import { ActionProductsOrder } from '@/graphql/graphql';

import DefaultImage from '@/assets/default.webp';
import SelectProducts from '@/components/SelectProducts';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';

import styles from '../styles';

const { Text } = Typography;
const FormItem = Form.Item;

type Props = {
  orderdata: Order;
};

const Products = ({ orderdata }: Props) => {
  const [visibleConfirmProduct, setVisibleConfirmProduct] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [addProducts, setAddProducts] = useState(false);
  const [editProducts, setEditProducts] = useState<DetailAddProductsOrderInput[]>([]);
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [productsQuantityConfirm, setProductsQuantityConfirm] = useState<any[]>([]);
  const [productsConfirm, setProductsConfirm] = useState<any[]>([]);

  const [form] = useForm();

  const [addProduct, paramsAddProduct] = useAddProductsOrder();
  const [confirmProductQuantity, paramsConfirmProductQuantity] = useConfirmProductOrder();

  /**
   * @description array con los detalles del pedido almacenados de forma descendente
   */
  const sortedDesc = orderdata?.details?.slice().sort(function (a, b) {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

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
   * @description se encarga de cerrar la alerta informativa
   */
  const closeAlertInformation = () => {
    setAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  /**
   *@description funcion usada para mostrar mensaje de éxito
   * @param message mensaje a mostrar
   */
  const alertSuccess = (message: string) => {
    messages.success({
      content: message,
    });
  };

  /**
   *@description funcion usada para mostrar mensaje de cuidado
   * @param message mensaje a mostrar
   */
  const alertWarning = (message: string) => {
    messages.warning({
      content: message,
    });
  };

  /**
   * @description funcion usada para reversar la cantidad confirmada  en los productos
   */
  const resetConfirmQuantity = () => {
    for (let index = 0; index < productsQuantityConfirm.length; index++) {
      if (productsQuantityConfirm[index].quantityConfirm > 0) {
        productsQuantityConfirm[index].quantityConfirm = 0;
        setProductsQuantityConfirm([...productsQuantityConfirm]);
        setProductsConfirm([]);
      }
    }
  };

  /**
   * @description funcion usada para confirmar la cantidad de los productos
   */
  const confirmQuantity = async () => {
    const values = await form.validateFields();
    if (values.barcode) {
      for (let i = 0; i < productsQuantityConfirm.length; i++) {
        if (values.barcode === productsQuantityConfirm[i].barcode) {
          if (productsQuantityConfirm[i].quantityConfirm >= productsQuantityConfirm[i].quantity) {
            alertWarning('Esta intentado agregar más produtos de los registrados en el pedido');
            break;
          } else {
            productsQuantityConfirm[i].quantityConfirm++;
            setProductsQuantityConfirm([...productsQuantityConfirm]);
            if (
              productsQuantityConfirm[i]?.quantityConfirm === productsQuantityConfirm[i]?.quantity
            ) {
              if (productsQuantityConfirm[i]?.productId === productsConfirm[i]?.productId) {
                setProductsConfirm([...productsConfirm]);
              }
              if (productsQuantityConfirm[i]?.productId !== productsConfirm[i]?.productId) {
                setProductsConfirm([...productsConfirm, productsQuantityConfirm[i]]);
              }
            }
            alertSuccess('Producto confirmado correctamente');
            break;
          }
        }
      }
    }
  };

  /**
   *@description funcion usada para confirmar los productos del pedido
   */
  const confirmProductsFinal = async () => {
    for (let i = 0; i < productsConfirm.length; i++) {
      delete productsConfirm[i].barcode;
      delete productsConfirm[i].quantity;
      delete productsConfirm[i].quantityConfirm;
    }
    try {
      confirmProductQuantity({
        variables: {
          input: {
            orderId: orderdata?._id,
            details: productsConfirm,
          },
        },
      });
      setProductsConfirm([]);
    } catch (error: any) {
      showError(error.message);
    }
  };

  /**
   * @description funcion usada para actualizar las cantidades de los productos
   */
  const editQuantityProduct = async () => {
    setCanEdit(false);
    try {
      const response = await addProduct({
        variables: {
          input: {
            orderId: orderdata?._id,
            details: editProducts,
          },
        },
      });
      if (response?.data) {
        alertSuccess('Cantidades Actualizadas Correctamente');
      }
    } catch (error: any) {
      showError(error?.message);
    }
  };

  /**
   * @description funcion usada para eliminar un producto del pedido
   * @param productId idenficador del producto a eliminar
   */
  const deleteProduct = async (productId: string) => {
    try {
      const response = await addProduct({
        variables: {
          input: {
            orderId: orderdata?._id,
            details: [
              {
                action: ActionProductsOrder.Delete,
                productId: productId,
                quantity: 1,
              },
            ],
          },
        },
      });
      if (response?.data) {
        alertSuccess('Producto eliminado correctamente');
      }
    } catch (error: any) {
      showError(error?.message);
    }
  };

  /**
   * @description funcion usada para guardar el detalle de los productos en el estado
   * @param quantity cantidad ingresada
   * @param productId identificador de producto al cual se le cambiara la cantidad
   */
  const onChangeQuantity = (quantity?: number, productId?: string) => {
    const product: DetailAddProductsOrderInput = {
      action: ActionProductsOrder.Update,
      quantity: quantity || 0,
      productId: productId || '',
    };
    if (quantity && quantity > 0) {
      for (let i = -1; i < editProducts.length; i++) {
        if (quantity && productId === editProducts[i]?.productId) {
          editProducts[i].quantity = quantity;
          setEditProducts([...editProducts]);
          break;
        }
        if (quantity && productId !== editProducts[i]?.productId) {
          if (productId === editProducts[i]?.productId) {
            editProducts[i].quantity = quantity;
            setEditProducts([...editProducts]);
          } else if (productId !== editProducts[i]?.productId) {
            setEditProducts([...editProducts, product]);
          } else {
            showError('Error');
          }
        }
      }
    } else {
      alertWarning('Cantidad no puede estar en 0');
    }
  };

  /**
   * @description agrega un producto al pedido
   * @param productId identificador del producto para agregar
   * @param quantity cantidad agregada
   */
  const createDetail = async (productId: Product, quantity: number) => {
    try {
      const response = await addProduct({
        variables: {
          input: {
            orderId: orderdata?._id,
            details: [
              {
                action: ActionProductsOrder.Create,
                quantity: quantity || 0,
                productId: productId?._id,
              },
            ],
          },
        },
      });
      if (response?.data) {
        alertSuccess('Producto agregado correctamente');
      }
    } catch (error: any) {
      showError(error?.message);
    }
  };

  /**
   * @description actualiza la cantidad de un producto
   * @param product producto a actualizar
   * @param quantity cantidad nueva a asignar
   */
  const updateDetail = async (product: Partial<Product>, quantity: number) => {
    setCanEdit(false);
    try {
      if (quantity !== null) {
        const response = await addProduct({
          variables: {
            input: {
              orderId: orderdata?._id,
              details: [
                {
                  action: ActionProductsOrder.Update,
                  productId: product._id || '',
                  quantity: quantity,
                },
              ],
            },
          },
        });
        if (response?.data) {
          alertSuccess('Cantidades Actualizadas Correctamente');
        }
      }
    } catch (error: any) {
      showError(error?.message);
    }
  };

  /**
   * @description funcion usada para deshabilitar botones si todos los productos del pedido estan confirmados
   * @returns retorna un boolean
   */
  const disabledEditQuantity = () => {
    let countConfirmed = 0;
    if (orderdata?.details) {
      for (let index = 0; index < orderdata?.details?.length; index++) {
        if (orderdata.details[index].status === StatusOrderDetail.Confirmed) {
          countConfirmed++;
        }
      }
    }
    if (countConfirmed !== orderdata?.details?.length) {
      return false;
    } else if (countConfirmed === orderdata?.details?.length) {
      return true;
    }
    return;
  };

  /**
   * @description almacena los detalles del pedido en el estado
   */
  const controlOfSwitch = () => {
    setProductsQuantityConfirm(
      orderdata?.details?.map((i) => ({
        productId: i.product._id,
        barcode: i.product.barcode,
        quantity: i.quantity,
        quantityConfirm: 0,
        status: StatusOrderDetail.Confirmed,
      })),
    );
    setVisibleConfirmProduct(visibleConfirmProduct ? false : true);
  };

  /**
   * Columna de productos
   */
  const column: ColumnsType<DetailOrder> = [
    {
      title: 'Imagen',
      dataIndex: 'details',
      render: (_, details) => (
        <Image
          preview={false}
          height={50}
          width={50}
          src={`${CDN_URL}/${details?.product?.images?.map((image) => image?.urls?.webp?.small)}`}
          fallback={DefaultImage}
        />
      ),
    },
    {
      title: 'Referencia',
      dataIndex: 'details',
      width: 150,
      render: (_, detail) => (
        <Space direction="vertical" size={2}>
          <Text strong>{detail?.product?.reference?.name}</Text>
          <Tag style={styles.tagStyle}>{detail?.product?.reference?.description}</Tag>
          <Tag icon={<BarcodeOutlined />} style={styles.tagStyle}>
            {detail?.product?.barcode}
          </Tag>
        </Space>
      ),
    },
    {
      title: 'Color',
      dataIndex: 'details',
      width: 150,
      render: (_, detail) => (
        <Row align="middle">
          <Col>
            <Avatar
              size={10}
              style={{
                backgroundColor: detail?.product?.color?.html,
                border: 'solid 1px black',
                marginRight: 10,
              }}
            />
          </Col>
          <Col>
            <Text>{detail?.product?.color?.name}</Text>
          </Col>
        </Row>
      ),
    },
    {
      title: 'Talla',
      dataIndex: 'details',
      render: (_, detail) => <>{detail?.product?.size?.value}</>,
    },
    {
      title: 'PVP',
      dataIndex: 'details',
      render: (_, detail) => numeral(detail?.product?.reference?.price).format('$ 0,0'),
    },
    {
      title: 'Precio Facturado',
      dataIndex: 'details',
      render: (_, detail) =>
        numeral(detail?.product?.reference?.price - detail?.discount).format('$ 0,0'),
    },
    {
      title: 'Precio Distribuidor',
      dataIndex: 'details',
      width: 120,
      render: (_, detail) =>
        numeral(detail?.product?.reference?.price - detail?.discount).format('$ 0,0'),
    },
    {
      title: 'Cantidad',
      dataIndex: 'quantity',
      width: 120,
      render: (quantity: number, detail) => (
        <>
          {canEdit ? (
            <InputNumber
              disabled={detail?.status === StatusOrderDetail.Confirmed}
              onChange={(e) => onChangeQuantity(e, detail?.product?._id)}
              min={0}
              defaultValue={quantity}
            />
          ) : (
            quantity
          )}
        </>
      ),
    },
    {
      title: 'Opción',
      dataIndex: 'detail',
      fixed: 'right',
      align: 'center',
      render: (_, detail) => (
        <Tooltip title="Eliminar">
          <Button
            danger
            disabled={
              detail?.status === StatusOrderDetail.Confirmed ||
              orderdata?.status === StatusOrder.Sent ||
              orderdata?.status === StatusOrder.Closed ||
              orderdata?.status === StatusOrder.Cancelled
            }
            type="primary"
            loading={paramsAddProduct?.loading}
            onClick={() => deleteProduct(detail?.product?._id)}
            icon={<DeleteOutlined />}
          />
        </Tooltip>
      ),
    },
  ];

  /**
   * Columna de confirmacion de productos
   */
  const columnConfirm: ColumnsType<DetailOrder> = [
    {
      title: 'Imagen',
      dataIndex: 'details',
      render: (_, details) => (
        <Image
          preview={false}
          height={50}
          width={50}
          src={`${CDN_URL}/${details?.product?.images?.map((image) => image?.urls?.webp?.small)}`}
          fallback={DefaultImage}
        />
      ),
    },
    {
      title: 'Referencia',
      dataIndex: 'details',
      width: 150,
      render: (_, detail) => (
        <Space direction="vertical" size={2}>
          <Text strong>{detail?.product?.reference?.name}</Text>
          <Tag style={styles.tagStyle}>{detail?.product?.reference?.description}</Tag>
          <Tag icon={<BarcodeOutlined />} style={styles.tagStyle}>
            {detail?.product?.barcode}
          </Tag>
        </Space>
      ),
    },
    {
      title: 'Color',
      dataIndex: 'details',
      width: 150,
      render: (_, detail) => (
        <>
          <Avatar
            size={10}
            style={{
              backgroundColor: detail?.product?.color?.html,
              border: 'solid 1px black',
              marginRight: 10,
            }}
          />
          <Text>{detail?.product?.color?.name}</Text>
        </>
      ),
    },
    {
      title: 'Talla',
      dataIndex: 'details',
      render: (_, detail) => <>{detail?.product?.size?.value}</>,
    },
    {
      title: 'Precio',
      dataIndex: 'details',
      align: 'center',
      width: 120,
      render: (_, details) => numeral(details?.price).format('$ 0,0'),
    },
    {
      title: 'Precio Distribuidor',
      dataIndex: 'details',
      width: 120,
      render: (_, detail) =>
        numeral(detail?.product?.reference?.price - detail?.discount).format('$ 0,0'),
    },
    {
      title: 'Cantidad',
      dataIndex: 'quantity',
      align: 'center',
    },
    {
      title: 'Cantidad Confirmada',
      dataIndex: '_id',
      align: 'center',
      render: (_id, detail) => {
        const bgColor =
          productsQuantityConfirm?.find((i) => i?.barcode === detail?.product?.barcode)
            ?.quantityConfirm == detail?.quantity && '#52c41a';

        return detail?.status === StatusOrderDetail?.Confirmed ? (
          <Tag color="orange">
            <Icon type="check-circle" /> Confirmado
          </Tag>
        ) : (
          <>
            <Badge
              showZero
              style={{ backgroundColor: bgColor || 'red' }}
              count={
                productsQuantityConfirm.find((i) => i.barcode === detail.product.barcode)
                  ?.quantityConfirm || 0
              }
            />
          </>
        );
      },
    },
  ];

  const propsSelectProduct = {
    details: orderdata?.details,
    validateStock: true,
    warehouseId: orderdata?.shop?.defaultWarehouse?._id,
    createDetail,
    updateDetail,
    deleteDetail: deleteProduct,
  };

  useEffect(() => {
    form.resetFields();
  }, [confirmQuantity()]);

  return (
    <>
      <Divider>
        <Switch
          onClick={() => controlOfSwitch()}
          checkedChildren="Confirmación de productos"
          unCheckedChildren="Resumen de productos"
        />
      </Divider>
      <Form layout="vertical" form={form} onFinish={confirmQuantity}>
        <Row gutter={[0, 20]}>
          <Col span={24}>
            {visibleConfirmProduct ? (
              <>
                <FormItem
                  label="Código de barras :"
                  name="barcode"
                  rules={[{ required: true, message: 'Este campo no puede estar vacío' }]}
                >
                  <Space>
                    <Input style={styles.inputBorder} />
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={<PlusOutlined />}
                      disabled={
                        orderdata?.status === StatusOrder.Sent ||
                        orderdata?.status === StatusOrder.Closed ||
                        orderdata?.status === StatusOrder.Cancelled ||
                        disabledEditQuantity()
                      }
                      loading={paramsConfirmProductQuantity?.loading}
                    />
                  </Space>
                </FormItem>
                <Space>
                  <Button
                    loading={paramsConfirmProductQuantity?.loading || paramsAddProduct?.loading}
                    type="primary"
                    style={styles.buttonR}
                    icon={<SaveOutlined />}
                    disabled={
                      disabledEditQuantity() ||
                      orderdata?.status === StatusOrder.Sent ||
                      orderdata?.status === StatusOrder.Closed ||
                      orderdata?.status === StatusOrder.Cancelled ||
                      productsConfirm.length === 0
                    }
                    onClick={() => confirmProductsFinal()}
                  >
                    Aprobar productos confirmados
                  </Button>
                  <Button
                    loading={paramsConfirmProductQuantity?.loading}
                    type="primary"
                    style={styles.buttonR}
                    disabled={
                      disabledEditQuantity() ||
                      orderdata?.status === StatusOrder.Sent ||
                      orderdata?.status === StatusOrder.Closed ||
                      orderdata?.status === StatusOrder.Cancelled
                    }
                    icon={<RetweetOutlined />}
                    onClick={() => resetConfirmQuantity()}
                  >
                    Reiniciar productos
                  </Button>
                </Space>
              </>
            ) : (
              <>
                <Space>
                  <Button
                    style={styles.buttonR}
                    type="primary"
                    onClick={() =>
                      !canEdit ? setCanEdit(canEdit ? false : true) : editQuantityProduct()
                    }
                    disabled={
                      disabledEditQuantity() ||
                      orderdata?.status === StatusOrder.Sent ||
                      orderdata?.status === StatusOrder.Closed ||
                      orderdata?.status === StatusOrder.Cancelled
                    }
                    icon={canEdit ? <SaveOutlined /> : <EditOutlined />}
                    loading={paramsAddProduct?.loading}
                  >
                    {canEdit ? 'Guardar Cantidades' : 'Editar Cantidades'}
                  </Button>
                  <Button
                    loading={paramsAddProduct?.loading}
                    disabled={
                      orderdata?.status === StatusOrder.Sent ||
                      orderdata?.status === StatusOrder.Closed ||
                      orderdata?.status === StatusOrder.Cancelled
                    }
                    style={styles.buttonR}
                    type="primary"
                    onClick={() => setAddProducts(addProducts ? false : true)}
                    icon={!addProducts ? <PlusOutlined /> : <MinusOutlined />}
                  >
                    {'Agregar Productos'}
                  </Button>
                </Space>
                {addProducts && <SelectProducts order={orderdata} {...propsSelectProduct} />}
              </>
            )}
          </Col>
          <Col span={24}>
            <Table
              pagination={false}
              columns={visibleConfirmProduct ? columnConfirm : column}
              dataSource={sortedDesc}
              scroll={{ x: 1000, y: 500 }}
            />
          </Col>
        </Row>
        <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
      </Form>
    </>
  );
};

export default Products;
