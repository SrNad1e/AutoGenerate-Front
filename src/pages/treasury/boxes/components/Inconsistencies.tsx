/* eslint-disable react-hooks/exhaustive-deps */
import {
  CalendarOutlined,
  ClearOutlined,
  DislikeOutlined,
  DollarOutlined,
  FieldNumberOutlined,
  LikeOutlined,
  MoreOutlined,
  ProfileOutlined,
  SearchOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import { Badge, Button, Col, Form, InputNumber, Modal, Row, Space, Table, Typography } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import { useEffect, useState } from 'react';
import type { CloseZInvoicing, FiltersClosesZInvoicingInput } from '@/graphql/graphql';
import { VerifiedClose } from '@/graphql/graphql';
import numeral from 'numeral';

import AlertInformation from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import moment from 'moment';
import Reason from './reason';
import { useGetClosesZInvoicing } from '@/hooks/closeZInvoicing.hooks';
import Filters from '@/components/Filters';
import SelectShop from '@/components/SelectShop';

const FormItem = Form.Item;
const { Text } = Typography;

type Props = {
  visible: boolean;
  onCancel: () => void;
};

type FormValues = {
  number?: number;
  value?: number;
  verifiedStatus?: VerifiedClose;
  shopId?: string;
  closeDate?: string;
};

const BoxInconsistencies = ({ onCancel, visible }: Props) => {
  const [visibleProducts, setVisibleProducts] = useState(false);
  const [closeData, setCloseData] = useState<CloseZInvoicing>();
  const [propsAlertInformation, setPropsAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const [getCloseZ, { data, loading }] = useGetClosesZInvoicing();

  const [form] = Form.useForm();

  /**
   * @description funcion usada para almacenar los datos de la transferencia erronea en el estado y abrir el modal de productos
   * @param dataT datos de la trasnferencia con error
   */
  const onOpenProducts = (dataClose: CloseZInvoicing) => {
    setCloseData(dataClose);
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
  const onSearch = async (params?: FiltersClosesZInvoicingInput) => {
    try {
      await getCloseZ({
        variables: {
          input: {
            ...params,
            sort: {
              createdAt: -1,
            },
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
    const { verifiedStatus, shopId, number, closeDate, value } = props;
    try {
      const params: FiltersClosesZInvoicingInput = {
        page: pageCurrent || 1,
        limit: 10,
        verifiedStatus: verifiedStatus,
        closeDate,
        shopId,
        number,
        value,
        sort: { createdAt: -1 },
      };
      onSearch({ ...params });
      form.setFieldsValue(props);
    } catch (e: any) {
      messageError(e?.message);
    }
  };

  /**
   * @descripcion controla el onchange de la tabla
   * @param paginationLocal eventos de la paginacion
   */
  const handleChangeTable = (
    paginationLocal: TablePaginationConfig,
    filterArg: Record<string, any>,
  ) => {
    const params = form.getFieldsValue(['number', 'shopId']);
    const closeValue = form.getFieldValue('value');
    const { current } = paginationLocal;
    const filters = { ...filterArg };

    Object.keys(filters).forEach((i) => {
      if (filters[i] === null) {
        delete filters[i];
      } else {
        filters[i] = filters[i][0];
      }
    });
    try {
      onFinish({ ...params, ...filters, value: closeValue }, current);
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
      onSearch();
    } catch (error: any) {
      messageError(error?.message);
    }
  }, []);

  const columns: ColumnsType<CloseZInvoicing> = [
    {
      title: (
        <Text>
          <FieldNumberOutlined /> Cierre
        </Text>
      ),
      dataIndex: 'closeZ',
      showSorterTooltip: false,
      align: 'center',
      render: (_, closeZ: CloseZInvoicing) => `${closeZ?.prefix} ${closeZ?.number}`,
    },
    {
      title: <Text>{<ShopOutlined />} Punto de Venta</Text>,
      dataIndex: 'closeZ',
      align: 'center',
      render: (_, closeZ: CloseZInvoicing) => closeZ?.pointOfSale?.name,
    },
    {
      title: <Text>{<ProfileOutlined />} Estado</Text>,
      dataIndex: 'verifiedStatus',
      align: 'center',
      render: (verifiedStatus: VerifiedClose) => {
        return verifiedStatus === VerifiedClose.Verified ? (
          <Badge count={<LikeOutlined />} text={'Verificado'} />
        ) : (
          <Badge count={<DislikeOutlined />} text={'Sin Verificar'} />
        );
      },
      filterDropdown: (props) => (
        <Filters
          props={props}
          data={[
            {
              text: 'Verificado',
              value: 'VERIFIED',
            },
            {
              text: 'Sin Verificar',
              value: 'UNVERIFIED',
            },
          ]}
        />
      ),
    },
    {
      title: <Text>{<DollarOutlined />} Valor</Text>,
      dataIndex: 'summaryOrder',
      align: 'center',
      render: (total) => numeral(total?.value).format('$ 0,0'),
    },
    {
      title: <Text>{<CalendarOutlined />} Ultima Actualización</Text>,
      dataIndex: 'closeDate',
      showSorterTooltip: false,
      align: 'center',
      render: (updatedAt: Date) => moment(updatedAt).format(FORMAT_DATE),
    },
    {
      title: <Text>{<MoreOutlined />} Opciones</Text>,
      dataIndex: '_id',
      align: 'center',
      fixed: 'right',
      render: (_, closeZ) => {
        return (
          <Button
            icon={<LikeOutlined />}
            onClick={() => onOpenProducts(closeZ)}
            type="primary"
            loading={loading}
            disabled={closeZ?.verifiedStatus === VerifiedClose.Verified}
            style={{ borderRadius: 5 }}
          >
            {closeZ?.verifiedStatus === VerifiedClose.Verified ? 'Verificado' : 'Verificar'}
          </Button>
        );
      },
    },
  ];

  return (
    <Modal
      title="Cuadre de Cajas"
      onCancel={onCancel}
      open={visible}
      destroyOnClose
      width={1200}
      footer={
        <Button onClick={onCancel} style={{ borderRadius: 5 }} loading={loading}>
          Cerrar
        </Button>
      }
    >
      <Form form={form} onFinish={onFinish}>
        <Row gutter={20} justify="start" align={'middle'}>
          <Col span={24}>
            <Row>
              <Col span={3}>
                <Typography.Text>Número de Cierre</Typography.Text>
              </Col>
              <Col span={2}>
                <Typography.Text>Tienda</Typography.Text>
              </Col>
              <Col style={{ marginLeft: '8.7%' }} offset={2}>
                <Typography.Text>Valor del Cierre</Typography.Text>
              </Col>
            </Row>
          </Col>
          <Col xs={24} md={5} lg={3}>
            <FormItem name="number">
              <InputNumber
                placeholder="# de cierre"
                style={{ width: '100%' }}
                autoFocus
                disabled={loading}
                controls={false}
              />
            </FormItem>
          </Col>
          <Col xs={24} md={5} lg={4}>
            <FormItem name="shopId">
              <SelectShop disabled={loading} />
            </FormItem>
          </Col>
          <Col xs={24} md={4} lg={5}>
            <FormItem name="value">
              <InputNumber
                style={{ width: '80%' }}
                disabled={loading}
                controls={false}
                step={100}
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
                placeholder="Ejem: 10"
              />
            </FormItem>
          </Col>
          <Col xs={24} md={7} lg={3}>
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
        dataSource={data?.closesZInvoicing?.docs}
        pagination={{
          current: data?.closesZInvoicing?.page,
          total: data?.closesZInvoicing?.totalDocs,
          showSizeChanger: false,
        }}
        onChange={handleChangeTable}
        loading={loading}
        scroll={{ x: 'auto' }}
      />
      <AlertInformation {...propsAlertInformation} onCancel={closeAlertInformation} />
      <Reason
        onSearch={onSearch}
        closeZData={closeData}
        visible={visibleProducts}
        onCancel={() => setVisibleProducts(false)}
      />
    </Modal>
  );
};

export default BoxInconsistencies;
