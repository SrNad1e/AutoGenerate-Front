import { Card, Col } from 'antd';
import { useState } from 'react';
import { parse } from 'qs';
import { animated, useTransition } from 'react-spring';
import { LoginForm, ProFormText } from '@ant-design/pro-form';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useModel } from 'umi';

import Logosquare from '@/assets/logosquare.png';

import AlertInformation from '@/components/Alerts/AlertInformation';

import styles from './index.less';

const getPageQuery = () => {
  return parse(window.location.href.split('?')[1]);
};

const FormLogin = () => {
  const [show, setShow] = useState(false);
  const [valuesLogin, setValuesLogin] = useState<Partial<USER.LoginParams>>({});
  const [propsAlert, setPropsAlert] = useState<Partial<ALERT.AlertInformationProps>>({
    message: '',
    type: 'error',
    visible: false,
  });
  const { setInitialState } = useModel('@@initialState');

  const fetchUserInfo = async (userInfo: USER.User) => {
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };

  /**
   * @description se encarga de enviar error en el login
   * @param error error de apollo
   */
  const showError = (error: string) => {
    setPropsAlert({
      message: error,
      type: 'error',
      visible: true,
    });
  };

  const onShowAlert = () => {
    setPropsAlert({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  /**
   * @description se encarga de realizar la consulta para login
   * @param err error en el formulario
   * @param values datos para enviar a la consulta
   * @returns void
   */
  const handleSubmit = (formData: USER.LoginParams) => {
    setValuesLogin(formData);
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
                    //FonFinish={(values: any) => handleSubmit(values)}
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
      <AlertInformation {...propsAlert} onCancel={onShowAlert} />
    </>
  );
};

export default FormLogin;
