import { Result, Button } from 'antd';
import { useHistory } from 'umi';

export default () => {
  const history = useHistory();

  return (
    <Result
      status="404"
      title="404"
      style={{
        background: 'none',
      }}
      subTitle="Lo siento, la pagina que estas visitando no existe."
      extra={
        <Button type="primary" onClick={history.goBack}>
          Regresar
        </Button>
      }
    />
  );
};
