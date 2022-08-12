/* eslint-disable react-hooks/exhaustive-deps */
import {
  CalendarOutlined,
  ClearOutlined,
  EditOutlined,
  GlobalOutlined,
  MoreOutlined,
  PlusOutlined,
  ScheduleOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Col, Form, Input, Row, Space, Table, Tooltip, Typography } from 'antd';
import type { TablePaginationConfig } from 'antd';
import type { SorterResult } from 'antd/es/table/interface';
import type { ColumnsType } from 'antd/lib/table';
import { useEffect, useState } from 'react';
import { useAccess, useHistory, useLocation } from 'umi';
import type { Location } from 'umi';
import moment from 'moment';
import type { City, Country, FiltersCitiesInput, FiltersUsersInput, User } from '@/graphql/graphql';
import { useGetCities } from '@/hooks/cities.hooks';

import AlertInformation from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import CitiesForm from '../form';

import styles from '../styles';

const FormItem = Form.Item;
const { Text } = Typography;

type FormValues = {
  name?: string;
  country?: string;
  state?: string;
};

const CitiesList = () => {
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [visibleForm, setVisibleForm] = useState(false);
  const [cityData, setCityData] = useState({});

  const location: Location = useLocation();

  const [form] = Form.useForm();
  const history = useHistory();

  const [getCities, { data, loading }] = useGetCities();

  const {
    city: { canCreate, canEdit },
  } = useAccess();

  /**
   * @description Cierra el modal y resetea el estado de la datacity
   */
  const closeForm = () => {
    setVisibleForm(false);
    setCityData({});
  };

  /**
   *  @description abre el modal y setea la data de la city
   * @param city ciudad
   */
  const openForm = (city?: City) => {
    setCityData(city || {});
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
   * @description se encarga de ejecutar la funcion para obtener las ciudades
   * @param filters filtros necesarios para la busqueda
   */
  const onSearch = (filters?: FiltersCitiesInput) => {
    try {
      getCities({
        variables: {
          input: {
            limit: 10,
            ...filters,
          },
        },
      });
    } catch (error: any) {
      showError(error?.message);
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
   * @description se encarga de señalar los datos a la query
   * @param values valores para enviar a la query
   */
  const setQueryParams = (values?: FiltersCitiesInput) => {
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
    const params: FiltersUsersInput = {
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
   */
  const handleChangeTable = (
    paginationLocal: TablePaginationConfig,
    _: Record<string, any>,
    sorter: SorterResult<Partial<User>> | any,
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

  const column: ColumnsType<City> = [
    {
      title: <Text>{<ScheduleOutlined />} Nombre</Text>,
      dataIndex: 'name',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: <Text>{<GlobalOutlined />} Pais</Text>,
      dataIndex: 'country',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      render: (country: Country) => country?.name,
    },
    {
      title: <Text>{<ScheduleOutlined />} Departamento</Text>,
      dataIndex: 'state',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
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
      render: (_, cityId) => (
        <Tooltip title="Editar" placement="topLeft">
          <Button
            disabled={!canEdit}
            loading={loading}
            onClick={() => openForm(cityId)}
            type="primary"
            icon={<EditOutlined />}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <PageContainer>
      <Card>
        <Form form={form} onFinish={onFinish}>
          <Row gutter={[30, 0]}>
            <Col xs={24} md={8} lg={5} xl={6}>
              <FormItem label="Nombre" name="name">
                <Input placeholder="Nombre de la ciudad" disabled={loading} />
              </FormItem>
            </Col>
            <Col xs={24} md={8} lg={5} xl={5}>
              <FormItem label="Pais" name="country">
                <Input placeholder="Nombre del pais" disabled={loading} />
              </FormItem>
            </Col>
            <Col xs={24} md={8} lg={6} xl={7}>
              <FormItem label="Estado" name="state">
                <Input placeholder="Nombre del departamento" disabled={loading} />
              </FormItem>
            </Col>
            <Col xs={24} md={8} lg={4} xl={4}>
              <FormItem label=" " colon={false}>
                <Space>
                  <Button
                    style={styles.buttonR}
                    icon={<SearchOutlined />}
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                  >
                    Buscar
                  </Button>
                  <Button
                    style={styles.buttonR}
                    icon={<ClearOutlined />}
                    htmlType="reset"
                    loading={loading}
                    onClick={() => onClear()}
                  >
                    Limpiar
                  </Button>
                </Space>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={[0, 20]} align="middle" style={styles.marginFilter}>
            <Col xs={6} md={15} lg={14}>
              <Button
                disabled={!canCreate}
                loading={loading}
                icon={<PlusOutlined />}
                type="primary"
                shape="round"
                onClick={() => openForm()}
              >
                Nuevo
              </Button>
            </Col>
            <Col xs={24} md={9} lg={10} style={styles.alignText}>
              <Text strong>Total Encontrados:</Text> {data?.cities?.totalDocs}{' '}
              <Text strong>Páginas: </Text> {data?.cities?.page} / {data?.cities?.totalPages || 0}
            </Col>
            <Col span={24}>
              <Table
                onChange={handleChangeTable}
                columns={column}
                loading={loading}
                dataSource={data?.cities.docs}
                scroll={{ x: 'auto' }}
                pagination={{
                  current: data?.cities?.page,
                  total: data?.cities?.totalDocs,
                  showSizeChanger: false,
                }}
              />
            </Col>
          </Row>
        </Form>
      </Card>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
      <CitiesForm visible={visibleForm} onCancel={closeForm} cityData={cityData} />
    </PageContainer>
  );
};

export default CitiesList;
