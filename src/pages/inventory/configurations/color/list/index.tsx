/* eslint-disable react-hooks/exhaustive-deps */
import {
  BgColorsOutlined,
  CalendarOutlined,
  ClearOutlined,
  EditOutlined,
  HighlightOutlined,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Space,
  Tooltip,
  Typography,
} from 'antd';
import type { SorterResult } from 'antd/lib/table/interface';
import FormItem from 'antd/lib/form/FormItem';
import type { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import Table from 'antd/lib/table';
import Title from 'antd/lib/typography/Title';

import { useGetColors } from '@/hooks/color.hooks';
import { useEffect, useState } from 'react';
import AlertInformation from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import moment from 'moment';
import type { Location } from 'umi';
import { useModel } from 'umi';
import { history, useLocation, useAccess } from 'umi';
import CreateColors from '@/components/CreateColor';
import type { Color, FiltersColorsInput } from '@/graphql/graphql';
import { Permissions } from '@/graphql/graphql';

import styles from './styles.less';
import Filters from '@/components/Filters';

type FormData = {
  name?: string;
  active?: boolean;
};

const ColorsList = () => {
  const [color, setColor] = useState<Partial<Color>>({});
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [visible, setVisible] = useState(false);
  const [sorterTable, setSorterTable] = useState<SorterResult<FiltersColorsInput>>({});
  const [filterTable, setFilterTable] = useState<Record<string, any | null>>({});

  const { Text } = Typography;
  const [form] = Form.useForm();
  const location: Location = useLocation();

  const {
    color: { canCreate, canEdit },
  } = useAccess();

  const [getColors, { data, loading }] = useGetColors();

  const { initialState } = useModel('@@initialState');
  const canQueryColors = initialState?.currentUser?.role.permissions.find(
    (permission) => permission.action === Permissions.ReadInventoryColors,
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
   * @description se encarga de ejecutar la funcion para obtener los colores
   * @param values Variables para ejecutar la consulta
   */
  const onSearch = (values?: FiltersColorsInput) => {
    try {
      getColors({
        variables: {
          input: {
            ...values,
          },
        },
      });
    } catch (error: any) {
      showError(error?.message);
    }
  };

  /**
   * @description se encarga de abrir el modal de actualizacion o creacion del color
   * @param colorData propiedades del objeto para setear
   */
  const visibleModal = (colorData: Partial<Color>) => {
    setColor(colorData || {});
    setVisible(true);
  };

  /**
   * @description se encarga de cerrar el modal de actualizacion o creacion del color
   */
  const closeModal = async () => {
    await setColor({});
    setVisible(false);
  };

  const setQueryParams = (values?: FiltersColorsInput) => {
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
   * @param values valores del formulario
   */
  const onFinish = (values: FormData) => {
    const filters = { ...filterTable };

    Object.keys(filters).forEach((i) => {
      if (filters[i] === null) {
        delete filters[i];
      } else {
        filters[i] = filters[i][0];
      }
    });

    onSearch({ ...filters, ...values });
    setQueryParams({
      ...values,
      ...filters,
    });
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
    sorter: SorterResult<Partial<Color>> | any,
  ) => {
    const { current } = paginationLocal;
    const prop = form.getFieldsValue();

    const filters = { ...filterArg };
    try {
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
      setSorterTable(sorter);
      setFilterTable(filterArg);
    } catch (error: any) {
      showError(error?.message);
    }
  };

  /**
   * @description se encarga de limpiar los estados e inicializarlos
   */
  const onClear = () => {
    try {
      history.replace(location.pathname);
      form.resetFields();
      onSearch({});
      setSorterTable({});
      setFilterTable({});
    } catch (error: any) {
      showError(error?.message);
    }
  };

  /**
   * @description se encarga de cargar los datos con base a la query
   */
  const getFiltersQuery = () => {
    const queryParams: any = location.query;
    const params = {};
    const tableFilters = {
      active: queryParams.active ? [queryParams.active === 'true'] : null,
    };
    try {
      Object.keys(queryParams).forEach((item) => {
        if (item === 'active') {
          params[item] = ['true', true].includes(JSON.parse(queryParams[item]));
        } else {
          params[item] = JSON.parse(queryParams[item]);
        }
      });
      form.setFieldsValue(params);
      setFilterTable(tableFilters);
      onSearch(params);
    } catch (error: any) {
      showError(error?.message);
    }
  };

  useEffect(() => {
    getFiltersQuery();
  }, []);

  useEffect(() => {
    if (!canQueryColors) {
      showError('No tiene permisos para consultar los colores');
    }
  }, [canQueryColors]);

  /**
   * @description se encarga de renderizar la interfaz de busqueda
   */
  const renderFormSearch = () => (
    <Form onFinish={onFinish} form={form}>
      <Row gutter={[8, 8]} align="middle">
        <Col xs={24} md={13} lg={10}>
          <FormItem label="Nombre" name="name">
            <Input placeholder="Nombre del color" autoComplete="off" style={{ width: '100%' }} />
          </FormItem>
        </Col>
        <Col xs={24} md={8}>
          <FormItem label="">
            <Space>
              <Button
                style={{ borderRadius: 5 }}
                icon={<SearchOutlined />}
                type="primary"
                loading={loading}
                htmlType="submit"
              >
                Buscar
              </Button>
              <Button
                style={{ borderRadius: 5 }}
                loading={loading}
                icon={<ClearOutlined />}
                onClick={onClear}
              >
                Limpiar
              </Button>
            </Space>
          </FormItem>
        </Col>
      </Row>
    </Form>
  );

  const columns: ColumnsType<Partial<Color>> = [
    {
      title: <Text>{<BgColorsOutlined style={{ height: '1em', width: '1em' }} />} Nombre</Text>,
      dataIndex: 'name',
      sorter: true,
      sortOrder: sorterTable?.field === 'name' ? sorterTable.order : undefined,
      showSorterTooltip: false,
      render: (name: string, { image, html }) => (
        <Space>
          <Avatar
            style={{
              border: image ? 'solid 1px black' : '',
              backgroundColor: 'white',
            }}
            src={`${CDN_URL}/${image?.urls?.webp?.small}`}
          />
          <Avatar style={{ backgroundColor: html, border: 'solid 1px black' }} shape="square" />
          <Text>{name}</Text>
        </Space>
      ),
    },
    {
      title: <Text>{<HighlightOutlined />} Nombre Interno</Text>,
      dataIndex: 'name_internal',
      align: 'center',
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
      title: <Text>{<CalendarOutlined />} Fecha Creación</Text>,
      dataIndex: 'createdAt',
      align: 'center',
      sorter: true,
      sortOrder: sorterTable?.field === 'createdAt' ? sorterTable.order : undefined,
      showSorterTooltip: false,
      render: (createdAt: string) => <span>{moment(createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: <Text>{<CalendarOutlined />} Fecha Actualización</Text>,
      dataIndex: 'updatedAt',
      align: 'center',
      sorter: true,
      sortOrder: sorterTable?.field === 'updatedAt' ? sorterTable.order : undefined,
      showSorterTooltip: false,
      render: (updatedAt: string) => <span>{moment(updatedAt).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: <Text>{<MoreOutlined />} Opción</Text>,
      dataIndex: '_id',
      align: 'center',
      fixed: 'right',
      render: (_: string, colorID) => (
        <Tooltip title="Editar" placement="topLeft">
          <Button
            loading={loading}
            disabled={!canEdit}
            type="primary"
            onClick={() => visibleModal(colorID)}
            icon={<EditOutlined />}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <PageContainer
      title={
        <Space>
          <Title level={4} style={{ margin: 0 }}>
            Colores
          </Title>
        </Space>
      }
    >
      <Card>
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>{renderFormSearch()}</div>
          <Row gutter={[0, 15]} align="middle" style={{ marginTop: 20 }}>
            <Col span={12}>
              <Button
                disabled={!canCreate}
                icon={<PlusOutlined />}
                type="primary"
                shape="round"
                loading={loading}
                onClick={() => visibleModal(color)}
              >
                Nuevo
              </Button>
            </Col>
            <Col span={12} className={styles.alignRigth}>
              <Text strong>Total Encontrados:</Text> {data?.colors?.totalDocs || 0}{' '}
              <Text strong>Páginas: </Text> {data?.colors?.page || 0} /{' '}
              {data?.colors?.totalPages || 0}
            </Col>
            <Col span={24}>
              <Table
                columns={columns}
                dataSource={data?.colors?.docs}
                pagination={{
                  current: data?.colors?.page,
                  total: data?.colors?.totalDocs,
                  showSizeChanger: false,
                }}
                loading={loading}
                onChange={handleChangeTable}
                scroll={{ x: 'auto' }}
              />
            </Col>
          </Row>
        </div>
      </Card>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
      <CreateColors modalVisible={visible} onCancel={closeModal} current={color} />
    </PageContainer>
  );
};

export default ColorsList;
