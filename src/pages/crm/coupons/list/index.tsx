/* eslint-disable react-hooks/exhaustive-deps */
import {
  BorderlessTableOutlined,
  CalendarOutlined,
  ClearOutlined,
  CloseSquareFilled,
  DollarCircleOutlined,
  FieldNumberOutlined,
  MoreOutlined,
  PlusOutlined,
  PrinterFilled,
  SearchOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { TablePaginationConfig } from 'antd';
import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Row,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import type { ColumnsType, SorterResult } from 'antd/es/table/interface';
import numeral from 'numeral';
import type { Location } from 'umi';
import { useLocation, history } from 'umi';
import { useAccess } from 'umi';
import moment from 'moment';
import { useGetCoupons, useUpdateCoupon } from '@/hooks/coupon.hooks';
import type { Coupon, FiltersCouponsInput } from '@/graphql/graphql';
import { StatusCoupon } from '@/graphql/graphql';
import { useEffect, useRef, useState } from 'react';

import AlertInformation from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import Filters from '@/components/Filters';
import { StatusTypeCoupon } from '../coupon.data';
import CouponForm from '../form';

import styles from '../styles';
import ReportCoupon from '../report/coupon';
import { useReactToPrint } from 'react-to-print';

const { Text } = Typography;
const FormItem = Form.Item;

type FormValues = {
  code?: string;
  number?: number;
};

const CouponList = () => {
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [filterTable, setFilterTable] = useState<Record<string, any | null>>({});
  const [visibleForm, setVisibleForm] = useState(false);
  const [dataCoupon, setDataCoupon] = useState<Partial<Coupon>>({});

  const [form] = Form.useForm();
  const location: Location = useLocation();

  const {
    coupon: { canCreate, canEdit, canPrint },
  } = useAccess();

  const reportRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => reportRef?.current,
  });

  const printCoupon = async (record: Partial<Coupon>) => {
    await setDataCoupon(record);
    handlePrint();
  };

  const [getCoupons, paramsGetCoupons] = useGetCoupons();
  const [updateCoupon, paramsUpdateCoupon] = useUpdateCoupon();

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
   * @description cierra el formulario de creacion
   */
  const onCloseForm = () => {
    setVisibleForm(false);
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
   * @description ejecuta la consulta para obtener los cupones
   * @param filters filtros para realizar la consulta
   */
  const onSearch = (filters?: FiltersCouponsInput) => {
    getCoupons({
      variables: {
        input: {
          limit: 10,
          ...filters,
          sort: {
            ...filters?.sort,
            createdAt: -1,
          },
        },
      },
    });
  };

  /**
   * @description se encarga de señalar los datos a la query
   * @param values valores para enviar a la query
   */
  const setQueryParams = (values?: FiltersCouponsInput) => {
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
    const params: FiltersCouponsInput = {
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
    sorter: SorterResult<Partial<Coupon>> | any,
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
   * @description actualiza el estado del cupon
   * @param id identificador del cupon
   */
  const cancelCoupon = async (id: string) => {
    try {
      const response = await updateCoupon({
        variables: {
          input: { status: StatusCoupon.Inactive },
          id: id,
        },
      });
      if (response?.data?.updateCoupon) {
        setAlertInformation({
          message: `Cupón No ${response?.data?.updateCoupon?.number} actualizado correctamente`,
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

  const columns: ColumnsType<Coupon> = [
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
          <DollarCircleOutlined /> Valor
        </Text>
      ),
      align: 'center',
      dataIndex: 'value',
      render: (value: number) => numeral(value).format('$ 0,0'),
    },
    {
      title: (
        <>
          <BorderlessTableOutlined /> Código
        </>
      ),
      dataIndex: 'code',
      align: 'center',
      render: (code: string) => <Tag style={styles.tagStyle}>{code}</Tag>,
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      align: 'center',
      filteredValue: filterTable?.status || null,
      render: (status: string) => {
        const { color, label } = StatusTypeCoupon[status || ''];
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
              text: 'Inactivo',
              value: 'INACTIVE',
            },
            {
              text: 'Redimido',
              value: 'REDEEMED',
            },
          ]}
        />
      ),
    },
    {
      title: (
        <>
          <CalendarOutlined /> Expiración
        </>
      ),
      dataIndex: 'expiration',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      render: (expiration: Date) => moment(expiration).format(FORMAT_DATE),
    },
    {
      title: (
        <>
          <CalendarOutlined /> Fecha
        </>
      ),
      dataIndex: 'updatedAt',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      render: (updatedAt: Date) => moment(updatedAt).format(FORMAT_DATE),
    },
    {
      title: (
        <>
          <MoreOutlined /> Opción
        </>
      ),
      dataIndex: '_id',
      align: 'center',
      render: (_, couponId) => (
        <Space>
          <Tooltip title="Imprimir" placement="topLeft">
            <Button
              disabled={!canPrint}
              type="primary"
              icon={<PrinterFilled />}
              onClick={() => printCoupon(couponId)}
            />
          </Tooltip>
          <Tooltip title="Anular">
            <Popconfirm
              title="¿Esta seguro que desea anular?"
              okText="Si"
              cancelText="No"
              disabled={couponId.status === StatusCoupon.Inactive}
              onConfirm={() => cancelCoupon(couponId._id)}
            >
              <Button
                danger
                loading={paramsGetCoupons?.loading || paramsUpdateCoupon?.loading}
                disabled={
                  paramsGetCoupons?.loading ||
                  paramsUpdateCoupon?.loading ||
                  couponId.status === StatusCoupon.Inactive ||
                  !canEdit
                }
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
            <Col xs={24} md={8} lg={7} xl={6}>
              <FormItem label="Número" name="number">
                <InputNumber
                  style={styles.maxWidth}
                  controls={false}
                  disabled={paramsGetCoupons?.loading || paramsUpdateCoupon?.loading}
                  placeholder="Número del cupón"
                />
              </FormItem>
            </Col>
            <Col xs={24} md={8} lg={8} xl={6}>
              <FormItem label="Código" name="code">
                <Input
                  placeholder="Ingrese código exacto"
                  disabled={paramsGetCoupons?.loading || paramsUpdateCoupon?.loading}
                />
              </FormItem>
            </Col>
            <Col xs={24} md={7} lg={7} xl={7}>
              <Space>
                <Button
                  style={styles.buttonR}
                  loading={paramsGetCoupons?.loading}
                  disabled={paramsGetCoupons?.loading || paramsUpdateCoupon?.loading}
                  icon={<SearchOutlined />}
                  type="primary"
                  htmlType="submit"
                >
                  Buscar
                </Button>
                <Button
                  loading={paramsGetCoupons?.loading}
                  style={styles.buttonR}
                  disabled={paramsGetCoupons?.loading || paramsUpdateCoupon?.loading}
                  icon={<ClearOutlined />}
                  onClick={onClear}
                >
                  Limpiar
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
        <Row gutter={[0, 20]} align="middle" style={styles.marginFilter}>
          <Col xs={12} md={15} lg={16}>
            <Button
              icon={<PlusOutlined />}
              type="primary"
              disabled={paramsGetCoupons?.loading || paramsUpdateCoupon?.loading || !canCreate}
              shape="round"
              onClick={() => setVisibleForm(true)}
            >
              Nuevo
            </Button>
          </Col>
          <Col xs={12} md={9} lg={8} style={styles.textAlign}>
            <Text strong>Total Encontrados:</Text> {paramsGetCoupons?.data?.coupons?.totalDocs}{' '}
            <Text strong>Páginas: </Text> {paramsGetCoupons?.data?.coupons?.page} /{' '}
            {paramsGetCoupons.data?.coupons?.totalPages}
          </Col>
          <Col span={24}>
            <Table
              onChange={handleChangeTable}
              columns={columns}
              dataSource={paramsGetCoupons?.data?.coupons?.docs}
              scroll={{ x: 'auto' }}
              pagination={{
                current: paramsGetCoupons?.data?.coupons?.page,
                total: paramsGetCoupons?.data?.coupons?.totalDocs,
                showSizeChanger: false,
              }}
            />
          </Col>
        </Row>
      </Card>
      <CouponForm onCancel={onCloseForm} visible={visibleForm} />
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
      <div style={{ display: 'none' }}>
        <ReportCoupon ref={reportRef} data={dataCoupon} />
      </div>
    </PageContainer>
  );
};

export default CouponList;
