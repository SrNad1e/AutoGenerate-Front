import { Badge, Card, Descriptions, Input } from 'antd';
import moment from 'moment';
import { useModel } from 'umi';

import type { StockOutput } from '@/graphql/graphql';
import { StatusTypeOutput } from '../../output.data';

const DescriptionsItem = Descriptions.Item;
const { TextArea } = Input;

export type Props = {
  output: Partial<StockOutput> | undefined;
  setObservation: (value: string) => void;
  observation: string;
};

const Header = ({ output, setObservation, observation }: Props) => {
  const { initialState } = useModel('@@initialState');

  const allowEdit = output?.status === 'open';

  return (
    <Card>
      <Descriptions bordered size="small">
        <DescriptionsItem label="Bodega" span={1}>
          {output?.warehouse?.name || initialState?.currentUser?.shop?.defaultWarehouse?.name}
        </DescriptionsItem>
        <DescriptionsItem label="Usuario" span={2}>
          {output?.user?.name || initialState?.currentUser?.name}
        </DescriptionsItem>
        <DescriptionsItem label="Número" span={1}>
          {output?.number || '(Pendiente)'}
        </DescriptionsItem>
        <DescriptionsItem label="Estado" span={2}>
          <Badge
            color={StatusTypeOutput[output?.status || 'open']?.color}
            text={StatusTypeOutput[output?.status || 'open']?.label}
          />
        </DescriptionsItem>
        <DescriptionsItem label="Creado" span={1}>
          {moment(output?.createdAt).format(FORMAT_DATE)}
        </DescriptionsItem>
        <DescriptionsItem label="Actualizado" span={2}>
          {moment(output?.updatedAt).format(FORMAT_DATE)}
        </DescriptionsItem>
        <DescriptionsItem label="Observación de general">
          {allowEdit ? (
            <TextArea value={observation} onChange={(e) => setObservation(e?.target?.value)} />
          ) : (
            output?.observation
          )}
        </DescriptionsItem>
      </Descriptions>
    </Card>
  );
};

export default Header;
