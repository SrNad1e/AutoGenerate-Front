/* eslint-disable react-hooks/exhaustive-deps */
import {
  BarcodeOutlined,
  BgColorsOutlined,
  ClearOutlined,
  DollarOutlined,
  MenuOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  TrademarkCircleOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Col, DatePicker, Form, Row, Space, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table/interface';
import type { FilterValue } from 'antd/lib/table/interface';
import { useEffect, useState } from 'react';
import type { FiltersSalesReportInvoicingInput, ProductDetail } from '@/graphql/graphql';
import { useLocation } from 'umi';
import type { Location } from 'umi';
import type { Moment } from 'moment';
import moment from 'moment';
import numeral from 'numeral';

import AlertInformation from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import { CSVLink } from 'react-csv';

import styles from '../../order/styles';
import SelectShop from '@/components/SelectShop';
import { useGetSales } from '@/hooks/sales.hooks';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Text } = Typography;

type FormValues = {
  shopId: string;
  dates?: Moment[];
  dateFinal: string;
  dateInitial: string;
};

const SalesList = () => {
  const [filterTable, setFilterTable] = useState<Record<string, any | null>>({});
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const [form] = Form.useForm();
  const location: Location = useLocation();

  const [getSales, paramsGetSales] = useGetSales();

  /**
   * @description funcion usada por los hook para mostrar los errores
   * @param message mensaje de error a mostrar
   */
  const messageError = (message: string) => {
    setAlertInformation({
      message,
      type: 'error',
      visible: true,
    });
  };

  /**
   * @description se encarga de ejecutar la funcion para obtener los pedidos
   * @param values filtros necesarios para la busqueda
   */
  const onSearch = (values: FiltersSalesReportInvoicingInput) => {
    try {
      getSales({
        variables: {
          input: {
            ...values,
          },
        },
      });
    } catch (error: any) {
      messageError(error?.message);
    }
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
   * @description esta funcion evalua los paramametros del formulario y ejecuta la busqueda
   * @param value valores del formulario
   */
  const onFinish = (value: FormValues) => {
    const { dates } = value;
    const filters = { ...filterTable };
    const params: any = {
      ...value,
    };

    if (dates) {
      const dateInitial = moment(dates[0]).format(FORMAT_DATE_API);
      const dateFinal = moment(dates[1]).format(FORMAT_DATE_API);
      params.dateFinal = dateFinal;
      params.dateInitial = dateInitial;
    }
    delete params.dates;
    onSearch({ ...params, ...filters });
  };

  /**
   * @description se encarga de manejar eventos de tabla
   * @param paginationLocal eventos de la páginacion
   * @param sorter ordenamiento de la tabla
   * @param filtersArg filtros de la tabla
   */
  const handleChangeTable = (filtersArg: Record<string, FilterValue | any>) => {
    const params = form.getFieldsValue();

    if (params.dates) {
      const dateInitial = moment(params.dates[0]).format(FORMAT_DATE_API);
      const dateFinal = moment(params.dates[1]).format(FORMAT_DATE_API);
      params.dateFinal = dateFinal;
      params.dateInitial = dateInitial;
    }
    delete params.dates;

    const filters = { ...filtersArg };

    Object.keys(filters).forEach((i) => {
      if (filters[i] === null) {
        delete filters[i];
      } else {
        filters[i] = filters[i][0];
      }
    });
    setFilterTable(filtersArg);
  };

  /**
   * @description se encarga de limpiar los estados e inicializarlos
   */
  const onClear = () => {
    form.resetFields();
    setFilterTable({});
  };

  /**
   * @description se encarga de cargar los datos con base a la query
   */
  const loadingData = () => {
    const queryParams: any = location?.query;

    const newFilters = {
      shopId: '',
      dateInitial: '',
      dateFinal: '',
    };

    Object.keys(queryParams).forEach((item) => {
      if (item === 'dates') {
        const dataItem = JSON.parse(queryParams[item]);
        newFilters[item] = [moment(dataItem[0]), moment(dataItem[1])];
      } else {
        newFilters[item] = JSON.parse(queryParams[item]);
      }
    });
    form.setFieldsValue(newFilters);
    onFinish(newFilters);
  };

  useEffect(() => {
    loadingData();
  }, []);

  const columns: ColumnsType<ProductDetail> = [
    {
      title: (
        <Text>
          <ShoppingCartOutlined /> Referencia
        </Text>
      ),
      dataIndex: 'name',
      align: 'center',
      render: (name: string) => <>{name}</>,
      filters: paramsGetSales?.data?.reportSalesInvoicing?.summarySalesReport?.products
        .map((item: ProductDetail) => item.name)
        .filter((value: any, index: any, self: any) => self.indexOf(value) === index)
        .map((item: any) => {
          return { text: item, value: item };
        }),
      onFilter: (value: string, record) => record.name.includes(value),
    },
    {
      title: (
        <Text>
          <BarcodeOutlined /> Código de Barras
        </Text>
      ),
      dataIndex: 'barcode',
      align: 'center',
      render: (barcode: string) => <>{barcode}</>,
    },
    {
      title: (
        <Text>
          <DollarOutlined /> Precio
        </Text>
      ),
      dataIndex: 'price',
      sorter: (a, b) => a['price'] - b['price'],
      showSorterTooltip: false,
      align: 'center',
      render: (price: number) => <>{price}</>,
    },
    {
      title: (
        <Text>
          <DollarOutlined /> Costo
        </Text>
      ),
      dataIndex: 'cost',
      sorter: (a, b) => a['cost'] - b['cost'],
      showSorterTooltip: false,
      align: 'center',
      render: (cost: number) => <>{cost}</>,
    },
    {
      title: (
        <Text>
          <BgColorsOutlined /> Color
        </Text>
      ),
      dataIndex: 'color',
      align: 'center',
      render: (color: string) => <>{color}</>,
      filters: paramsGetSales?.data?.reportSalesInvoicing?.summarySalesReport?.products
        .map((item: ProductDetail) => item.color)
        .filter((value: any, index: any, self: any) => self.indexOf(value) === index)
        .map((item: any) => {
          return { text: item, value: item };
        }),
      onFilter: (value: string, record) => record.color.includes(value),
    },
    {
      title: (
        <Text>
          <BgColorsOutlined /> Talla
        </Text>
      ),
      dataIndex: 'size',
      align: 'center',
      render: (size: string) => <>{size}</>,
      filters: paramsGetSales?.data?.reportSalesInvoicing?.summarySalesReport?.products
        .map((item: ProductDetail) => item.size)
        .filter((value: any, index: any, self: any) => self.indexOf(value) === index)
        .map((item: any) => {
          return { text: item, value: item };
        }),
      onFilter: (value: string, record) => record.size.includes(value),
    },
    {
      title: (
        <Text>
          <TrademarkCircleOutlined /> Marca
        </Text>
      ),
      dataIndex: 'brand',
      align: 'center',
      render: (brand: any) => <>{brand}</>,
    },
    {
      title: (
        <Text>
          <MenuOutlined /> Categoría
        </Text>
      ),
      dataIndex: 'categoryLevel1',
      align: 'center',
      render: (categoryLevel1: any) => <>{categoryLevel1}</>,
      filters: paramsGetSales?.data?.reportSalesInvoicing?.summarySalesReport?.products
        .map((item: ProductDetail) => item.categoryLevel1)
        .filter((value: any, index: any, self: any) => self.indexOf(value) === index)
        .map((item: any) => {
          return { text: item, value: item };
        }),
      onFilter: (value: string, record) => record.categoryLevel1.includes(value),
    },
  ];

  return (
    <PageContainer>
      <Card>
        <Form form={form} onFinish={onFinish}>
          <Row gutter={[20, 15]}>
            <Col xs={24} md={8} lg={6} xl={9}>
              <FormItem label="Tienda" name="shopId">
                <SelectShop disabled={paramsGetSales?.loading} />
              </FormItem>
            </Col>
            <Col xs={24} md={8} lg={6} xl={9}>
              <FormItem label="Fechas" name="dates">
                <RangePicker
                  disabled={paramsGetSales?.loading}
                  style={styles.allWidth}
                  placeholder={['Fecha Inicial', 'Fecha Final']}
                  showTime={{ format: 'HH:mm' }}
                />
              </FormItem>
            </Col>
            <Col xs={24} md={2} lg={2} xl={6}>
              <Row gutter={[20, 15]} justify="center">
                <FormItem>
                  <Space>
                    <Button
                      icon={<SearchOutlined />}
                      type="primary"
                      htmlType="submit"
                      loading={paramsGetSales?.loading}
                      style={styles.borderR}
                    >
                      Buscar
                    </Button>
                    {paramsGetSales?.data?.reportSalesInvoicing?.summarySalesReport?.products && (
                      <CSVLink
                        data={
                          paramsGetSales?.data?.reportSalesInvoicing?.summarySalesReport
                            ?.products || []
                        }
                        separator={';'}
                        filename={'reporte_ventas.csv'}
                        className="ant-btn ant-btn-primary"
                        style={styles.borderR}
                      >
                        Exportar
                      </CSVLink>
                    )}
                    <Button
                      htmlType="reset"
                      onClick={onClear}
                      style={styles.borderR}
                      loading={paramsGetSales?.loading}
                      icon={<ClearOutlined />}
                    >
                      Limpiar
                    </Button>
                  </Space>
                </FormItem>
              </Row>
            </Col>
            <Col span={24} style={styles.texRigth}>
              <Space>
                <Text strong>Total Vendido:</Text>
                <Text>
                  {numeral(
                    paramsGetSales?.data?.reportSalesInvoicing?.summarySalesReport?.total,
                  ).format('$ 0,0') || 0}
                </Text>
                <Text strong>Costo Mercancia Vendida:</Text>
                <Text>
                  {numeral(
                    paramsGetSales?.data?.reportSalesInvoicing?.summarySalesReport?.cmv,
                  ).format('$ 0,0') || 0}
                </Text>
                <Text strong>Total Encontrados:</Text>
                <Text>
                  {paramsGetSales?.data?.reportSalesInvoicing?.summarySalesReport?.products
                    ?.length || 0}
                </Text>
              </Space>
            </Col>
            <Col span={24}>
              <Table
                onChange={handleChangeTable}
                loading={paramsGetSales?.loading}
                columns={columns}
                scroll={{ x: 1000 }}
                dataSource={
                  paramsGetSales?.data?.reportSalesInvoicing?.summarySalesReport?.products
                }
              />
            </Col>
          </Row>
        </Form>
      </Card>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </PageContainer>
  );
};

export default SalesList;
