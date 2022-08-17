/* eslint-disable react-hooks/exhaustive-deps */
import {
  CalendarOutlined,
  ClearOutlined,
  DollarCircleOutlined,
  EditOutlined,
  MoreOutlined,
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
  Tooltip,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import type { SorterResult, TablePaginationConfig } from 'antd/lib/table/interface';
import { Box, FiltersBoxesInput, Permissions } from '@/graphql/graphql';
import { useGetBoxes } from '@/hooks/box.hooks';
import moment from 'moment';
import { Location, useModel } from 'umi';
import { useAccess } from 'umi';
import { useLocation, history } from 'umi';
import { useEffect, useState } from 'react';
import numeral from 'numeral';

import AlertInformation from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import BoxForm from '../form';

import styles from '../styles';

const { Text } = Typography;
const FormItem = Form.Item;

type FormValues = {
  name?: string;
};

const BoxList = () => {
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [visibleForm, setVisibleForm] = useState(false);
  const [box, setBox] = useState<Partial<Box>>({});

  const [form] = Form.useForm();
  const location: Location = useLocation();

  const {
    box: { canCreate, canEdit },
  } = useAccess();

  const [getBoxes, paramsGetBoxes] = useGetBoxes();

  const { initialState } = useModel('@@initialState');
  const canQueryBox = initialState?.currentUser?.role.permissions.find(
    (permission) => permission.action === Permissions.ReadTreasuryBoxes,
  );

  /**
   * @description cierra el modal y reinicia el estado de la caja
   */
  const onCloseModal = () => {
    setVisibleForm(false);
    setBox({});
  };

  /**
   * @description abre el formulario y setea la data de la caja
   * @param boxId compañia
   */
  const onOpenModal = (boxId?: Box) => {
    setBox(boxId || {});
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
   * @description ejecuta la consulta para obtener las cajas
   * @param filters filtros para realizar la consulta
   */
  const onSearch = (filters?: FiltersBoxesInput) => {
    getBoxes({
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
  const setQueryParams = (values?: FiltersBoxesInput) => {
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
    const params: FiltersBoxesInput = {
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
    filterArg: Record<string, any>,
    sorter: SorterResult<Partial<Box>> | any,
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
    if (!canQueryBox) {
      showError('No tiene permisos para consultar las cajas');
    }
  }, [canQueryBox]);

  const column: ColumnsType<Box> = [
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
          <DollarCircleOutlined /> Base
        </Text>
      ),
      align: 'center',
      dataIndex: 'base',
      sorter: true,
      showSorterTooltip: false,
      render: (value: number) => numeral(value).format('$ 0,0'),
    },
    {
      title: (
        <Text>
          <DollarCircleOutlined /> Total
        </Text>
      ),
      align: 'center',
      dataIndex: 'total',
      sorter: true,
      showSorterTooltip: false,
      render: (value: number) => numeral(value).format('$ 0,0'),
    },
    {
      title: <Text>Principal </Text>,
      dataIndex: 'isMain',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      render: (isMain: boolean) => {
        return <Badge status={isMain ? 'success' : 'default'} text={isMain ? 'Si' : 'No'} />;
      },
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
      render: (_, boxId) => (
        <Tooltip title="Editar">
          <Button
            disabled={paramsGetBoxes?.loading || !canEdit}
            type="primary"
            color="secondary"
            icon={<EditOutlined />}
            onClick={() => onOpenModal(boxId)}
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
                <Input placeholder="Nombre de la caja" disabled={paramsGetBoxes?.loading} />
              </FormItem>
            </Col>
            <Col xs={24} md={7} lg={7} xl={7}>
              <FormItem>
                <Space>
                  <Button
                    disabled={paramsGetBoxes?.loading}
                    type="primary"
                    htmlType="submit"
                    style={styles.buttonR}
                    icon={<SearchOutlined />}
                  >
                    Buscar
                  </Button>
                  <Button
                    disabled={paramsGetBoxes?.loading}
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
              disabled={paramsGetBoxes?.loading || !canCreate}
              icon={<PlusOutlined />}
              type="primary"
              shape="round"
              onClick={() => onOpenModal()}
            >
              Nuevo
            </Button>
          </Col>
          <Col span={16} style={styles.alignText}>
            <Text strong>Total Encontrados: </Text> {paramsGetBoxes?.data?.boxes?.totalDocs || 0}{' '}
            <Text strong>Páginas: </Text> {paramsGetBoxes?.data?.boxes?.page || 0} /{' '}
            {paramsGetBoxes?.data?.boxes?.totalPages || 0}
          </Col>
          <Col span={24}>
            <Table
              onChange={handleChangeTable}
              columns={column}
              dataSource={paramsGetBoxes?.data?.boxes?.docs}
              scroll={{ x: 'auto' }}
              pagination={{
                current: paramsGetBoxes?.data?.boxes?.page,
                total: paramsGetBoxes?.data?.boxes?.totalDocs,
              }}
            />
          </Col>
        </Row>
      </Card>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
      <BoxForm boxData={box} onCancel={onCloseModal} visible={visibleForm} />
    </PageContainer>
  );
};

export default BoxList;
