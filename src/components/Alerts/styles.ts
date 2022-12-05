export const useStyle = (
  color: string,
): {
  general: React.CSSProperties | undefined;
  col: React.CSSProperties | undefined;
  bodyStyle: React.CSSProperties | undefined;
  button: React.CSSProperties | undefined;
} => {
  return {
    general: {
      color,
      fontSize: 50,
    },
    col: {
      textAlign: 'center',
    },
    bodyStyle: { padding: '30px 0', height: 'auto' },

    button: {
      backgroundColor: color,
      borderColor: color,
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      borderRadius: 5,
    },
  };
};
