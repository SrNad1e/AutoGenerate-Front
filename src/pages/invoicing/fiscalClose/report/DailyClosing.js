/* eslint-disable react/jsx-key */
/* eslint-disable no-use-before-define */
import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import Barcode from 'react-barcode';

import { TypePayment } from '@/graphql/graphql';

const classes = {
  content: {
    margin: 20,
  },
  title: {
    textAlign: 'left',
    fontWeight: 'bold',
    lineHeight: 1,
    marginTop: 2,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'left',
    alignItems: 'left',
  },
  text: {
    fontSize: 12,
    textAlign: 'left',
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
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'left',
    alignItems: 'left',
    lineHeight: 1.5,
  },
  lineItems: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  spaceItems: {
    fontWeight: 'bold',
    marginRight: 90,
  },
};
const styleBorders = {
  display: 'flex',
  border: 'solid 1pt black',
  textAlign: 'center',
  alignItems: 'center',
  justifyContent: 'center',
};

const columnsHeader = [
  <div
    style={{
      ...styleBorders,
      borderBottom: 'none',
      width: '12.5%',
      fontWeight: 'bold',
    }}
  >
    PEDIDO
  </div>,
  <div
    style={{
      ...styleBorders,
      width: '12.5%',
      borderBottom: 'none',
      borderLeft: 'none',
      fontWeight: 'bold',
    }}
  >
    FACTURA
  </div>,
  <div
    style={{
      ...styleBorders,
      borderLeft: 'none',
      borderBottom: 'none',
      width: '12.5%',
      fontWeight: 'bold',
    }}
  >
    FECHA
  </div>,
  <div
    style={{
      ...styleBorders,
      borderLeft: 'none',
      borderBottom: 'none',
      width: '12.5%',
      fontWeight: 'bold',
    }}
  >
    SUBTOTAL
  </div>,
  <div
    style={{
      ...styleBorders,
      borderLeft: 'none',
      borderBottom: 'none',
      width: '12.5%',
      fontWeight: 'bold',
    }}
  >
    IVA
  </div>,
  <div
    style={{
      ...styleBorders,
      borderLeft: 'none',
      borderBottom: 'none',
      width: '12.5%',
      fontWeight: 'bold',
    }}
  >
    TOTAL
  </div>,
  <div
    style={{
      ...styleBorders,
      borderLeft: 'none',
      borderBottom: 'none',
      width: '12.5%',
      fontWeight: 'bold',
    }}
  >
    EXCENTO
  </div>,
  <div
    style={{
      ...styleBorders,
      borderLeft: 'none',
      borderBottom: 'none',
      width: '12.5%',
      fontWeight: 'bold',
    }}
  >
    GRABADO
  </div>,
];

const resumenColumn = [
  <div
    style={{
      ...styleBorders,
      borderBottom: 'none',
      width: '12.5%',
      fontWeight: 'bold',
    }}
  >
    Medio de Pago
  </div>,
  <div
    style={{
      ...styleBorders,
      borderLeft: 'none',
      borderBottom: 'none',
      width: '12.5%',
      fontWeight: 'bold',
    }}
  >
    Cantidad
  </div>,
  <div
    style={{
      ...styleBorders,
      borderLeft: 'none',
      borderBottom: 'none',
      width: '12.5%',
      fontWeight: 'bold',
    }}
  >
    Valor
  </div>,
];

