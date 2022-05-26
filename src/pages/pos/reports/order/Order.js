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
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    lineHeight: 1.5,
  },
};

export default class OrderProduction extends React.PureComponent {
  render() {
    const { data } = this.props;

    return (
      <div style={classes.content}>
        <div style={classes.header}>
          <img src="/logo.svg" alt="logo" width="50%" style={{ marginBottom: -25 }} />
          <Barcode value={data?.number} height={50} text={`No. ${data?.number}`} fontSize={12} />
          <div style={classes.text}>
            <div style={classes.title}>TICKET DE VENTA</div>
            Fecha: {moment(data?.createdAt).format('YYYY/MM/DD HH:mm:ss')}
          </div>
          <div style={{ width: '100%', lineHeight: 1.5 }}>
            <div style={classes.text}>
              <span style={classes.textBold}>Nombre:</span>
              {data?.customer?.firstName} {data?.customer?.lastName}
            </div>
            <div style={classes.text}>
              <span style={classes.textBold}>DNI/NIF:</span>
              {data?.customer?.document}
            </div>
            <div style={classes.text}>
              <span style={classes.textBold}>Teléfono:</span>
              {data?.customer?.phone}
            </div>
            <div style={classes.text}>
              <span style={classes.textBold}>Vendedor:</span>
              {data?.user?.name}
            </div>
          </div>
          <div style={classes.body}>
            <div style={classes.bodyHeaders}>
              <div style={{ ...classes.text, width: '39%' }}>Artículo</div>
              <div
                style={{
                  ...classes.text,
                  width: data?.summary?.discount > 0 ? '7%' : '11%',
                  textAlign: 'center',
                }}
              >
                Und
              </div>
              <div
                style={{
                  ...classes.text,
                  width: data?.summary?.discount > 0 ? '17%' : '30%',
                  textAlign: 'end',
                }}
              >
                Val
              </div>
              {data?.summary?.discount > 0 && (
                <div style={{ ...classes.text, width: '17%', textAlign: 'end' }}>Desc</div>
              )}
              <div style={{ ...classes.text, width: '20%', fontWeight: 'bold', textAlign: 'end' }}>
                Total
              </div>
            </div>
            {data?.details?.map(({ product, quantity, price, discount }) => (
              <div key={product?._id} style={classes.bodyContent}>
                <div style={{ ...classes.text, width: '39%' }}>
                  {product?.reference?.name} - {product?.color?.name} - {product?.size?.value}
                </div>
                <div
                  style={{
                    ...classes.text,
                    width: discount > 0 ? '7%' : '11%',
                    textAlign: 'center',
                  }}
                >
                  {quantity}
                </div>
                <div
                  style={{
                    ...classes.text,
                    width: discount > 0 ? '17%' : '30%',
                    textAlign: 'end',
                  }}
                >
                  {numeral(price + discount).format('0,0')}
                </div>
                {discount > 0 && (
                  <div style={{ ...classes.text, width: '17%', textAlign: 'end' }}>
                    {numeral(discount).format('0,0')}
                  </div>
                )}
                <div style={{ ...classes.text, width: '20%', textAlign: 'end' }}>
                  {numeral(price).format('0,0')}
                </div>
              </div>
            ))}
          </div>
          <div style={classes.footer}>
            <div style={classes.text}>
              <span style={classes.textBold}>Total:</span>
              {numeral(data?.summary?.total).format('$ 0,0')}
            </div>
            {data?.payments?.map(({ payment, total }) => (
              <div key={payment?._id} style={classes.text}>
                <span style={classes.textBold}>{payment?.name}:</span>
                {numeral(total).format('$ 0,0')}
              </div>
            ))}
            {data?.summary?.discount > 0 && (
              <div style={classes.text}>
                <span style={classes.textBold}>Descuento:</span>
                {numeral(data?.summary?.discount).format('$ 0,0')}
              </div>
            )}
            {data?.summary?.change > 0 && (
              <div style={classes.text}>
                <span style={classes.textBold}>Cambio:</span>
                {numeral(data?.summary?.change).format('$ 0,0')}
              </div>
            )}
          </div>
          <div style={classes.text}>
            <div style={classes.text}>
              <span style={classes.textBold}>Registrado por:</span>
              {data?.user?.name}
            </div>
            Por protocolos de bioseguridad de COVID19 ninguna prenda tiene cambio
          </div>
        </div>
      </div>
    );
  }
}
