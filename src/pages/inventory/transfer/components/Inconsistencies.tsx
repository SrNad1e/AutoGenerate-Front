import SelectWarehouses from '@/components/SelectWarehouses';
import {
  CalendarOutlined,
  ClearOutlined,
  DropboxOutlined,
  EyeOutlined,
  FieldNumberOutlined,
  MoreOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Col, Form, Modal, Row, Space, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { useEffect, useState } from 'react';
import TransferProducts from './TransferProducts';

const FormItem = Form.Item;
const { Text } = Typography;

export type Product = {
  reference: string;
  code: number;
  color: string;
  pendingQuantity: number;
  size: string;
};

export type data = {
  number: number;
  warehouseOrigin: string;
  warehouseDestination: string;
  updatedAt: string;
  _id: number;
  products: Product[];
};

type Props = {
  visible: boolean;
  onCancel: () => void;
};

const Inconsistencies = ({ onCancel, visible }: Props) => {
  const [visibleProducts, setVisibleProducts] = useState(false);
  const [dataTransfer, setDataTransfer] = useState([]);
  const [form] = Form.useForm();

  const data = [
    {
      number: 1,
      warehouseOrigin: 'Punto de Fabrica',
      warehouseDestination: 'Belen',
      updatedAt: '08/04/2022 12:05:05',
      _id: 2,
      products: [
        {
          reference: 'Maravilla',
          code: 290421,
          color: 'Amarillo',
          pendingQuantity: 10,
          size: 'L',
        },
        {
          reference: 'Vivi BR',
          code: 290421,
          color: 'Negro',
          pendingQuantity: 10,
          size: 'L',
        },
      ],
    },
    {
      number: 2,
      warehouseOrigin: 'Mayoristas',
      warehouseDestination: 'Salvador',
      updatedAt: '09/05/2022 01:05:05',
      _id: 3,
      products: [
        {
          reference: 'Maravilla',
          code: 290421,
          color: 'Amarillo',
          pendingQuantity: 10,
          size: 'L',
        },
        {
          reference: 'Vivi BR',
          code: 290421,
          color: 'Negro',
          pendingQuantity: 10,
          size: 'L',
        },
      ],
    },
    {
      number: 3,
      warehouseOrigin: 'Cristo Rey',
      warehouseDestination: 'Belen',
      updatedAt: '10/06/2022 02:05:05',
      _id: 4,
      products: [
        {
          reference: 'Maravilla',
          code: 290421,
          color: 'Amarillo',
          pendingQuantity: 10,
          size: 'L',
        },
        {
          reference: 'Vivi BR',
          code: 290421,
          color: 'Negro',
          pendingQuantity: 10,
          size: 'L',
        },
      ],
    },
    {
      number: 4,
      warehouseOrigin: 'Manrique',
      warehouseDestination: 'Castilla',
      updatedAt: '11/07/2022 03:05:05',
      _id: 5,
      products: [
        {
          reference: 'Maravilla',
          code: 290421,
          color: 'Amarillo',
          pendingQuantity: 10,
          size: 'L',
        },
        {
          reference: 'Vivi BR',
          code: 290421,
          color: 'Negro',
          pendingQuantity: 10,
          size: 'L',
        },
      ],
    },
  ];

  const onOpenProducts = (dataT: Product[]) => {
    setDataTransfer(dataT);
    setVisibleProducts(true);
  };

  useEffect(() => {
    console.log(dataTransfer);
  }, [dataTransfer]);

  const columns: ColumnsType<data> = [
    {
      title: (
        <Text style={{ fontSize: 20 }}>
          <FieldNumberOutlined />
        </Text>
      ),
      dataIndex: 'number',
      sorter: true,
      showSorterTooltip: false,
      align: 'center',
    },
    {
      title: <Text>{<DropboxOutlined />} Origen</Text>,
      dataIndex: 'warehouseOrigin',
      align: 'center',
    },
    {
      title: <Text>{<DropboxOutlined />} Destino</Text>,
      dataIndex: 'warehouseDestination',
      align: 'center',
    },
    {
      title: <Text>{<CalendarOutlined />} Ultima Actualización</Text>,
      dataIndex: 'updatedAt',
      sorter: true,
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
            onClick={() => onOpenProducts(transfer.products)}
            type="primary"
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
        <Button onClick={onCancel} style={{ borderRadius: 5 }}>
          Cerrar
        </Button>
      }
    >
      <Form form={form}>
        <Row gutter={20}>
          <Col>
            <FormItem label="Bodega" name="warehouse">
              <SelectWarehouses disabled={false} />
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
                >
                  Buscar
                </Button>
                <Button icon={<ClearOutlined />} style={{ borderRadius: 5 }}>
                  Limpiar
                </Button>
              </Space>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          current: 1,
          total: 100,
          showSizeChanger: false,
        }}
        onChange={() => {}}
        loading={false}
        scroll={{ x: 'auto' }}
      />
      <TransferProducts
        data={dataTransfer}
        visible={visibleProducts}
        onCancel={() => setVisibleProducts(false)}
      />
    </Modal>
  );
};

export default Inconsistencies;
