/* eslint-disable react-hooks/exhaustive-deps */
import {
  CalendarOutlined,
  ClearOutlined,
  EditOutlined,
  FieldNumberOutlined,
  FileDoneOutlined,
  FileProtectOutlined,
  MailOutlined,
  MoreOutlined,
  PhoneOutlined,
  PlusOutlined,
  ReconciliationOutlined,
  SearchOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import type { TablePaginationConfig } from 'antd';
import { Button, Card, Col, Form, Input, Row, Space, Table, Tag, Tooltip, Typography } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import type { ColumnsType, SorterResult } from 'antd/lib/table/interface';
import moment from 'moment';
import { useEffect, useState } from 'react';
import type { AuthorizationDian, FiltersAuthorizationInput, Shop } from '@/graphql/graphql';
import { Permissions } from '@/graphql/graphql';
import type { Location } from 'umi';
import { useModel } from 'umi';
import { useAccess } from 'umi';
import { useLocation, history } from 'umi';
import { useGetAuthorizations } from '@/hooks/authorization.hooks';

import AlertInformation from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AuthorizationDianForm from '../form';

import styles from '../styles';

const FormItem = Form.Item;
const { Text } = Typography;

type FormValues = {
  prefix?: string;
};

const AuthorizationDianList = () => {
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [visibleForm, setVisibleForm] = useState(false);
  const [authorization, setAuthorization] = useState<Partial<AuthorizationDian>>({});

  const [form] = Form.useForm();
  const location: Location = useLocation();

  const {
    authorization: { canCreate, canEdit },
  } = useAccess();

  const [getAuthorizations, paramsGetAuthorizations] = useGetAuthorizations();

  const { initialState } = useModel('@@initialState');
  const canQueryAuthorizations = initialState?.currentUser?.role.permissions.find(
    (permission) => permission.action === Permissions.ReadInvoicingAuthorizations,
  );

  /**
   * @description cierra el modal y reinicia el estado de la autorizacion
   */
  const onCloseModal = () => {
    setVisibleForm(false);
    setAuthorization({});
  };

  /**
   * @description abre el formulario y setea la data de la autorizacion
   * @param authorizationId compañia
   */
  const onOpenModal = (authorizationId?: AuthorizationDian) => {
    setAuthorization(authorizationId || {});
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
   * @description ejecuta la consulta para obtener las autorizaciones
   * @param filters filtros para realizar la consulta
   */
  const onSearch = (filters?: FiltersAuthorizationInput) => {
    try {
      getAuthorizations({
        variables: {
          input: {
            limit: 10,
            sort: {
              prefix: 1,
            },
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
  const setQueryParams = (values?: FiltersAuthorizationInput) => {
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
    const params: FiltersAuthorizationInput = {
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
    sorter: SorterResult<Partial<AuthorizationDian>> | any,
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

  useEffect(() => {
    if (!canQueryAuthorizations) {
      showError('No tiene permisos para consultar las autorizaciones');
    }
  }, [canQueryAuthorizations]);

  const column: ColumnsType<AuthorizationDian> = [
    {
      title: <Text>{<FileProtectOutlined />} Prefijo</Text>,
      dataIndex: 'prefix',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      render: (prefix: string) => <Tag style={styles.tagStyle}>{prefix}</Tag>,
    },
    {
      title: <Text>{<ShopOutlined />} Tienda</Text>,
      dataIndex: 'shop',
      align: 'left',
      sorter: false,
      showSorterTooltip: false,
      render: (shop: Shop) => (
        <Space direction="vertical">
          <Text>{shop?.name}</Text>
          <Tag>
            {<PhoneOutlined />} {shop?.phone || '(No Registra)'}
          </Tag>
        </Space>
      ),
    },
    {
      title: <Text>{<MailOutlined />} Compañía</Text>,
      dataIndex: 'shop',
      align: 'left',
      sorter: false,
      showSorterTooltip: false,
      width: 200,
      render: (shop: Shop) => (
        <Space direction="vertical">
          <Row>
            <Col span={24}>
              <Text>{shop?.companyName || '(No Registra)'}</Text>
            </Col>
            <Col span={24}>
              <Text>
                {<FileDoneOutlined />} {shop?.document || '(No Registra)'}
              </Text>
            </Col>
            <Col span={8}>
              <Tag>
                {<MailOutlined />} {shop?.email || '(No Registra)'}
              </Tag>
            </Col>
          </Row>
        </Space>
      ),
    },
    {
      title: <Text>{<ReconciliationOutlined />} Resolution</Text>,
      dataIndex: 'resolution',
      align: 'center',
      sorter: false,
      showSorterTooltip: false,
      render: (resolution: string) => resolution || '(No Registra)',
    },
    {
      title: <Text>{<FieldNumberOutlined />} Inicial</Text>,
      dataIndex: 'numberInitial',
      align: 'center',
      sorter: false,
      showSorterTooltip: false,
      render: (numberInitial: number) => numberInitial || '(No Registra)',
    },
    {
      title: <Text>{<FieldNumberOutlined />} Final</Text>,
      dataIndex: 'numberFinal',
      align: 'center',
      sorter: false,
      showSorterTooltip: false,
      render: (numberFinal: number) => numberFinal || '(No Registra)',
    },
    {
      title: <Text>{<CalendarOutlined />} Fecha Inicial</Text>,
      dataIndex: 'dateInitial',
      align: 'center',
      render: (dateInitial: string) =>
        dateInitial ? moment(dateInitial).format('YYYY-MM-DD') : '(No Registra)',
    },
    {
      title: <Text>{<CalendarOutlined />} Fecha Final</Text>,
      dataIndex: 'dateFinal',
      align: 'center',
      render: (dateFinal: string) =>
        dateFinal ? moment(dateFinal).format('YYYY-MM-DD') : '(No Registra)',
    },
    {
      title: <Text>{<MoreOutlined />} Opción</Text>,
      fixed: 'right',
      dataIndex: '_id',
      align: 'center',
      render: (_, authorizationId) => (
        <Tooltip title="Editar">
          <Button
            disabled={!canEdit}
            loading={paramsGetAuthorizations?.loading}
            type="primary"
            color="secondary"
            icon={<EditOutlined />}
            onClick={() => onOpenModal(authorizationId)}
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
            <Col xs={24} md={9} lg={9} xl={7}>
              <FormItem label="Prefijo" name="prefix">
                <Input
                  placeholder="Prefijo de la autorización"
                  disabled={paramsGetAuthorizations?.loading}
                />
              </FormItem>
            </Col>
            <Col xs={24} md={7} lg={7} xl={7}>
              <FormItem>
                <Space>
                  <Button
                    loading={paramsGetAuthorizations?.loading}
                    type="primary"
                    htmlType="submit"
                    style={styles.buttonR}
                    icon={<SearchOutlined />}
                  >
                    Buscar
                  </Button>
                  <Button
                    loading={paramsGetAuthorizations?.loading}
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
          <Col span={12}>
            <Button
              disabled={!canCreate}
              icon={<PlusOutlined />}
              type="primary"
              shape="round"
              loading={paramsGetAuthorizations?.loading}
              onClick={() => onOpenModal()}
            >
              Nuevo
            </Button>
          </Col>
          <Col span={12} style={styles.alignText}>
            <Text strong>Total Encontrados: </Text>{' '}
            {paramsGetAuthorizations?.data?.authorizations?.totalDocs || 0}{' '}
            <Text strong> Páginas: </Text>{' '}
            {paramsGetAuthorizations?.data?.authorizations?.page || 0} /{' '}
            {paramsGetAuthorizations?.data?.authorizations?.totalPages || 0}
          </Col>
          <Col span={24}>
            <Table
              onChange={handleChangeTable}
              columns={column}
              loading={paramsGetAuthorizations?.loading}
              dataSource={paramsGetAuthorizations?.data?.authorizations?.docs}
              scroll={{ x: 1200 }}
              pagination={{
                current: paramsGetAuthorizations?.data?.authorizations?.page,
                total: paramsGetAuthorizations?.data?.authorizations?.totalDocs,
                showSizeChanger: false,
              }}
            />
          </Col>
        </Row>
      </Card>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
      <AuthorizationDianForm
        authorizationData={authorization}
        onCancel={onCloseModal}
        visible={visibleForm}
      />
    </PageContainer>
  );
};

export default AuthorizationDianList;
