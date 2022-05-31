import React from 'react';
import moment from 'moment';
import numeral from 'numeral';

const classes = {
  content: {
    margin: 20,
    maxWidth: '60mm',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    width: '100%',
  },
  textBold: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
  },
  row: {
    display: 'flex',
  },
  col1: {
    width: '50%',
    textAlign: 'left',
  },
  col2: {
    width: '50%',
    textAlign: 'right',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '100%',
  },
};

export default class BoxCount extends React.PureComponent {
  render() {
    const { data } = this.props;

    return (
      <div style={classes.content}>
        <div style={classes.header}>
          <img src="/logo.svg" alt="logo" width="50%" style={{ marginBottom: -15 }} />
          <div style={{ ...classes.title, marginBottom: 5 }}>ARQUEO</div>
          <div style={classes.text}>
            Fecha Registro: {moment(data?.createdAt).format('DD/MM/YYYY HH:mm:ss')}
          </div>
          <div style={{ width: '100%', lineHeight: 1.5 }}>
            <div style={classes.text}>
              <span style={classes.textBold}>Cierre No.</span>
              {data?.number}
            </div>
          </div>
          <div style={{ width: '100%', lineHeight: 1.5 }}>
            <div style={classes.text}>
              <span style={classes.textBold}>Tienda:</span>
              {data?.pointOfSale?.shop?.name}
            </div>
          </div>
          <div style={{ width: '100%', lineHeight: 1.5 }}>
            <div style={classes.text}>
              <span style={classes.textBold}>Usuario:</span>
              {data?.user?.name}
            </div>
          </div>
        </div>
        <div style={classes.body}>
          <div style={classes.title}>Lista de denominaciones</div>
          {Object.keys(data?.cashRegister).map((key) => (
            <div key={key} style={classes.text}>
              <div style={classes.row}>
                <div style={classes.col1}>{numeral(data?.cashRegister[key]).format('$ 0,0')}</div>
                <div style={classes.col2}>{key}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ ...classes.text, fontWeight: 'bold', marginTop: 15, fontSize: 20 }}>
          <div style={classes.row}>
            <div style={classes.col1}>Total:</div>
            <div style={classes.col2}>
              {numeral(
                Object.values(data?.cashRegister).reduce((sum, dato) => sum + dato, 0),
              ).format('$ 0,0')}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
