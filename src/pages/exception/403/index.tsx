import { Result, Button } from 'antd';
import { useHistory } from 'umi';

export default () => {
  const history = useHistory();

  return (
    <Result
      status="403"
      title="403"
      style={{
        background: 'none',
      }}
      subTitle="Lo siento, no tienes acceso a esta página, por favor comunicate con el administrador."
      extra={
        <Button type="primary" onClick={history.goBack}>
          Regresar
        </Button>
      }
    />
  );
};
