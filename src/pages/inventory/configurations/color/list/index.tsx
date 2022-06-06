/* eslint-disable react-hooks/exhaustive-deps */
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
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
import { history, useLocation } from 'umi';
import CreateColors from '@/components/CreateColor';
import type { Color, FiltersColorsInput } from '@/graphql/graphql';

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

  const [getColors, { data, loading }] = useGetColors();

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
  };

  /**
   * @description se encarga de limpiar los estados e inicializarlos
   */
  const onClear = () => {
    history.replace(location.pathname);
    form.resetFields();
    onSearch({});
    setSorterTable({});
    setFilterTable({});
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
  };

  useEffect(() => {
    getFiltersQuery();
  }, []);

  /**
   * @description se encarga de renderizar la interfaz de busqueda
   */
  const renderFormSearch = () => (
    <Form layout="inline" onFinish={onFinish} form={form}>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <FormItem label="Nombre" name="name" style={{ width: 300 }}>
            <Input placeholder="Nombre del color" autoComplete="off" />
          </FormItem>
        </Col>
      </Row>
      <Col span={12}>
        <span className={styles.submitButtons}>
          <Button type="primary" htmlType="submit">
            Buscar
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={onClear}>
            Limpiar
          </Button>
        </span>
      </Col>
    </Form>
  );

  const columns: ColumnsType<Partial<Color>> = [
    {
      title: 'Nombre',
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
          <Avatar
            style={{ backgroundColor: html, border: 'solid 1px black', marginLeft: 10 }}
            shape="square"
          />
          <Text>{name}</Text>
        </Space>
      ),
    },
    {
      title: 'Nombre Interno',
      dataIndex: 'name_internal',
    },
    {
      title: 'Activo',
      dataIndex: 'active',
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
      title: 'Fecha Creación',
      dataIndex: 'createdAt',
      align: 'center',
      sorter: true,
      sortOrder: sorterTable?.field === 'createdAt' ? sorterTable.order : undefined,
      showSorterTooltip: false,
      render: (createdAt: string) => <span>{moment(createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: 'Fecha Actualización',
      dataIndex: 'updatedAt',
      align: 'center',
      sorter: true,
      sortOrder: sorterTable?.field === 'updatedAt' ? sorterTable.order : undefined,
      showSorterTooltip: false,
      render: (updatedAt: string) => <span>{moment(updatedAt).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: 'Acción',
      dataIndex: '_id',
      align: 'center',
      fixed: 'right',
      render: (_: string, colorID) => (
        <Tooltip title="Editar" placement="topLeft">
          <Button
            onClick={() => visibleModal(colorID)}
            style={{ backgroundColor: '#dc9575' }}
            icon={<EditOutlined style={{ color: 'white' }} />}
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
          <Row gutter={[0, 20]}>
            <Col span={12}>
              <Button
                icon={<PlusOutlined />}
                type="primary"
                shape="round"
                onClick={() => visibleModal(color)}
              >
                Nuevo
              </Button>
            </Col>
            <Col span={12} className={styles.alignRigth}>
              <Text strong>Total Encontrados:</Text> {data?.colors.totalDocs}{' '}
              <Text strong>Páginas: </Text> {data?.colors.page} / {data?.colors.totalPages || 0}
            </Col>
            <Col span={24}>
              <Table
                columns={columns}
                dataSource={data?.colors.docs}
                pagination={{
                  current: data?.colors.page,
                  total: data?.colors.totalDocs,
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
