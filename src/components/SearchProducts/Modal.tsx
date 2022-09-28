import { BarcodeOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Modal,
  Row,
  Col,
  Form,
  Input,
  Button,
  Table,
  Tag,
  Avatar,
  Typography,
  Alert,
  Tooltip,
  InputNumber,
  Space,
  Badge,
} from 'antd';
import type { TablePaginationConfig, ColumnsType } from 'antd/es/table/interface';
import { useState } from 'react';

import { useGetProducts } from '@/hooks/product.hooks';
import type {
  Color,
  DetailRequest,
  FiltersProductsInput,
  Order,
  Product,
  Reference,
  Size,
  Stock,
} from '@/graphql/graphql';
import { StatusOrderDetail } from '@/graphql/graphql';
import SelectColor from '../SelectColor';
import SelectSize from '../SelectSize';
import validateCodeBar from '@/libs/validateCodeBar';

const FormItem = Form.Item;
const { Text } = Typography;

export type Props = {
  visible: boolean;
  validateStock?: boolean;
  details: Partial<DetailRequest & { action: string }>[];
  createDetail: (product: Product, quantity: number) => void;
  updateDetail: (product: Product, quantity: number) => void;
  deleteDetail: (productId: string) => void;
  onCancel: () => void;
  warehouseId: string | undefined;
  order?: Order;
};

export type FormValues = {
  name?: string;
  colorId?: string;
  sizeId?: string;
};

