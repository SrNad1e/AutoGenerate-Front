import { Badge, Button, Card, Col, Descriptions, InputNumber, Row, Table, Tag } from 'antd';
import { useModel } from 'umi';
import type { ColumnsType } from 'antd/es/table/interface';
import { CheckCircleOutlined, DeleteFilled } from '@ant-design/icons';
import moment from 'moment';

import { StatusType } from '../tranfer.data';
import type { StockTransfer } from '@/graphql/graphql';
import SearchProducts from '@/components/SearchProducts';

import './styles.less';

const DescriptionsItem = Descriptions.Item;

export type Props = {
  transfer?: Partial<StockTransfer>;
};

const FormTransfer = ({ transfer }: Props) => {
  const { initialState } = useModel('@@initialState');

  const columns: ColumnsType<Partial<StockTransfer>> = [
    {
      title: 'Producto',
      dataIndex: 'product.barcode',
      width: 250,
      render: (barcode: string, record) => (
        <>
          {`${record.details && record.details[0].product.reference} / ${
            record.details && record.details[0].product.reference.description
          }`}
          <Tag>{barcode}</Tag>
        </>
      ),
    },
    {
      title: 'Talla y Color',
      dataIndex: 'product.barcode',
      width: 200,
      render: (_: string, product) => {
        return (
          <>
            {product.details && product.details[0].product.size}
            <Tag color={product.details && product?.details[0].product.color.html}>
              {product.details && product?.details[0].product.color.name}
            </Tag>
          </>
        );
      },
    },
    {
      title: 'Cantidad',
      dataIndex: 'product.quantity',
      width: 100,
      render: (quantity: number) => <InputNumber value={quantity} />,
    },
    {
      title: 'Opciones',
      dataIndex: 'product._id',
      width: 100,
      fixed: 'right',
      render: () => <Button icon={<DeleteFilled />} />,
    },
  ];

  return (
    <>
      <Card>
        <Row gutter={[20, 20]}>
          <Col lg={12} xs={24}>
            <Descriptions bordered size="middle">
              <DescriptionsItem label="Bodega de origen" span={3}>
                {initialState?.currentUser?.shop?.defaultWarehouse?.name}
              </DescriptionsItem>
              <DescriptionsItem label="Usuario que envía" span={3}>
                {initialState?.currentUser?.name}
              </DescriptionsItem>
              <DescriptionsItem label="Observación de envío">
                {'Observacion a enviar'}
              </DescriptionsItem>
            </Descriptions>
          </Col>
          <Col lg={12} xs={24}>
            <Descriptions bordered size="middle">
              <DescriptionsItem label="Bodega de destino" span={3}>
                {transfer?.warehouseDestination?.name}
              </DescriptionsItem>
              <DescriptionsItem label="Usuario que recibe" span={3}>
                {transfer?.userDestination}
              </DescriptionsItem>
              <DescriptionsItem label="Observación de recepción">
                {'Observacion a recibir'}
              </DescriptionsItem>
            </Descriptions>
          </Col>
          <Col lg={12} xs={24}>
            <Descriptions bordered size="middle">
              <DescriptionsItem label="Número" span={3}>
                {transfer?.number || '(Pendiente)'}
              </DescriptionsItem>
              <DescriptionsItem label="Creado" span={3}>
                {moment(transfer?.createdAt).format(FORMAT_DATE)}
              </DescriptionsItem>
              <DescriptionsItem label="Solicitudes base" span={3}>
                {
                  <Tag key={1} color="red" icon={<CheckCircleOutlined />}>
                    {2}
                  </Tag>
                }
              </DescriptionsItem>
            </Descriptions>
          </Col>
          <Col lg={12} xs={24}>
            <Descriptions bordered size="middle">
              <DescriptionsItem label="Estado" span={3}>
                <Badge
                  color={StatusType[transfer?.status || 'open']?.color}
                  text={StatusType[transfer?.status || 'open']?.text}
                />
              </DescriptionsItem>
              <DescriptionsItem label="Actualizado" span={3}>
                {moment(transfer?.updatedAt).format(FORMAT_DATE)}
              </DescriptionsItem>
              <DescriptionsItem label="Observación general">
                {transfer?.observation}
              </DescriptionsItem>
            </Descriptions>
          </Col>
        </Row>
      </Card>
      <Card bordered={false}>
        <SearchProducts />
      </Card>
      <Table columns={columns} scroll={{ x: 1500 }} />
    </>
  );
};
export default FormTransfer;
