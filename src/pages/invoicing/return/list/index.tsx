/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { PlusOutlined, PrinterFilled, SearchOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Col, Form, Input, Row, Space, Table, Tooltip, Typography } from 'antd';

import type { TablePaginationConfig } from 'antd';
import type {
  ColumnsType,
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
} from 'antd/es/table/interface';
import moment from 'moment';
import { useEffect, useState } from 'react';
import type { Location } from 'umi';
import { useHistory, useLocation } from 'umi';

import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';

import type {
  FiltersReturnsInvoiceInput,
  ResponseReturnsInvoice,
  ReturnInvoice,
} from '@/graphql/graphql';
import { useGetReturnsInvoice } from '@/hooks/return-invoice.hooks';
import FormReturn from '../form';

import SelectShop from '@/components/SelectShop';
import AlertInformation from '@/components/Alerts/AlertInformation';

const FormItem = Form.Item;
const { Text } = Typography;

export type FormValues = {
  number: number;
  shopId: string;
};

const ReturnList = () => {
  const [visible, setVisible] = useState(false);
  const [propsAlertInformation, setPropsAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const [form] = Form.useForm();
  const history = useHistory();
  const location: Location = useLocation();

  const [getReturns, { data, loading }] = useGetReturnsInvoice();

  const closeModal = () => {
    setVisible(false);
  };

  const messageError = (message: string) => {
    setPropsAlertInformation({
      message,
      type: 'error',
      visible: true,
    });
  };

  const closeAlertInformation = () => {
    setPropsAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  const onSearch = (values?: FiltersReturnsInvoiceInput) => {
    getReturns({
      variables: {
        input: {
          ...values,
        },
      },
    });
  };

  const onFinish = (props: FormValues, sort?: Record<string, number>, pageCurrent?: number) => {
    try {
      const params: FiltersReturnsInvoiceInput = {
        page: pageCurrent || 1,
        limit: 10,
        sort: sort || { createdAt: -1 },
      };
      onSearch(params);
      const datos = Object.keys(props)
        .reduce((a, key) => (props[key] ? `${a}&${key}=${JSON.stringify(props[key])}` : a), '')
        .slice(1);

      form.setFieldsValue(props);
      history.replace(`${location.pathname}?${datos}`);
    } catch (e: any) {
      messageError(e?.message);
    }
  };

  const handleChangeTable = (
    paginationLocal: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<ResponseReturnsInvoice> | SorterResult<ResponseReturnsInvoice>[] | any,
    _: TableCurrentDataSource<ResponseReturnsInvoice>,
  ) => {
    const { current } = paginationLocal;
    const params = form.getFieldsValue();

    let sort = {};

    if (sorter?.field) {
      sort = {
        [sorter?.field]: sorter?.order === 'ascend' ? 1 : -1,
      };
    } else {
      sort = {
        createdAt: -1,
      };
    }

    onFinish(params, sort, current);
  };

  const loadingData = () => {
    const queryParams: any = location.query;

    const newFilters = {};
    Object.keys(queryParams).forEach((item) => {
      newFilters[item] = JSON.parse(queryParams[item]);
    });
    onFinish(newFilters);
  };

  useEffect(() => {
    loadingData();
  }, []);

  const columns: ColumnsType<ReturnInvoice> = [
    {
      title: 'Número',
      dataIndex: 'number',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: 'Pedido',
      dataIndex: 'invoice',
      align: 'center',
    },
    {
      title: 'Tienda',
      dataIndex: 'shop',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: 'Valor',
      dataIndex: 'value',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: 'Fecha de creación',
      dataIndex: 'createdAt',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      render: (createdAt: Date) => moment(createdAt).format(FORMAT_DATE),
    },
    {
      title: 'Opciones',
      fixed: 'right',
      dataIndex: '_id',
      align: 'center',
      render: () => {
        return (
          <Space>
            <Tooltip title="Imprimir Devolución">
              <Button type="primary" onClick={() => {}} icon={<PrinterFilled />} />
            </Tooltip>
            <Space>
              <Tooltip title="Imprimir Cupon">
                <Button type="ghost" onClick={() => {}} icon={<PrinterFilled />} />
              </Tooltip>
            </Space>
          </Space>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <Card bordered={false}>
        <Form form={form} onFinish={onFinish}>
          <Row gutter={[15, 0]}>
            <Col xs={24} md={7} lg={6}>
              <FormItem label="Número Pedido" name="number">
                <Input />
              </FormItem>
            </Col>
            <Col xs={24} md={7} lg={6}>
              <FormItem label="Tienda" name="shopId">
                <SelectShop disabled={loading} />
              </FormItem>
            </Col>
            <Col xs={24} md={7} lg={4}>
              <FormItem>
                <Space>
                  <Button icon={<SearchOutlined />} type="primary" htmlType="submit">
                    Buscar
                  </Button>
                  <Button htmlType="reset" onClick={() => {}}>
                    Limpiar
                  </Button>
                </Space>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Row gutter={[0, 20]} align="middle">
          <Col xs={12} md={15} lg={15}>
            <Button
              onClick={() => setVisible(true)}
              icon={<PlusOutlined />}
              shape="round"
              type="primary"
            >
              Nuevo
            </Button>
          </Col>
          <Col xs={12} md={9} lg={9} style={{ textAlign: 'right' }}>
            <Space>
              <Text strong>Total Encontrados:</Text>
              <Text>{data?.returnsInvoice?.totalDocs}</Text>
              <Text strong>Pagina:</Text>
              <Text>
                {data?.returnsInvoice?.page}/ {data?.returnsInvoice?.totalPages || 0}
              </Text>
            </Space>
          </Col>
          <Col span={24}>
            <Table
              columns={columns}
              scroll={{ x: 1000 }}
              pagination={{
                current: data?.returnsInvoice?.page,
                total: data?.returnsInvoice?.totalDocs,
              }}
              dataSource={data?.returnsInvoice?.docs as any}
            />
          </Col>
        </Row>
      </Card>
      <FormReturn visible={visible} onCancel={closeModal} />
      <AlertInformation {...propsAlertInformation} onCancel={closeAlertInformation} />
    </PageContainer>
  );
};

export default ReturnList;
