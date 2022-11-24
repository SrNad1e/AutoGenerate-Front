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
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    lineHeight: 1.5,
    color: 'black',
  },
};

export default class OrderProduction extends React.PureComponent {
  render() {
    const { data } = this.props;

    return (
      <div style={classes.content}>
        <div style={classes.header}>
          <img src="/logo.svg" alt="logo" width="50%" style={{ marginBottom: -25 }} />
          <Barcode
            value={data?.number}
            height={50}
            text={`Devolución No. ${data?.number}`}
            fontSize={12}
          />
          <div style={classes.text}>
            <div style={classes.title}>Devolución</div>
            Fecha: {moment(data?.createdAt).format('YYYY/MM/DD HH:mm:ss')}
          </div>
          <div style={{ width: '100%', lineHeight: 1.5 }}>
            <div style={classes.text}>
              <span style={classes.textBold}>Usuario:</span>
              {data?.user?.name}
            </div>
            <div style={classes.text}>
              <span style={classes.textBold}>Tienda:</span>
              {data?.shop?.name}
            </div>
          </div>
          <div style={classes.body}>
            <div style={classes.bodyHeaders}>
              <div style={{ ...classes.text, width: '39%' }}>Artículo</div>
              <div
                style={{
                  ...classes.text,
                  width: data?.order?.summary?.discount > 0 ? '7%' : '11%',
                  textAlign: 'center',
                }}
              >
                Und
              </div>
              <div
                style={{
                  ...classes.text,
                  width: data?.order?.summary?.discount > 0 ? '17%' : '30%',
                  textAlign: 'end',
                }}
              >
                Val
              </div>
              <div style={{ ...classes.text, width: '20%', fontWeight: 'bold', textAlign: 'end' }}>
                Total
              </div>
            </div>
            {data?.details?.map(({ product, quantity, price }) => (
              <div key={product?._id} style={classes.bodyContent}>
                <div style={{ ...classes.text, width: '39%' }}>
                  {product?.reference?.name} - {product?.color?.name} - {product?.size?.value}
                </div>
                <div
                  style={{
                    ...classes.text,
                    width: '11%',
                    textAlign: 'center',
                  }}
                >
                  {quantity}
                </div>
                <div
                  style={{
                    ...classes.text,
                    width: '30%',
                    textAlign: 'end',
                  }}
                >
                  {numeral(price).format('0,0')}
                </div>
                <div style={{ ...classes.text, width: '20%', textAlign: 'end' }}>
                  {numeral(price * quantity).format('0,0')}
                </div>
              </div>
            ))}
          </div>
          <div style={classes.footer}>
            <div style={classes.text}>
              <span style={classes.textBold}>Total:</span>
              {numeral(
                data?.details?.reduce((sum, detail) => sum + detail.quantity * detail.price, 0),
              ).format('$ 0,0')}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
