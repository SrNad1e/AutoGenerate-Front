import { Card, Col } from 'antd';
import { useState } from 'react';
import { animated, useTransition } from 'react-spring';
import { LoginForm, ProFormText } from '@ant-design/pro-form';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useModel, history } from 'umi';

import Logosquare from '@/assets/logosquare.png';

import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
import { useLogin } from '@/hooks/user.hooks';
import type { LoginUserInput } from '@/graphql/graphql';

import styles from './index.less';

const FormLogin = () => {
  const [show, setShow] = useState(false);
  const [propsAlert, setPropsAlert] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const { setInitialState } = useModel('@@initialState');

  const [login, { loading }] = useLogin();

  /**
   * oculta
   */
  const onCloseAlert = () => {
    setPropsAlert({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  /**
   * @description se encarga de realizar la consulta para login
   * @param formData datos para enviar a la consulta
   * @returns void
   */
  const handleSubmit = async (formData: LoginUserInput): Promise<boolean | void> => {
    try {
      const response = await login({
        variables: { input: { ...formData } },
      });

      if (response?.data?.login) {
        const allowPOS = !!response?.data?.login?.user?.role?.permissions.find(
          (permission) => permission?.action === 'ACCESS_POS',
        );

        const allowERP = !!response?.data?.login?.user?.role?.permissions.find(
          (permission) => permission?.action === 'ACCESS_ERP',
        );

        if (response?.data?.login?.access_token) {
          sessionStorage.setItem('token', response?.data?.login?.access_token);

          if (!allowERP && !allowPOS) {
            setPropsAlert({
              message: 'No tienes acceso, reporta tu problema al administrador',
              type: 'error',
              visible: true,
            });
          } else {
            await setInitialState((s) => ({
              ...s,
              currentUser: response?.data?.login?.user,
            }));

            if (!history) return;
            if (!allowERP) {
              history.push('/pos/sales');
            } else {
              const { query } = history.location;
              const { redirect } = query as { redirect: string };
              history.push(redirect || '/');
            }
          }
        }
      }
    } catch (error: any) {
      setPropsAlert({
        message: error?.message,
        type: 'error',
        visible: true,
      });
    }

    return loading;
  };


  return (
    <>
      <Col md={24} lg={21} xl={18} xxl={17}>
                <Card hoverable bodyStyle={{ padding: 0 }}>
                  <LoginForm
                    className={styles.form}
                    onFinish={handleSubmit}
                    submitter={{
                      searchConfig: {
                        submitText: 'Ingresar',
                      },
                      resetButtonProps: {
                        style: { display: 'none' },
                      },
                    }}
                  >
                    <>
                      <img src={Logosquare} className={styles.logo} />
                      <ProFormText
                        name="username"
                        width="sm"
                        fieldProps={{
                          size: 'large',
                          prefix: <UserOutlined className={styles.prefixIcon} />,
                        }}
                        placeholder="Usuario"
                        rules={[
                          {
                            required: true,
                            message: 'Usuario es obligatorio',
                          },
                        ]}
                      />
                      <ProFormText.Password
                        name="password"
                        width="sm"
                        fieldProps={{
                          size: 'large',
                          prefix: <LockOutlined className={styles.prefixIcon} />,
                        }}
                        placeholder="Contraseña"
                        rules={[
                          {
                            required: true,
                            message: 'Contraseña es obligatoria',
                          },
                        ]}
                      />
                    </>
                  </LoginForm>
                </Card>
              </Col>
      <AlertInformation {...propsAlert} onCancel={onCloseAlert} />
    </>
  );
};

export default FormLogin;
