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
  Product,
  Reference,
  Size,
  Stock,
} from '@/graphql/graphql';
import SelectColor from '../SelectColor';
import SelectSize from '../SelectSize';

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
};

export type FormValues = {
  name?: string;
  color?: Partial<Color>;
  size?: Partial<Size>;
};

const ModalSearchProducts = ({
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
    limit: 10,
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
  const onFinish = ({ color, name, size }: FormValues) => {
    const params: Partial<FiltersProductsInput> = {
      page: 1,
      colorId: color?._id,
      name: name,
      sizeId: size?._id,
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
      render: (_id: string, product) => {
        const detailFind = details?.find(
          (detail) => detail?.product?._id === _id && detail.action !== 'delete',
        );
        if (detailFind) {
          return (
            <Space>
              <Space>
                <InputNumber
                  defaultValue={detailFind.quantity}
                  min={1}
                  max={
                    validateStock ? (product.stock ? product?.stock[0]?.quantity : 0) : undefined
                  }
                  onChange={(value) => updateDetail(product, value)}
                />
              </Space>
              <Tooltip title="Eliminar">
                <Button
                  type="primary"
                  danger
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
              onClick={() => createDetail(product, 1)}
              disabled={validateStock ? product.stock && product?.stock[0]?.quantity === 0 : false}
            />
          </Tooltip>
        );
      },
    },
  ];

  return (
    <Modal visible={visible} footer={null} width="90%" onCancel={onCancel}>
      <>
        <Row>
          <Col span={21}>
            <Form layout="vertical" autoComplete="off" onFinish={onFinish}>
              <Row gutter={[10, 10]}>
                <Col lg={9} xs={24}>
                  <FormItem label="Búsqueda" name="name">
                    <Input autoFocus placeholder="referencia, descripción, código" />
                  </FormItem>
                </Col>
                <Col lg={8} xs={24}>
                  <Form.Item label="Color" name="color">
                    <SelectColor />
                  </Form.Item>
                </Col>
                <Col lg={4} xs={24}>
                  <Form.Item label="Talla" name="size">
                    <SelectSize />
                  </Form.Item>
                </Col>
                <Col xs={24} lg={2}>
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
              scroll={{ x: 1000 }}
              columns={columns}
              dataSource={data?.products?.docs as any}
              pagination={{
                current: data?.products?.page,
                total: data?.products?.totalDocs,
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
