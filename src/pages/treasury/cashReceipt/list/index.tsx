/* eslint-disable react-hooks/exhaustive-deps */
import {
  CalendarOutlined,
  ClearOutlined,
  CloseSquareFilled,
  DollarCircleOutlined,
  FieldNumberOutlined,
  FileSyncOutlined,
  MoreOutlined,
  PlusOutlined,
  PrinterFilled,
  SearchOutlined,
  ShoppingOutlined,
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
import type { FiltersReceiptsInput, Payment, Receipt } from '@/graphql/graphql';
import { Permissions } from '@/graphql/graphql';
import { StatusReceipt } from '@/graphql/graphql';
import { useGetReceipts, useUpdateReceipt } from '@/hooks/receipt.hooks';
import { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import numeral from 'numeral';
import { useAccess, useHistory, useLocation, useModel } from 'umi';
import type { Location } from 'umi';

import Filters from '@/components/Filters';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
import CashReceiptForm from '../form';
import { StatusTypeReceipt } from '../receipt.data';
import SelectPayment from '@/components/SelectPayment';

import styles from '../styles';
import ReportReceipt from '../report/receipt';
import { useReactToPrint } from 'react-to-print';

const FormItem = Form.Item;

const { Text } = Typography;

type FormValues = {
  number?: number;
  paymentId?: string;
  status?: StatusReceipt;
};

const CashReceiptList = () => {
  const [visibleModalCreate, setVisibleModalCreate] = useState(false);
  const [filterTable, setFilterTable] = useState<Record<string, any | null>>({});
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [dataReceipt, setDataReceipt] = useState<Partial<Receipt>>({});

  const [form] = Form.useForm();
  const history = useHistory();
  const location: Location = useLocation();

  //permisos
  const {
    receipt: { canCreate, canCancelled, canPrint },
  } = useAccess();

  const reportRef = useRef(null);

  const [getReceipts, { data, loading }] = useGetReceipts();
  const [updateReceipt, paramsUpdate] = useUpdateReceipt();

  const { initialState } = useModel('@@initialState');
  const canQueryReceipts = initialState?.currentUser?.role.permissions.find(
    (permission) => permission.action === Permissions.ReadTreasuryReceipts,
  );

  const handlePrint = useReactToPrint({
    content: () => reportRef?.current,
  });

  const printReceipt = async (record: Partial<Receipt>) => {
    await setDataReceipt(record);
    handlePrint();
  };

  /**
   * @description cierra el modal de creacion
   */
  const closeModalCreate = () => {
    setVisibleModalCreate(false);
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
   * @description se encarga de ejecutar la funcion para obtener los recibos de caja
   * @param filters Variables para ejecutar la consulta
   */
  const onSearch = (filters?: FiltersReceiptsInput) => {
    try {
      getReceipts({
        variables: {
          input: {
            ...filters,
            sort: {
              createdAt: -1,
              ...filters?.sort,
            },
          },
        },
      });
    } catch (error: any) {
      showError(error.message);
    }
  };

  /**
   * @description se encarga de señalar los datos a la query
   * @param values valores para enviar a la query
   */
  const setQueryParams = (values?: FiltersReceiptsInput) => {
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
    const params: FiltersReceiptsInput = {
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
    sorter: SorterResult<Partial<Receipt>> | any,
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
   * @description actualiza el estado del recibo de caja
   * @param id identificador del recibo de caja
   */
  const cancelReceipt = async (id: string) => {
    try {
      const response = await updateReceipt({
        variables: {
          input: { status: StatusReceipt.Cancelled },
          id: id,
        },
      });
      if (response?.data?.updateReceipt) {
        setAlertInformation({
          message: `Recibo de caja No ${response?.data?.updateReceipt?.number} actualizado correctamente`,
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
    if (!canQueryReceipts) {
      showError('No tiene permisos para consultar los recibos de caja');
    }
  }, [canQueryReceipts]);

  const column: ColumnsType<Receipt> = [
    {
      title: (
        <Text style={{ fontSize: 20 }}>
          <FieldNumberOutlined />
        </Text>
      ),
      align: 'center',
      dataIndex: 'number',
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: (
        <Text>
          <ShoppingOutlined /> Método de Pago
        </Text>
      ),
      dataIndex: 'payment',
      align: 'center',
      render: (payment: Payment) => <Tag style={styles.tagStyle}>{payment.name}</Tag>,
    },
    {
      title: (
        <Text>
          <DollarCircleOutlined /> Valor
        </Text>
      ),
      align: 'center',
      dataIndex: 'value',
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
        const { color, label } = StatusTypeReceipt[status || ''];
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
      align: 'center',
      dataIndex: 'updatedAt',
      sorter: true,
      showSorterTooltip: false,
      render: (updatedAt: Date) => moment(updatedAt).format(FORMAT_DATE),
    },
    {
      title: (
        <Text>
          <MoreOutlined /> Opciones
        </Text>
      ),
      dataIndex: '_id',
      fixed: 'right',
      render: (_, receiptId) => (
        <Space>
          <Tooltip title="Imprimir" placement="topLeft">
            <Button
              disabled={!canPrint}
              loading={paramsUpdate.loading || loading}
              type="primary"
              icon={<PrinterFilled />}
              onClick={() => printReceipt(receiptId)}
            />
          </Tooltip>
          <Tooltip title="Anular">
            <Popconfirm
              title="¿Esta seguro que desea anular?"
              okText="Si"
              cancelText="No"
              disabled={receiptId.status === StatusReceipt.Cancelled}
              onConfirm={() => cancelReceipt(receiptId._id)}
            >
              <Button
                danger
                loading={paramsUpdate.loading || loading}
                disabled={receiptId.status === StatusReceipt.Cancelled || !canCancelled}
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
        <Form layout="horizontal" form={form} onFinish={onFinish}>
          <Row gutter={30}>
            <Col xs={24} sm={7} md={6} lg={5} xl={5}>
              <FormItem label="Número" name="number">
                <InputNumber
                  disabled={paramsUpdate.loading || loading}
                  controls={false}
                  style={styles.maxWidth}
                  placeholder="Ejem: 10"
                />
              </FormItem>
            </Col>
            <Col xs={24} sm={7} md={8} lg={8} xl={8}>
              <FormItem label="Medio de pago" name="paymentId">
                <SelectPayment disabled={loading} bonus />
              </FormItem>
            </Col>
            <Col xs={24} sm={8} md={8} lg={8} xl={6}>
              <FormItem label=" " colon={false}>
                <Space>
                  <Button
                    icon={<SearchOutlined />}
                    loading={paramsUpdate.loading || loading}
                    type="primary"
                    htmlType="submit"
                    style={styles.buttonR}
                  >
                    Buscar
                  </Button>
                  <Button
                    style={styles.buttonR}
                    icon={<ClearOutlined />}
                    loading={paramsUpdate.loading || loading}
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
              loading={paramsUpdate.loading || loading}
              disabled={!canCreate}
              onClick={() => setVisibleModalCreate(true)}
            >
              Abono de Cartera
            </Button>
          </Col>
          <Col span={12} style={styles.alingText}>
            <Text strong>Total Encontrados:</Text> {data?.receipts?.totalDocs || 0}{' '}
            <Text strong>Páginas: </Text> {data?.receipts?.page || 0} /{' '}
            {data?.receipts?.totalPages || 0}
          </Col>
          <Col span={24}>
            <Table
              columns={column}
              dataSource={data?.receipts.docs}
              loading={paramsUpdate.loading || loading}
              scroll={{ x: 900 }}
              onChange={handleChangeTable}
              pagination={{
                current: data?.receipts?.page,
                total: data?.receipts?.totalDocs,
                showSizeChanger: false,
              }}
            />
          </Col>
        </Row>
      </Card>
      <CashReceiptForm visible={visibleModalCreate} onCancel={closeModalCreate} />
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
      <div style={{ display: 'none' }}>
        <ReportReceipt ref={reportRef} data={{ receipt: dataReceipt }} />
      </div>
    </PageContainer>
  );
};

export default CashReceiptList;
