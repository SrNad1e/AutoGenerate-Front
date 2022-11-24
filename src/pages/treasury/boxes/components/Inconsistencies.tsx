/* eslint-disable react-hooks/exhaustive-deps */
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CalendarOutlined,
  ClearOutlined,
  DollarOutlined,
  FieldNumberOutlined,
  LikeOutlined,
  MoreOutlined,
  ProfileOutlined,
  SearchOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import {
  Badge,
  Button,
  Col,
  Form,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Switch,
  Table,
  Typography,
} from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import { useEffect, useState } from 'react';
import type { Box, CloseZInvoicing, ErrorCash, FiltersErrorsCashInput } from '@/graphql/graphql';
import { TypeErrorCash } from '@/graphql/graphql';
import numeral from 'numeral';

import AlertInformation from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import { useGetErrorCash } from '@/hooks/box.hooks';
import { StatusType } from './boxes.data';
import moment from 'moment';
import Reason from './reason';

const { Option } = Select;
const FormItem = Form.Item;
const { Text } = Typography;

type Props = {
  visible: boolean;
  onCancel: () => void;
};

type FormValues = {
  closeZNumber?: number;
  verified?: boolean;
  value?: number;
  typeError?: string;
};

const BoxInconsistencies = ({ onCancel, visible }: Props) => {
  const [visibleProducts, setVisibleProducts] = useState(false);
  const [details, setDetails] = useState();
  const [dataTransfer, setDataTransfer] = useState<ErrorCash>();
  const [propsAlertInformation, setPropsAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const [getErrorCash, { data, loading }] = useGetErrorCash();

  const [form] = Form.useForm();

  /**
   * @description funcion usada para almacenar los datos de la transferencia erronea en el estado y abrir el modal de productos
   * @param dataT datos de la trasnferencia con error
   */
  const onOpenProducts = (dataT: ErrorCash) => {
    setDataTransfer(dataT);
    setVisibleProducts(true);
  };

  /**
   * @description funcion usada por los hook para mostrar los errores
   * @param message mensaje de error a mostrar
   */
  const messageError = (message: string) => {
    setPropsAlertInformation({
      message,
      type: 'error',
      visible: true,
    });
  };

  /**
   * @description se encarga de cerrar la alerta informativa
   */
  const closeAlertInformation = () => {
    setPropsAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  /**
   * @description se encarga de ejecutar la funcion para obtener los traslados
   * @param params filtros necesarios para la busqueda
   */
  const onSearch = (params?: FiltersErrorsCashInput) => {
    try {
      getErrorCash({
        variables: {
          input: {
            ...params,
          },
        },
      });
    } catch (error: any) {
      messageError(error?.message);
    }
  };

  /**
   * @description se encarga de realizar el proceso de busqueda con los filtros
   * @param props filtros seleccionados en el formulario
   */
  const onFinish = (props: FormValues, pageCurrent?: number) => {
    const { verified, typeError, closeZNumber, value } = props;
    try {
      const params: FiltersErrorsCashInput = {
        page: pageCurrent || 1,
        limit: 10,
        verified: verified,
        closeZNumber,
        typeError: typeError as TypeErrorCash,
        value,
      };

      onSearch(params);
      form.setFieldsValue(props);
    } catch (e: any) {
      messageError(e?.message);
    }
  };

  /**
   * @descripcion controla el onchange de la tabla
   * @param paginationLocal eventos de la paginacion
   */
  const handleChangeTable = (paginationLocal: TablePaginationConfig) => {
    const params = form.getFieldsValue();
    const { current } = paginationLocal;
    try {
      onFinish(params, current);
    } catch (error: any) {
      messageError(error?.message);
    }
  };

  /**
   * @description se encarga de limpiar los estados e inicializarlos
   */
  const onClear = () => {
    try {
      onSearch({});
      form.resetFields();
    } catch (error: any) {
      messageError(error?.message);
    }
  };

  useEffect(() => {
    try {
      onSearch({ verified: false });
    } catch (error: any) {
      messageError(error?.message);
    }
  }, []);

  useEffect(() => {
    setDetails(data?.errorsCash?.docs);
  }, [data]);

  const columns: ColumnsType<ErrorCash> = [
    {
      title: (
        <Text>
          <FieldNumberOutlined /> Cierre
        </Text>
      ),
      dataIndex: 'closeZ',
      showSorterTooltip: false,
      align: 'center',
      render: (closeZ: CloseZInvoicing) => closeZ?.number,
    },
    {
      title: <Text>{<ShopOutlined />} Punto de Venta</Text>,
      dataIndex: 'closeZ',
      align: 'center',
      render: (closeZ: CloseZInvoicing) => closeZ?.pointOfSale?.name,
    },
    {
      title: <Text>{<ProfileOutlined />} Caja Origen</Text>,
      dataIndex: 'boxOrigin',
      align: 'center',
      render: (boxOrigin: Box) => boxOrigin?.name,
    },
    {
      title: <Text>{<ProfileOutlined />} Caja Destino</Text>,
      dataIndex: 'boxDestination',
      align: 'center',
      render: (boxDestination: Box) => boxDestination?.name,
    },
    {
      title: <Text>{<ProfileOutlined />} Tipo</Text>,
      dataIndex: 'typeError',
      align: 'center',
      render: (typeError: TypeErrorCash, errorCash) => {
        return errorCash?.verified === true ? (
          <Badge count={<LikeOutlined />} text={'Verificado'} />
        ) : (
          <Badge
            count={
              typeError === TypeErrorCash.Missing ? (
                <ArrowDownOutlined />
              ) : (
                typeError === TypeErrorCash.Surplus && <ArrowUpOutlined />
              )
            }
            text={StatusType[typeError]?.text}
          />
        );
      },
    },
    {
      title: <Text>{<DollarOutlined />} Valor</Text>,
      dataIndex: 'value',
      align: 'center',
      render: (value: number) => numeral(value).format('$ 0,0'),
    },
    {
      title: <Text>{<CalendarOutlined />} Ultima Actualización</Text>,
      dataIndex: 'updatedAt',
      showSorterTooltip: false,
      align: 'center',
      render: (updatedAt: Date) => moment(updatedAt).format(FORMAT_DATE),
    },
    {
      title: <Text>{<MoreOutlined />} Opciones</Text>,
      dataIndex: '_id',
      align: 'center',
      fixed: 'right',
      render: (_, errorCash) => {
        return (
          <Button
            icon={<LikeOutlined />}
            onClick={() => onOpenProducts(errorCash)}
            type="primary"
            loading={loading}
            disabled={errorCash?.verified === true}
            style={{ borderRadius: 5 }}
          >
            {errorCash?.verified === true ? 'Verificado' : 'Verificar'}
          </Button>
        );
      },
    },
  ];

  return (
    <Modal
      title="Cuadre de Cajas"
      onCancel={onCancel}
      visible={visible}
      destroyOnClose
      width={1040}
      footer={
        <Button onClick={onCancel} style={{ borderRadius: 5 }} loading={loading}>
          Cerrar
        </Button>
      }
    >
      <Form form={form} onFinish={onFinish}>
        <Row gutter={20}>
          <Col xs={24} md={7} lg={5}>
            <FormItem label="Número de Cierre" name="closeZNumber">
              <InputNumber
                style={{ width: '100%' }}
                autoFocus
                disabled={loading}
                controls={false}
              />
            </FormItem>
          </Col>
          <Col xs={24} md={7} lg={6}>
            <FormItem label="Valor del Cierre" name="value">
              <InputNumber
                style={{ width: '100%' }}
                disabled={loading}
                step={100}
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
                placeholder="Ejem: 10"
              />
            </FormItem>
          </Col>
          <Col xs={24} md={6} lg={5}>
            <FormItem label="Tipo" name="typeError">
              <Select allowClear disabled={loading}>
                {Object.keys(StatusType).map((key) => (
                  <Option key={key}>
                    <Badge text={StatusType[key].text} color={StatusType[key].color} />
                  </Option>
                ))}
              </Select>
            </FormItem>
          </Col>
          <Col xs={24} md={4} lg={3}>
            <FormItem label="Verificado" name="verified">
              <Switch />
            </FormItem>
          </Col>
          <Col xs={24} md={24} lg={3}>
            <FormItem>
              <Space>
                <Button
                  icon={<SearchOutlined />}
                  type="primary"
                  htmlType="submit"
                  style={{ borderRadius: 5 }}
                  loading={loading}
                >
                  Buscar
                </Button>
                <Button
                  icon={<ClearOutlined />}
                  loading={loading}
                  style={{ borderRadius: 5 }}
                  onClick={() => onClear()}
                >
                  Limpiar
                </Button>
              </Space>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <Table
        columns={columns}
        dataSource={details}
        pagination={{
          current: data?.errorsCash?.page,
          total: data?.errorsCash?.totalDocs,
          showSizeChanger: false,
        }}
        onChange={handleChangeTable}
        loading={loading}
        scroll={{ x: 'auto' }}
      />
      <AlertInformation {...propsAlertInformation} onCancel={closeAlertInformation} />
      <Reason
        setDetails={setDetails}
        errorCashId={dataTransfer?._id}
        visible={visibleProducts}
        onCancel={() => setVisibleProducts(false)}
      />
    </Modal>
  );
};

export default BoxInconsistencies;
