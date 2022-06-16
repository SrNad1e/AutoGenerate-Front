import { Result, Button } from 'antd';
import { useHistory } from 'umi';

export default () => {
  const history = useHistory();

  return (
    <Result
      status="500"
      title="500"
      style={{
        background: 'none',
      }}
      subTitle="Lo siento, Ha ocurrido un error en el servidor"
      extra={
        <Button type="primary" onClick={history.goBack}>
          Regresar
        </Button>
      }
    />
  );
};
