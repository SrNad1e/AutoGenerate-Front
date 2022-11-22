/* eslint-disable react-hooks/exhaustive-deps */
import AlertInformation from '@/components/Alerts/AlertInformation';
import SelectWarehouses from '@/components/SelectWarehouses';
import type { FiltersProductsInput, Product } from '@/graphql/graphql';
import { BarcodeOutlined, ClearOutlined, SearchOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Space,
  Table,
  TablePaginationConfig,
  Tag,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table/interface';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import { useEffect, useState } from 'react';
import { useGetProducts } from '@/hooks/product.hooks';
import validateCodeBar from '@/libs/validateCodeBar';

const FormItem = Form.Item;
const { Text } = Typography;

type FormValues = {
  name: string;
  warehouseId: string;
};

const Inventories = () => {
  const [propsAlert, setPropsAlert] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [productsStock, setProductsStock] = useState([]);
  const [pagination, setPagination] = useState<any>({});
  const [form] = Form.useForm();

  const [getProducts /* { data, loading, error }*/] = useGetProducts();

  const onCloseAlert = () => {
    setPropsAlert({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  const showError = (message: string) => {
    setPropsAlert({
      message,
      type: 'error',
      visible: true,
    });
  };

  const onSearch = async (params?: Partial<FiltersProductsInput>) => {
    try {
      const response = await getProducts({
        variables: {
          input: {
            ...params,
            status: 'active',
            withStock: true,
            limit: 210,
          },
        },
      });
      if (response?.data?.products) {
        console.log(response?.data?.products?.docs);
        setPagination({
          totalD: response.data.products.totalDocs,
          totalP: response.data.products.totalPages,
          page: response.data.products.page,
        });
        let obj = {};
        const vec = [];
        for (let i = 0; i < response?.data?.products?.docs.length; i++) {
          response?.data?.products?.docs[i].stock?.forEach((index) => {
            obj = {
              warehouseName: index?.warehouse?.name,
              stockProduct: index?.quantity,
              product: {
                name: response?.data?.products?.docs[i].reference.name,
                description: response?.data?.products?.docs[i].reference.description,
                barcode: response?.data?.products?.docs[i].barcode,
                color: {
                  name: response?.data?.products?.docs[i].color?.name,
                  html: response?.data?.products?.docs[i].color?.html,
                  image: response?.data?.products?.docs[i].color?.image?.urls?.webp?.small,
                  nameInternal: response?.data?.products?.docs[i].color?.name_internal,
                },
                size: response?.data?.products?.docs[i].size.value,
              },
            };
            vec.push(obj);
          });
        }

        setProductsStock(vec);
      }
    } catch (err: any) {
      showError(err?.message);
    }
  };

  /**
   * @description realiza la busqueda de los productos con base al filtro
   * @param values valores del formulario
   */
  const onFinish = ({ name, warehouseId }: FormValues, pageCurrent?: number) => {
    try {
      const params: Partial<FiltersProductsInput> = {
        page: pageCurrent || 1,
        name: name && validateCodeBar(name),
        warehouseId: warehouseId || 'all',
        limit: 210,
      };
      onSearch({ ...params });
    } catch (err: any) {
      showError(err?.message);
    }
  };

  /**
   * @description se encarga de manejar eventos de tabla
   * @param paginationLocal eventos de la páginacion
   * @param sorter ordenamiento de la tabla
   */
  const handleChangeTable = (paginationLocal: TablePaginationConfig) => {
    const params = form.getFieldsValue();
    const { current } = paginationLocal;
    onFinish(params, current);
  };

  useEffect(() => {
    onSearch({ limit: 210, page: 1, warehouseId: 'all' });
  }, []);

  useEffect(() => {
    console.log(productsStock);
  }, [productsStock]);

  const columns: ColumnsType<Product> = [
    {
      title: 'Bodega',
      dataIndex: 'warehouseName',
    },
    {
      title: 'Producto',
      dataIndex: 'product',
      render: (product) => (
        <Row>
          <Col span={24}>
            {product?.name} / {product?.description}
          </Col>
          <Col span={24}>
            <Tag
              style={{ borderColor: '#dc9575', color: '#dc9575', backgroundColor: 'white' }}
              icon={<BarcodeOutlined />}
            >
              {product?.barcode}
            </Tag>
          </Col>
        </Row>
      ),
    },
    {
      title: 'Color',
      dataIndex: 'product',
      render: (product) => (
        <>
          <Avatar
            size="small"
            style={{ backgroundColor: product?.color?.html, border: 'solid 1px black' }}
            src={`${CDN_URL}/${product?.color?.image?.urls?.webp?.small}`}
          />

          <Text style={{ marginLeft: 10 }}>{product?.color?.nameInternal}</Text>
        </>
      ),
    },
    {
      title: 'Talla',
      dataIndex: 'product',
      render: (product) => product?.size,
    },
    {
      title: 'Disponible',
      dataIndex: 'stockProduct',
      align: 'center',
      render: (stock) => (
        <Badge
          overflowCount={99999}
          count={stock}
          style={{ backgroundColor: stock > 0 || 0 ? 'green' : 'red' }}
          showZero
        />
      ),
    },
  ];
  return (
    <PageContainer>
      <Card>
        <Form form={form} onFinish={onFinish}>
          <Row gutter={[20, 15]}>
            <Col>
              <FormItem label="Producto" name="name">
                <Input autoFocus placeholder="referencia, descripción, código" />
              </FormItem>
            </Col>
            <Col>
              <FormItem label="Bodega" name="warehouseId">
                <SelectWarehouses disabled={false} />
              </FormItem>
            </Col>
            <Col>
              <FormItem>
                <Space>
                  <Button
                    icon={<SearchOutlined />}
                    type="primary"
                    htmlType="submit"
                    style={{ borderRadius: 5 }}
                  >
                    Buscar
                  </Button>
                  <Button htmlType="reset" style={{ borderRadius: 5 }} icon={<ClearOutlined />}>
                    Limpiar
                  </Button>
                </Space>
              </FormItem>
            </Col>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Space>
                <Text strong>Total Encontrados:</Text>
                <Text>{pagination.totalD}</Text>
                <Text strong>Pagina:</Text>
                <Text>
                  {pagination.page} / {pagination.totalP}
                </Text>
              </Space>
            </Col>
            <Col span={24}>
              <Table
                columns={columns}
                onChange={handleChangeTable}
                dataSource={productsStock}
                pagination={{
                  current: pagination.page,
                  total: pagination.totalD,
                  showSizeChanger: false,
                  pageSize: 210,
                }}
                scroll={{ y: 800 }}
              />
            </Col>
          </Row>
        </Form>
      </Card>
      <AlertInformation {...propsAlert} onCancel={onCloseAlert} />
    </PageContainer>
  );
};

export default Inventories;
