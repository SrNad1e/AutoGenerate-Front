/* eslint-disable react-hooks/exhaustive-deps */
import {
  CalendarOutlined,
  ClearOutlined,
  CloseSquareFilled,
  DollarCircleOutlined,
  FieldNumberOutlined,
  FileSyncOutlined,
  GroupOutlined,
  MoreOutlined,
  PlusOutlined,
  PrinterFilled,
  SearchOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  InputNumber,
  Popconfirm,
  Row,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import type { SorterResult } from 'antd/lib/table/interface';

import moment from 'moment';
import numeral from 'numeral';
import { useEffect, useRef, useState } from 'react';
import type { Box, Expense, FiltersExpensesInput } from '@/graphql/graphql';
import { Permissions } from '@/graphql/graphql';
import { StatusExpense } from '@/graphql/graphql';
import { useGetExpenses, useUpdateExpense } from '@/hooks/expense.hooks';
import type { Location } from 'umi';
import { useModel } from 'umi';
import { useAccess } from 'umi';
import { useReactToPrint } from 'react-to-print';
import { useHistory, useLocation } from 'umi';

import { StatusTypeExpense } from '../expenses.data';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
import Filters from '@/components/Filters';
import ExpensesForm from '../form';
import SelectBox from '@/components/SelectBox';
import ReportExpense from '../report/expense';

import styles from '../styles';

const FormItem = Form.Item;
const { Text } = Typography;

type FormValues = {
  status?: StatusExpense;
  number?: number;
  shopId?: string;
  boxId?: string;
};

const ExpensesList = () => {
  const [visibleModalCreate, setVisibleModalCreate] = useState(false);
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [filterTable, setFilterTable] = useState<Record<string, any | null>>({});
  const [expenseData, setExpenseData] = useState<Partial<Expense>>({});

  const [form] = Form.useForm();
  const history = useHistory();

  const {
    expense: { canCreate, canPrint, canCancelled },
  } = useAccess();

  const rolesDenied = ['cajera OK', 'admin_tienda OK'];

  const location: Location = useLocation();
  const reportRef = useRef(null);

  const [getExpenses, { data, loading }] = useGetExpenses();
  const [updateExpenses, paramsUpdate] = useUpdateExpense();

  const { initialState } = useModel('@@initialState');
  const canQueryExpense = initialState?.currentUser?.role.permissions.find(
    (permission) => permission.action === Permissions.ReadTreasuryExpenses,
  );

  const handlePrint = useReactToPrint({
    content: () => reportRef?.current,
  });

  const printExpense = async (record: Partial<Expense>) => {
    await setExpenseData(record);
    handlePrint();
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
   * @description cierra la alerta
   */
  const closeAlertInformation = () => {
    setAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  /**
   * @description cierra el modal de creacion
   */
  const closeModalCreate = () => {
    setVisibleModalCreate(false);
  };

  /**
   * @description se encarga de ejecutar la funcion para obtener los colores
   * @param filters Variables para ejecutar la consulta
   */
  const onSearch = (filters?: FiltersExpensesInput) => {
    try {
      if (!rolesDenied.includes(initialState?.currentUser?.role?.name as string)) {
        getExpenses({
          variables: {
            input: {
              ...filters,
            },
          },
        });
      } else {
        getExpenses({
          variables: {
            input: {
              ...filters,
              boxId: initialState?.currentUser?.pointOfSale?.box?._id,
            },
          },
        });
      }
    } catch (error: any) {
      showError(error?.message);
    }
  };

  /**
   * @description se encarga de señalar los datos a la query
   * @param values valores para enviar a la query
   */
  const setQueryParams = (values?: FiltersExpensesInput) => {
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
    const params: FiltersExpensesInput = {
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
    sorter: SorterResult<Partial<Expense>> | any,
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
   * @description actualiza el estado del egreso
   * @param id identificador del egreso
   */
  const cancelExpense = async (id: string) => {
    try {
      const response = await updateExpenses({
        variables: {
          input: { status: StatusExpense.Cancelled },
          id: id,
        },
      });
      if (response?.data?.updateExpense) {
        setAlertInformation({
          message: `Egreso No ${response?.data?.updateExpense?.number} actualizado correctamente`,
          type: 'success',
          visible: true,
        });
      }
    } catch (error: any) {
      if (error?.message) {
        showError(error?.message);
      }
    }
  };

  /**
   * @description se encarga de cargar los datos con base a la query
   */
  const loadingData = (box: string) => {
    const queryParams: any = location?.query;
    if (!rolesDenied.includes(initialState?.currentUser?.role?.name as string)) {
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
    } else {
      const params = { boxId: box || initialState?.currentUser?.pointOfSale?.box?._id };
      Object.keys(queryParams).forEach((item) => {
        if (item === 'active') {
          params[item] = ['true', true].includes(JSON.parse(queryParams[item]));
        } else {
          params[item] = JSON.parse(queryParams[item]);
        }
      });
      form.setFieldsValue(params);
      onFinish({ ...params });
    }
  };

  useEffect(() => {
    if (initialState?.currentUser?.pointOfSale) {
      loadingData(initialState?.currentUser?.pointOfSale?.box?._id);
    }
  }, []);

  useEffect(() => {
    if (!canQueryExpense) {
      showError('No tiene permisos para consultar los egresos');
    }
  }, [canQueryExpense]);

  const column: ColumnsType<Expense> = [
    {
      title: (
        <Text style={{ fontSize: 20 }}>
          <FieldNumberOutlined />
        </Text>
      ),
      dataIndex: 'number',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: (
        <Text>
          <GroupOutlined /> Caja
        </Text>
      ),
      dataIndex: 'box',
      align: 'center',
      render: (box: Box) => <Tag style={styles.tagStyle}>{box?.name}</Tag>,
    },
    {
      title: (
        <Text>
          <DollarCircleOutlined /> Valor
        </Text>
      ),
      dataIndex: 'value',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      render: (value: number) => numeral(value).format('$ 0,0'),
    },
    {
      title: <Text>{<FileSyncOutlined />} Estado</Text>,
      dataIndex: 'status',
      align: 'center',
      filteredValue: filterTable?.status || null,
      render: (status: string) => {
        const { color, label } = StatusTypeExpense[status || ''];
        return <Badge text={label} color={color} />;
      },
      filterDropdown: (props) => (
        <Filters
          props={props}
          data={[
            {
              text: 'Activo',
              value: 'ACTIVE',
            },
            {
              text: 'Cancelado',
              value: 'CANCELLED',
            },
          ]}
        />
      ),
    },
    {
      title: (
        <Text>
          <CalendarOutlined /> Fecha
        </Text>
      ),
      dataIndex: 'createdAt',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      render: (createdAt: Date) => moment(createdAt).format(FORMAT_DATE),
    },
    {
      title: (
        <Text>
          <MoreOutlined /> Opciones
        </Text>
      ),
      dataIndex: 'id',
      align: 'center',
      render: (_, expenseId) => (
        <Space>
          <Tooltip title="Imprimir" placement="topLeft">
            <Button
              disabled={!canPrint}
              loading={loading || paramsUpdate.loading}
              type="primary"
              onClick={() => printExpense(expenseId)}
              icon={<PrinterFilled />}
            />
          </Tooltip>
          <Tooltip title="Anular">
            <Popconfirm
              title="¿Esta seguro que desea anular?"
              okText="Si"
              cancelText="No"
              disabled={expenseId.status === StatusExpense.Cancelled}
              onConfirm={() => cancelExpense(expenseId?._id)}
            >
              <Button
                danger
                loading={paramsUpdate?.loading || loading}
                disabled={expenseId.status === StatusExpense.Cancelled || !canCancelled}
                type="primary"
                icon={<CloseSquareFilled />}
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];
  return (
    <PageContainer>
      <Card>
        <Form form={form} onFinish={onFinish}>
          <Row gutter={30}>
            <Col xs={24} sm={7} md={6} lg={5} xl={4}>
              <FormItem label="Número" name="number">
                <InputNumber
                  controls={false}
                  style={styles.maxWidth}
                  disabled={loading}
                  placeholder="Ejem: 10"
                />
              </FormItem>
            </Col>
            <Col xs={24} sm={7} md={8} lg={8} xl={6}>
              <FormItem label="Caja" name="boxId">
                <SelectBox
                  disabled={
                    loading || rolesDenied.includes(initialState?.currentUser?.role?.name as string)
                  }
                />
              </FormItem>
            </Col>
            <Col xs={24} sm={8} md={8} lg={8} xl={6}>
              <FormItem label=" " colon={false}>
                <Space>
                  <Button
                    icon={<SearchOutlined />}
                    style={styles.buttonR}
                    type="primary"
                    loading={loading || paramsUpdate.loading}
                    htmlType="submit"
                  >
                    Buscar
                  </Button>
                  <Button
                    style={styles.buttonR}
                    loading={loading || paramsUpdate.loading}
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
        <Row gutter={[0, 15]} align="middle" style={styles.marginFilters}>
          <Col span={12}>
            <Button
              icon={<PlusOutlined />}
              type="primary"
              shape="round"
              disabled={!canCreate}
              loading={loading || paramsUpdate.loading}
              onClick={() => setVisibleModalCreate(true)}
            >
              Nuevo
            </Button>
          </Col>
          <Col span={12} style={styles.alingText}>
            <Text strong>Total Encontrados:</Text> {data?.expenses?.totalDocs || 0}{' '}
            <Text strong>Páginas: </Text> {data?.expenses?.page || 0} /{' '}
            {data?.expenses?.totalPages || 0}
          </Col>
          <Col span={24}>
            <Table
              onChange={handleChangeTable}
              columns={column}
              loading={loading || paramsUpdate.loading}
              dataSource={data?.expenses?.docs}
              scroll={{ x: 'auto' }}
              pagination={{
                current: data?.expenses?.page,
                total: data?.expenses?.totalDocs,
                showSizeChanger: false,
              }}
            />
          </Col>
        </Row>
      </Card>
      <ExpensesForm visible={visibleModalCreate} onCancel={closeModalCreate} />
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
      <div style={{ display: 'none' }}>
        <ReportExpense ref={reportRef} data={expenseData} />
      </div>
    </PageContainer>
  );
};

export default ExpensesList;
