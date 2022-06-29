/* eslint-disable no-use-before-define */
import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import Barcode from 'react-barcode';

import './styles.css';

const classes = {
  content: {
    margin: 20,
    maxWidth: '60mm',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: 1,
    marginTop: 2,
    fontSize: 15,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
  },
  textBold: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  body: {
    width: '100%',
    marginTop: 15,
  },
  bodyHeaders: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    fontWeight: 'bold',
  },
  bodyContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  footer: {
    width: '60mm',
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    lineHeight: 1.5,
  },
};

export default class ReportExpense extends React.PureComponent {
  render() {
    const { data } = this.props;

    return (
      <div style={classes.content}>
        <div style={classes.header}>
          <img src="/logo.svg" alt="logo" width="50%" style={{ marginBottom: -25 }} />
          <Barcode value={data?.number} height={50} text={`No. ${data?.number}`} fontSize={12} />
          <div style={classes.text}>
            <div style={classes.title}>Egreso</div>
            Fecha: {moment(data?.createdAt).format('YYYY/MM/DD HH:mm:ss')}
          </div>
          <div style={{ width: '100%', lineHeight: 1.5, marginBottom: 20 }}>
            <div style={classes.text}>
              <span style={classes.textBold}>Usuario:</span>
              {data?.user?.name}
            </div>
            <div style={classes.text}>
              <span style={classes.textBold}>Caja:</span>
              {data?.box?.name}
            </div>
          </div>
          <div style={{ width: '100%', lineHeight: 1.5 }}>
            <div style={classes.text}>
              <span style={classes.textBold}>Valor:</span>
              {numeral(data?.value).format('$0,0')}
            </div>

            <div style={classes.text}>
              <span style={classes.textBold}>Concepto:</span>
              {data?.concept}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
