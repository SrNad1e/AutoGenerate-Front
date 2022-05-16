import {
  Affix,
  Badge,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  InputNumber,
  Row,
  Space,
  Table,
  Tag,
  Typography,
} from 'antd';
import { useModel } from 'umi';
import type { ColumnsType } from 'antd/es/table/interface';
import { CheckCircleOutlined, DeleteFilled } from '@ant-design/icons';
import moment from 'moment';

import { StatusType } from '../tranfer.data';
import type { StockTransfer } from '@/graphql/graphql';
import SearchProducts from '@/components/SearchProducts';

import styles from './styles.less';

const { Title } = Typography;
const DescriptionsItem = Descriptions.Item;

export type Props = {
  transfer?: Partial<StockTransfer>;
};

const FormTransfer = ({ transfer }: Props) => {
  const { initialState } = useModel('@@initialState');

  const columns: ColumnsType = [
    {
      title: 'Producto',
      dataIndex: 'product.barcode',
      width: 250,
      render: (barcode: string) => (
        <>
          {`${'Referencia'} / ${'Descripcion'}`}
          <Tag>{barcode}</Tag>
        </>
      ),
    },
    {
      title: 'Talla y Color',
      dataIndex: 'product',
      width: 200,
      render: () => {
        return (
          <>
            {'valor de la talla'}
            <Tag color={'blue'}>{'nombre del color'}</Tag>
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
                {'Bodega'}
              </DescriptionsItem>
              <DescriptionsItem label="Usuario que recibe" span={3}>
                {'Usuario destinado'}
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
      <Affix offsetBottom={0}>
        <Card bordered={false}>
          <Row justify="center" align="middle">
            <Col span={4}>
              <Button
                disabled={false}
                type={transfer?._id ? 'primary' : 'default'}
                danger={!!transfer?._id}
                onClick={() => {}}
              >
                Cancelar
              </Button>
            </Col>
            <Col span={14}>
              {' '}
              <Space className={styles.centerFooter}>
                <Title level={3}>
                  REFERENCIAS: 0
                  <Divider type="vertical" />
                  PRODUCTOS: 0
                </Title>
              </Space>
            </Col>
            <Col span={6}>
              <Space>
                <Button disabled={false} onClick={() => {}}>
                  Guardar
                </Button>
                <Button type="primary" disabled={false} onClick={() => {}}>
                  Enviar
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>
      </Affix>
    </>
  );
};
export default FormTransfer;
