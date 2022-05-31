import { Badge, Card, Col, Descriptions, Input, Row } from 'antd';
import moment from 'moment';
import { useModel } from 'umi';

import type { StockRequest } from '@/graphql/graphql';
import { StatusType } from '../../request.data';

const DescriptionsItem = Descriptions.Item;
const { TextArea } = Input;

export type Props = {
  request: Partial<StockRequest> | undefined;
  setObservation: (value: string) => void;
  observation: string;
};

const Header = ({ request, setObservation, observation }: Props) => {
  const { initialState } = useModel('@@initialState');

  const allowEdit = request?.status === 'open';

  return (
    <Card>
      <Row justify="center" gutter={[0, 10]}>
        <Col>
          <Descriptions bordered size="small">
            <DescriptionsItem label="Bodega que solicita" span={1}>
              {request?.warehouseDestination?.name ||
                initialState?.currentUser?.shop?.defaultWarehouse?.name}
            </DescriptionsItem>
            <DescriptionsItem label="Bodega de despacho" span={1}>
              {request?.warehouseOrigin?.name}
            </DescriptionsItem>
          </Descriptions>
        </Col>
        <Col>
          <Descriptions bordered size="small">
            <DescriptionsItem label="Número" span={1}>
              {request?.number || '(Pendiente)'}
            </DescriptionsItem>
            <DescriptionsItem label="Estado" span={3}>
              <Badge
                color={StatusType[request?.status || 'open']?.color}
                text={StatusType[request?.status || 'open']?.label}
              />
            </DescriptionsItem>
            <DescriptionsItem label="Creado" span={1}>
              {moment(request?.createdAt).format(FORMAT_DATE)}
            </DescriptionsItem>
            <DescriptionsItem label="Actualizado" span={2}>
              {moment(request?.updatedAt).format(FORMAT_DATE)}
            </DescriptionsItem>
            <DescriptionsItem label="Usuario" span={1}>
              {request?.user?.name || initialState?.currentUser?.name}
            </DescriptionsItem>
            <DescriptionsItem label="Observación de general" span={1}>
              {allowEdit ? (
                <TextArea value={observation} onChange={(e) => setObservation(e?.target?.value)} />
              ) : (
                request?.observation
              )}
            </DescriptionsItem>
          </Descriptions>
        </Col>
      </Row>
    </Card>
  );
};

export default Header;
