/* eslint-disable react-hooks/exhaustive-deps */
import {
  CalendarOutlined,
  ClearOutlined,
  DropboxOutlined,
  EyeOutlined,
  FieldNumberOutlined,
  MoreOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Col, Form, Modal, Row, Space, Switch, Table, Typography } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useGetTransfersError } from '@/hooks/transfer.hooks';
import type {
  DetailTransferError,
  FiltersStockTransfersErrorInput,
  StockTransfer,
  StockTransferError,
} from '@/graphql/graphql';

import TransferProducts from './TransferProducts';
import AlertInformation from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';

const FormItem = Form.Item;
const { Text } = Typography;

type Props = {
  visible: boolean;
  onCancel: () => void;
};

type FormValues = {
  verifield: boolean;
};

const Inconsistencies = ({ onCancel, visible }: Props) => {
  const [visibleProducts, setVisibleProducts] = useState(false);
  const [dataTransfer, setDataTransfer] = useState<DetailTransferError>();
  const [propsAlertInformation, setPropsAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const [getTransfersError, paramsGetTransfersError] = useGetTransfersError();

  const [form] = Form.useForm();

  /**
   * @description funcion usada para almacenar los datos de la transferencia erronea en el estado y abrir el modal de productos
   * @param dataT datos de la trasnferencia con error
   */
  const onOpenProducts = (dataT: StockTransferError) => {
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
  const onSearch = (params?: FiltersStockTransfersErrorInput) => {
    try {
      getTransfersError({
        variables: {
          input: {
            ...params,
            sort: { updatedAt: -1 },
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
    const { verifield } = props;
    try {
      const params: FiltersStockTransfersErrorInput = {
        page: pageCurrent || 1,
        limit: 10,
        verifield: verifield || false,
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
      onSearch({ verifield: false });
    } catch (error: any) {
      messageError(error?.message);
    }
  }, []);

  const columns: ColumnsType<StockTransferError> = [
    {
      title: (
        <Text style={{ fontSize: 20 }}>
          <FieldNumberOutlined />
        </Text>
      ),
      dataIndex: 'stockTransfer',
      showSorterTooltip: false,
      align: 'center',
      render: (stockTransfer: StockTransfer) => stockTransfer?.number,
    },
    {
      title: <Text>{<DropboxOutlined />} Origen</Text>,
      dataIndex: 'stockTransfer',
      align: 'center',
      render: (stockTransfer: StockTransfer) => stockTransfer?.warehouseOrigin?.name,
    },
    {
      title: <Text>{<DropboxOutlined />} Destino</Text>,
      dataIndex: 'stockTransfer',
      align: 'center',
      render: (stockTransfer: StockTransfer) => stockTransfer?.warehouseDestination?.name,
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
      render: (_, transfer) => {
        return (
          <Button
            icon={<EyeOutlined />}
            onClick={() => onOpenProducts(transfer)}
            type="primary"
            loading={paramsGetTransfersError?.loading}
            style={{ borderRadius: 5 }}
          >
            Ver
          </Button>
        );
      },
    },
  ];

  return (
    <Modal
      title="Traslados Inconsistentes"
      onCancel={onCancel}
      visible={visible}
      destroyOnClose
      width={1040}
      footer={
        <Button
          onClick={onCancel}
          style={{ borderRadius: 5 }}
          loading={paramsGetTransfersError?.loading}
        >
          Cerrar
        </Button>
      }
    >
      <Form form={form} onFinish={onFinish}>
        <Row gutter={20}>
          <Col>
            <FormItem label="Verificado" name="verifield">
              <Switch />
            </FormItem>
          </Col>
          <Col>
            <FormItem>
              <Space>
                <Button
                  icon={<SearchOutlined />}
                  type="primary"
                  htmlType="submit"
                  style={{ borderRadius: 5 }}
                  loading={paramsGetTransfersError?.loading}
                >
                  Buscar
                </Button>
                <Button
                  icon={<ClearOutlined />}
                  loading={paramsGetTransfersError?.loading}
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
        dataSource={paramsGetTransfersError?.data?.stockTransfersError?.docs}
        pagination={{
          current: paramsGetTransfersError?.data?.stockTransfersError?.page,
          total: paramsGetTransfersError?.data?.stockTransfersError?.totalDocs,
          showSizeChanger: false,
        }}
        onChange={handleChangeTable}
        loading={paramsGetTransfersError?.loading}
        scroll={{ x: 'auto' }}
      />
      <TransferProducts
        loading={paramsGetTransfersError.loading}
        data={dataTransfer}
        visible={visibleProducts}
        onCancel={() => setVisibleProducts(false)}
      />
      <AlertInformation {...propsAlertInformation} onCancel={closeAlertInformation} />
    </Modal>
  );
};

export default Inconsistencies;
