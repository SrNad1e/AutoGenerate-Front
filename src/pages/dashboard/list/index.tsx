/* eslint-disable react-hooks/rules-of-hooks */
import SelectShop from '@/components/SelectShop';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Col, DatePicker, Form, Row, Select } from 'antd';
import { useEffect, useState } from 'react';
import { Column } from '@ant-design/plots';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Option } = Select;

const Dashboard = () => {
  const [data, setData] = useState<any[]>([]);
  const asyncFetch = async () => {
    await fetch(
      'https://api.nomics.com/v1/currencies/ticker?key=b347daf03513387c17154574df3f030f03e5b776&ids=BTC,ETH,XRP&sort=first_priced_at',
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  useEffect(() => {
    asyncFetch();
  }, []);

  const dataReversed = data.reverse();

  const dataTransform = dataReversed.map((crypto) => Math.round(crypto.price).toFixed(5));

  useEffect(() => {
    console.log(dataTransform);
  }, [dataTransform]);

  const config = {
    data,
    isStack: true,
    xField: 'id',
    yField: 'price',
    seriesField: 'name',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'top',
      // 'top', 'bottom', 'middle'
      // 可配置附加的布局方法
      layout: [
        // 柱形图数据标签位置自动调整
        {
          type: 'interval-adjust-position',
        }, // 数据标签防遮挡
        {
          type: 'interval-hide-overlap',
        }, // 数据标签文颜色自动调整
        {
          type: 'adjust-color',
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
        <Row>
          <Col span={12}>
            <Card>
              <Column {...config} />
            </Card>
          </Col>
        </Row>
      </Card>
    </PageContainer>
  );
};

export default Dashboard;
