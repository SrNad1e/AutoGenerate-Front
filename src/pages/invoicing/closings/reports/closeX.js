/* eslint-disable react/no-array-index-key */
/* eslint-disable no-use-before-define */
import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import { log } from 'lodash-decorators/utils';

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
    marginTop: 10,
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
    marginTop: 10,
  },
};

export default class TemporalClose extends React.PureComponent {
  render() {
    const { data } = this.props;
    const { payments } = data;
    return (
      <div style={classes.content}>
        <div style={classes.header}>
          <img src="/logo.svg" alt="logo" width="50%" style={{ marginBottom: -15 }} />
          <div style={{ ...classes.title, marginBottom: 5 }}>CIERRE X</div>
          <div style={classes.text}>
            <div style={classes.row}>
              <div style={classes.col1}>
                <span style={{ fontWeight: 'bold' }}>CIERRE # </span>
                {data?.number}
              </div>
              <div style={classes.col2}>
                <span style={{ fontWeight: 'bold' }}>DIA </span>{' '}
                {moment(data?.day).utc().format('DD/MM/YYYY')}
              </div>
            </div>
          </div>
          <div style={classes.text}>
            Registrado: {moment(data?.createdAt).format('DD/MM/YYYY HH:mm:ss ')}
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
          <div style={classes.body}>
            <div style={classes.title}>
              <div style={classes.row}>
                <div>Resumen del día</div>
              </div>
            </div>
            <div style={classes.text}>
              <div style={classes.row}>
                <div style={classes.col1}>Pedios Finalizados: </div>
                <div style={classes.col2}>{data?.summaryOrder?.quantityClosed || 0}</div>
              </div>
            </div>
            <div style={classes.text}>
              <div style={classes.row}>
                <div style={classes.col1}>Pedios Cancelados: </div>
                <div style={classes.col2}>{data?.summaryOrder?.quantityCancel || 0}</div>
              </div>
            </div>
            <div style={classes.text}>
              <div style={classes.row}>
                <div style={classes.col1}>Pedios Pendientes: </div>
                <div style={classes.col2}>{data?.summaryOrder?.quantityOpen || 0}</div>
              </div>
            </div>
            <div style={classes.text}>
              <div style={classes.row}>
                <div style={classes.col1}>Valor Facturas:</div>
                <div style={classes.col2}>{numeral(data?.summaryOrder?.value).format('$ 0,0')}</div>
              </div>
            </div>
            <div style={classes.text}>
              <div style={classes.row}>
                <div style={classes.col1}>Total Pagos:</div>
                <div style={classes.col2}>
                  {numeral(
                    data?.payments?.reduce((sum, payment) => sum + payment?.value, 0),
                  ).format('$ 0,0')}
                </div>
              </div>
            </div>
            <div style={classes.title}>
              <div style={classes.row}>
                <div>Cupones Redimidos</div>
              </div>
            </div>
            <div style={classes.text}>
              <div style={classes.row}>
                <div style={classes.col1}>Cantidad:</div>
                <div style={classes.col2}>
                  {data?.payments?.reduce(
                    (sum, payment) =>
                      sum + (payment?.payment?.type === 'coupon' ? payment?.quantity : 0),
                    0,
                  )}
                </div>
              </div>
            </div>
            <div style={classes.text}>
              <div style={classes.row}>
                <div style={classes.col1}> Valor:</div>
                <div style={classes.col2}>
                  {numeral(
                    data?.payments?.reduce(
                      (sum, payment) =>
                        sum + (payment?.payment?.type === 'coupon' ? payment?.value : 0),
                      0,
                    ),
                  ).format('$ 0,0')}
                </div>
              </div>
            </div>
            <div style={classes.title}>
              <div style={classes.row}>
                <div>Efectivo</div>
              </div>
            </div>
            <div style={classes.text}>
              <div style={classes.row}>
                <div style={classes.col1}>Registrado Sistema:</div>
                <div style={classes.col2}>
                  {numeral(
                    data?.payments?.reduce(
                      (sum, payment) =>
                        sum + (payment?.payment?.type === 'cash' ? payment?.value : 0),
                      0,
                    ),
                  ).format('$ 0,0')}
                </div>
              </div>
            </div>
            <div style={classes.text}>
              <div style={classes.row}>
                <div style={classes.col1}>Reportado En Caja:</div>
                <div style={classes.col2}>{numeral(data.cashInbox).format('$ 0,0')}</div>
              </div>
            </div>
            <div style={classes.text}>
              <div style={classes.row}>
                <div style={classes.col1}>Gastos</div>
                <div style={classes.col2}>{numeral(data.operatingCosts).format('$ 0,0')}</div>
              </div>
            </div>
            {data.cashStatus !== 'closed' && (
              <div style={classes.text}>
                <div style={classes.row}>
                  <div style={classes.col1}>
                    {data.cashStatus === 'surplus' ? 'Sobrante' : 'Faltante'}:
                  </div>
                  <div style={classes.col2}>
                    {numeral(
                      data.cashStatus === 'surplus' ? data.cashBalance : data.cashBalance * -1,
                    ).format('$ 0,0')}
                  </div>
                </div>
              </div>
            )}
            <div style={classes.title}>
              <div style={classes.row}>
                <div>Consignaciones</div>
              </div>
            </div>
            <div style={classes.text}>
              <div style={classes.row}>
                <div style={classes.col1}>Registradas Sistema:</div>
                <div style={classes.col2}>{data.bankwireTickets}</div>
              </div>
            </div>
            <div style={classes.text}>
              <div style={classes.row}>
                <div style={classes.col1}>Reportadas En Caja:</div>
                <div style={classes.col2}>{data.bankwireTicketsInbox}</div>
              </div>
            </div>
            {data.cashStatus !== 'closed' && (
              <div style={classes.text}>
                <div style={classes.row}>
                  <div style={classes.col1}>
                    {data.bankwireStatus === 'surplus' ? 'Sobrante' : 'Faltante'}:
                  </div>
                  <div style={classes.col2}>
                    {data.bankwireStatus === 'surplus'
                      ? data.bankwireTicketsDiff
                      : data.bankwireTicketsDiff * -1}
                  </div>
                </div>
              </div>
            )}
            <div style={classes.title}>
              <div style={classes.row}>
                <div>Detalle pagos</div>
              </div>
            </div>
            <div style={classes.text}>
              <div style={classes.row}>
                <div style={classes.col1}>Efectivo:</div>
                <div style={classes.col2}> {numeral(data.cash).format('$ 0,0')}</div>
              </div>
            </div>
            {payments?.map((payment, key) => (
              <div style={classes.text} key={key}>
                <div style={classes.row}>
                  <div style={classes.col1}>{payment.title}:</div>
                  <div style={classes.col2}> {numeral(payment.amount).format('$ 0,0')}</div>
                </div>
              </div>
            ))}

            <div style={classes.text}>
              <div style={classes.row}>
                <div style={classes.col1}>Total Pagos:</div>{' '}
                <div style={classes.col2}>{numeral(data.totalRevenue).format('$ 0,0')}</div>
              </div>
            </div>
            <div style={classes.title}>
              <div style={classes.row}>
                <div>Detalle créditos</div>
              </div>
            </div>
            <div style={classes.text}>
              <div style={classes.row}>
                <div style={classes.col1}>Ventas a Crédito:</div>
                <div style={classes.col2}> {numeral(data.totalCredit).format('$ 0,0')}</div>
              </div>
            </div>
            <div style={classes.text}>
              <div style={classes.row}>
                <div style={classes.col1}>Abonos a Crédito:</div>
                <div style={classes.col2}> {numeral(data.totalCreditPaid).format('$ 0,0')}</div>
              </div>
            </div>
            {data?.observation && (
              <>
                {' '}
                <div style={classes.title}>
                  <div style={classes.row}>
                    <div>Observación</div>
                  </div>
                </div>
                <div style={classes.row}>
                  <div>{data?.observation}</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}
