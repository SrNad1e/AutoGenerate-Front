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
  textFooter: {
    fontSize: 10,
    color: 'black',
  },
  textMain: {
    fontSize: 22,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10px 0',
    color: 'black',
  },
  textBold: {
    fontWeight: 'bold',
    marginRight: 10,
    color: 'black',
  },
  textBoldMain: {
    fontWeight: 'bold',
    fontSize: 25,
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
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    lineHeight: 1.5,
    color: 'black',
  },
};

export default class ReportCoupon extends React.PureComponent {
  render() {
    const { data } = this.props;
    return (
      <div style={classes.content}>
        <div style={classes.header}>
          <img src="/logo.svg" alt="logo" width="50%" style={{ marginBottom: -25 }} />
          <Barcode value={data?.code} height={50} text={`Bono Ref. ${data?.code}`} fontSize={12} />
          <div style={{ fontSize: 20, fontWeight: 'bold' }}>
            <span>{data?.title}</span>
          </div>
          <div style={classes.text}>
            Fecha de generación: {moment(data?.createdAt).format('YYYY-MM-DD HH:mm:ss')}
          </div>
          <div style={{ width: '100%', lineHeight: 1.5 }}>
            <div style={classes.textMain}>
              <span style={classes.textBold}>Valor Bono:</span>
              <span style={classes.textBoldMain}>{numeral(data?.value).format('$ 0,0')}</span>
            </div>
            <div style={classes.text}>
              <span style={classes.textBold}>Valido hasta</span>
              {moment(data?.expiration).format('YYYY-MM-DD')}
            </div>
          </div>
          <div style={classes.textFooter}>
            <div style={classes.textFooter}>{data?.message}</div>
          </div>
        </div>
      </div>
    );
  }
}
