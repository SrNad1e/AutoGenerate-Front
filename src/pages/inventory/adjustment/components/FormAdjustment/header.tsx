import { Badge, Card, Descriptions, Input } from 'antd';
import moment from 'moment';
import { useModel } from 'umi';

import type { StockAdjustment } from '@/graphql/graphql';
import { StatusTypeAdjustment } from '../../adjustment.data';

const DescriptionsItem = Descriptions.Item;
const { TextArea } = Input;

export type Props = {
  adjustment: Partial<StockAdjustment> | undefined;
  setObservation: (value: string) => void;
  observation: string;
};

const Header = ({ adjustment, setObservation, observation }: Props) => {
  const { initialState } = useModel('@@initialState');

  const allowEdit = adjustment?.status === 'open';

  return (
    <Card>
      <Descriptions bordered size="small">
        <DescriptionsItem label="Bodega" span={1}>
          {adjustment?.warehouse?.name || initialState?.currentUser?.shop?.defaultWarehouse?.name}
        </DescriptionsItem>
        <DescriptionsItem label="Usuario" span={2}>
          {adjustment?.user?.name || initialState?.currentUser?.name}
        </DescriptionsItem>
        <DescriptionsItem label="Número" span={1}>
          {adjustment?.number || '(Pendiente)'}
        </DescriptionsItem>
        <DescriptionsItem label="Estado" span={2}>
          <Badge
            color={StatusTypeAdjustment[adjustment?.status || 'open']?.color}
            text={StatusTypeAdjustment[adjustment?.status || 'open']?.label}
          />
        </DescriptionsItem>
        <DescriptionsItem label="Creado" span={1}>
          {moment(adjustment?.createdAt).format(FORMAT_DATE)}
        </DescriptionsItem>
        <DescriptionsItem label="Actualizado" span={2}>
          {moment(adjustment?.updatedAt).format(FORMAT_DATE)}
        </DescriptionsItem>
        <DescriptionsItem label="Observación de general">
          {allowEdit ? (
            <TextArea value={observation} onChange={(e) => setObservation(e?.target?.value)} />
          ) : (
            adjustment?.observation
          )}
        </DescriptionsItem>
      </Descriptions>
    </Card>
  );
};

export default Header;
