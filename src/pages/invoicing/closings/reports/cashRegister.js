/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-use-before-define */
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

export default class TemporalClose extends React.PureComponent {
  dataCash = () => {
    const { data } = this.props;
    const { cashDenomination } = data;
    const dataCash = [];
    for (const key in cashDenomination) {
      dataCash.push({
        key,
        total: data?._id ? cashDenomination[key] : cashDenomination[key] / key,
      });
    }
    return dataCash;
  };

  render() {
    const { data } = this.props;
    const dataCash = this.dataCash();
    return (
      <div style={classes.content}>
        <div style={classes.header}>
          <img src="/logo.svg" alt="logo" width="50%" style={{ marginBottom: -15 }} />
          <div style={{ ...classes.title, marginBottom: 5 }}>ARQUEO</div>
          <div style={classes.text}>
            Fecha Registro: {moment(data?.createdAt).format('DD/MM/YYYY HH:mm:ss ')}
          </div>
          <div style={{ width: '100%', lineHeight: 1.5 }}>
            <div style={classes.text}>
              <span style={classes.textBold}>Cierre No.:</span>
              {data?.code}
            </div>
          </div>
          <div style={{ width: '100%', lineHeight: 1.5 }}>
            <div style={classes.text}>
              <span style={classes.textBold}>Tienda:</span>
              {data?.shop?.name}
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
          {dataCash.map((item, key) => (
            <div style={classes.text} key={key}>
              <div style={classes.row}>
                <div style={classes.col1}>{numeral(item.key).format('$ 0,0')}</div>
                <div style={classes.col2}>{item.total}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ ...classes.text, fontWeight: 'bold', marginTop: 15, fontSize: 20 }}>
          <div style={classes.row}>
            <div style={classes.col1}>Total:</div>
            <div style={classes.col2}>
              {numeral(dataCash.reduce((a, b) => (b ? a + b.total * b.key : a), 0)).format('$ 0,0')}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
