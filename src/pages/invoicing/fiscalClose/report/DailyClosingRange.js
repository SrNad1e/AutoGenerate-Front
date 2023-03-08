/* eslint-disable react/jsx-key */
/* eslint-disable no-use-before-define */
import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import Barcode from 'react-barcode';

import { TypePayment } from '@/graphql/graphql';

import styles from './styles.css';

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
      width: '11.11%',
      fontWeight: 'bold',
    }}
  >
    PEDIDO
  </div>,
  <div
    style={{
      ...styleBorders,
      width: '11.11%',
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
      width: '11.11%',
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
      width: '11.11%',
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
      width: '11.11%',
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
      width: '11.11%',
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
      width: '5%',
      fontWeight: 'bold',
    }}
  >
    EXC
  </div>,
  <div
    style={{
      ...styleBorders,
      borderLeft: 'none',
      borderBottom: 'none',
      width: '17.22%',
      fontWeight: 'bold',
    }}
  >
    MEDIOS DE PAGO
  </div>,
  <div
    style={{
      ...styleBorders,
      borderLeft: 'none',
      borderBottom: 'none',
      width: '11.11%',
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

export default class DailyClosingRangeReport extends React.PureComponent {
  render() {
    const { dataArray } = this.props;

    return (
      <div>
        {dataArray?.map((data, index) => (
          <div style={classes.content}>
            <div style={classes.header}>
              <div style={classes.text}>
                <div style={classes.title}>Cirotex S.A.S </div>
              </div>
              <div style={{ width: '100%', lineHeight: 1.5 }}>
                <div>Fecha del reporte {moment(data?.createdAt).format('YYYY/MM/DD HH:mm:ss')}</div>
                <div style={classes.text}>Comprobante informe diario</div>
                <div
                  style={classes.text}
                >{`${data?.pointOfSale?.shop?.document} Cirotex S.A.S`}</div>
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
                          width: '11.11%',
                        }}
                      >
                        {detail?.order?.number}
                      </div>
                      <div
                        style={{
                          ...styleBorders,
                          width: '11.11%',
                          borderLeft: 'none',
                          borderBottom: 'none',
                        }}
                      >
                        {detail?.authorization?.prefix} {detail?.number}
                      </div>
                      <div
                        style={{
                          ...styleBorders,
                          borderLeft: 'none',
                          borderBottom: 'none',
                          width: '11.11%',
                        }}
                      >
                        {moment(detail?.createdAt).format('YYYY/MM/DD')}
                      </div>
                      <div
                        style={{
                          ...styleBorders,
                          borderLeft: 'none',
                          borderBottom: 'none',
                          width: '11.11%',
                        }}
                      >
                        {numeral(detail?.summary?.subtotal).format('$ 0,0')}
                      </div>
                      <div
                        style={{
                          ...styleBorders,
                          borderLeft: 'none',
                          borderBottom: 'none',
                          width: '11.11%',
                        }}
                      >
                        {numeral(detail?.summary?.tax).format('$ 0,0')}
                      </div>
                      <div
                        style={{
                          ...styleBorders,
                          borderLeft: 'none',
                          borderBottom: 'none',
                          width: '11.11%',
                        }}
                      >
                        {numeral(detail?.summary?.total).format('$ 0,0')}
                      </div>
                      <div
                        style={{
                          ...styleBorders,
                          borderLeft: 'none',
                          borderBottom: 'none',
                          width: '5%',
                        }}
                      >
                        {0}
                      </div>
                      <div
                        style={{
                          ...styleBorders,
                          borderLeft: 'none',
                          borderBottom: 'none',
                          width: '17.22%',
                          lineHeight: 1,
                        }}
                      >
                        {detail?.payments?.reduce(
                          (acc, payment) => `${acc} ${payment?.payment.name}: ${payment.total}`,
                          '',
                        )}
                      </div>
                      <div
                        style={{
                          ...styleBorders,
                          borderLeft: 'none',
                          borderBottom: 'none',
                          width: '11.11%',
                        }}
                      >
                        {numeral(detail?.summary?.subtotal).format('$ 0,0')}
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
                    style={{
                      ...styleBorders,
                      borderTop: 'none',
                      width: '33.33%',
                      fontWeight: 'bold',
                    }}
                  >
                    Total:
                  </div>
                  <div
                    style={{
                      ...styleBorders,
                      width: '11.11%',
                      borderLeft: 'none',
                      borderTop: 'none',
                      display: 'flex',
                      justifyContent: 'flex-end',
                      paddingRight: 10,
                    }}
                  >
                    {numeral(data?.summary?.subtotal).format('$ 0,0')}
                  </div>
                  <div
                    style={{
                      ...styleBorders,
                      width: '11.11%',
                      borderLeft: 'none',
                      borderTop: 'none',
                      display: 'flex',
                      justifyContent: 'flex-end',
                      paddingRight: 10,
                    }}
                  >
                    {numeral(data?.summary?.tax).format('$ 0,0')}
                  </div>
                  <div
                    style={{
                      ...styleBorders,
                      width: '11.11%',
                      borderLeft: 'none',
                      borderTop: 'none',
                      display: 'flex',
                      justifyContent: 'flex-end',
                      paddingRight: 10,
                    }}
                  >
                    {numeral(data?.summary?.total).format('$ 0,0')}
                  </div>
                  <div
                    style={{
                      ...styleBorders,
                      width: '5%',
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
                      width: '17.22%',
                      borderLeft: 'none',
                      borderTop: 'none',
                      display: 'flex',
                      justifyContent: 'flex-end',
                      paddingRight: 10,
                    }}
                  >
                    {' '}
                  </div>
                  <div
                    style={{
                      ...styleBorders,
                      width: '11.11%',
                      borderLeft: 'none',
                      borderTop: 'none',
                      display: 'flex',
                      justifyContent: 'flex-end',
                      paddingRight: 10,
                    }}
                  >
                    {numeral(data?.summary?.subtotal).format('$ 0,0')}
                  </div>
                </div>
              </div>
              <div style={classes.footer}>
                <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                  {resumenColumn?.map((item) => item)}
                </div>
                {data?.summaryPayments?.map((item) => (
                  <>
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
                        {numeral(item?.total).format('$ 0,0')}
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
            {index + 1 !== dataArray?.length && <div className={styles.pageBreak} />}
          </div>
        ))}
      </div>
    );
  }
}
