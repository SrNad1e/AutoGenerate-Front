/* eslint-disable react-hooks/exhaustive-deps */
import {
  ClearOutlined,
  DollarOutlined,
  EditOutlined,
  HistoryOutlined,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Col, Form, Row, Space, Table, Tooltip, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table/interface';
import type { FilterValue } from 'antd/lib/table/interface';
import { useEffect, useState } from 'react';
import type { FiltersShopsInput, Shop } from '@/graphql/graphql';
import { useHistory, useLocation } from 'umi';
import type { Location } from 'umi';

import AlertInformation from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';

import SelectShop from '@/components/SelectShop';
import GoalHistoryCreate from '../form';
import numeral from 'numeral';
import GoalUpdate from '../components/UpdateGoal';
import { useGetShops } from '@/hooks/shop.hooks';
import HistoryGoal from '../components/HistoryGoal';

const FormItem = Form.Item;
const { Text } = Typography;

type FormValues = {
  shopId?: string;
};

const GoalHistoryList = () => {
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [visibleCreate, setVisiblCreate] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [goalData, setGoalData] = useState({});
  const [visiblleHistory, setVisibleHistory] = useState(false);
  const [shopHistory, setShopHistory] = useState({});

  const [getShops, paramsGetShops] = useGetShops();

  const [form] = Form.useForm();
  const history = useHistory();
  const location: Location = useLocation();

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

  const onOpenUpdate = (data: Shop) => {
    setGoalData(data);
    setVisibleUpdate(true);
  };
  const onOpenHistory = (data: Shop) => {
    setShopHistory(data);
    setVisibleHistory(true);
  };

  /**
   * @description se encarga de ejecutar la funcion para obtener los pedidos
   * @param values filtros necesarios para la busqueda
   */
  const onSearch = (values?: FiltersShopsInput) => {
    try {
      getShops({
        variables: {
          input: {
            sort: {
              name: -1,
            },
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
   * @description se encarga de setear los filtros en la url
   * @param valuesQuery filtros para setear en la url
   */
  const setQueryParams = (valuesQuery?: FiltersShopsInput | any) => {
    try {
      const valuesForm = form.getFieldsValue();

      const valuesNew = {
        ...valuesQuery,
        ...valuesForm,
      };

      const datos = Object.keys(valuesNew)
        .reduce(
          (a, key) =>
            valuesNew[key] !== undefined ? `${a}&${key}=${JSON.stringify(valuesNew[key])}` : a,
          '',
        )
        .slice(1);

      history.replace(`${location.pathname}?${datos}`);
    } catch (error: any) {
      messageError(error?.message);
    }
  };

  /**
   * @description esta funcion evalua los paramametros del formulario y ejecuta la busqueda
   * @param value valores del formulario
   */
  const onFinish = (value?: FormValues | any) => {
    const params: any = {
      ...value,
    };

    onSearch({ ...params });
    setQueryParams({ ...value });
  };

  /**
   * @description se encarga de manejar eventos de tabla
   * @param paginationLocal eventos de la páginacion
   * @param sorter ordenamiento de la tabla
   * @param filtersArg filtros de la tabla
   */
  const handleChangeTable = (filtersArg: Record<string, FilterValue | any>) => {
    const filters = { ...filtersArg };

    Object.keys(filters).forEach((i) => {
      if (filters[i] === null) {
        delete filters[i];
      } else {
        filters[i] = filters[i][0];
      }
    });
    setQueryParams(filters);
  };

  /**
   * @description se encarga de limpiar los estados e inicializarlos
   */
  const onClear = () => {
    history.replace(location.pathname);
    form.resetFields();
    onSearch({});
  };

  /**
   * @description se encarga de cargar los datos con base a la query
   */
  const loadingData = () => {
    const queryParams: any = location?.query;

    const newFilters = {};

    Object.keys(queryParams).forEach((item) => {
      newFilters[item] = JSON.parse(queryParams[item]);
    });
    form.setFieldsValue(newFilters);
    onFinish(newFilters);
  };

  useEffect(() => {
    loadingData();
  }, []);

  const columns: ColumnsType<Shop> = [
    {
      title: (
        <Text>
          <ShopOutlined /> Tienda
        </Text>
      ),
      dataIndex: 'name',
      align: 'center',
      render: (name: string) => <>{name}</>,
    },
    {
      title: (
        <Text>
          <DollarOutlined /> Meta Actual
        </Text>
      ),
      dataIndex: 'goal',
      align: 'center',
      render: (goal: number) => <>{numeral(goal).format('$ 0,0')}</>,
    },
    {
      title: (
        <Text>
          <MoreOutlined /> Opciones
        </Text>
      ),
      fixed: 'right',
      dataIndex: '_id',
      align: 'center',
      render: (_, record: Shop) => {
        return (
          <Space>
            <Tooltip title="Editar Meta">
              <Button
                type="primary"
                ghost
                onClick={() => onOpenUpdate(record)}
                icon={<EditOutlined />}
                disabled={paramsGetShops?.loading}
                loading={paramsGetShops?.loading}
              />
            </Tooltip>
            <Tooltip title="Historial de Metas">
              <Button
                type="primary"
                onClick={() => onOpenHistory(record)}
                icon={<HistoryOutlined />}
                disabled={paramsGetShops?.loading}
                loading={paramsGetShops?.loading}
              />
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <Card>
        <Form form={form} onFinish={onFinish}>
          <Row gutter={[20, 15]} align="middle">
            <Col xs={24} md={8} lg={8} xl={6}>
              <FormItem label="Tienda" name="_id">
                <SelectShop disabled={paramsGetShops?.loading} />
              </FormItem>
            </Col>
            <Col xs={24} md={7} lg={6} xl={6}>
              <FormItem>
                <Space>
                  <Button
                    icon={<SearchOutlined />}
                    type="primary"
                    htmlType="submit"
                    loading={paramsGetShops?.loading}
                    style={{ borderRadius: 5 }}
                  >
                    Buscar
                  </Button>
                  <Button
                    htmlType="reset"
                    onClick={onClear}
                    style={{ borderRadius: 5 }}
                    loading={paramsGetShops?.loading}
                    icon={<ClearOutlined />}
                  >
                    Limpiar
                  </Button>
                </Space>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={[0, 15]} style={{ marginTop: 20 }} align="middle">
            <Col span={12}>
              <Button
                onClick={() => setVisiblCreate(true)}
                type="primary"
                shape="round"
                icon={<PlusOutlined />}
              >
                Nuevo
              </Button>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Space>
                <Text strong>Total Encontrados:</Text>
                <Text>{paramsGetShops?.data?.shops?.totalDocs || 0}</Text>
              </Space>
            </Col>
            <Col span={24}>
              <Table
                onChange={handleChangeTable}
                loading={paramsGetShops?.loading}
                columns={columns}
                scroll={{ x: 1000 }}
                dataSource={paramsGetShops?.data?.shops?.docs}
              />
            </Col>
          </Row>
        </Form>
      </Card>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
      <GoalHistoryCreate visible={visibleCreate} onCancel={() => setVisiblCreate(false)} />
      <GoalUpdate
        onCancel={() => setVisibleUpdate(false)}
        visible={visibleUpdate}
        data={goalData}
      />
      <HistoryGoal
        data={shopHistory}
        onCancel={() => setVisibleHistory(false)}
        visible={visiblleHistory}
      />
    </PageContainer>
  );
};

export default GoalHistoryList;
