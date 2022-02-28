import type { ColumnsType } from 'antd/lib/table';
import { Badge, Button, Card, Col, Descriptions, InputNumber, Row, Table, Tag } from 'antd';
import { useModel } from 'umi';
import { StatusType } from '../tranfer.data';
import { CheckCircleOutlined, DeleteFilled } from '@ant-design/icons';
import moment from 'moment';

import './styles.less';

const DescriptionsItem = Descriptions.Item;

export type Props = {
  warehouse?: WAREHOUSE.warehouse;
  transfer?: Partial<TRANSFER.Transfer>;
};

const FormTransfer = ({ warehouse, transfer }: Props) => {
  const { initialState } = useModel('@@initialState');

  const columns: ColumnsType<Partial<TRANSFER.DetailTransfer>> = [
    {
      title: 'Producto',
      dataIndex: 'product.barcode',
      width: 250,
      render: (barcode: string, record) => (
        <>
          {`${record.product?.reference} / ${record.product?.description}`}
          <Tag>{barcode}</Tag>
        </>
      ),
    },
    {
      title: 'Talla y Color',
      dataIndex: 'product.barcode',
      width: 200,
      render: (barcode: string, { product }) => {
        return (
          <>
            product.size.value
            <Tag color={product?.color.html}>{product?.color.name}</Tag>
          </>
        );
      },
    },
    {
      title: 'Cantidad',
      dataIndex: 'quantity',
      width: 100,
      render: (quantity: number) => <InputNumber value={quantity} />,
    },
    {
      title: 'Opciones',
      dataIndex: 'product._id',
      width: 100,
      render: () => <Button icon={<DeleteFilled />} />,
    },
  ];

  return (
    <>
      <Card>
        <Row gutter={10}>
          <Col lg={12} xs={24}>
            <Descriptions bordered size="small">
              <DescriptionsItem label="Bodega de origen" span={3}>
                {initialState?.currentUser?.shop?.defaultWarehouse?.name}
              </DescriptionsItem>
              <DescriptionsItem label="Usuario que envía" span={3}>
                {initialState?.currentUser?.name}
              </DescriptionsItem>
              <DescriptionsItem label="Observación de envío">
                {transfer?.observationOrigin}
              </DescriptionsItem>
            </Descriptions>
          </Col>
          <Col lg={12} xs={24}>
            <Descriptions bordered size="small">
              <DescriptionsItem label="Bodega de destino" span={3}>
                {warehouse?.name}
              </DescriptionsItem>
              <DescriptionsItem label="Usuario que recibe" span={3}>
                {transfer ? transfer?.userDestination?.name : '(Pendiente)'}
              </DescriptionsItem>
              <DescriptionsItem label="Observación de recepción">
                {transfer?.observationDestination}
              </DescriptionsItem>
            </Descriptions>
          </Col>
        </Row>
        <Descriptions bordered size="small">
          <DescriptionsItem label="Número" span={1}>
            {transfer?.number || '(Pendiente)'}
          </DescriptionsItem>
          <DescriptionsItem label="Estado" span={1}>
            <Badge
              color={StatusType[transfer?.status || 'open']?.color}
              text={StatusType[transfer?.status || 'open']?.text}
            />
          </DescriptionsItem>
          <DescriptionsItem label="Solicitudes base" span={3}>
            {transfer?.request?.map((request) => (
              <Tag key={request.number} color="primary" icon={<CheckCircleOutlined />}>
                {request.number}
              </Tag>
            ))}
          </DescriptionsItem>
          <DescriptionsItem label="Creado">
            {moment(transfer?.createdAt).format(FORMAT_DATE)}
          </DescriptionsItem>
          <DescriptionsItem label="Actualizado">
            {moment(transfer?.updatedAt).format(FORMAT_DATE)}
          </DescriptionsItem>
          <DescriptionsItem label="Observación de general" span={24}>
            {transfer?.observation}
          </DescriptionsItem>
        </Descriptions>
      </Card>
      <Table columns={columns} scroll={{ x: 1500 }} />
    </>
  );
};
export default FormTransfer;
