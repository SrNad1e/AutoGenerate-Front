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
    color: 'black',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: 1,
    marginTop: 2,
    fontSize: 15,
    color: 'black',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
  },
  text: {
    fontSize: 12,
    color: 'black',
  },
  textBold: {
    fontWeight: 'bold',
    marginRight: 10,
    color: 'black',
  },
  body: {
    width: '100%',
    marginTop: 15,
    color: 'black',
  },
  bodyHeaders: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    fontWeight: 'bold',
    color: 'black',
  },
  bodyContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    color: 'black',
  },
  footer: {
    width: '60mm',
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    lineHeight: 1.5,
    color: 'black',
  },
};

export default class ReportReceipt extends React.PureComponent {
  render() {
    const { data } = this.props;
    const { credit, receipt } = data;
    return (
      <div style={classes.content}>
        <div style={classes.header}>
          <img src="/logo.svg" alt="logo" width="50%" style={{ marginBottom: -25 }} />
          <Barcode
            value={receipt?.number}
            height={50}
            text={`No. ${receipt?.number}`}
            fontSize={12}
          />
          <div style={classes.text}>
            <div style={classes.title}>Recibo de Caja</div>
            Fecha: {moment(receipt?.createdAt).format('YYYY/MM/DD HH:mm:ss')}
          </div>
          <div style={{ width: '100%', lineHeight: 1.5, marginBottom: 20 }}>
            <div style={classes.text}>
              <span style={classes.textBold}>Usuario:</span>
              {receipt?.user?.name}
            </div>
            <div style={classes.text}>
              <span style={classes.textBold}>Caja:</span>
              {receipt?.box?.name}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={classes.text}>
              <span style={{ fontWeight: 'bold', fontSize: 25 }}>Valor</span>
            </div>
          </div>
          <div style={classes.text}>
            <span style={{ fontSize: 25 }}>{numeral(receipt?.value).format('$0,0')}</span>
          </div>
          <div style={{ width: '100%', lineHeight: 1.5 }}>
            <div style={{ width: '100%', lineHeight: 1.5, marginBottom: 20 }}>
              <div style={classes.text}>
                <span style={classes.textBold}>Concepto:</span>
                {receipt?.concept}
              </div>
            </div>
          </div>
        </div>
        {credit && (
          <>
            <div style={{ width: '100%', lineHeight: 1.5, marginBottom: 10 }}>
              <div style={classes.title}>Resumen de Cartera</div>
            </div>
            <div style={classes.text}>
              <span style={classes.textBold}>Nombre:</span>
              {credit?.customer?.firstName} {credit?.customer?.lastName}
            </div>
            <div style={classes.text}>
              <span style={classes.textBold}>Documento:</span>
              {credit?.customer?.document}
            </div>

            <div style={classes.text}>
              <span style={classes.textBold}>Disponible:</span>
              {numeral(credit?.available).format('$ 0,0')}
            </div>
            <div style={classes.text}>
              <span style={classes.textBold}>Congelado:</span>
              {numeral(credit?.frozenAmount).format('$ 0,0')}
            </div>
            <div style={classes.text}>
              <span style={classes.textBold}>Monto:</span>
              {numeral(credit?.amount).format('$ 0,0')}
            </div>
            <div style={classes.text}>
              <span style={classes.textBold}>Deuda:</span>
              {numeral(credit?.balance).format('$ 0,0')}
            </div>
          </>
        )}
      </div>
    );
  }
}
