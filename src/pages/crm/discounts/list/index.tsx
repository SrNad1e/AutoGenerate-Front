/* eslint-disable react-hooks/exhaustive-deps */
import {
  CalendarOutlined,
  ClearOutlined,
  DollarOutlined,
  EditFilled,
  FieldNumberOutlined,
  MoreOutlined,
  PercentageOutlined,
  PlusOutlined,
  ProfileOutlined,
  ScheduleOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import type { SorterResult } from 'antd/lib/table/interface';
import type { DiscountRule, FiltersDiscountRulesInput, Rule } from '@/graphql/graphql';
import { Permissions } from '@/graphql/graphql';
import { useEffect, useState } from 'react';
import { useAccess, useModel } from 'umi';
import type { Location } from 'umi';
import { useLocation, history } from 'umi';
import moment from 'moment';
import numeral from 'numeral';
import { useGetDiscountsRules } from '@/hooks/discount.hooks';

import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
import Filters from '@/components/Filters';
import DiscountForm from '../form';

import styles from '../styles';

const FormItem = Form.Item;
const { Text } = Typography;

type FormValues = {
  name?: string;
  percent?: number;
  value?: number;
  active?: boolean;
};

const DiscountList = () => {
  const [visibleForm, setVisibleForm] = useState(false);
  const [filterTable, setFilterTable] = useState<Record<string, any | null>>({});
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [discountData, setDiscountData] = useState<Partial<DiscountRule>>({});

  const [form] = Form.useForm();
  const location: Location = useLocation();

  const {
    discount: { canCreate, canEdit },
  } = useAccess();

  const [getDiscountRules, paramsGetDiscountRules] = useGetDiscountsRules();

  const { initialState } = useModel('@@initialState');
  const canQueryDiscounts = initialState?.currentUser?.role.permissions.find(
    (permission) => permission.action === Permissions.ReadCrmDiscountrules,
  );

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
   * Cierra el modal
   */
  const closeEditModal = () => {
    setDiscountData({});
    setVisibleForm(false);
  };

  /**
   * @description abre el modal de edicion y setea el discount
   * @param discount datos del cliente
   */
  const openModal = (discount?: Partial<DiscountRule>) => {
    setDiscountData(discount || {});
    setVisibleForm(true);
  };

  /**
   * @description ejecuta la consulta para obtener los descuentos
   * @param filters filtros para realizar la consulta
   */
  const onSearch = (filters?: FiltersDiscountRulesInput) => {
    try {
      getDiscountRules({
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
   * @description se encarga de señalar los datos a la query
   * @param values valores para enviar a la query
   */
  const setQueryParams = (values?: FiltersDiscountRulesInput) => {
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
    const filters = { ...filterTable };

    Object.keys(filters).forEach((i) => {
      if (filters[i] === null) {
        delete filters[i];
      } else {
        filters[i] = filters[i][0];
      }
    });

    const params: FiltersDiscountRulesInput = {
      page: pageCurrent || 1,
      limit: 10,
      ...value,
    };

    onSearch({ ...params, ...filters });
    setQueryParams({ ...value, ...filters });
  };

  /**
   * @description se encarga de manejar eventos de tabla
   * @param paginationLocal eventos de la páginacion
   * @param sorter ordenamiento de la tabla
   * @param filterArg filtros de la tabla
   */
  const handleChangeTable = (
    paginationLocal: TablePaginationConfig,
    filterArg: Record<string, any>,
    sorter: SorterResult<Partial<DiscountRule>> | any,
  ) => {
    const { current } = paginationLocal;
    const prop = form.getFieldsValue();

    const filters = { ...filterArg };

    Object.keys(filters).forEach((i) => {
      if (filters[i] === null) {
        delete filters[i];
      } else {
        filters[i] = filters[i][0];
      }
    });

    let sort = {};

    if (sorter.field) {
      if (['ascend', 'descend'].includes(sorter?.order || '')) {
        sort = {
          [sorter.field]: sorter.order === 'ascend' ? 1 : -1,
        };
      }
    }
    setQueryParams(filters);
    onSearch({ ...prop, sort, page: current, ...filters });
    setFilterTable(filterArg);
  };

  /**
   * @description se encarga de limpiar los estados e inicializarlos
   */
  const onClear = () => {
    history.replace(location.pathname);
    form.resetFields();
    onSearch({});
    setFilterTable({});
  };

  /**
   * @description se encarga de cargar los datos con base a la query
   */
  const loadingData = () => {
    const queryParams: any = location?.query;

    const params = {};

    Object.keys(queryParams).forEach((item) => {
      if (item === 'active') {
        params[item] = ['true', true].includes(JSON.parse(queryParams[item]));
      } else {
        params[item] = JSON.parse(queryParams[item]);
      }
    });
    form.setFieldsValue(params);
    onFinish(params);
  };

  useEffect(() => {
    loadingData();
  }, []);

  useEffect(() => {
    if (!canQueryDiscounts) {
      showError('No tiene permisos para consultar los descuentos');
    }
  }, [canQueryDiscounts]);

  const column: ColumnsType<DiscountRule> = [
    {
      title: (
        <Text>
          <ProfileOutlined /> Nombre
        </Text>
      ),
      dataIndex: 'name',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      render: (name: string) => <>{name}</>,
    },
    {
      title: (
        <Text>
          <DollarOutlined /> Valor
        </Text>
      ),
      dataIndex: 'value',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      render: (value: number) => <> {numeral(value).format('$ 0,0')} </>,
    },
    {
      title: (
        <Text>
          <PercentageOutlined /> Porcentaje
        </Text>
      ),
      dataIndex: 'percent',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      render: (percent: number) => <> {percent + '%'} </>,
    },
    {
      title: (
        <Text>
          <FieldNumberOutlined /> Reglas
        </Text>
      ),
      dataIndex: 'rules',
      align: 'center',
      render: (rules: Rule[]) => <>{rules?.length}</>,
    },
    {
      title: 'Activo',
      dataIndex: 'active',
      render: (active: boolean) => {
        return <Badge status={active ? 'success' : 'default'} text={active ? 'Si' : 'No'} />;
      },
      filterMultiple: false,
      align: 'center',
      filteredValue: filterTable?.active || null,
      filterDropdown: (props) => (
        <Filters
          props={props}
          data={[
            {
              text: 'Si',
              value: true,
            },
            {
              text: 'No',
              value: false,
            },
          ]}
        />
      ),
    },
    {
      title: (
        <Text>
          <ScheduleOutlined /> Fecha Inicial
        </Text>
      ),
      dataIndex: 'dateInitial',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      render: (updatedAt: Date) => moment(updatedAt).format(FORMAT_DATE),
    },
    {
      title: (
        <Text>
          <ScheduleOutlined /> Fecha Final
        </Text>
      ),
      dataIndex: 'dateFinal',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      render: (updatedAt: Date) => moment(updatedAt).format(FORMAT_DATE),
    },
    {
      title: (
        <Text>
          <CalendarOutlined /> Actualización
        </Text>
      ),
      dataIndex: 'updatedAt',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      render: (updatedAt: Date) => moment(updatedAt).format(FORMAT_DATE),
    },
    {
      title: (
        <Text>
          <MoreOutlined /> Opción
        </Text>
      ),
      dataIndex: '_id',
      align: 'center',
      fixed: 'right',
      render: (_, discount) => {
        return (
          <Tooltip title="Editar">
            <Button
              onClick={() => openModal(discount)}
              type="primary"
              disabled={!canEdit}
              loading={paramsGetDiscountRules.loading}
              icon={<EditFilled />}
            />
          </Tooltip>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <Card>
        <Form form={form} onFinish={onFinish}>
          <Row gutter={30}>
            <Col xs={24} md={5} lg={6} xl={6}>
              <FormItem label="Nombre" name="name">
                <Input
                  disabled={paramsGetDiscountRules.loading}
                  placeholder="Nombre del descuento"
                />
              </FormItem>
            </Col>
            <Col xs={24} md={6} lg={5} xl={5}>
              <FormItem label="Porcentaje" name="percent">
                <InputNumber
                  disabled={paramsGetDiscountRules.loading}
                  style={styles.maxWidth}
                  controls={false}
                  formatter={(value) => `% ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value: any) => value.replace(/\%\s?|(,*)/g, '')}
                />
              </FormItem>
            </Col>
            <Col xs={24} md={5} lg={5} xl={5}>
              <FormItem label="Valor" name="value">
                <InputNumber
                  disabled={paramsGetDiscountRules.loading}
                  style={styles.maxWidth}
                  controls={false}
                  formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
                />
              </FormItem>
            </Col>
            <Col xs={24} md={3} lg={4} xl={4}>
              <Space>
                <Button
                  style={styles.buttonR}
                  loading={paramsGetDiscountRules?.loading}
                  icon={<SearchOutlined />}
                  type="primary"
                  htmlType="submit"
                >
                  Buscar
                </Button>
                <Button
                  style={styles.buttonR}
                  loading={paramsGetDiscountRules?.loading}
                  icon={<ClearOutlined />}
                  onClick={onClear}
                >
                  Limpiar
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
        <Row gutter={[0, 15]} align="middle" style={styles.marginFilter}>
          <Col xs={12} md={15} lg={16}>
            <Button
              icon={<PlusOutlined />}
              type="primary"
              disabled={!canCreate}
              loading={paramsGetDiscountRules.loading}
              shape="round"
              onClick={() => openModal()}
            >
              Nuevo
            </Button>
          </Col>
          <Col xs={12} md={9} lg={8} style={styles.alignRight}>
            <Text strong>Total Encontrados:</Text>{' '}
            {paramsGetDiscountRules?.data?.discountRules?.totalDocs || 0}{' '}
            <Text strong>Páginas: </Text> {paramsGetDiscountRules?.data?.discountRules?.page || 0} /{' '}
            {paramsGetDiscountRules.data?.discountRules?.totalPages || 0}
          </Col>
          <Col span={24}>
            <Table
              onChange={handleChangeTable}
              loading={paramsGetDiscountRules.loading}
              columns={column}
              dataSource={paramsGetDiscountRules?.data?.discountRules?.docs}
              scroll={{ x: 1300 }}
              pagination={{
                current: paramsGetDiscountRules?.data?.discountRules?.page,
                total: paramsGetDiscountRules?.data?.discountRules?.totalDocs,
                showSizeChanger: false,
              }}
            />
          </Col>
        </Row>
      </Card>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
      <DiscountForm visible={visibleForm} onCancel={closeEditModal} discountData={discountData} />
    </PageContainer>
  );
};

export default DiscountList;
