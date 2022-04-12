import { Card, Col } from 'antd';
import { useState } from 'react';
import { animated, useTransition } from 'react-spring';
import { LoginForm, ProFormText } from '@ant-design/pro-form';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useModel, history } from 'umi';

import Logosquare from '@/assets/logosquare.png';

import AlertInformation from '@/components/Alerts/AlertInformation';

import styles from './index.less';
import { useLogin } from '@/hooks/user.hooks';

const FormLogin = () => {
  const [show, setShow] = useState(false);
  const [propsAlert, setPropsAlert] = useState<Partial<ALERT.AlertInformationProps>>({
    message: '',
    type: 'error',
    visible: false,
  });

  const { setInitialState } = useModel('@@initialState');
  /**
   * se encarga de capturar los resultados de la consulta
   * @param data datos resultantes de la consulta un usuarioy su token
   */
  const fetchUserInfo = async ({ user, access_token }: USER.Response) => {
    if (access_token) {
      localStorage.setItem('token', access_token);

      await setInitialState((s) => ({
        ...s,
        currentUser: user,
      }));

      if (!history) return;
      const { query } = history.location;
      const { redirect } = query as { redirect: string };
      history.push(redirect || '/');
    }
  };

  /**
   * @description se encarga de enviar error en el login
   * @param error error de apollo
   */
  const onShowError = (message: string) => {
    setPropsAlert({
      message,
      type: 'error',
      visible: true,
    });
  };

  const { login, loading } = useLogin(fetchUserInfo, onShowError);

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
  const handleSubmit = async (formData: USER.LoginParams): Promise<boolean | void> => {
    await login({ variables: { input: { ...formData, companyId: COMPANY_ID } } });
    return loading;
  };

  const transitions = useTransition(show, {
    from: { opacity: 0, transform: 'translate3d(0,-100%,0)' },
    enter: { opacity: 1, transform: 'translate3d(0,90%,0)' },
    leave: { opacity: 0 },
    reverse: show,
    delay: 0,
    config: { duration: 1000 },
    onRest: () => setShow(true),
  });

  return (
    <>
      {transitions(
        (style, item) =>
          item && (
            <animated.div style={{ ...style, display: 'flex', justifyContent: 'center' }}>
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
            </animated.div>
          ),
      )}
      <AlertInformation {...propsAlert} onCancel={onCloseAlert} />
    </>
  );
};

export default FormLogin;