const ModalSearchProducts = ({
  order,
  visible,
  validateStock,
  details = [],
  onCancel,
  warehouseId,
  createDetail,
  updateDetail,
  deleteDetail,
}: Props) => {
  const [filters, setFilters] = useState<Partial<FiltersProductsInput>>({
    limit: 12,
    page: 0,
  });

  const [getProducts, { data, loading, error }] = useGetProducts();

  /**
   * @description se encarga de consultar los productos con los filtros
   * @param params filtros para buscar productos
   */
  const onSearch = (params: Partial<FiltersProductsInput>) => {
    getProducts({
      variables: {
        input: {
          ...params,
          warehouseId,
          status: 'active',
        },
      },
    });
  };

  /**
   * @description realiza la busqueda de los productos con base al filtro
   * @param values valores del formulario
   */
  const onFinish = ({ colorId, name, sizeId }: FormValues) => {
    const params: Partial<FiltersProductsInput> = {
      page: 1,
      colorId,
      name: name && validateCodeBar(name),
      sizeId,
    };
    setFilters({ ...filters, ...params });
    onSearch({ ...filters, ...params });
  };

  /**
   * @description se encarga de manejar eventos de tabla
   * @param paginationLocal eventos de la páginacion
   * @param _ eventdos de los filtros
   * @param sorter evento de ordenamientos
   */
  const handleChangeTable = (paginationLocal: TablePaginationConfig) => {
    const { current } = paginationLocal;
    setFilters({ ...filters, page: current });
    onSearch({ ...filters, page: current });
  };

  /**
   * @description agrega producto al pedido y  cierra el modal
   * @param product producto que se agrega
   */
  const createAndClose = (product: Product) => {
    createDetail(product, 1);
    onCancel();
  };

  /**
   * @description bloquea el boton de eliminar y deshabilita la actualizacion de cantidad si el producto ya esta confirmado
   * @param productId identificador del producto
   * @returns retorna un boolean
   */
  const disabledButtonConfirmProduct = (productId: string) => {
    if (order?.details)
      for (let i = 0; i < order?.details?.length; i++) {
        if (
          productId === order.details[i].product._id &&
          order?.details[i].status === StatusOrderDetail.Confirmed
        ) {
          return true;
        } else if (
          productId === order.details[i].product._id &&
          order?.details[i].status !== StatusOrderDetail.Confirmed
        ) {
          return false;
        }
      }
    return;
  };

  const columns: ColumnsType<Product> = [
    {
      title: 'Producto',
      dataIndex: 'reference',
      render: ({ name, description }: Reference, { barcode }) => (
        <Row>
          <Col span={24}>
            {name} / {description}
          </Col>
          <Col span={24}>
            <Tag icon={<BarcodeOutlined />}>{barcode}</Tag>
          </Col>
        </Row>
      ),
    },
    {
      title: 'Color',
      dataIndex: 'color',
      render: (color: Color) => (
        <>
          <Avatar
            size="small"
            style={{ backgroundColor: color?.html, border: 'solid 1px black' }}
            src={`${CDN_URL}/${color?.image?.urls?.webp?.small}`}
          />

          <Text style={{ marginLeft: 10 }}>{color?.name_internal}</Text>
        </>
      ),
    },
    {
      title: 'Talla',
      dataIndex: 'size',
      render: (size: Size) => size.value,
    },
    {
      title: 'Inventario',
      dataIndex: 'stock',
      align: 'center',
      render: (stock: Stock[]) =>
        stock && (
          <Badge
            overflowCount={99999}
            count={stock[0]?.quantity}
            style={{ backgroundColor: (stock[0]?.quantity || 0) > 0 ? 'green' : 'red' }}
            showZero
          />
        ),
    },
    {
      title: 'Opciones',
      dataIndex: '_id',
      align: 'center',
      fixed: 'right',
      render: (_id: string, product) => {
        const detailFind = details?.find(
          (detail) => detail?.product?._id === _id && detail.action !== 'delete',
        );
        if (detailFind) {
          return (
            <Space>
              <Space>
                {!order && (
                  <InputNumber
                    value={detailFind.quantity}
                    min={1}
                    max={
                      validateStock ? (product.stock ? product?.stock[0]?.quantity : 0) : undefined
                    }
                    disabled={order && disabledButtonConfirmProduct(product?._id)}
                    onChange={(value) => updateDetail(product, value)}
                  />
                )}
              </Space>
              <Tooltip title="Eliminar">
                <Button
                  type="primary"
                  danger
                  disabled={order && disabledButtonConfirmProduct(product?._id)}
                  icon={<DeleteOutlined />}
                  onClick={() => deleteDetail(_id)}
                />
              </Tooltip>
            </Space>
          );
        }
        return (
          <Tooltip title="Agregar">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={order ? () => createAndClose(product) : () => createDetail(product, 1)}
              disabled={
                validateStock ? !!(product.stock && product?.stock[0]?.quantity === 0) : false
              }
            />
          </Tooltip>
        );
      },
    },
  ];

  const dataSource = data?.products?.docs
    ?.slice()
    .sort((a, b) => {
      return a?.size?.weight - b?.size?.weight;
    })
    .sort((a, b) => {
      const nameA = a?.color?.name?.toUpperCase();
      const nameB = b?.color?.name?.toUpperCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0;
    }) as any;

  return (
    <Modal visible={visible} footer={null} onCancel={onCancel} width="90%">
      <>
        <Row>
          <Col span={21}>
            <Form layout="vertical" autoComplete="off" onFinish={onFinish}>
              <Row gutter={[10, 10]}>
                <Col lg={9} md={9} xs={24}>
                  <FormItem label="Búsqueda" name="name">
                    <Input autoFocus placeholder="referencia, descripción, código" />
                  </FormItem>
                </Col>
                <Col lg={8} md={8} xs={24}>
                  <Form.Item label="Color" name="colorId">
                    <SelectColor disabled={loading} />
                  </Form.Item>
                </Col>
                <Col lg={5} md={5} xs={24}>
                  <Form.Item label="Talla" name="sizeId">
                    <SelectSize disabled={loading} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={2} lg={2}>
                  <Form.Item label=" " colon={false}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                      Buscar
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col span={24}>
            {error && <Alert type="error" message={error} showIcon />}
            <Table
              scroll={{ x: 'auto' }}
              columns={columns}
              dataSource={dataSource}
              pagination={{
                current: data?.products?.page,
                total: data?.products?.totalDocs,
                defaultPageSize: 12,
                showSizeChanger: false,
              }}
              onChange={handleChangeTable}
              loading={loading}
            />
          </Col>
        </Row>
      </>
    </Modal>
  );
};

export default ModalSearchProducts;
