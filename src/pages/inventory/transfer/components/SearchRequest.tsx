/* eslint-disable react-hooks/exhaustive-deps */
import { Badge, Button, Form, InputNumber, Modal, Space, Switch, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table/interface';
import { SearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';

import { useGetRequests } from '@/hooks/request.hooks';
import SelectWarehouses from '@/components/SelectWarehouses';
import type {
  DetailRequest,
  Warehouse,
  StockRequest,
  FiltersStockRequestsInput,
} from '@/graphql/graphql';
import { StatusType } from '../../request/request.data';
import moment from 'moment';

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

  const { initialState } = useModel('@@initialState');

  const [getRequests, { data, loading }] = useGetRequests();

  const onSearch = (values?: FiltersStockRequestsInput) => {
    getRequests({
      variables: {
        input: {
          ...values,
          warehouseOriginId: initialState?.currentUser?.shop?.defaultWarehouse?._id,
        },
      },
    });
  };
  const onSelect = () => {
    const newRequests = requestsSelected.filter(
      (item) => !requests?.find((request) => request?._id === item?._id),
    );

    onOk(newRequests);
  };

  const onFinish = (values: FormValues) => {
    const filters: FiltersStockRequestsInput = {};

    if (!values?.all) {
      filters.status = 'pending';
    }

    delete values.all;

    onSearch({ ...filters, ...values });
  };

  useEffect(() => {
    onSearch({ status: 'pending' });
  }, []);

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
    >
      <Space size="middle" style={{ width: '100%' }} direction="vertical">
        <Form layout="inline" onFinish={onFinish}>
          <FormItem label="Número" name="number">
            <InputNumber disabled={loading} autoFocus controls={false} />
          </FormItem>
          <FormItem label="Bodega que solicita" name="warehouseId">
            <SelectWarehouses disabled={loading} />
          </FormItem>
          <FormItem label="Todas" valuePropName="checked" name="all">
            <Switch loading={loading} />
          </FormItem>
          <FormItem>
            <Button loading={loading} htmlType="submit" icon={<SearchOutlined />} type="primary">
              Buscar
            </Button>
          </FormItem>
        </Form>
        <Table
          rowKey="_id"
          loading={loading}
          dataSource={data?.stockRequests?.docs as any}
          rowSelection={rowSelection as any}
          columns={columns}
        />
      </Space>
    </Modal>
  );
};

export default SearchRequest;
