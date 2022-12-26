/* eslint-disable react-hooks/exhaustive-deps */
import { Badge, Button, Col, Form, InputNumber, Modal, Row, Space, Switch, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table/interface';
import { SearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import moment from 'moment';

import { useGetRequests } from '@/hooks/request.hooks';
import SelectWarehouses from '@/components/SelectWarehouses';
import type {
  DetailRequest,
  Warehouse,
  StockRequest,
  FiltersStockRequestsInput,
  StockTransfer,
} from '@/graphql/graphql';
import { StatusStockRequest } from '@/graphql/graphql';
import { StatusType } from '../../request/request.data';
import AlertInformation from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import ConfirmRequest from './confirmRequest';

const FormItem = Form.Item;

export type Params = {
  transfer?: Partial<StockTransfer>;
  requests: StockRequest[];
  visible: boolean;
  onCancel: () => void;
  onOk: (requests: StockRequest[]) => void;
  setDetailRequest: any;
  detailRequest: any;
  visibleConfirmRequest: boolean;
  setVisibleConfirmRequest: any;
  setDetails: any;
  setRequests: any;
  details: any;
};

type FormValues = {
  number: number;
  warehouseId: string;
  all?: boolean;
};

const SearchRequest = ({
  requests,
  visible,
  onCancel,
  onOk,
  transfer,
  detailRequest,
  setDetailRequest,
  visibleConfirmRequest,
  setVisibleConfirmRequest,
  setDetails,
  setRequests,
  details,
}: Params) => {
  const [requestsSelected, setRequestSelected] = useState<StockRequest[]>([]);
  const [keysSelected, setKeysSelected] = useState<React.Key[]>([]);
  const [propsAlertInformation, setPropsAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [used, setUsed] = useState<any[]>([]);
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

  const onCloseConfirm = () => {
    setVisibleConfirmRequest(false);
    setDetailRequest([]);
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
          },
        },
      });
    } catch (error: any) {
      messageError(error?.mesage);
    }
  };

  const onSearchPendings = () => {
    try {
      onSearch({
        warehouseDestinationId: transfer?.warehouseDestination?._id,
        status: StatusStockRequest.Pending,
        sort: {
          createdAt: -1,
        },
      });
    } catch (error: any) {
      messageError(error?.message);
    }
  };
  /**
   * @description selecciona las solicitudes y las almacena en un array
   */
  const onSelect = async () => {
    setVisibleConfirmRequest(true);
    try {
      await onOk(requestsSelected);
    } catch (error: any) {
      messageError(error?.message);
    }
  };

  /**
   * @description consulta las solicitudes en base a los filtros
   * @param values filtros del formulario
   */
  const onFinish = (values: FormValues) => {
    const filters: FiltersStockRequestsInput = {};
    try {
      if (!values?.all) {
        filters.status = StatusStockRequest.Pending;
        filters.warehouseDestinationId = transfer?.warehouseDestination?._id;
      }

      delete values.all;

      if (values?.warehouseId) {
        filters.warehouseDestinationId = values?.warehouseId;
        delete values.warehouseId;
      }

      onSearch({ ...filters, ...values });
    } catch (error: any) {
      messageError(error?.message);
    }
  };

  const arr: StockRequest[] = [];
  const rowSelection = {
    type: 'checkbox',
    selectedRowKeys: keysSelected,
    onChange: (selectedRowKeys: React.Key[], selectedRows: StockRequest[]) => {
      setKeysSelected(selectedRowKeys);
      setRequestSelected(selectedRows);
      if (used.length > 0) {
        for (let i = 0; i < selectedRows.length; i++) {
          if (selectedRows[i]._id !== used[i]) {
            arr.push(selectedRows[i]);
          }
        }
        setRequestSelected(arr);
      }
    },
    getCheckboxProps: (record: StockRequest) => ({
      disabled: used.includes(record?._id) || !!requests.find((item) => item._id === record._id),
    }),
  };

  useEffect(() => {
    onSearchPendings();
    if (visible === false) {
      setKeysSelected([]);
    }
  }, [visible]);

  useEffect(() => {
    console.log(requests, requestsSelected, used);
  }, [requests, requestsSelected, used]);

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
      render: (detail: DetailRequest[]) => detail?.length,
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
      okButtonProps={{
        style: { borderRadius: 5 },
        disabled:
          requestsSelected.length === 0 || used.length === data?.stockRequests?.docs?.length,
      }}
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
      <ConfirmRequest
        setRequesSelected={setRequestSelected}
        request={requests}
        setRequest={setRequests}
        details={details}
        used={used}
        requestsSelected={requestsSelected}
        keysSelected={keysSelected}
        setUsed={setUsed}
        setDetail={setDetails}
        setDetailRequest={setDetailRequest}
        detailRequest={detailRequest}
        visible={visibleConfirmRequest}
        onCancel={onCloseConfirm}
      />
    </Modal>
  );
};

export default SearchRequest;
