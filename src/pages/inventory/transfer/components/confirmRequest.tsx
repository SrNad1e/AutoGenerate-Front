/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Badge, Button, Col, Form, Modal, Row, Space, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table/interface';
import { useEffect, useState } from 'react';

import type { DetailRequest, Product, StockTransfer } from '@/graphql/graphql';
import { ActionDetailTransfer } from '@/graphql/graphql';
import AlertInformation from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import SelectProducts from '@/components/SelectProducts';
import { useModel } from 'umi';
import { BarcodeOutlined, SaveOutlined } from '@ant-design/icons';
import AlertConfirm from '@/components/Alerts/AlertConfirm';
import type { Props as PropsAlertConfirm } from '@/components/Alerts/AlertConfirm';

const FormItem = Form.Item;
const { Text } = Typography;

export type Params = {
  visible: boolean;
  onCancel: () => void;
  detailRequest: DetailRequest[] | any[];
  setDetailRequest: any;
  setDetail: any;
  setUsed: any;
  keysSelected: string[];
  used: string[];
  requestsSelected: any;
  details: any;
  setRequest: any;
  request: any;
  setRequesSelected: any;
  setSaveDetails: any;
  saveDetails: any[];
};

const ConfirmRequest = ({
  visible,
  onCancel,
  detailRequest,
  setDetailRequest,
  setDetail,
  setUsed,
  keysSelected,
  requestsSelected,
  details,
  setRequest,
  request,
  setRequesSelected,
  used,
  setSaveDetails,
  saveDetails,
}: Params) => {
  const [propsAlertInformation, setPropsAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [propsAlertConfirm, setPropsAlertConfirm] = useState<Partial<PropsAlertConfirm>>({
    message: '',
    type: 'warning',
    visible: false,
    arr: detailRequest,
  });
  const [isDisabled, setIsDisabled] = useState(false);

  const [, /*withCode*/ setWithCode] = useState(false);
  const { initialState } = useModel('@@initialState');

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
   * @description se encarga de cerrar la alerta Save
   */
  const onCancelAlertConfirm = async () => {
    await setPropsAlertConfirm({
      visible: false,
      message: '',
      type: 'error',
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

  const onOk = () => {
    const productZero = detailRequest.filter((item) => item.quantity === 0);
    const productQuantity = detailRequest.filter((item) => item.quantity > 0);
    if (productZero?.length > 0) {
      setPropsAlertConfirm({
        message:
          'Los productos con cantidades confirmadas en cero no seran agregados al traslado, ¿desea continuar?',
        type: 'warning',
        arr: productQuantity,
        transfer: true,
        setDetail: setDetail,
        visible: true,
      });
    } else {
      setPropsAlertConfirm({
        message: 'Los productos se agregaran al traslado, ¿desea continuar?',
        type: 'warning',
        arr: productQuantity,
        transfer: true,
        setDetail: setDetail,
        visible: true,
      });
    }
  };

  const onDisabledSaved = () => {
    let isD = false;
    for (let i = 0; i < detailRequest.length; i++) {
      if (
        saveDetails.length > 0 &&
        detailRequest[i]?.product?._id === saveDetails[i]?.product?._id &&
        detailRequest[i]?.quantity === saveDetails[i]?.quantity
      ) {
        isD = true;
      }
    }

    setIsDisabled(isD);
  };

  /**
   * @description elimina un producto
   * @param _id identificador del producto a eliminar
   */
  const deleteDetail = (_id: string) => {
    try {
      if (setDetailRequest) {
        const productFind = detailRequest.find((detail) => detail?.product?._id);

        if (productFind && !productFind.__typename) {
          setDetailRequest(detailRequest.filter((detail) => detail?.product?._id !== _id));
        } else {
          setDetailRequest(
            detailRequest.map((detail) => {
              if (detail?.product?._id === _id) {
                return {
                  ...detail,
                  action: ActionDetailTransfer.Delete,
                };
              }
              return detail;
            }),
          );
        }
      }
    } catch (error: any) {
      messageError(error?.message);
    }
  };

  /**
   * @description actualiza la cantidad de un producto
   * @param product producto a actualizar
   * @param quantity cantidad nueva a asignar
   */
  const updateDetail = async (product: Product, quantity: number) => {
    const newDetails = [];
    try {
      const firstvalue = await document.getElementsByClassName('ant-input-number-input').item(1);
      await firstvalue?.setAttribute('id', 'quantitySelect');
      const value = await document.getElementsByClassName('ant-table-body').item(0);
      value.scrollTop = 0;
      for (let i = 0; i < detailRequest.length; i++) {
        if (detailRequest[i]?.product?._id === product?._id) {
          newDetails.unshift({
            ...detailRequest[i],
            quantity: quantity,
            action: detailRequest[i]?.action ?? ActionDetailTransfer.Update,
          });
        } else {
          newDetails.push(detailRequest[i]);
        }
      }
      setDetailRequest(newDetails);
      await onDisabledSaved();
    } catch (error: any) {
      messageError(error?.message);
    }
  };

  /**
   * @description se agrega un detalle de solicitud a los detalles
   * @param product producto del detalle
   * @param quantity cantidad del producto
   */
  const createDetail = async (product: Product, quantity: number) => {
    try {
      if (detailRequest.includes(product)) {
        setDetailRequest([
          { product, quantity, action: ActionDetailTransfer.Create },
          ...detailRequest,
        ]);
      } else {
        await setPropsAlertConfirm({
          message: 'El producto que intenta agregar no existe en la solicitud, ¿desea agregarlo?',
          type: 'warning',
          visible: true,
          onOk: setDetailRequest([
            { product, quantity, action: ActionDetailTransfer.Create },
            ...detailRequest,
          ]),
          discardProduct: true,
          arr: detailRequest,
        });
      }
    } catch (error: any) {
      messageError(error?.message);
    }
  };

  const onSaveDetails = () => {
    if (saveDetails.length > 0) {
      setSaveDetails([...detailRequest]);
      // setUsed([...keysSelected, ...used]);
    } else {
      setSaveDetails([...detailRequest]);
      //setUsed([...keysSelected, ...used]);
    }
  };

  const propsSearchProduct = {
    details: detailRequest?.filter((item) => item.action !== ActionDetailTransfer.Delete),
    warehouseId: initialState?.currentUser?.shop?.defaultWarehouse?._id,
    createDetail,
    updateDetail,
    deleteDetail,
  };

  useEffect(() => {
    console.log(detailRequest, saveDetails);
  }, [detailRequest, saveDetails]);

  const columns: ColumnsType<StockTransfer> = [
    {
      title: 'Producto',
      dataIndex: 'product',
      align: 'left',
      render: (product: Product) => (
        <Row>
          <Col span={24}>
            {product?.reference?.name} / {product?.reference?.description}
          </Col>
          <Col span={24}>
            <Tag
              style={{ borderColor: '#dc9575', color: '#dc9575', backgroundColor: 'white' }}
              icon={<BarcodeOutlined />}
            >
              {product?.barcode}
            </Tag>
          </Col>
        </Row>
      ),
    },
    {
      title: 'Color',
      dataIndex: 'product',
      align: 'left',
      render: (product: Product) => (
        <Space>
          <Avatar
            size="small"
            style={{ backgroundColor: product?.color?.html, border: 'solid 1px black' }}
            src={`${CDN_URL}/${product?.color?.image?.urls?.webp?.small}`}
          />
          <Text style={{ marginLeft: 10 }}>{product?.color?.name_internal}</Text>
        </Space>
      ),
    },
    {
      title: 'Talla',
      dataIndex: 'product',
      align: 'center',
      render: (product: Product) => product?.size?.value,
    },
    {
      title: 'Confirmado',
      dataIndex: 'quantity',
      align: 'center',
      render: (quantityConfirmed: number) => (
        <Badge
          style={{
            backgroundColor: '#dc9575',
          }}
          count={quantityConfirmed || 0}
          showZero
        />
      ),
    },
  ];

  return (
    <Modal
      onOk={onOk}
      title="Confirmar Solicitud"
      onCancel={onCancel}
      visible={visible}
      width={1000}
      okText="Agregar al traslado"
      cancelText="Salir"
      okButtonProps={{ style: { borderRadius: 5 } }}
      cancelButtonProps={{ style: { borderRadius: 5 } }}
    >
      <Space size="middle" style={{ width: '100%' }} direction="vertical">
        <Form layout="inline">
          <FormItem label="" style={{ width: '80%' }} name="search">
            <SelectProducts {...propsSearchProduct} order={true} setWithStock={setWithCode} />
          </FormItem>
          <FormItem label="" style={{ marginTop: 40 }}>
            <Button
              style={{ borderRadius: 5 }}
              icon={<SaveOutlined />}
              type="primary"
              disabled={isDisabled}
              onClick={() => onSaveDetails()}
            >
              Guardar
            </Button>
          </FormItem>
        </Form>
        <Table columns={columns} dataSource={detailRequest} />
      </Space>
      <AlertInformation {...propsAlertInformation} onCancel={closeAlertInformation} />
      <AlertConfirm
        {...propsAlertConfirm}
        details={details}
        onCloseConfirm={onCancel}
        onCancel={onCancelAlertConfirm}
        setUsed={setUsed}
        keysSelected={keysSelected}
        request={request}
        requestSelected={requestsSelected}
        setRequest={setRequest}
        transfer={true}
        setDetailRequest={setDetailRequest}
        detailRequest={detailRequest}
        used={used}
        setRequestSelected={setRequesSelected}
      />
    </Modal>
  );
};

export default ConfirmRequest;
