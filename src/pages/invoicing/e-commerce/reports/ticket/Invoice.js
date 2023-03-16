/* eslint-disable no-use-before-define */
import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import Barcode from 'react-barcode';

import style from './styles.css';
import { TypePayment } from '@/graphql/graphql';
import { Space } from 'antd';

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
    fontSize: 9.3,
    fontFamily: 'Poppins',
    color: 'black',
  },
  text1: {
    fontSize: 9.3,
    fontFamily: 'Poppins',
    color: 'black',
  },
  textBold: {
    fontFamily: 'Poppins',
    fontWeight: 500,
    marginRight: 30,
    color: 'black',
  },
  body: {
    width: '100%',
    marginTop: 15,
    color: 'black',
    marginBottom: 5,
  },
  bodyHeaders: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    fontWeight: 600,
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
  lineItems: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    color: 'black',
  },
  spaceItems: {
    fontWeight: 600,
    color: 'black',
  },
  lineItems1: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    color: 'black',
    marginTop: 5,
  },
};

export default class OrderReportEcommerce extends React.PureComponent {
  render() {
    const { data } = this.props;

    return (
      <div style={classes.content}>
        <div style={classes.header}>
          <img src="/logo.svg" alt="logo" width="90%" height="70%" style={{ marginBottom: -25 }} />
          <div style={classes.text}>
            <span
              style={{ fontFamily: 'Poppins', fontWeight: 600, marginRight: 10, color: 'black' }}
            >
              Manufacturas Cirotex S. A. S
            </span>
          </div>
          <div style={classes.text}>{`NIT: ${data?.shop?.document || ' '}`}</div>
          <div style={classes.text}>{`Dirección: ${data?.shop?.address || ' '}`}</div>
          <div style={classes.text}>{`Correo: ${data?.shop?.email || ' '}`}</div>
          <br />
          <hr className={style.hr3} />
          <Barcode value={data?.number} height={50} text={`N°. ${data?.number}`} fontSize={10} />
          <hr className={style.hr3} />
          <div style={{ width: '100%', lineHeight: 1.5, fontSize: 9.3 }}>
            <div style={classes.text}>
              <span
                style={{ fontFamily: 'Poppins', fontWeight: 500, marginRight: 33, color: 'black' }}
              >
                Fecha:
              </span>
              {moment(data?.closeDate).format('YYYY/MM/DD HH:mm:ss')}
            </div>
            <div style={classes.text1}>
              <span
                style={{ fontFamily: 'Poppins', fontWeight: 500, marginRight: 31, color: 'black' }}
              >
                Cajera:
              </span>
              {data?.user?.name}
            </div>
            <div style={classes.text1}>
              <span style={classes.textBold}>Cliente:</span>
              {data?.customer?.firstName} {data?.customer?.lastName}
            </div>
            <div style={classes.text1}>
              <span style={classes.textBold}>Cédula:</span>
              {data?.customer?.document}
            </div>
            <div
              style={{
                fontSize: 9.3,
                fontFamily: 'Poppins',
                color: 'black',
                marginBottom: 7,
                marginRight: 50,
              }}
            >
              <span
                style={{ fontFamily: 'Poppins', fontWeight: 500, marginRight: 42, color: 'black' }}
              >
                Caja:
              </span>
              {data?.pointOfSale?.box?.name}
            </div>
          </div>
          <hr className={style.hr} />
          <div style={classes.body}>
            <div style={classes.bodyHeaders}>
              <div style={{ ...classes.text, width: '51%', fontFamily: 'Poppins' }}>REF</div>
              <div
                style={{
                  ...classes.text,
                  width: '11%',
                  textAlign: 'center',
                }}
              >
                CANT
              </div>
              <div
                style={{
                  ...classes.text,
                  width: '30%',
                  textAlign: 'end',
                }}
              >
                PRECIO
              </div>
              <div style={{ ...classes.text, width: '20%', fontWeight: 600, textAlign: 'end' }}>
                TOTAL
              </div>
            </div>
            {data?.details?.map(({ product, quantity, price, discount }) => (
              <div key={product?._id} style={classes.bodyContent}>
                <div style={{ ...classes.text, width: '51%' }}>
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
                  {numeral(price + discount).format('0,0')}
                </div>
                <div style={{ ...classes.text, width: '20%', textAlign: 'end' }}>
                  {numeral(price * quantity).format('0,0')}
                </div>
              </div>
            ))}
          </div>
          <hr className={style.hr} />
          <div style={classes.lineItems}>
            <div style={classes.text}>
              <span style={classes.spaceItems}>{'UNIDADES'}:</span>
            </div>
            <div style={{ marginLeft: 65, bottom: 13, fontSize: 10 }}>
              {data?.details?.reduce((sum, detail) => sum + detail?.quantity, 0)}
            </div>
          </div>
          <div style={classes.lineItems1}>
            <div style={classes.text}>
              <span style={classes.spaceItems}>{'MEDIOS DE PAGO'}:</span>
            </div>
            <div style={{ marginLeft: 32, bottom: 20, fontSize: 10 }}>
              {data?.payments?.map((payment) => (
                <Space size={10} key={payment.payment._id}>
                  <div>{payment?.payment?.name}: </div>
                  <div>
                    {payment?.payment?.type === TypePayment.Cash
                      ? numeral(payment?.total + data?.summary?.change).format('$ 0,0')
                      : numeral(payment?.total).format('$ 0,0')}
                  </div>
                </Space>
              ))}
            </div>
          </div>
          <hr className={style.hr} />
          <div style={classes.lineItems}>
            <div style={classes.text}>
              <span style={classes.spaceItems}>{'TOTAL NETO A PAGAR'}:</span>
            </div>
            <div style={{ marginLeft: 70, bottom: 13, fontSize: 10 }}>
              {numeral(data?.summary?.total).format('$ 0,0')}
            </div>
          </div>
          <div style={classes.lineItems}>
            <div style={classes.text}>
              <span style={classes.spaceItems}>{'CAMBIO'}:</span>
            </div>
            <div style={{ marginLeft: 129, bottom: 13, fontSize: 10 }}>
              {numeral(data?.summary?.change).format('$ 0,0')}
            </div>
          </div>
          <div style={classes.lineItems}>
            <div style={classes.text}>
              <span style={classes.spaceItems}>{'DESCUENTO'}:</span>
            </div>
            <div style={{ marginLeft: 112, bottom: 13, fontSize: 10 }}>
              {numeral(data?.summary?.discount).format('$ 0,0')}
            </div>
          </div>
          <hr className={style.hr} />
          <br />
          <div style={classes.text}>
            <span style={{ fontFamily: 'Poppins', fontWeight: 600, color: 'black', marginLeft: 5 }}>
              INFORMACIÓN IMPORTANTE
            </span>
          </div>
        </div>
        <hr className={style.hr2} />
        <div style={{ width: '100%', fontSize: 10, fontFamily: 'Poppins' }}>
          <div style={{ width: '100%', display: 'flex' }}>
            <div style={{ marginRight: 10 }}>•</div>
            <div> 8 dias calendario para cambios</div>
          </div>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              bottom: 20,
            }}
          >
            <div style={{ marginRight: 10 }}>•</div>
            <div> 2 meses para garantía (bisutería 20 dias) a partir de la fecha de compra</div>
          </div>
          <div style={{ width: '100%', display: 'flex', bottom: 20 }}>
            <div style={{ marginRight: 10 }}>•</div>
            <div> Debes presentar la factura</div>
          </div>
          <div style={{ width: '100%', display: 'flex', bottom: 20 }}>
            <div style={{ marginRight: 10 }}>•</div>
            <div> No cambiamos panties, bodies ni bisutería, sin excepción</div>
          </div>
          <div style={{ width: '100%', display: 'flex', bottom: 20 }}>
            <div style={{ marginRight: 10 }}>•</div>
            <div> Deben tener las etiquetas puestas y en perfecto estado</div>
          </div>
          <div style={{ width: '100%', display: 'flex', bottom: 20 }}>
            <div style={{ marginRight: 10 }}>•</div>
            <div> No deben estar sucias, rotas, desgastadas o manchadas</div>
          </div>
          <div style={{ width: '100%', display: 'flex', bottom: 20 }}>
            <div style={{ marginRight: 10 }}>•</div>
            <div> Las copas de los brasieres deben estar intactas sin estrías ni dobleces</div>
          </div>
        </div>
      </div>
    );
  }
}
