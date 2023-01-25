/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import SelectShop from '@/components/SelectShop';
import { PageContainer } from '@ant-design/pro-layout';
import { Avatar, Card, Col, DatePicker, Divider, Form, Row, Select, Typography } from 'antd';
import { Column, Pie, Bullet } from '@ant-design/plots';
import numeral from 'numeral';
import { useEffect, useState } from 'react';
import type { Moment } from 'moment';
import moment from 'moment';
import type { FiltersSalesReportInput } from '@/graphql/graphql';
import type { Location } from 'umi';
import { GroupDates } from '@/graphql/graphql';
import AlertInformation from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import { useHistory, useLocation } from 'umi';
import { useGetReportSales } from '@/hooks/reportSales.hooks';
import { useGetGoal } from '@/hooks/goal.hooks';
import 'moment/locale/es-mx';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { Title, Text } = Typography;

type FormValues = {
  shopId?: string;
  groupDates: GroupDates;
  isGroupByCategory: boolean;
  dates: Moment[];
};

const Dashboard = () => {
  const [period, setPeriod] = useState(true);
  const [propsAlertInformation, setPropsAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [customers, setCustomers] = useState<Partial<any[]>>([]);
  const [typePayment, setTypePayment] = useState<Partial<any[]>>([]);
  const [sales, setSales] = useState<Partial<any[]>>([]);
  const [shopSelected, setShopSelected] = useState(false);
  const [criterio, setCriterio] = useState(false);
  const [bulletData, setBulletData] = useState<any[]>([]);
  const [dateSelected, setDateSelected] = useState(false);

  const [getReportSales, paramsGetReportSales] = useGetReportSales();
  const [getSalesShop /*paramsGetSalesShop*/] = useGetGoal();

  const [form] = Form.useForm();
  const history = useHistory();
  const location: Location = useLocation();

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

  const onSearchData = async (filters?: FiltersSalesReportInput) => {
    try {
      const response = await getReportSales({
        variables: {
          input: {
            dateInitial: moment(new Date()).format(FORMAT_DATE_API),
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
          }) as any,
        );
        setTypePayment(
          response?.data?.reportSales?.paymentsSalesReport?.map((item) => {
            return {
              ...item,
              paymentName: item.payment.name,
            };
          }) as any,
        );

        const responseFormat: any[] = [];

        response?.data?.reportSales?.salesReport?.forEach((item) => {
          const dateFormat = moment(item.date).utc().format('YYYY-MM-DD');
          const totalFormat = numeral(item.total).format('$ 0,0');
          const findInd = responseFormat.findIndex(
            (res) => item?.category?.name === res.categoryName && res.dateFormat === dateFormat,
          );
          if (findInd >= 0) {
            responseFormat[findInd] = {
              ...responseFormat[findInd],
              total: responseFormat[findInd].total + item.total,
              quantity: responseFormat[findInd].quantity + item.quantity,
            };
          } else {
            responseFormat.push({
              ...item,
              categoryName: item?.category?.name,
              dateFormat: dateFormat,
              totalFormat: totalFormat,
            });
          }
        });

        const arrOrdered = responseFormat?.sort(function (a, b) {
          if (moment(a?.dateFormat).isBefore(moment(b?.dateFormat))) {
            return -1;
          } else {
            return 1;
          }
        }) as any;

        setSales(arrOrdered);
      }
    } catch (error: any) {
      messageError(error?.message);
    }
  };

  const onSearchGoal = async () => {
    const shop = form.getFieldValue('shopId');
    let month = form.getFieldValue('dates');
    try {
      if (month) {
        const dateInitial = moment(month[0]).format(FORMAT_DATE_API);
        const dateFinal = moment(month[1]).format(FORMAT_DATE_API);
        if (moment(dateInitial).isBefore(moment(dateFinal))) {
          month = dateInitial;
        } else {
          month = dateFinal;
        }
      }
      const response = await getSalesShop({
        variables: {
          input: {
            month,
            shopId: shop,
          },
        },
      });
      if (response?.data) {
        setBulletData([response?.data?.goalStatus]);
      }
    } catch (error: any) {
      messageError(error?.message);
    }
  };

  /**
   * @description se encarga de realizar el proceso de busqueda con los filtros
   * @param props filtros seleccionados en el formulario
   */
  const onFinish = async (props: FormValues) => {
    const { groupDates, isGroupByCategory, shopId } = props;
    try {
      const dates = await form.getFieldValue('dates');
      const params: Partial<FiltersSalesReportInput> | any = {
        groupDates: groupDates || GroupDates.Month,
        isGroupByCategory: isGroupByCategory || true,
        shopId,
      };

      if (dates) {
        props.dates = dates;
        const dateInitial = moment(dates[0]).format(FORMAT_DATE_API);
        const dateFinal = moment(dates[1]).format(FORMAT_DATE_API);
        params.dateFinal = dateFinal;
        params.dateInitial = dateInitial;
      }
      delete params.dates;

      onSearchData({ ...params });

      const datos = Object.keys(props)
        .reduce((a, key) => (props[key] ? `${a}&${key}=${JSON.stringify(props[key])}` : a), '')
        .slice(1);

      form.setFieldsValue(props);
      history.replace(`${location.pathname}?${datos}`);
    } catch (error: any) {
      messageError(error?.message);
    }
  };

  const onChangeForm = async () => {
    const values = await form.getFieldsValue();
    if (dateSelected) {
      onFinish(values);
      if (shopSelected) {
        onSearchGoal();
      }
    }
  };

  const onChangeShopSelected = async (e?: any) => {
    if (e) {
      setShopSelected(true);
      onSearchGoal();
      onChangeForm();
    } else {
      setShopSelected(false);
      onChangeForm();
    }
  };

  const onChangeDateSelected = async (e?: any, obj?: any) => {
    if (e) {
      setDateSelected(true);
      if (obj.range === 'end') {
        onChangeForm();
      }
    } else {
      setDateSelected(false);
    }
  };

  const onChangeCriterio = (e: any) => {
    if (e === true) {
      setCriterio(e);
    } else {
      setCriterio(e);
    }
  };

  const renderPie = () => {
    const configPie = {
      appendPadding: 10,
      angleField: 'quantity',
      colorField: 'customer',
      radius: 0.75,
      label: {
        type: 'outer',
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
      tooltip: {
        customContent: (title: string, data: any) => (
          <Row>
            <Col style={{ marginBottom: 5 }} span={24}>
              <Avatar size={10} style={{ backgroundColor: data[0]?.color, marginRight: 5 }} />
              {title}
            </Col>
            <Col span={24}>
              {data.map((item: any) => {
                return (
                  <Row key={item.name}>
                    <Col span={24} style={{ marginLeft: 15, marginBottom: 5 }}>
                      {'- Cantidad'}: {item?.data?.quantity}
                    </Col>
                    <Col style={{ marginLeft: 15, marginBottom: 10 }}>
                      {'- Total'}: {numeral(item?.data?.total).format('$0,0')}
                    </Col>
                  </Row>
                );
              })}
            </Col>
          </Row>
        ),
      },
      label: {
        type: 'outer',
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
    xField: 'dateFormat',
    yField: criterio === true ? 'total' : 'quantity',
    seriesField: 'categoryName',
    label: false,
    xAxis: {
      label: {
        rotate: false,
        autoHide: false,
        autoRotate: false,
        style: {
          fontSize: 9,
          fontWeight: 'bold',
        },
      },
    },
    meta: {
      total: {
        formatter: (value) => numeral(value).format('$0,0'),
      },
    },
  };

  const configBullet = {
    data: bulletData.map((item) => {
      const date = form.getFieldValue('dates');
      const obj = {
        Meta: item.goal,
        Ventas: item.netSales,
        title: date && dateSelected ? moment(date[0]).format('YYYY-MM') : 'Seleccione Fecha',
      };
      return obj;
    }),
    measureField: 'Ventas',
    rangeField: 'Meta',
    targetField: 'Meta',
    xField: 'title',
    tooltip: {
      customContent: (title: string, data: any) => (
        <Row>
          <Col style={{ marginBottom: 5 }} span={24}>
            {title}
          </Col>
          <Col span={24}>
            {data.map((item: any) => {
              return (
                <Row key={item.name}>
                  <Col style={{ marginRight: 10 }}>
                    <Avatar size={10} style={{ backgroundColor: item.color }} />
                  </Col>
                  <Col style={{ marginRight: 5 }}>{item.name}: </Col>
                  <Col style={{ marginBottom: 5 }}>{numeral(item.value).format('$0,0')}</Col>
                </Row>
              );
            })}
          </Col>
        </Row>
      ),
    },
    label: {
      measure: {
        formatter: (e: any) => numeral(e.Ventas).format('$0,0'),
      },
    },
    color: {
      range: '#f0efff',
      measure: '#ADD8E6',
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
          value: 'ventas',
          name: 'Ventas',
          marker: {
            symbol: 'square',
            style: {
              fill: '#ADD8E6',
              r: 5,
            },
          },
        },
        {
          value: 'meta',
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
    if (e === 'MONTH') {
      setPeriod(true);
    } else {
      setPeriod(false);
    }
  };

  const loadingData = () => {
    const queryParams: any = location?.query;

    const newFilters = {};

    Object.keys(queryParams).forEach((item) => {
      if (item === 'dates') {
        setDateSelected(true);
        const dataItem = JSON.parse(queryParams[item]);
        console.log(dataItem);

        newFilters[item] = [moment(dataItem[0]), moment(dataItem[1])];
      } else {
        newFilters[item] = JSON.parse(queryParams[item]);
      }
    });
    form.setFieldsValue(newFilters);
    onFinish(newFilters);
  };

  const valueShop = form.getFieldValue('shopId');
  const valueDates = form.getFieldValue('dates');

  useEffect(() => {
    if (valueShop) {
      setShopSelected(true);
    }
  }, [valueShop]);

  useEffect(() => {
    loadingData();
    const valueDate = form.getFieldValue('dates');
    if (!valueDate) {
      form.setFieldValue('dates', [moment(new Date()), moment(new Date())]);
    }
  }, []);

  useEffect(() => {
    if (valueDates) {
      setDateSelected(true);
    }
  }, [valueDates]);

  useEffect(() => {
    if (shopSelected && dateSelected) {
      onSearchGoal();
    }
  }, [shopSelected, dateSelected]);

  const dateV = form.getFieldValue('dates');
  useEffect(() => {
    console.log(dateV);
  }, [dateV]);

  const summaryData = paramsGetReportSales.data?.reportSales?.summarySalesReport;

  return (
    <PageContainer title="Admin Dashboard">
      <Card>
        <Form form={form}>
          <Row gutter={20}>
            <Col xs={24} md={3} lg={3} xl={5}>
              <FormItem label="Período" name="period">
                <Select
                  loading={paramsGetReportSales?.loading}
                  disabled={paramsGetReportSales?.loading}
                  style={{ width: '100%' }}
                  defaultValue={'Mensual'}
                  onChange={(e) => onChangePeriod(e)}
                >
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
                  <RangePicker
                    disabled={paramsGetReportSales?.loading}
                    onCalendarChange={(e, _, obj) => onChangeDateSelected(e, obj)}
                    picker="date"
                    placeholder={['Fecha Inicial', 'Fecha Final']}
                  />
                ) : (
                  <RangePicker
                    disabled={paramsGetReportSales?.loading}
                    onCalendarChange={(e, _, obj) => onChangeDateSelected(e, obj)}
                    picker="month"
                    placeholder={['Fecha Inicial', 'Fecha Final']}
                  />
                )}
              </FormItem>
            </Col>
            <Col xs={24} xl={6}>
              <FormItem label="Tiendas" name="shopId">
                <SelectShop
                  disabled={paramsGetReportSales?.loading}
                  onChange={(e) => onChangeShopSelected(e)}
                />
              </FormItem>
            </Col>
            <Col xs={24} xl={6}>
              <FormItem label="Criterio" name="criterio">
                <Select
                  loading={paramsGetReportSales?.loading}
                  disabled={paramsGetReportSales?.loading}
                  defaultValue={false}
                  onChange={(e: boolean) => onChangeCriterio(e)}
                  placeholder="Seleccione un Criterio"
                >
                  <Option key={1} value={false}>
                    Unidades Vendidas
                  </Option>
                  <Option key={2} value={true}>
                    Pesos
                  </Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Divider>Estadisticas</Divider>
        <Row gutter={[40, 40]}>
          <Col span={14}>
            <Card size="small">
              <Column loading={paramsGetReportSales?.loading} {...config} />
            </Card>
          </Col>
          <Col span={10}>
            <Row>
              <Col span={24}>
                <Card
                  size="small"
                  headStyle={{
                    border: 'none',
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                  }}
                  title="Proporción de Clientes"
                >
                  {renderPie()}
                </Card>
              </Col>
              <Col span={24}>
                <Card
                  size="small"
                  headStyle={{
                    border: 'none',
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                  }}
                  title="Proporción de Medios de Pago"
                >
                  {renderPiePayment()}
                </Card>
              </Col>
            </Row>
          </Col>
          <Col span={14}>
            {shopSelected && dateSelected ? (
              <Card>
                <Title level={4} style={{ display: 'flex', justifyContent: 'center' }}>
                  Meta vs Ventas
                </Title>
                <Bullet
                  loading={paramsGetReportSales?.loading}
                  {...configBullet}
                  style={{ width: 500, height: 100 }}
                />
              </Card>
            ) : (
              <Card>
                <Title level={4} style={{ display: 'flex', justifyContent: 'center' }}>
                  Meta vs Ventas
                </Title>
                <Text strong style={{ display: 'flex', justifyContent: 'center' }}>
                  {'(Seleccione una tienda y una fecha)'}
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
                      <Title level={5}> {numeral(summaryData?.total).format('$ 0,00')}</Title>
                    </Col>
                    <Col span={24}>
                      <Title level={5}>{numeral(summaryData?.quantity).format('0,00')}</Title>{' '}
                    </Col>
                    <Col span={24}>
                      <Title level={5}>{numeral(summaryData?.cmv).format('$ 0,00')}</Title>
                    </Col>
                    <Col span={24}>
                      <Title level={5}>
                        {!summaryData?.margin ? 0 : `${(summaryData?.margin * 100).toFixed(2)}%`}
                      </Title>
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
