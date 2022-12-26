import type {
  ActionDetailTransfer,
  DetailRequest,
  DetailTransfer,
  StockRequest,
  StockTransfer,
} from '@/graphql/graphql';
import { ActionDetailRequest } from '@/graphql/graphql';
import { CheckCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Badge, Button, Card, Descriptions, Input, Tag, Tooltip } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { useModel } from 'umi';
import { StatusType } from '../../tranfer.data';
import SearchRequest from '../SearchRequest';
import AlertInformation from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';

const DescriptionsItem = Descriptions.Item;
const { TextArea } = Input;

type Props = {
  transfer: Partial<StockTransfer> | undefined;
  setObservation: (value: string) => void;
  observation: string;
  allowEdit: boolean;
  details: Partial<DetailTransfer & { action: ActionDetailTransfer }>[];
  setDetails: (details: Partial<DetailTransfer & { action: ActionDetailTransfer }>[]) => void;
  requests: StockRequest[] | [];
  setRequests: (requests: StockRequest[]) => void;
};

const Header = ({
  transfer,
  setObservation,
  observation,
  allowEdit,
  details,
  setDetails,
  requests,
  setRequests,
}: Props) => {
  const [showSelectRequests, setShowSelectRequests] = useState(false);
  const [propsAlertInformation, setPropsAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [detailsRequest, setDetailsRequest] = useState<DetailRequest[]>([]);
  const [visibleConfirmRequest, setVisibleConfirmRequest] = useState(false);

  const onShowError = (message: string) => {
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

  const { initialState } = useModel('@@initialState');

  /**
   * @description cierra el modal de seleccion de solicitudes
   */
  const closeModalSelectRequests = () => {
    setShowSelectRequests(false);
  };

  /**
   * @description abre el modal de seleccion de solicitudes
   */
  const showModalSelectRequests = () => {
    setShowSelectRequests(true);
  };

  /**
   * @description gestiona el listado de solicitudes de traslado
   * @param requestsAdd array de solicitudes
   */
  const addRequests = (requestsAdd: StockRequest[]) => {
    const create: any[] = [];
    const update: any[] = [];
    try {
      if (requestsAdd.length > 0) {
        for (let i = 0; i < requestsAdd.length; i++) {
          const request = requestsAdd[i];
          for (let j = 0; j < request?.details?.length; j++) {
            const detail = request?.details[j];
            const productFind = detailsRequest?.find(
              (item) => item?.product?._id === detail?.product?._id,
            );
            const productFindLocal = create?.findIndex(
              (item) => item?.product?._id === detail?.product?._id,
            );

            if (productFind) {
              update.push({
                product: detail?.product,
                quantity: 0,
              });
            } else {
              if (productFindLocal >= 0) {
                create[productFindLocal] = {
                  product: detail?.product,
                  quantity: 0,
                  action: ActionDetailRequest.Create,
                };
              } else {
                create.push({
                  product: detail?.product,
                  quantity: 0,
                  action: ActionDetailRequest.Create,
                });
              }
            }
          }
        }

        const newDetails = detailsRequest.map((item) => {
          const find = update.find((detail) => detail?.product?._id === item?.product?._id);
          if (find) {
            return {
              ...item,
              quantity: 0,
            };
          }
          return item;
        });
        setDetailsRequest([...newDetails.concat(create)]);
      }
    } catch (error: any) {
      onShowError(error?.message);
    }
  };

  return (
    <Card>
      <Descriptions bordered size="small">
        <DescriptionsItem label="Bodega que traslada" span={1}>
          {transfer?.warehouseOrigin?.name ||
            initialState?.currentUser?.shop?.defaultWarehouse?.name}
        </DescriptionsItem>
        <DescriptionsItem label="Usuario que envía" span={2}>
          {transfer?.userOrigin?.name || initialState?.currentUser?.name}
        </DescriptionsItem>

        <DescriptionsItem label="Bodega de destino" span={1}>
          {transfer?.warehouseDestination?.name}
        </DescriptionsItem>
        <DescriptionsItem label="Usuario que recibe" span={2}>
          {transfer?.userDestination?.name || '(Pendiente)'}
        </DescriptionsItem>

        <DescriptionsItem label="Número" span={1}>
          {transfer?.number || '(Pendiente)'}
        </DescriptionsItem>
        <DescriptionsItem label="Estado" span={2}>
          <Badge
            color={StatusType[transfer?.status || 'open']?.color}
            text={StatusType[transfer?.status || 'open']?.text}
          />
        </DescriptionsItem>
        <DescriptionsItem label="Creado" span={1}>
          {moment(transfer?.createdAt).format(FORMAT_DATE)}
        </DescriptionsItem>
        <DescriptionsItem label="Actualizado" span={2}>
          {moment(transfer?.updatedAt).format(FORMAT_DATE)}
        </DescriptionsItem>
        <DescriptionsItem label="Solicitudes" span={1}>
          {requests?.map((request) => (
            <Tag key={request?._id} color="volcano" icon={<CheckCircleOutlined />}>
              {request?.number}
            </Tag>
          ))}
          <Tooltip title="Agregar solicitud">
            <Button
              onClick={showModalSelectRequests}
              disabled={!allowEdit}
              type="primary"
              icon={<PlusOutlined />}
            />
          </Tooltip>
        </DescriptionsItem>
        <DescriptionsItem label="Observación" span={2}>
          {allowEdit ? (
            <TextArea value={observation} onChange={(e) => setObservation(e?.target?.value)} />
          ) : (
            transfer?.observationOrigin
          )}
        </DescriptionsItem>
      </Descriptions>
      <SearchRequest
        details={details}
        setRequests={setRequests}
        setDetails={setDetails}
        setVisibleConfirmRequest={setVisibleConfirmRequest}
        visibleConfirmRequest={visibleConfirmRequest}
        detailRequest={detailsRequest}
        setDetailRequest={setDetailsRequest}
        transfer={transfer}
        visible={showSelectRequests}
        onCancel={closeModalSelectRequests}
        requests={requests as StockRequest[]}
        onOk={addRequests}
      />
      <AlertInformation {...propsAlertInformation} onCancel={closeAlertInformation} />
    </Card>
  );
};

export default Header;
