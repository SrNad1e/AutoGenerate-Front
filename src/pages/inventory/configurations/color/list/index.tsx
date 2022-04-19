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
//import { SorterResult } from 'antd/lib/table/interface'
import FormItem from 'antd/lib/form/FormItem';
import Table, { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import Title from 'antd/lib/typography/Title';

import { useGetColors } from '@/hooks/color.hooks';
import { useEffect, useState } from 'react';
import AlertInformation from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import moment from 'moment';
import { history, useLocation } from 'umi';
import CreateColors from '@/components/CreateColors';

import styles from './styles.less';

type FormData = {
  name?: string;
};

type InputRequest = {
  name?: string;
  active?: boolean;
  limit?: number;
  sort?: Record<string, number>;
  page?: number;
};

const ColorsList = () => {
  const [colors, setColors] = useState<Partial<COLOR.Color[]>>([]);
  const [color, setColor] = useState<Partial<COLOR.Color>>({});
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    showSizeChanger: false,
    total: 0,
    pageSize: 10,
    current: 1,
  });
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [visible, setVisible] = useState(false);

  const { Text } = Typography;
  const [form] = Form.useForm();
  const location = useLocation();

  /** Funciones ejecutadas por los hooks */

  /**
   * @description se encarga de almacenar los datos de la consulta
   * @param data respuesta de la consulta
   */
  const resultColors = (data: Partial<COLOR.ResponsePaginate>) => {
    setColors(data.docs || []);
    setPagination({ ...pagination, total: data.totalDocs });
  };

  /**
   * @description funcion usada por los hooks para mostrar los errores
   * @param message mensaje de error a mostrar
   */
  const showError = (message: string) => {
    setAlertInformation({
      message,
      type: 'error',
      visible: true,
    });
  };

  /** Fin de Funciones ejecutadas por los hooks */

  /** Hooks para manejo de consultas */

  const { getColors, loading } = useGetColors(resultColors, showError);

  /** Fin de Hooks para manejo de consultas */

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
   */
  const onSearch = (values?: InputRequest) => {
    getColors({
      variables: {
        input: values,
      },
    });
  };

  /**
   * @description se encarga de abrir el modal de actualizacion o creacion del color
   */
  const visibleModal = (id?: COLOR.Color) => {
    setVisible(true);
    setColor({ _id: id?._id });
  };

  /**
   * @description se encarga de cerrar el modal de actualizacion o creacion del color
   */
  const closeModal = () => {
    setVisible(false);
  };

  const editColor = () => {
    setVisible(false);
  };

  /**
   * @description esta funcion evalua los paramametros del formulario y ejecuta la busqueda
   * @param values valores del formulario
   */
  const onFinish = (values: FormData) => {
    const datos = Object.keys(values)
      .reduce((a, key) => (values[key] ? `${a}&${key}=${JSON.stringify(values[key])}` : a), '')
      .slice(1);

    onSearch(values);
    form.setFieldsValue(values);
    history.replace(`${location.pathname}?${datos}`);
  };

  /**
   * @description se encarga de manejar eventos de tabla
   * @param paginationLocal eventos de la páginacion
   * @param sorter ordenamiento de la tabla
   */
  /*const handleChangeTable = (
    paginationLocal: TablePaginationConfig,
    _: any,
    sorter: SorterResult<Partial<COLOR.Color>>,
  ) => {
    const { current } = paginationLocal;
    const prop = form.getFieldsValue();

    let sort = {};

    if (sorter.field) {
      sort = {
        [sorter.field]: sorter.order === 'ascend' ? 1 : -1,
      };
    } else {
      sort = {
        createdAt: -1,
      };
    }
    setPagination({ ...pagination, current });
    onSearch({ ...prop, page: current });
  };*/

  /**
   * @description se encarga de limpiar los estados e inicializarlos
   */
  const onClear = () => {
    history.replace(location.pathname);
    form.resetFields();
    setPagination({
      total: 0,
      pageSize: 10,
      current: 1,
      showSizeChanger: false,
    });
    onSearch({});
  };

  /**
   * @description se encarga de renderizar la interfaz de busqueda
   */
  const renderFormSearch = () => (
    <Form layout="inline" onFinish={onFinish} form={form}>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <FormItem label="Nombre" name="name" style={{ width: 300 }}>
            <Input placeholder="Color" autoComplete="off" />
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

  /**
   * @description se encarga de cargar los datos con base a la query
   */
  const data = () => {
    const queryParams = location['query'];

    const params = {};

    Object.keys(queryParams).forEach((item) => {
      params[item] = JSON.parse(queryParams[item]);
    });
    form.setFieldsValue(params);
    onSearch(params);
  };

  useEffect(() => {
    data();
  }, []);

  const columns: ColumnsType<Partial<COLOR.Color>> = [
    {
      title: 'Color',
      dataIndex: 'name',
      sorter: true,
      showSorterTooltip: false,
      render: (text, values) => (
        <>
          <Avatar
            style={{
              border: values.image ? 'solid 1px black' : '',
              backgroundColor: 'white',
            }}
          />

          <Avatar
            style={{ backgroundColor: values.html, border: 'solid 1px black', marginLeft: 10 }}
            shape="square"
          />

          <Text style={{ marginLeft: 10 }}>{text}</Text>
        </>
      ),
    },
    {
      title: 'Nombre Interno',
      dataIndex: 'name_internal',
    },
    {
      title: 'Active',
      dataIndex: 'active',
      filters: [
        {
          text: 'Si',
          value: true,
        },
        {
          text: 'No',
          value: false,
        },
      ],
      render: (active: boolean) => {
        return <Badge status={active ? 'success' : 'default'} text={active ? 'Si' : 'No'} />;
      },
    },
    {
      title: 'Fecha registro',
      dataIndex: 'Created_at',
      sorter: true,
      showSorterTooltip: false,
      render: (val: string) => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: 'Acción',
      render: (_id: COLOR.Color) => (
        <Tooltip title="Editar" placement="topLeft">
          <Button
            onClick={() => visibleModal(_id)}
            style={{ backgroundColor: '#dc9575' }}
            icon={<EditOutlined style={{ color: 'white' }} />}
          />
        </Tooltip>
      ),
    },
  ];

  const totalPages = Math.ceil((pagination.total || 0) / (pagination.pageSize || 0));

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
          <Row>
            <Col span={12} style={{ marginBottom: 10 }}>
              <Button
                icon={<PlusOutlined />}
                type="primary"
                shape="round"
                onClick={() => visibleModal()}
              >
                Nuevo
              </Button>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Text strong>Total Encontrados:</Text> {pagination?.total}{' '}
              <Text strong>Páginas: </Text> {pagination.current} / {totalPages}
            </Col>
          </Row>
          <Table
            columns={columns}
            dataSource={colors}
            pagination={pagination}
            loading={loading}
            onChange={handleChangeTable}
          />
        </div>
      </Card>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
      <CreateColors modalVisible={visible} onCancel={closeModal} current={color} onOk={editColor} />
    </PageContainer>
  );
};

export default ColorsList;
