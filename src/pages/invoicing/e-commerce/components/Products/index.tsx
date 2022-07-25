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
import numeral from 'numeral';
import { useState } from 'react';
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
import type { ColumnsType } from 'antd/es/table/interface';
import { useAddProductsOrder } from '@/hooks/order.hooks';
import type { DetailAddProductsOrderInput, DetailOrder, Order, Product } from '@/graphql/graphql';
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
  const [editingKey, setEditingKey] = useState([]);
  const [quantityConfirm, setQuantityConfirm] = useState(0);

  const [form] = useForm();

  const [addProduct, paramsAddProduct] = useAddProductsOrder();
  //const [confirmProductQuantity, paramsConfirmProductQuantity] = useConfirmProductOrder();

  const isEditing = (detail: DetailOrder) => {
    const found = editingKey.find((i) => i === detail.product.barcode);
    if (found !== undefined) {
      return true;
    } else {
      return false;
    }
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
   * @param mensaje mensaje a mostrar
   */
  const alertSuccess = (mensaje: string) => {
    messages.success({
      content: mensaje,
    });
  };

  /**
   *@description funcion usada para mostrar mensaje de cuidado
   * @param mensaje mensaje a mostrar
   */
  const alertWarning = (mensaje: string) => {
    messages.warning({
      content: mensaje,
    });
  };

  //TODO: Confirmacion de cantidad de los productos
  const confirmQuantity = async () => {
    const values = await form.validateFields();

    if (values) {
      for (let i = -1; i < editingKey.length; i++) {
        if (values.barcode === editingKey[i]) {
          setEditingKey([...editingKey]);
          setQuantityConfirm(quantityConfirm + 1);
          break;
        }
        if (values.barcode !== editingKey[i]) {
          if (values.barcode === editingKey[i]) {
            setEditingKey([...editingKey]);
            setQuantityConfirm(quantityConfirm + 1);
          } else if (values.barcode !== editingKey[i]) {
            setEditingKey([...editingKey, values.barcode]);
            setQuantityConfirm(quantityConfirm + 1);
          } else {
            showError('Error');
          }
        }
      }
    } else {
      alertWarning('No hay values');
    }
  };

  // TODO : Confirmacion de productos
  /* const confirmProductsFinal = () => {
    confirmProductQuantity({
      variables: {
        input: {
          orderId: orderdata?._id,
          //details:
        },
      },
    });
  };*/

  /**
   * @description funcion usada para actualizar la cantidad de un producto
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
          src={details?.product?.images?.map((image) => image?.urls?.webp?.small)}
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
          src={details?.product?.images?.map((image) => image?.urls?.webp?.small)}
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
        const editable = isEditing(detail);
        let bgColor;
        let quantityProd = 0;

        if (quantityProd === quantityConfirm) {
          quantityProd += 1;
        }

        if (editable) {
          bgColor = quantityProd === detail?.quantity ? '#52c41a' : 'red';
        } else {
          bgColor = 'red';
        }

        return detail?.status === StatusOrderDetail?.Confirmed ? (
          <Tag color="orange">
            <Icon type="check-circle" /> Confirmado
          </Tag>
        ) : (
          <>
            <Badge
              showZero
              style={{ backgroundColor: bgColor }}
              count={editable ? quantityProd : 0}
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

  return (
    <>
      <Divider>
        <Switch
          onClick={() => setVisibleConfirmProduct(visibleConfirmProduct ? false : true)}
          checkedChildren="Confirmación de productos"
          unCheckedChildren="Resumen de productos"
        />
      </Divider>
      <Form layout="vertical" form={form}>
        <Row gutter={[0, 20]}>
          <Col span={24}>
            {visibleConfirmProduct ? (
              <>
                <FormItem label="Código de barras :" name="barcode">
                  <Space>
                    <Input style={styles.inputBorder} />
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => confirmQuantity()}
                    />
                  </Space>
                </FormItem>
                <Space>
                  <Button type="primary" icon={<SaveOutlined />} onClick={() => {}}>
                    Aprobar productos confirmados
                  </Button>
                  <Button type="primary" icon={<RetweetOutlined />} onClick={() => {}}>
                    Reiniciar productos
                  </Button>
                </Space>
              </>
            ) : (
              <>
                <Space>
                  <Button
                    style={{ borderRadius: 5 }}
                    type="primary"
                    onClick={() =>
                      !canEdit ? setCanEdit(canEdit ? false : true) : editQuantityProduct()
                    }
                    icon={canEdit ? <SaveOutlined /> : <EditOutlined />}
                    loading={paramsAddProduct?.loading}
                  >
                    {canEdit ? 'Guardar Cantidades' : 'Editar Cantidades'}
                  </Button>
                  <Button
                    style={{ borderRadius: 5 }}
                    type="primary"
                    onClick={() => setAddProducts(addProducts ? false : true)}
                    icon={!addProducts ? <PlusOutlined /> : <MinusOutlined />}
                  >
                    {!addProducts ? 'Agregar Productos' : 'Cerrar'}
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
              dataSource={orderdata?.details}
              scroll={{ x: 1000, y: 700 }}
            />
          </Col>
        </Row>
        <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
      </Form>
    </>
  );
};

export default Products;