export default class DailyClosingReport extends React.PureComponent {
  render() {
    const { data } = this.props;

    return (
      <div style={classes.content}>
        <div style={classes.header}>
          <div style={classes.text}>
            <div style={classes.title}>Cirotex S.A.S </div>
          </div>
          <div style={{ width: '100%', lineHeight: 1.5 }}>
            <div>Fecha del reporte {moment(data?.createdAt).format('YYYY/MM/DD HH:mm:ss')}</div>
            <div style={classes.text}>Comprobante informe diario</div>
            <div style={classes.text}>{`${data?.pointOfSale?.shop?.document} Cirotex S.A.S`}</div>
            <div style={classes.text}>
              <span>Periodo </span>
              {moment(new Date()).format('YYYY-MM-DD')}
            </div>
            <div style={classes.text}>
              <span>Caja : </span>
              {data?.pointOfSale?.box?.name}
            </div>
            <div style={classes.text}>{'Ventas por departamento'}</div>
          </div>
          <div style={classes.body}>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
              {columnsHeader?.map((item) => item)}
            </div>
            <div style={{ borderBottom: 'solid 1px black' }}>
              {data?.invoices?.map((detail) => (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                  }}
                >
                  <div
                    style={{
                      ...styleBorders,
                      borderBottom: 'none',
                      width: '12.5%',
                    }}
                  >
                    {detail?.order?.number}
                  </div>
                  <div
                    style={{
                      ...styleBorders,
                      width: '12.5%',
                      borderLeft: 'none',
                      borderBottom: 'none',
                    }}
                  >
                    {detail?.number}
                  </div>
                  <div
                    style={{
                      ...styleBorders,
                      borderLeft: 'none',
                      borderBottom: 'none',
                      width: '12.5%',
                    }}
                  >
                    {detail?.createdAt}
                  </div>
                  <div
                    style={{
                      ...styleBorders,
                      borderLeft: 'none',
                      borderBottom: 'none',
                      width: '12.5%',
                    }}
                  >
                    {detail?.summary?.subtotal}
                  </div>
                  <div
                    style={{
                      ...styleBorders,
                      borderLeft: 'none',
                      borderBottom: 'none',
                      width: '12.5%',
                    }}
                  >
                    {detail?.summary?.tax}
                  </div>
                  <div
                    style={{
                      ...styleBorders,
                      borderLeft: 'none',
                      borderBottom: 'none',
                      width: '12.5%',
                    }}
                  >
                    {detail?.summary?.total}
                  </div>
                  <div
                    style={{
                      ...styleBorders,
                      borderLeft: 'none',
                      borderBottom: 'none',
                      width: '12.5%',
                    }}
                  >
                    {0}
                  </div>
                  <div
                    style={{
                      ...styleBorders,
                      borderLeft: 'none',
                      borderBottom: 'none',
                      width: '12.5%',
                    }}
                  >
                    {detail?.summary?.subtotal}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
              }}
            >
              <div
                style={{ ...styleBorders, borderTop: 'none', width: '37.5%', fontWeight: 'bold' }}
              >
                Total:
              </div>
              <div
                style={{
                  ...styleBorders,
                  width: '12.5%',
                  borderLeft: 'none',
                  borderTop: 'none',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  paddingRight: 10,
                }}
              >
                {data?.summary?.subtotal}
              </div>
              <div
                style={{
                  ...styleBorders,
                  width: '12.5%',
                  borderLeft: 'none',
                  borderTop: 'none',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  paddingRight: 10,
                }}
              >
                {data?.summary?.tax}
              </div>
              <div
                style={{
                  ...styleBorders,
                  width: '12.5%',
                  borderLeft: 'none',
                  borderTop: 'none',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  paddingRight: 10,
                }}
              >
                {data?.summary?.total}
              </div>
              <div
                style={{
                  ...styleBorders,
                  width: '12.5%',
                  borderLeft: 'none',
                  borderTop: 'none',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  paddingRight: 10,
                }}
              >
                {0}
              </div>
              <div
                style={{
                  ...styleBorders,
                  width: '12.5%',
                  borderLeft: 'none',
                  borderTop: 'none',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  paddingRight: 10,
                }}
              >
                {data?.summary?.subtotal}
              </div>
            </div>
          </div>
          <div style={classes.footer}>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
              {resumenColumn?.map((item) => item)}
            </div>
            <div>
              {data?.summaryPayments?.map((item) => {
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                  }}
                >
                  <div
                    style={{
                      ...styleBorders,
                      borderRight: 'none',
                      width: '12.4%',
                    }}
                  >
                    {item?.payment?.name}
                  </div>
                  <div
                    style={{
                      ...styleBorders,
                      borderRight: 'none',
                      width: '12.4%',
                    }}
                  >
                    {item?.quantity}
                  </div>
                  <div
                    style={{
                      ...styleBorders,
                      width: '12.6%',
                    }}
                  >
                    {item?.total}
                  </div>
                </div>;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
