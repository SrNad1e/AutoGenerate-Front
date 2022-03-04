import type { ColumnsType } from 'antd/lib/table';
import {
  Affix,
  Badge,
  Button,
  Card,
  Col,
  Descriptions,
  InputNumber,
  Input,
  Row,
  Space,
  Table,
  Tag,
  Form,
  Avatar,
  Typography,
  Divider,
} from 'antd';
import { useModel, useParams } from 'umi';
import { StatusType } from '../request.data';
import { BarcodeOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useState } from 'react';

import SearchProducts from '@/components/SearchProducts';

import './styles.less';
import styles from './styles.less';
import AlertInformation from '@/components/Alerts/AlertInformation';

const DescriptionsItem = Descriptions.Item;
const { TextArea } = Input;
const FormItem = Form.Item;
const { Text, Title } = Typography;

export type Props = {
  warehouse?: WAREHOUSE.warehouse;
  request?: Partial<REQUEST.Request>;
  match?: any;
};

const FormRequest = ({ warehouse, request }: Props) => {
  const { initialState } = useModel('@@initialState');

  const [details, setDetails] = useState<Partial<REQUEST.DetailRequest[]>>([]);
  const [propsAlert, setPropsAlert] = useState<Partial<ALERT.AlertInformationProps>>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [observation, setObservation] = useState('');

  const { id } = useParams<Partial<{ id: string }>>();

  /**
   * @description se encarga de abrir aviso de información
   * @param error error de apollo
   */
  const onShowInformation = (message: string) => {
    setPropsAlert({
      message,
      type: 'warning',
      visible: true,
    });
  };

  /**
   * @description se encarga de guardar el traslado
   * @field status se usa para definir el estado de la solicitud
   */
  const saveRequest = (status?: string) => {
    if (details.length > 0) {
      const props = {
        id,
        details,
        warehouseDestination: initialState?.currentUser?.shop?.defaultWarehouse?._id,
        warehouseOrigin: warehouse?._id,
        observation,
        status,
      };

      console.log('Params Create', props);
    } else {
      onShowInformation('La orden no tiene productos');
    }
  };

  /**
   * @description elimina un producto
   * @param _id identificador del producto a eliminar
   */
  const deleteProduct = (_id: string) => {
    if (setDetails) {
      setDetails(details.filter((detail) => detail?.product._id !== _id));
    }
  };

  /**
   * @description actualiza la cantidad de un producto
   * @param _id identificador del producto a actualizar
   * @param quantity cantidad nueva a asignar
   */
  const updateProduct = (_id: string, quantity: number) => {
    if (setDetails) {
      setDetails(
        details.map((detail) => {
          if (detail?.product._id === _id) {
            return {
              ...detail,
              quantity,
            };
          }
          return detail;
        }),
      );
    }
  };

  /**
   * @description se encarga de cerrar la alerta
   */
  const onCloseAlert = () => {
    setPropsAlert({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  const columns: ColumnsType<Partial<REQUEST.DetailRequest>> = [
    {
      title: 'Referencia',
      dataIndex: 'product',
      render: ({ reference, description, barcode }: PRODUCT.Product) => (
        <Row>
          <Col span={24}>
            {reference} / {description}
          </Col>
          <Col span={24}>
            <Tag icon={<BarcodeOutlined />}>{barcode}</Tag>
          </Col>
        </Row>
      ),
    },
    {
      title: 'Talla y Color',
      dataIndex: 'product',
      render: ({ color }: PRODUCT.Product) => {
        return (
          <Space>
            <Avatar
              size="small"
              style={{ backgroundColor: color?.html, border: 'solid 1px black' }}
              //src={apiUrl + color.image?.imageSizes?.thumbnail}
            />
            <Text style={{ marginLeft: 10 }}>{color?.name_internal}</Text>
          </Space>
        );
      },
    },
    {
      title: 'Talla',
      dataIndex: 'product',
      render: ({ size }: PRODUCT.Product) => size.value,
    },
    {
      title: 'Cantidad',
      dataIndex: 'quantity',
      align: 'right',
      render: (quantity: number, { product }) => (
        <InputNumber
          value={quantity}
          min={1}
          onChange={(value) => updateProduct(product?._id || '', value)}
        />
      ),
    },
    {
      title: 'Opciones',
      dataIndex: 'product',
      align: 'center',
      render: ({ _id }: PRODUCT.Product) => (
        <Button
          icon={<DeleteOutlined />}
          type="primary"
          danger
          onClick={() => deleteProduct(_id)}
        />
      ),
    },
  ];

  /**
   * @description genera la vista del resumen
   * @returns componente para la vista de resumen
   */
  const renderResumen = () => {
    return (
      <Space align="center" className={styles.alignCenter}>
        <Title level={3}>
          REFERENCIAS: {details.length}
          <Divider type="vertical" />
          PRODUCTOS: {details.reduce((sum, detail) => sum + (detail?.quantity || 0), 0)}
        </Title>
      </Space>
    );
  };

  return (
    <>
      <Card>
        <Row gutter={[10, 10]}>
          <Col lg={12} xs={24}>
            <Descriptions bordered size="small" column={1}>
              <DescriptionsItem label="Bodega que solicita">
                {initialState?.currentUser?.shop?.defaultWarehouse?.name}
              </DescriptionsItem>
              <DescriptionsItem label="Usuario que solicita">
                {initialState?.currentUser?.name}
              </DescriptionsItem>
            </Descriptions>
          </Col>
          <Col lg={12} xs={24}>
            <Descriptions bordered size="small" column={1}>
              <DescriptionsItem label="Bodega de despacho">{warehouse?.name}</DescriptionsItem>
              <DescriptionsItem label="Usuario despacho">
                {request?.userDestination ? request?.userDestination?.name : '(Pendiente)'}
              </DescriptionsItem>
            </Descriptions>
          </Col>
          <Col span={24}>
            <Descriptions bordered size="small" column={4}>
              <DescriptionsItem label="Número" span={1}>
                {request?.number || '(Pendiente)'}
              </DescriptionsItem>
              <DescriptionsItem label="Estado" span={1}>
                <Badge
                  color={StatusType[request?.status || 'open']?.color}
                  text={StatusType[request?.status || 'open']?.label}
                />
              </DescriptionsItem>
              <DescriptionsItem label="Creado" span={1}>
                {moment(request?.createdAt).format(FORMAT_DATE)}
              </DescriptionsItem>
              <DescriptionsItem label="Actualizado" span={1}>
                {moment(request?.updatedAt).format(FORMAT_DATE)}
              </DescriptionsItem>
              <DescriptionsItem label="Observación de general">
                {request?.status === 'open' ? (
                  <TextArea
                    defaultValue={request?.observation}
                    onChange={(e) => setObservation(e.target.value)}
                  />
                ) : (
                  request?.observation
                )}
              </DescriptionsItem>
            </Descriptions>
          </Col>
        </Row>
      </Card>
      {request?.status === 'open' && (
        <Card bordered={false} size="small">
          <Form layout="vertical">
            <FormItem label="Código de barras">
              <SearchProducts disabled={true} details={details} setDetails={setDetails} />
            </FormItem>
          </Form>
        </Card>
      )}
      <Table
        columns={columns}
        dataSource={details}
        scroll={{ x: 1000 }}
        pagination={{ size: 'small' }}
      />
      <Affix offsetBottom={0}>
        <Card>
          <Row>
            <Col span={4}>
              {request?._id ? <Button type="dashed">Cancelar</Button> : <Button>Cancelar</Button>}
            </Col>
            <Col span={16}>{renderResumen()}</Col>
            <Col span={4}>
              <Space align="end" className={styles.alignRigth}>
                <Button onClick={() => saveRequest()}>Guardar</Button>
                <Button type="primary">Enviar</Button>
              </Space>
            </Col>
          </Row>
        </Card>
      </Affix>
      <AlertInformation {...propsAlert} onCancel={onCloseAlert} />
    </>
  );
};
export default FormRequest;
