/*import { useEffect, useState } from 'react';
import { useModel, useParams } from 'umi';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertSave } from '@/components/Alerts/AlertSave';
//import { useCreateOutput, useUpdateOutput } from '@/hooks/output.hooks';
import Table, { ColumnsType } from 'antd/lib/table';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Form,
  InputNumber,
  Row,
  Space,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import { BarcodeOutlined, DeleteOutlined } from '@ant-design/icons';
import Header from './header';
import Footer from './footer';
import AlertLoading from '@/components/Alerts/AlertLoading';
import AlertSave from '@/components/Alerts/AlertSave';
import AlertInformation from '@/components/Alerts/AlertInformation';
//import type { Props as PropsSelectProducts } from '@/components/SelectProducts';
import SelectProducts from '@/components/SelectProducts';
//import OutputForm from '../../form';

const FormItem = Form.Item;
const { Text } = Typography;

export type Props = {
  output?: Partial<ADJUSTMENT.Adjustment>;
  setCurrentStep: (step: number) => void;
  setOutput: (data: Partial<ADJUSTMENT.Adjustment>) => void;
};

/*const FormOutput = ({ output, setCurrentStep, setOutput }: Props) => {
  const [details, setDetails] = useState<Partial<ADJUSTMENT.DetailAdjustmentProps[]>>([]);
  const [propsAlert, setPropsAlert] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  /*const [propsAlertSave, setPropsAlertSave] = useState<{
    type: TYPES;
    visible: boolean;
    message: string;
    status?: string;
  }>({
    visible: false,
    message: '',
    type: 'error',
  });
  const [observation, setObservation] = useState('');

  //const { id } = useParams<Partial<{ id: string }>>();

  const allowEdit = output?.status === 'open';

  //const { initialState } = useModel('@@initialState');

  /** Funciones ejecutadas por los hooks */

/**
 * @description se encarga de abrir aviso de información
 * @param error error de apollo
 */
/*const onShowInformation = (message: string) => {
  setPropsAlert({
    message,
    type: 'warning',
    visible: true,
  });
};

/**
 * @description abre la alerta de confirmacion de creacion
 * @param data entrada creada
 */
/*const resultSave = (data: Partial<ADJUSTMENT.Adjustment>) => {
  setPropsAlert({
    message: `Salida creada correctamente No. ${data.number}`,
    type: 'success',
    visible: true,
    redirect: `/inventory/output/${data._id}`,
  });
};

/*const resultUpdate = (data: Partial<ADJUSTMENT.Adjustment>) => {
  setPropsAlert({
    message: `Salida creada correctamente No. ${data.number}`,
    type: 'success',
    visible: true,
  });
  setOutput(data);
};

/**
 * @description maneja el error de la consulta
 * @param message error que genera al consulta
 */
/*const showError = (message: string) => {
  setPropsAlert({
    message,
    type: 'error',
    visible: true,
  });
};

/** FIn de Funciones ejecutadas por los hooks */

/** Hooks para manejo de consultas */

// const { createOutput, loadingCreate } = useCreateOutput(resultSave, showError);
//const { updateOutput, loadingUpdate } = useUpdateOutput(resultUpdate, showError);

/** Fin de Hooks para manejo de consultas */

/**
 * @description se encarga de mostrar la alerta de guardado y cancelar
 * @param status estado actual de la entrada
 */
/*const showAlertSave = (status?: string) => {
  if (details.length > 0 || status === 'cancelled' || observation !== output?.observation) {
    if (status === 'cancelled') {
      setPropsAlertSave({
        status,
        visible: true,
        message: '¿Está seguro que desea cancelar la salida?',
        type: 'error',
      });
    } else {
      setPropsAlertSave({
        status,
        visible: true,
        message: '¿Está seguro que desea guardar la salida?',
        type: 'warning',
      });
    }
  } else {
    onShowInformation('La salida no tiene productos');
  }
};

/**
 * @description se encarga de guardar el traslado
 * @param status se usa para definir el estado de la entrada
 */
/*const saveInput = (status?: string) => {
  if (id) {
    const detailsFilter = details.filter((detail) => detail?.action);

    const newDetails = detailsFilter.map((detail) => ({
      productId: detail?.product._id,
      quantity: detail?.quantity,
      action: detail?.action,
    }));
    if (newDetails.length > 0 || status || observation !== output?.observation) {
      const props = {
        details: newDetails,
        observation,
        status,
      };

      updateOutput({
        variables: {
          input: props,
          id,
        },
      });
    } else {
      onShowInformation('La salida no tiene cambios a realizar');
    }
  } else {
    if (status === 'cancelled') {
      setCurrentStep(0);
    } else {
      const newDetails = details.map((detail) => ({
        productId: detail?.product._id,
        quantity: detail?.quantity,
      }));
      const props = {
        details: newDetails,
        warehouseId:
          output?.warehouse?._id || initialState?.currentUser?.shop?.defaultWarehouse?._id,
        observation,
        status,
      };
     /* createOutput({
        variables: {
          input: props,
        },
      });
    }
  }
};

/**
 * @description elimina un producto
 * @param _id identificador del producto a eliminar
 */
