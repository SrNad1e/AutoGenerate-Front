/* eslint-disable react-hooks/rules-of-hooks */
import SelectShop from '@/components/SelectShop';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Form,
  Row,
  Select,
  Space,
  Typography,
} from 'antd';
import { Column, Pie, Bullet } from '@ant-design/plots';
import numeral from 'numeral';
import { ClearOutlined, SearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
//import type { Moment } from 'moment';
import moment from 'moment';
import type { FiltersSalesReportInput } from '@/graphql/graphql';
import { GroupDates } from '@/graphql/graphql';
import AlertInformation from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
//import { useHistory } from 'umi';
import { useGetReportSales } from '@/hooks/reportSales.hooks';
//import { useGetGoal } from '@/hooks/goal.hooks';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { Title, Text } = Typography;

/*type FormValues = {
  shopId?: string;
  groupDates: GroupDates;
  isGroupByCategory: boolean;
  dates: Moment[];
};*/

const Dashboard = () => {
  const [period, setPeriod] = useState(true);
  const [propsAlertInformation, setPropsAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [agroup, setAgroup] = useState(true);
  const [customers, setCustomers] = useState<any[]>([]);
  const [typePayment, setTypePayment] = useState([]);
  const [sales, setSales] = useState([]);
  const [shopSelected, setShopSelected] = useState(false);

  const [getReportSales, paramsGetReportSales] = useGetReportSales();
  //const [getSalesShop, paramsGetSalesShop] = useGetGoal();

  const [form] = Form.useForm();
  // const history = useHistory();

  /**
   * @description funcion usada por los hook para mostrar los errores
   * @param message mensaje de error a mostrar
   */
  const messageError = (message: string) => {
    setPropsAlertInformation({
      message,
      type: 'error',
      visible: true,
    });
  };

  /**
   * @description se encarga de cerrar la alerta informativa
   */
  const closeAlertInformation = () => {
    setPropsAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  const orderDays = (month: number, year: number) => {
    const date = new Date(year, month, 1);
    console.log(date, 1);
    const days: any[] = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const onSearchData = async (filters?: FiltersSalesReportInput) => {
    try {
      const response = await getReportSales({
        variables: {
          input: {
            dateInitial: moment('2022/12/1').format(FORMAT_DATE_API),
            dateFinal: moment(new Date()).format(FORMAT_DATE_API),
            isGroupByCategory: true,
            groupDates: GroupDates.Month,
            ...filters,
          },
        },
      });
      if (response?.data?.reportSales) {
        setCustomers(
          response?.data?.reportSales?.customersSalesReport?.map((item) => {
            return {
              ...item,
              customer: item.typeCustomer.name,
            };
          }),
        );
        setTypePayment(
          response?.data?.reportSales?.paymentsSalesReport?.map((item) => {
            return {
              ...item,
              paymentName: item.payment.name,
            };
          }),
        );

        setSales(
          response?.data?.reportSales?.salesReport?.map((item) => {
            return {
              ...item,
              categoryName: item?.category?.name,
            };
          }),
        );
      }
    } catch (error: any) {
      messageError(error?.message);
    }
  };

  /*const onSearchGoal = () => {
    getSalesShop({});
  };*/

  /**
   * @description se encarga de realizar el proceso de busqueda con los filtros
   * @param props filtros seleccionados en el formulario
   */
  /*const onFinish = (props: FormValues) => {
    const { dates, groupDates, isGroupByCategory, shopId } = props;
    try {
      const params: Partial<FiltersSalesReportInput> = {
        groupDates,
        isGroupByCategory,
        shopId,
      };

      if (dates) {
        const dateInitial = moment(dates[0]).format(FORMAT_DATE_API);
        const dateFinal = moment(dates[1]).format(FORMAT_DATE_API);
        params.dateFinal = dateFinal;
        params.dateInitial = dateInitial;
      }

      onSearchData(params);

      const datos = Object.keys(props)
        .reduce((a, key) => (props[key] ? `${a}&${key}=${JSON.stringify(props[key])}` : a), '')
        .slice(1);

      form.setFieldsValue(props);
      history.replace(`${location.pathname}?${datos}`);
    } catch (error: any) {
      messageError(error?.message);
    }
  };*/

  const renderPie = () => {
    const configPie = {
      appendPadding: 10,
      angleField: 'quantity',
      colorField: 'customer',
      radius: 0.75,
      label: {
        type: 'spider',
        labelHeight: 30,
        content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      },
      interactions: [
        {
          type: 'element-selected',
        },
        {
          type: 'element-active',
        },
      ],
    };

    return (
      <Pie
        {...configPie}
        data={customers}
        loading={paramsGetReportSales?.loading}
        style={{ height: 187 }}
      />
    );
  };

  const renderPiePayment = () => {
    const configPie = {
      appendPadding: 10,
      angleField: 'quantity',
      colorField: 'paymentName',
      radius: 0.75,
      label: {
        type: 'spider',
        labelHeight: 30,
        content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      },
      interactions: [
        {
          type: 'element-selected',
        },
        {
          type: 'element-active',
        },
      ],
    };

    return (
      <Pie
        {...configPie}
        data={typePayment}
        loading={paramsGetReportSales?.loading}
        style={{ height: 187 }}
      />
    );
  };

  const config = {
    data: sales,
    isStack: true,
    xField: 'categoryName',
    yField: 'quantity',
    seriesField: 'categoryName',
    label: {
      position: 'top',
      layout: [
        {
          type: 'interval-adjust-position',
        },
        {
          type: 'interval-hide-overlap',
        },
        {
          type: 'adjust-color',
        },
      ],
    },
  };

  const configBullet = {
    data: [],
    measureField: 'Ventas',
    rangeField: 'ranges',
    targetField: 'Meta',
    xField: 'title',
    color: {
      range: '#f0efff',
      measure: '#5B8FF9',
      target: '#3D76DD',
    },
    xAxis: {
      line: null,
    },
    yAxis: false,
    legend: {
      custom: true,
      position: 'bottom',
      items: [
        {
          value: 'Ventas',
          name: 'Ventas',
          marker: {
            symbol: 'square',
            style: {
              fill: '#5B8FF9',
              r: 5,
            },
          },
        },
        {
          value: 'Meta',
          name: 'Meta',
          marker: {
            symbol: 'line',
            style: {
              stroke: '#3D76DD',
              r: 5,
            },
          },
        },
      ],
    },
  };

  const onChangePeriod = (e: string) => {
    if (e === '2') {
      setPeriod(true);
    } else {
      setPeriod(false);
    }
  };

  useEffect(() => {
    onSearchData();
    form.setFieldValue('dates', [moment(new Date()), moment(new Date())]);
  }, []);

  useEffect(() => {
    console.log(orderDays(11, 2022));
  }, []);

  const summaryData = paramsGetReportSales.data?.reportSales?.summarySalesReport;

  return (
    <PageContainer title="Admin Dashboard">
      <Card>
        <Form form={form}>
          <Row gutter={20}>
            <Col xs={24} xl={6}>
              <FormItem label="Período">
                <Select defaultValue={'Mensual'} onChange={(e) => onChangePeriod(e)}>
                  <Option key={1} value={GroupDates.Day}>
                    Diaria
                  </Option>
                  <Option key={2} value={GroupDates.Month}>
                    Mensual
                  </Option>
                </Select>
              </FormItem>
            </Col>
            <Col xs={24} xl={6}>
              <FormItem label="Fechas" name="dates">
                {period === false ? (
                  <RangePicker picker="date" placeholder={['Fecha Inicial', 'Fecha Final']} />
                ) : (
                  <RangePicker picker="month" placeholder={['Fecha Inicial', 'Fecha Final']} />
                )}
              </FormItem>
            </Col>
            <Col xs={24} xl={6}>
              <FormItem label="Tiendas" name="shopId">
                <SelectShop
                  disabled={false}
                  onChange={(e) => (e ? setShopSelected(true) : setShopSelected(false))}
                />
              </FormItem>
            </Col>
            <Col xs={24} xl={6}>
              <FormItem label="Criterio">
                <Select defaultValue={'Unidades Vendidas'} placeholder="Seleccione un Criterio">
                  <Option key={1}>Unidades Vendidas</Option>
                  <Option key={2}>Pesos</Option>
                </Select>
              </FormItem>
            </Col>
            <Col xs={24} xl={5}>
              <FormItem label="Agrupar por categorías" name="categoryLevel1Id">
                <Checkbox
                  defaultChecked
                  onChange={() => setAgroup(agroup === false ? true : false)}
                />
              </FormItem>
            </Col>
            <Col xs={24} md={7} lg={7} xl={7}>
              <FormItem label=" " colon={false}>
                <Space>
                  <Button
                    loading={false}
                    style={{ borderRadius: 5 }}
                    icon={<SearchOutlined />}
                    type="primary"
                    htmlType="submit"
                    onClick={() => onSearchData()}
                  >
                    Buscar
                  </Button>
                  <Button
                    icon={<ClearOutlined />}
                    loading={false}
                    style={{ borderRadius: 5 }}
                    onClick={() => console.log(1)}
                  >
                    Limpiar
                  </Button>
                </Space>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Divider>Estadisticas</Divider>
        <Row gutter={[40, 40]}>
          <Col span={14}>
            <Card size="small">
              <Column {...config} />
            </Card>
          </Col>
          <Col span={10}>
            <Row>
              <Col span={24}>
                <Card size="small">{renderPie()}</Card>
              </Col>
              <Col span={24}>
                <Card size="small">{renderPiePayment()}</Card>
              </Col>
            </Row>
          </Col>
          <Col span={14}>
            {shopSelected ? (
              <Card>
                <Title level={4} style={{ display: 'flex', justifyContent: 'center' }}>
                  Meta vs Ventas
                </Title>
                <Bullet {...configBullet} style={{ width: 500, height: 100 }} />
              </Card>
            ) : (
              <Card>
                <Title level={4} style={{ display: 'flex', justifyContent: 'center' }}>
                  Meta vs Ventas
                </Title>
                <Text strong style={{ display: 'flex', justifyContent: 'center' }}>
                  {'(Seleccione una tienda)'}
                </Text>
              </Card>
            )}
          </Col>
          <Col offset={1} span={8}>
            <Card bordered={false}>
              <Row align="middle">
                <Col span={12}>
                  <Row>
                    <Col span={24}>
                      <Title level={5}>Total Ventas: </Title>
                    </Col>
                    <Col span={24}>
                      <Title level={5}>Total Facturas: </Title>
                    </Col>
                    <Col span={24}>
                      <Title level={5}>CMV: </Title>
                    </Col>
                    <Col span={24}>
                      <Title level={5}>Margen: </Title>
                    </Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row>
                    <Col span={24}>
                      {' '}
                      <Title level={5}>{numeral(summaryData?.quantity).format('0,00')}</Title>
                    </Col>
                    <Col span={24}>
                      <Title level={5}>{numeral(summaryData?.total).format('$ 0,00')}</Title>{' '}
                    </Col>
                    <Col span={24}>
                      <Title level={5}>{numeral(summaryData?.cmv).format('$ 0,00')}</Title>
                    </Col>
                    <Col span={24}>
                      <Title level={5}>{`${(summaryData?.margin * 100).toFixed(2)}%`}</Title>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Card>
      <AlertInformation {...propsAlertInformation} onCancel={closeAlertInformation} />
    </PageContainer>
  );
};

export default Dashboard;
