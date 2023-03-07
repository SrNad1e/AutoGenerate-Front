/* eslint-disable react-hooks/exhaustive-deps */
import AlertInformation from '@/components/Alerts/AlertInformation';
import SelectWarehouses from '@/components/SelectWarehouses';
import type {
  Color,
  FiltersProductsInput,
  FiltersStockInput,
  InventoryReport,
} from '@/graphql/graphql';
import { BarcodeOutlined, ClearOutlined, SearchOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { TablePaginationConfig } from 'antd';
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
  Tag,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table/interface';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import { useEffect, useState } from 'react';
import validateCodeBar from '@/libs/validateCodeBar';
import { useGetProductsStocks } from '@/hooks/products-stock.hooks';
import type { Location } from 'umi';
import { useHistory, useLocation } from 'umi';
import SelectColor from '@/components/SelectColor';
import SelectSize from '@/components/SelectSize';

const FormItem = Form.Item;
const { Text } = Typography;

type FormValues = {
  name?: string;
  warehouseId?: string;
  colorId?: string;
  sizeId?: string;
};

const Inventories = () => {
  const [propsAlert, setPropsAlert] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [dataStock, setDataStock] = useState<any[]>([]);

  const [form] = Form.useForm();
  const history = useHistory();
  const location: Location = useLocation();

  const [getProductsStock, { data, loading }] = useGetProductsStocks();

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

  const onSearch = async (params?: Partial<FiltersStockInput>) => {
    try {
      const response = await getProductsStock({
        variables: {
          input: {
            ...params,
          },
        },
      });
      if (response?.data?.productStock) {
        setDataStock([
          ...response?.data?.productStock?.docs?.map((item) => {
            const warehouse = item.productWarehouse?.find(
              (index) => index._id === item?.stock?.warehouse?._id,
            );
            if (item.stock?.warehouse?._id === warehouse?._id)
              return {
                warehouseName: warehouse?.name,
                quantity: item?.stock?.quantity,
                barcode: item?.barcode,
                reference: {
                  name: item?.reference?.name,
                  description: item?.reference?.description,
                },
                color: item?.color,
                size: item?.size,
              };
          }),
        ]);
      }
    } catch (err: any) {
      showError(err?.message);
    }
  };

  /**
   * @description se encarga de señalar los datos a la query
   * @param values valores para enviar a la query
   */
  const setQueryParams = (values?: FiltersStockInput) => {
    try {
      const valuesForm = form.getFieldsValue();
      const valuesNew = {
        ...values,
        ...valuesForm,
      };
      const datos = Object.keys(valuesNew)
        .reduce(
          (a, key) =>
            valuesNew[key] !== undefined && valuesNew[key] !== null
              ? `${a}&${key}=${JSON.stringify(valuesNew[key])}`
              : a,
          '',
        )
        .slice(1);

      history.replace(`${location.pathname}?${datos}`);
    } catch (error: any) {
      showError(error?.message);
    }
  };

  /**
   * @description realiza la busqueda de los productos con base al filtro
   * @param values valores del formulario
   */
  const onFinish = ({ name, warehouseId, colorId, sizeId }: FormValues, pageCurrent?: number) => {
    try {
      const params: Partial<FiltersProductsInput> = {
        page: pageCurrent || 1,
        name: name && validateCodeBar(name),
        warehouseId: warehouseId,
        colorId: colorId,
        sizeId: sizeId,
      };
      onSearch({ ...params });
      setQueryParams({ name, warehouseId, colorId, sizeId });
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

  const onClear = () => {
    history.replace(location.pathname);
    form.resetFields();
    onSearch();
  };

  /**
   * @description se encarga de cargar los datos con base a la query
   */
  const getFiltersQuery = () => {
    try {
      const queryParams: any = location.query;
      const params = {};
      Object.keys(queryParams).forEach((item) => {
        params[item] = JSON.parse(queryParams[item]);
      });
      form.setFieldsValue(params);
      onSearch(params);
    } catch (error: any) {
      showError(error?.message);
    }
  };

  useEffect(() => {
    onSearch();
    getFiltersQuery();
  }, []);

  const filterColor = () => (
    <Card style={{ height: 100, width: 280 }} bodyStyle={{ padding: 5 }}>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
      >
        <Row justify="center">
          <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
            <FormItem name="colorId" style={{ width: '100%' }}>
              <SelectColor border={false} disabled={false} />
            </FormItem>
          </Col>
          <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
            <FormItem>
              <Button
                style={{ borderRadius: 5 }}
                size="small"
                key="0"
                htmlType="submit"
                type="primary"
              >
                Aceptar
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
  );

  const filterSize = () => (
    <Card size="small" style={{ height: 100 }} bodyStyle={{ padding: 5 }}>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
      >
        <Row>
          <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
            <FormItem name="sizeId">
              <SelectSize border={false} disabled={false} />
            </FormItem>
          </Col>
          <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
            <FormItem>
              <Button
                style={{ borderRadius: 5 }}
                size="small"
                key="0"
                htmlType="submit"
                type="primary"
              >
                Aceptar
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
  );

  const columns: ColumnsType<InventoryReport> = [
    {
      title: 'Bodega',
      dataIndex: 'warehouseName',
      render: (warehouse: string) => warehouse,
    },
    {
      title: 'Producto',
      dataIndex: 'product',
      render: (_, record) => (
        <Row>
          <Col span={24}>
            {record?.reference?.name} / {record?.reference?.description}
          </Col>
          <Col span={24}>
            <Tag
              style={{ borderColor: '#dc9575', color: '#dc9575', backgroundColor: 'white' }}
              icon={<BarcodeOutlined />}
            >
              {record?.barcode}
            </Tag>
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
      filterDropdown: () => filterColor(),
    },
    {
      title: 'Talla',
      dataIndex: 'size',
      render: (size) => size?.value,
      filterDropdown: () => filterSize(),
    },
    {
      title: 'Disponible',
      dataIndex: 'quantity',
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
            <Col span={6}>
              <FormItem label="Producto" name="name">
                <Input autoFocus placeholder="referencia, descripción, código" />
              </FormItem>
            </Col>
            <Col span={6}>
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
                  <Button
                    htmlType="reset"
                    style={{ borderRadius: 5 }}
                    onClick={onClear}
                    icon={<ClearOutlined />}
                  >
                    Limpiar
                  </Button>
                </Space>
              </FormItem>
            </Col>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Space>
                <Text strong>Total Encontrados:</Text>
                <Text>{data?.productStock?.totalDocs}</Text>
                <Text strong>Pagina:</Text>
                <Text>
                  {data?.productStock?.page} / {data?.productStock?.totalPages}
                </Text>
              </Space>
            </Col>
            <Col span={24}>
              <Table
                loading={loading}
                columns={columns}
                onChange={handleChangeTable}
                dataSource={dataStock as any}
                pagination={{
                  current: data?.productStock?.page,
                  total: data?.productStock?.totalDocs,
                  showSizeChanger: false,
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
