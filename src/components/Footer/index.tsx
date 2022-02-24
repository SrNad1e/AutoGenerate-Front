import { DefaultFooter } from '@ant-design/pro-layout';

export default () => {
  const defaultMessage = 'Todos los derechos reservados';

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Cirotex',
          title: 'Cirotex',
          href: 'https://cirotex.com',
          blankTarget: true,
        },
        {
          key: 'Toulouse',
          title: 'Toulouse',
          href: 'https://toulouse.com.co',
          blankTarget: true,
        },
      ]}
    />
  );
};