/*const deleteDetail = (_id: string) => {
  if (setDetails) {
    const productFind = details.find((detail) => detail?.product._id);

    if (productFind && !productFind.__typename) {
      setDetails(details.filter((detail) => detail?.product._id !== _id));
    } else {
      setDetails(
        details.map((detail) => {
          if (detail?.product._id === _id) {
            return {
              ...detail,
              action: 'delete',
            };
          }
          return detail;
        }),
      );
    }
  }
};

/**
 * @description actualiza la cantidad de un producto
 * @param _id identificador del producto a actualizar
 * @param quantity cantidad nueva a asignar
 */
/* const updateDetail = (_id: string, quantity: number) => {
   if (setDetails) {
     setDetails(
       details.map((detail) => {
         if (detail?.product._id === _id) {
           return {
             ...detail,
             quantity: quantity || 0,
             action: detail.action ?? 'update',
           };
         }
         return detail;
       }),
     );
   }
 };

 /**
  * @description crea un producto
  * @param product identificador del producto a crear
  * @param quantity cantidad  a asignar
  */
/*const createDetail = (product: Partial<PRODUCT.Product>, quantity: number) => {
  if (setDetails) {
    setDetails([...details, { product, quantity, action: 'create' }]);
  }
};

/**
 * @description se encarga de cerrar la alerta information
 */
/*const onCloseAlert = () => {
  setPropsAlert({
    message: '',
    type: 'error',
    visible: false,
  });
};
/**
 * @description se encarga de cerrar la alerta Save
 */
/*const onCancelAlert = () => {
  setPropsAlertSave({
    visible: false,
    message: '',
    type: 'error',
  });
};

useEffect(() => {
  if (id) {
    setDetails(output?.details || []);
    setObservation(output?.observation || '');
  }
}, [output, id]);

/*const propsAlertSaveFinal: PropsAlertSave = {
  ...propsAlertSave,
  onOk: saveInput,
  onCancel: onCancelAlert,
};

/*const propsSelectProduct: PropsSelectProducts = {
  details: details.filter((item) => item?.action !== 'delete'),
  validateStock: true,
  warehouseId: output?.warehouse?._id,
  createDetail,
  updateDetail,
  deleteDetail,
};*/

/*const columns: ColumnsType<Partial<ADJUSTMENT.DetailAdjustment>> = [
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
    title: 'Color',
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
    title: 'Inventario',
    dataIndex: 'product',
    align: 'center',
    render: ({ stock }: PRODUCT.Product) =>
      stock && (
        <Badge
          overflowCount={99999}
          count={stock[0]?.quantity}
          style={{ backgroundColor: stock[0]?.quantity > 0 ? '#dc9575' : 'red' }}
          showZero
        />
      ),
  },
  /*
  {
    title: 'Cantidad',
    dataIndex: 'quantity',
    align: 'center',
    render: (quantity: number, { product }) => (
      <InputNumber
        value={quantity || 0}
        min={1}
        max={product?.stock ? product?.stock[0]?.quantity : 0}
        onChange={(value) => updateDetail(product?._id || '', value)}
        disabled={!allowEdit}
        style={{ color: 'black', backgroundColor: 'white' }}
      />
    ),
  },
  {
    title: 'Opciones',
    dataIndex: 'product',
    align: 'center',
    render: ({ _id }: PRODUCT.Product) => (
      <Tooltip title="Eliminar">
        <Button
          icon={<DeleteOutlined />}
          type="primary"
          danger
          onClick={() => deleteDetail(_id)}
          disabled={!allowEdit}
        />
      </Tooltip>
    ),
  },*/
//];
/*
return (
  <>
    <Header output={output} setObservation={setObservation} observation={observation} />
    {allowEdit && (
      <Card bordered={false} size="small">
        <Form layout="vertical">
          <FormItem label="Código de barras">
            <SelectProducts {...propsSelectProduct} />
          </FormItem>
        </Form>
      </Card>
    )}
    <Card>
      <Table
        columns={columns}
        dataSource={details.filter((detail) => detail?.action !== 'delete')}
        scroll={{ x: 1000 }}
        pagination={{ size: 'small' }}
      />
    </Card>
    <Footer output={output} saveOutput={showAlertSave} details={details} />
    <AlertInformation {...propsAlert} onCancel={onCloseAlert} />
    <AlertLoading visible={loadingCreate || loadingUpdate} message="Guardando Solicitud" />
    <AlertSave {...propsAlertSaveFinal} />
  </>
);
};

export default FormOutput*/
