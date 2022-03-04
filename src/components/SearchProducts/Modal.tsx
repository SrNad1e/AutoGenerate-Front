/* eslint-disable @typescript-eslint/no-shadow */
import { useGetProducts } from '@/hooks/product.hooks';
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
} from 'antd';
import type { TablePaginationConfig } from 'antd/es/table/interface';
import type { ColumnsType } from 'antd/lib/table';
import type { FilterValue, SorterResult } from 'antd/lib/table/interface';
import { useState } from 'react';

import SelectColor from '../SelectColor';
import SelectSize from '../SelectSize';

const FormItem = Form.Item;
const { Text } = Typography;

export type Detail = {
  product: PRODUCT.Product;
  quantity: number;
};

export type Props = {
  visible: boolean;
  details?: Partial<Detail[]>;
  setDetails?: (details: Partial<Detail[]>) => void;
  onCancel: () => void;
};

const ModalSearchProducts = ({ visible, details = [], setDetails, onCancel }: Props) => {
  const [products, setProducts] = useState<PRODUCT.Product[]>([]);
  const [filters, setFilters] = useState<Partial<PRODUCT.FiltersGetProducts>>({
    limit: 20,
    skip: 0,
  });
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    total: 0,
    pageSize: 20,
    current: 1,
  });
  const [error, setError] = useState<string | undefined>();

  /**
   * @description callback ejecutado por el customHook
   * @param productsData array de los productos
   */
  const resultProducts = (productsData: PRODUCT.ResponsePaginate) => {
    if (productsData) {
      setProducts(productsData.docs);
      setPagination({ ...pagination, total: productsData.totalPages });
    }
  };

  /**
   * @description maneja el error de la consulta
   * @param message error que genera al consulta
   */
  const showError = (message: string) => {
    setError(message);
  };

  const { getProducts, loading } = useGetProducts(resultProducts, showError);

  /**
   * @description se encarga de consultar los productos con los filtros
   * @param params filtros para buscar productos
   */
  const onSearch = (params: Partial<PRODUCT.FiltersGetProducts>) => {
    getProducts({
      variables: {
        input: {
          ...params,
        },
      },
    });
  };

  const onFinish = (values: any) => {
    const params: Partial<PRODUCT.FiltersGetProducts> = {
      skip: 0,
      colorId: values?.color?._id,
      name: values?.name,
      sizeId: values?.size?._id,
    };
    setFilters({ ...filters, ...params });
    setError(undefined);
    onSearch({ ...filters, ...params });
  };

  /**
   * @description se encarga de manejar eventos de tabla
   * @param pagination eventos de la páginacion
   * @param _ eventdos de los filtros
   * @param sorter evento de ordenamientos
   */
  const handleChangeTable = (
    pagination: TablePaginationConfig,
    _: Record<string, FilterValue | null>,
    sorter: SorterResult<PRODUCT.Product>,
  ) => {
    const { current } = pagination;
    setFilters({ ...filters, skip: current });
    setPagination({ ...pagination, current });
    onSearch({ ...filters, skip: current });
    console.log(sorter);
  };

  /**
   * @description agrega un producto
   * @param product producto a agregar
   */
  const addProduct = (product: PRODUCT.Product) => {
    if (setDetails) {
      setDetails([...details, { product, quantity: 1 }]);
    }
  };

  /**
   * @description elimina un producto
   * @param _id identificador del producto a eliminar
   */
  const deleteProduct = (_id: string) => {
    if (setDetails) {
      setDetails(details.filter((detail) => detail?.product._id !== _id));
    }
  };

  /**
   * @description actualiza la cantidad de un producto
   * @param _id identificador del producto a actualizar
   * @param quantity cantidad nueva a asignar
   */
  const updateProduct = (_id: string, quantity: number) => {
    if (setDetails) {
      setDetails(
        details.map((detail) => {
          if (detail?.product._id === _id) {
            return {
              ...detail,
              quantity,
            };
          }
          return detail;
        }),
      );
    }
  };

  const columns: ColumnsType<PRODUCT.Product> = [
    {
      title: 'Producto',
      dataIndex: 'reference',
      render: (reference: string, product) => (
        <Row>
          <Col span={24}>
            {reference} / {product.description}
          </Col>
          <Col span={24}>
            <Tag icon={<BarcodeOutlined />}>{product.barcode}</Tag>
          </Col>
        </Row>
      ),
    },
    {
      title: 'Color',
      dataIndex: 'color',
      render: (color: COLOR.Color) => (
        <>
          <Avatar
            size="small"
            style={{ backgroundColor: color?.html, border: 'solid 1px black' }}
            //src={apiUrl + color.image?.imageSizes?.thumbnail}
          />

          <Text style={{ marginLeft: 10 }}>{color?.name_internal}</Text>
        </>
      ),
    },
    {
      title: 'Talla',
      dataIndex: 'size',
      render: (size: SIZE.Size) => size.value,
    },
    {
      title: 'Opciones',
      dataIndex: '_id',
      align: 'center',
      render: (_id: string, product) => {
        const detailFind = details?.find((detail) => detail?.product._id === _id);
        if (detailFind) {
          return (
            <Space>
              <InputNumber
                defaultValue={detailFind.quantity}
                min={1}
                onChange={(value) => updateProduct(_id, value)}
              />
              <Tooltip title="Eliminar">
                <Button
                  type="primary"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => deleteProduct(_id)}
                />
              </Tooltip>
            </Space>
          );
        }
        return (
          <Tooltip title="Agregar">
            <Button type="primary" icon={<PlusOutlined />} onClick={() => addProduct(product)} />
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
              dataSource={products}
              pagination={pagination}
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
