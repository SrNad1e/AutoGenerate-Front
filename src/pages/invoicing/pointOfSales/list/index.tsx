/* eslint-disable react-hooks/exhaustive-deps */
import type { FiltersPointOfSalesInput, PointOfSale } from '@/graphql/graphql';
import {
  CalendarOutlined,
  ClearOutlined,
  EditOutlined,
  GroupOutlined,
  MoreOutlined,
  PlusOutlined,
  ProfileOutlined,
  SearchOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Col, Form, Input, Row, Space, Tooltip, Typography } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import Table from 'antd/lib/table';
import AlertInformation from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import moment from 'moment';
import { useEffect, useState } from 'react';
import styles from '../styles';
import type { Location } from 'umi';
import { useAccess } from 'umi';
import { useLocation, history } from 'umi';
import { useGetPointOfSales } from '@/hooks/pointOfSale.hooks';
import type { SorterResult } from 'antd/lib/table/interface';
import SelectShop from '@/components/SelectShop';
import PointOfSalesForm from '../form';

const FormItem = Form.Item;
const { Text } = Typography;

type FormValues = {
  name?: string;
  shopId?: string;
};

const PointOfSalesList = () => {
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [visibleForm, setVisibleForm] = useState(false);
  const [pointOfSale, setPointOfSale] = useState<Partial<PointOfSale>>({});

  const [form] = Form.useForm();
  const location: Location = useLocation();

  const {
    pointOfSales: { canCreate, canEdit },
  } = useAccess();

  const [getPointsOfSales, paramsGetPointsOfSales] = useGetPointOfSales();

  /**
   * @description cierra el modal y reinicia el estado del punto de venta
   */
  const onCloseModal = () => {
    setVisibleForm(false);
    setPointOfSale({});
  };

  /**
   * @description abre el formulario y setea la data del punto de venta
   * @param pointOfSaleId compañia
   */
  const onOpenModal = (pointOfSaleId?: PointOfSale) => {
    setPointOfSale(pointOfSaleId || {});
    setVisibleForm(true);
  };

  /**
   * @description funcion usada para mostrar los errores
   * @param message mensaje de error a mostrar
   */
  const showError = (message: string) => {
    setAlertInformation({
      message,
      type: 'error',
      visible: true,
    });
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
   * @description ejecuta la consulta para obtener los puntos de venta
   * @param filters filtros para realizar la consulta
   */
  const onSearch = (filters?: FiltersPointOfSalesInput) => {
    getPointsOfSales({
      variables: {
        input: {
          limit: 10,
          ...filters,
        },
      },
    });
  };

  /**
   * @description se encarga de señalar los datos a la query
   * @param values valores para enviar a la query
   */
  const setQueryParams = (values?: FiltersPointOfSalesInput) => {
    try {
      const valuesForm = form.getFieldsValue();

      const valuesNew = {
        ...values,
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
      showError(error?.message);
    }
  };

  /**
   * @description esta funcion evalua los paramametros del formulario y ejecuta la busqueda
   * @param value valores del formulario
   */
  const onFinish = (value: FormValues, pageCurrent?: number) => {
    const params: FiltersPointOfSalesInput = {
      page: pageCurrent || 1,
      limit: 10,
      ...value,
    };

    onSearch({ ...params });
    setQueryParams({ ...value });
  };

  /**
   * @description se encarga de manejar eventos de tabla
   * @param paginationLocal eventos de la páginacion
   * @param sorter ordenamiento de la tabla
   * @param filterArg filtros de la tabla
   */
  const handleChangeTable = (
    paginationLocal: TablePaginationConfig,
    _: Record<string, any>,
    sorter: SorterResult<Partial<PointOfSale>> | any,
  ) => {
    const { current } = paginationLocal;
    const prop = form.getFieldsValue();

    let sort = {};

    if (sorter.field) {
      if (['ascend', 'descend'].includes(sorter?.order || '')) {
        sort = {
          [sorter.field]: sorter.order === 'ascend' ? 1 : -1,
        };
      }
    }
    onSearch({ ...prop, sort, page: current });
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

    const params = {};

    Object.keys(queryParams).forEach((item) => {
      params[item] = JSON.parse(queryParams[item]);
    });
    form.setFieldsValue(params);
    onFinish(params);
  };

  useEffect(() => {
    loadingData();
  }, []);

  const column: ColumnsType<PointOfSale> = [
    {
      title: <>{<ProfileOutlined />} Nombre</>,
      dataIndex: 'name',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: <Text>{<ShopOutlined />} Tienda</Text>,
      dataIndex: 'phone',
      align: 'center',
    },
    {
      title: <Text>{<GroupOutlined />} Caja</Text>,
      dataIndex: 'address',
      align: 'center',
    },
    {
      title: <Text>{<CalendarOutlined />} Fecha de Cierre</Text>,
      dataIndex: 'updatedAt',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      render: (updatedAt: string) => moment(updatedAt).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: <Text>{<CalendarOutlined />} Fecha</Text>,
      dataIndex: 'updatedAt',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      render: (updatedAt: string) => moment(updatedAt).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: <Text>{<MoreOutlined />} Opciones</Text>,
      fixed: 'right',
      dataIndex: '_id',
      align: 'center',
      render: (_, pointOfSaleId: PointOfSale) => (
        <Tooltip title="Editar">
          <Button
            disabled={paramsGetPointsOfSales?.loading || !canEdit}
            type="primary"
            color="secondary"
            icon={<EditOutlined />}
            onClick={() => onOpenModal(pointOfSaleId)}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <PageContainer>
      <Card>
        <Form form={form} onFinish={onFinish}>
          <Row gutter={30}>
            <Col xs={24} md={8} lg={8} xl={7}>
              <FormItem label="Nombre" name="name">
                <Input
                  placeholder="Nombre del punto de venta"
                  disabled={paramsGetPointsOfSales?.loading}
                />
              </FormItem>
            </Col>
            <Col xs={24} md={8} lg={8} xl={7}>
              <FormItem label="Tienda" name="shopId">
                <SelectShop disabled={paramsGetPointsOfSales?.loading} />
              </FormItem>
            </Col>
            <Col xs={24} md={6} lg={6} xl={6}>
              <FormItem>
                <Space>
                  <Button
                    disabled={paramsGetPointsOfSales?.loading}
                    type="primary"
                    htmlType="submit"
                    style={styles.buttonR}
                    icon={<SearchOutlined />}
                  >
                    Buscar
                  </Button>
                  <Button
                    disabled={paramsGetPointsOfSales?.loading}
                    htmlType="reset"
                    onClick={onClear}
                    icon={<ClearOutlined />}
                    style={styles.buttonR}
                  >
                    Limpiar
                  </Button>
                </Space>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Row gutter={[0, 15]} align="middle" style={styles.marginFIlters}>
          <Col span={8}>
            <Button
              disabled={paramsGetPointsOfSales?.loading || !canCreate}
              icon={<PlusOutlined />}
              type="primary"
              shape="round"
              onClick={() => onOpenModal()}
            >
              Nuevo
            </Button>
          </Col>
          <Col span={16} style={styles.alignText}>
            <Text strong>Total Encontrados: </Text>{' '}
            {paramsGetPointsOfSales?.data?.pointOfSales?.totalDocs} <Text strong>Páginas: </Text>{' '}
            {paramsGetPointsOfSales?.data?.pointOfSales?.page} /{' '}
            {paramsGetPointsOfSales?.data?.pointOfSales?.totalPages || 0}
          </Col>
          <Col span={24}>
            <Table
              onChange={handleChangeTable}
              columns={column}
              dataSource={paramsGetPointsOfSales?.data?.pointOfSales?.docs}
              scroll={{ x: 'auto' }}
              pagination={{
                current: paramsGetPointsOfSales?.data?.pointOfSales?.page,
                total: paramsGetPointsOfSales?.data?.pointOfSales?.totalDocs,
              }}
            />
          </Col>
        </Row>
      </Card>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
      <PointOfSalesForm onCancel={onCloseModal} pointOfSale={pointOfSale} visible={visibleForm} />
    </PageContainer>
  );
};

export default PointOfSalesList;
