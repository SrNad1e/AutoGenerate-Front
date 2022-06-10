import type { DetailTransfer, StockRequest, StockTransfer } from '@/graphql/graphql';
import { CheckCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Badge, Button, Card, Descriptions, Input, Tag, Tooltip } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { useModel } from 'umi';
import { StatusType } from '../../tranfer.data';
import SearchRequest from '../SearchRequest';

const DescriptionsItem = Descriptions.Item;
const { TextArea } = Input;

type Props = {
  transfer: Partial<StockTransfer> | undefined;
  setObservation: (value: string) => void;
  observation: string;
  allowEdit: boolean;
};

const Header = ({ transfer, setObservation, observation, allowEdit }: Props) => {
  const [showSelectRequests, setShowSelectRequests] = useState(false);
  const [details, setDetails] = useState<Partial<DetailTransfer & { action: string }>[]>([]);
  const [requests, setRequests] = useState<StockRequest[]>([]);

  const { initialState } = useModel('@@initialState');

  const closeModalSelectRequests = () => {
    setShowSelectRequests(false);
  };

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
    if (requestsAdd.length > 0) {
      for (let i = 0; i < requestsAdd.length; i++) {
        const request = requestsAdd[i];
        for (let j = 0; j < request?.details?.length; j++) {
          const detail = request?.details[j];
          const productFind = details?.find((item) => item?.product?._id === detail?.product?._id);
          const productFindLocal = create?.findIndex(
            (item) => item?.product?._id === detail?.product?._id,
          );

          if (productFind) {
            update.push({
              product: detail?.product,
              quantity: detail?.quantity,
            });
          } else {
            if (productFindLocal >= 0) {
              create[productFindLocal] = {
                product: detail?.product,
                quantity: detail?.quantity,
                action: 'create',
              };
            } else {
              create.push({
                product: detail?.product,
                quantity: detail?.quantity,
                action: 'create',
              });
            }
          }
        }
      }
      const newDetails = details.map((item) => {
        const find = update.find((detail) => detail?.product?._id === item?.product?._id);
        if (find) {
          return {
            ...item,
            quantity: find?.quantity,
          };
        }
        return item;
      });
      setDetails(newDetails.concat(create));
      setRequests(requests.concat(requestsAdd));
    }
    closeModalSelectRequests();
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
        visible={showSelectRequests}
        onCancel={closeModalSelectRequests}
        requests={requests as StockRequest[]}
        onOk={addRequests}
      />
    </Card>
  );
};

export default Header;
