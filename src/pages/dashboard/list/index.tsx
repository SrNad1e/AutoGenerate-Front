/* eslint-disable react-hooks/rules-of-hooks */
import SelectShop from '@/components/SelectShop';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Col, DatePicker, Divider, Form, Row, Select, Typography } from 'antd';
import { Column, Pie, Bullet } from '@ant-design/plots';
import numeral from 'numeral';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { Title } = Typography;

const Dashboard = () => {
  const dataBullet = [
    {
      title: 'Noviembre',
      ranges: 800000,
      Ventas: 600000,
      Meta: 800000,
    },
    {
      title: 'Diciembre',
      ranges: 1000000,
      Ventas: 800000,
      Meta: 1000000,
    },
  ];

  const data = [
    {
      id: 'XRP',
      name: 'XRiple',
      price: 100,
    },
    {
      id: 'ETH',
      name: 'Ethereum',
      price: 1872,
    },
    {
      id: 'BTC',
      name: 'Bitcoin',
      price: 23390,
    },
  ];

  const data1 = [
    {
      prename: 'XRP',
      name: 'XRiple',
      price: 100,
    },
    {
      prename: 'ETH',
      name: 'Ethereum',
      price: 1872,
    },
    {
      prename: 'BTC',
      name: 'Bitcoin',
      price: 23390,
    },
  ];

  const config = {
    data,
    isStack: true,
    xField: 'id',
    yField: 'price',
    seriesField: 'name',
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

  const configPie = {
    appendPadding: 10,
    data: data1,
    angleField: 'price',
    colorField: 'name',
    radius: 0.75,
    label: {
      type: 'spider',
      labelHeight: 30,
      content: '{percentage}',
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

  const configBullet = {
    data: dataBullet,
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

  return (
    <PageContainer title="Admin Dashboard">
      <Card>
        <Form>
          <Row gutter={20}>
            <Col xs={24} xl={6}>
              <FormItem label="Fechas">
                <RangePicker placeholder={['Fecha Inicial', 'Fecha Final']} />
              </FormItem>
            </Col>
            <Col xs={24} xl={6}>
              <FormItem label="Tiendas">
                <SelectShop disabled={false} />
              </FormItem>
            </Col>
            <Col xs={24} xl={6}>
              <FormItem label="Criterio">
                <Select placeholder="Seleccione un Criterio">
                  <Option key={1}>Unidades Vendidas</Option>
                  <Option key={2}>Pesos</Option>
                </Select>
              </FormItem>
            </Col>
            <Col xs={24} xl={6}>
              <FormItem label="Categorias">
                <Select placeholder="Seleccione una Categoria">
                  <Option key={1}>Brasieres</Option>
                  <Option key={2}>Panties</Option>
                </Select>
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
                <Card size="small">
                  <Pie {...configPie} style={{ height: 187 }} />
                </Card>
              </Col>
              <Col span={24}>
                <Card size="small">
                  <Pie {...configPie} style={{ height: 187 }} />
                </Card>
              </Col>
            </Row>
          </Col>
          <Col span={14}>
            <Card>
              <Title level={4} style={{ display: 'flex', justifyContent: 'center' }}>
                Meta vs Ventas
              </Title>
              <Bullet {...configBullet} style={{ width: 500, height: 100 }} />
            </Card>
          </Col>
          <Col offset={1} span={8}>
            <Card bordered={false}>
              <Row>
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
                      <Title level={5}>{numeral(340000000).format('$ 0,00')}</Title>
                    </Col>
                    <Col span={24}>
                      <Title level={5}>{numeral(230000000).format('$ 0,00')}</Title>{' '}
                    </Col>
                    <Col span={24}>
                      <Title level={5}>{numeral(110000000).format('$ 0,00')}</Title>
                    </Col>
                    <Col span={24}>
                      <Title level={5}>{'44%'}</Title>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Card>
    </PageContainer>
  );
};

export default Dashboard;
