/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, Col, Divider, Form, Modal, Row } from 'antd';
import { useEffect, useRef, useState } from 'react';

import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
import type { CloseZInvoicing } from '@/graphql/graphql';
import { VerifiedClose } from '@/graphql/graphql';
import CloseCorrection from './closeVerified';
import Button from 'antd/es/button';
import Observation from './observation';
import { useCreateCloseVerified } from '@/hooks/closeVerified.hooks';
import { useUpdateCloseZInvoicing } from '@/hooks/closeZInvoicing.hooks';

type Props = {
  visible: boolean;
  onCancel: () => void;
  closeZData?: CloseZInvoicing;
  onSearch: any;
};

const Correction = ({ onCancel, visible, closeZData, onSearch }: Props) => {
  const [propsAlertInformation, setPropsAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [visibleObservation, setVisibleObservation] = useState(false);
  const [observation, setObervation] = useState('');
  const [error, setError] = useState(false);
  const [createCloseVerified, { loading }] = useCreateCloseVerified();
  const [updateCloseZ, paramsUpdateCloseZ] = useUpdateCloseZInvoicing();

  const [form] = Form.useForm();
  const reportRef = useRef(null);

  /**
   * @description se encarga de cerrar la alerta informativa
   */
  const closeAlertInformation = () => {
    setPropsAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
    onCancel();
  };

  useEffect(() => {
    form.resetFields();
    setObervation('');
  }, [visible]);

  const onFinish = async () => {
    const values = form.getFieldsValue();
    try {
      if (observation.length === 0) {
        return setError(true);
      } else {
        setError(false);
      }
      const response = await createCloseVerified({
        variables: {
          input: {
            closeZId: closeZData?._id as string,
            bankReport: values?.bankReport,
            cashRegister: values?.register,
            cashReport: values?.report,
            dataphoneReport: values?.dataphoneReport,
            expenses: values?.expense,
            observation: observation,
          },
        },
      });
      if (response?.data?.createCloseVerified) {
        updateCloseZ({
          variables: {
            input: {
              closeZId: closeZData?._id as string,
              verifiedStatus: VerifiedClose.Verified,
            },
          },
        });
        setPropsAlertInformation({
          message: 'Se ha corregido el cierre exitosamente',
          visible: true,
          type: 'success',
        });
        await onSearch({ limit: 4000 });
      }
    } catch (e: any) {
      setPropsAlertInformation({
        message: e?.message,
        type: 'error',
        visible: true,
      });
    }
  };

  return (
    <Modal
      okText="Corregir"
      cancelText="Cancelar"
      maskClosable={false}
      onCancel={onCancel}
      onOk={() => onFinish()}
      open={visible}
      destroyOnClose
      okButtonProps={{
        style: { borderRadius: 5 },
        loading: loading || paramsUpdateCloseZ.loading,
      }}
      cancelButtonProps={{
        style: { borderRadius: 5 },
        loading: loading || paramsUpdateCloseZ.loading,
      }}
    >
      <Form form={form} layout="vertical" style={{ display: 'flex', justifyContent: 'center' }}>
        <Row>
          <Col>
            <div>
              <CloseCorrection ref={reportRef} data={closeZData} />
            </div>
          </Col>
          <Col>
            <Observation
              setObservation={setObervation}
              visible={visibleObservation}
              onCancel={() => setVisibleObservation(false)}
            />
          </Col>
        </Row>
      </Form>
      <Divider plain>
        <Button
          type="primary"
          onClick={() => setVisibleObservation(true)}
          loading={loading || paramsUpdateCloseZ.loading}
          style={{ borderRadius: 5 }}
        >
          Observación
        </Button>
      </Divider>
      {error && <Alert message={'Se requiere de una observación'} type="info" showIcon />}
      <AlertInformation {...propsAlertInformation} onCancel={closeAlertInformation} />
    </Modal>
  );
};

export default Correction;
