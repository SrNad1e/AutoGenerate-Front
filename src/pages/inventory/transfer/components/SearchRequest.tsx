/* eslint-disable react-hooks/exhaustive-deps */
import { Badge, Button, Col, Form, InputNumber, Modal, Row, Space, Switch, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table/interface';
import { SearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';
import moment from 'moment';

import { useGetRequests } from '@/hooks/request.hooks';
import SelectWarehouses from '@/components/SelectWarehouses';
import type {
  DetailRequest,
  Warehouse,
  StockRequest,
  FiltersStockRequestsInput,
} from '@/graphql/graphql';
import { StatusStockRequest } from '@/graphql/graphql';
import { StatusType } from '../../request/request.data';
import AlertInformation from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';

const FormItem = Form.Item;

export type Params = {
  requests: StockRequest[];
  visible: boolean;
  onCancel: () => void;
  onOk: (requests: StockRequest[]) => void;
};

type FormValues = {
  number: number;
  warehouseId: string;
  all?: boolean;
};

const SearchRequest = ({ requests, visible, onCancel, onOk }: Params) => {
  const [requestsSelected, setRequestSelected] = useState<StockRequest[]>([]);
  const [keysSelected, setKeysSelected] = useState<React.Key[]>([]);
  const [propsAlertInformation, setPropsAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const { initialState } = useModel('@@initialState');

  const [getRequests, { data, loading }] = useGetRequests();

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
   * @description consulta las solicitudes
   * @param values filtros del formulario
   */
  const onSearch = (values?: FiltersStockRequestsInput) => {
    try {
      getRequests({
        variables: {
          input: {
            ...values,
            warehouseOriginId: initialState?.currentUser?.shop?.defaultWarehouse?._id,
          },
        },
      });
    } catch (error: any) {
      messageError(error?.mesage);
    }
  };

  /**
   * @description selecciona las solicitudes y las almacena en un array
   */
  const onSelect = () => {
    const newRequests = requestsSelected.filter(
      (item) => !requests?.find((request) => request?._id === item?._id),
    );

    onOk(newRequests);
  };

  /**
   * @description consulta las solicitudes en base a los filtros
   * @param values filtros del formulario
   */
  const onFinish = (values: FormValues) => {
    const filters: FiltersStockRequestsInput = {};

    if (!values?.all) {
      filters.status = StatusStockRequest.Pending;
    }

    delete values.all;

    if (values?.warehouseId) {
      delete values.warehouseId;
    }

    onSearch({ ...filters, ...values });
  };

  const rowSelection = {
    type: 'checkbox',
    selectedRowKeys: keysSelected,
    onChange: (selectedRowKeys: React.Key[], selectedRows: StockRequest[]) => {
      setKeysSelected(selectedRowKeys);

      setRequestSelected(selectedRows);
    },
    getCheckboxProps: (record: StockRequest) => ({
      disabled: !!requests?.find((request) => request?._id === record?._id),
    }),
  };

  useEffect(() => {
    onSearch({ status: StatusStockRequest.Pending });
  }, []);

  const columns: ColumnsType<StockRequest> = [
    {
      title: 'Número',
      dataIndex: 'number',
      align: 'center',
    },
    {
      title: 'Origen',
      dataIndex: 'warehouseDestination',
      align: 'center',
      render: (warehouseDestination: Warehouse) => warehouseDestination?.name,
    },
    {
      title: 'Referencias',
      dataIndex: 'details',
      align: 'center',
      render: (details: DetailRequest[]) => details?.length,
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      align: 'center',
      render: (status: string) => {
        const { color, label } = StatusType[status || ''];
        return <Badge text={label} color={color} />;
      },
    },
    {
      title: 'Creado',
      dataIndex: 'createdAt',
      align: 'center',
      render: (createdAt: Date) => moment(createdAt).format(FORMAT_DATE),
    },
  ];

  return (
    <Modal
      onOk={onSelect}
      onCancel={onCancel}
      visible={visible}
      width={1000}
      okText="Seleccionar"
      cancelText="Salir"
      okButtonProps={{ style: { borderRadius: 5 } }}
      cancelButtonProps={{ style: { borderRadius: 5 } }}
    >
      <Space size="middle" style={{ width: '100%' }} direction="vertical">
        <Form layout="horizontal" onFinish={onFinish}>
          <Row gutter={20} align="middle">
            <Col xs={12} md={4}>
              <FormItem label="Número" name="number">
                <InputNumber
                  style={{ width: '80%' }}
                  disabled={loading}
                  autoFocus
                  controls={false}
                />
              </FormItem>
            </Col>
            <Col xs={12} md={9}>
              <FormItem label="Bodega que solicita" name="warehouseId">
                <SelectWarehouses disabled={loading} />
              </FormItem>
            </Col>
            <Col xs={24} md={5}>
              <FormItem label="Todas" valuePropName="checked" name="all">
                <Switch loading={loading} />
              </FormItem>
            </Col>
            <Col xs={12} md={3}>
              <FormItem label="">
                <Button
                  loading={loading}
                  htmlType="submit"
                  icon={<SearchOutlined />}
                  style={{ borderRadius: 5 }}
                  type="primary"
                >
                  Buscar
                </Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Table
          rowKey="_id"
          loading={loading}
          dataSource={data?.stockRequests?.docs as any}
          rowSelection={rowSelection as any}
          columns={columns}
        />
      </Space>
      <AlertInformation {...propsAlertInformation} onCancel={closeAlertInformation} />
    </Modal>
  );
};

export default SearchRequest;
