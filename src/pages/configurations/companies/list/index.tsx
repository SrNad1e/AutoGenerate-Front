/* eslint-disable react-hooks/exhaustive-deps */
import {
  CalendarOutlined,
  ClearOutlined,
  EditOutlined,
  HomeOutlined,
  IdcardOutlined,
  MoreOutlined,
  PhoneOutlined,
  PlusOutlined,
  ProfileOutlined,
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
  Row,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import { useEffect, useState } from 'react';
import type { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import type { SorterResult } from 'antd/lib/table/interface';
import moment from 'moment';
import type { Location } from 'umi';
import { useLocation, history } from 'umi';
import { useGetCompanies } from '@/hooks/company.hooks';
import type { Company, FiltersCompaniesInput } from '@/graphql/graphql';

import Filters from '@/components/Filters';
import AlertInformation from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import CompaniesForm from '../form';

import styles from '../styles';

const FormItem = Form.Item;
const { Text } = Typography;

type FormValues = {
  name?: string;
};

const CompaniesList = () => {
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [filterTable, setFilterTable] = useState<Record<string, any | null>>({});
  const [visibleForm, setVisibleForm] = useState(false);
  const [company, setCompany] = useState<Partial<Company>>({});

  const [form] = Form.useForm();
  const location: Location = useLocation();

  const [getCompanies, paramsGetCompanies] = useGetCompanies();

  /**
   * @description cierra el modal y reinicia el estado de la compañia
   */
  const onCloseModal = () => {
    setVisibleForm(false);
    setCompany({});
  };

  /**
   * @description abre el formulario y setea la data de la compañia
   * @param companyId compañia
   */
  const onOpenModal = (companyId?: Company) => {
    setCompany(companyId || {});
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
   * @description ejecuta la consulta para obtener las compañias
   * @param filters filtros para realizar la consulta
   */
  const onSearch = (filters?: FiltersCompaniesInput) => {
    try {
      getCompanies({
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
  const setQueryParams = (values?: FiltersCompaniesInput) => {
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
    const params: FiltersCompaniesInput = {
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
    sorter: SorterResult<Partial<Company>> | any,
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

  const column: ColumnsType<Company> = [
    {
      title: <Text>{<ProfileOutlined />} Nombre</Text>,
      dataIndex: 'name',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: (
        <Text>
          <IdcardOutlined /> Documento
        </Text>
      ),
      dataIndex: 'document',
      align: 'center',
      render: (document: string) => <Tag style={styles.tagStyle}>{document}</Tag>,
    },
    {
      title: <Text>{<PhoneOutlined />} Teléfono</Text>,
      dataIndex: 'phone',
      align: 'center',
    },
    {
      title: <Text>{<HomeOutlined />} Dirección</Text>,
      dataIndex: 'address',
      align: 'center',
    },
    {
      title: 'Activo',
      dataIndex: 'active',
      align: 'center',
      render: (active: boolean) => {
        return <Badge status={active ? 'success' : 'default'} text={active ? 'Si' : 'No'} />;
      },
      filterMultiple: false,
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
      render: (_, companyId: Company) => (
        <Tooltip title="Editar">
          <Button
            disabled={paramsGetCompanies?.loading}
            type="primary"
            color="secondary"
            icon={<EditOutlined />}
            onClick={() => onOpenModal(companyId)}
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
              <FormItem label="Nombre" name="name">
                <Input placeholder="Nombre de la compañia" disabled={paramsGetCompanies?.loading} />
              </FormItem>
            </Col>
            <Col xs={24} md={7} lg={7} xl={7}>
              <FormItem>
                <Space>
                  <Button
                    loading={paramsGetCompanies?.loading}
                    type="primary"
                    htmlType="submit"
                    style={styles.buttonR}
                    icon={<SearchOutlined />}
                  >
                    Buscar
                  </Button>
                  <Button
                    loading={paramsGetCompanies?.loading}
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
              loading={paramsGetCompanies?.loading}
              icon={<PlusOutlined />}
              type="primary"
              shape="round"
              onClick={() => onOpenModal()}
            >
              Nuevo
            </Button>
          </Col>
          <Col span={12} style={styles.alignText}>
            <Text strong>Total Encontrados: </Text>{' '}
            {paramsGetCompanies?.data?.companies?.totalDocs || 0} <Text strong>Páginas: </Text>{' '}
            {paramsGetCompanies?.data?.companies?.page || 0} /{' '}
            {paramsGetCompanies?.data?.companies?.totalPages || 0}
          </Col>
          <Col span={24}>
            <Table
              loading={paramsGetCompanies?.loading}
              onChange={handleChangeTable}
              columns={column}
              dataSource={paramsGetCompanies?.data?.companies?.docs}
              scroll={{ x: 'auto' }}
              pagination={{
                current: paramsGetCompanies?.data?.companies?.page,
                total: paramsGetCompanies?.data?.companies?.totalDocs,
                showSizeChanger: false,
              }}
            />
          </Col>
        </Row>
      </Card>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
      <CompaniesForm visible={visibleForm} onCancel={onCloseModal} companyData={company} />
    </PageContainer>
  );
};

export default CompaniesList;
