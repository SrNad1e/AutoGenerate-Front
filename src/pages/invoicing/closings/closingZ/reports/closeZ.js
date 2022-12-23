/* eslint-disable no-use-before-define */
import React from 'react';
import moment from 'moment';
import numeral from 'numeral';

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
    width: '100%',
    color: 'black',
  },
  textBold: {
    fontWeight: 'bold',
    marginRight: 10,
    color: 'black',
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
    marginTop: 10,
    color: 'black',
  },
  row: {
    display: 'flex',
    color: 'black',
  },
  col1: {
    width: '100%',
    textAlign: 'left',
    color: 'black',
  },
  col2: {
    width: '50%',
    textAlign: 'right',
    color: 'black',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
    color: 'black',
  },
};

export default class ReportCloseZ extends React.PureComponent {
  render() {
    const { data } = this.props;

    const totalPayments = data?.payments?.reduce((sum, payment) => sum + payment?.value, 0);

    const totalCash = data?.payments?.reduce(
      (sum, payment) => sum + (payment?.payment?.type === 'CASH' ? payment?.value : 0),
      0,
    );

    const totalBank = data?.payments?.reduce(
      (sum, payment) => sum + (payment?.payment?.type === 'BANK' ? payment?.value : 0),
      0,
    );

    const quantityBank = data?.payments?.reduce(
      (sum, payment) => sum + (payment?.payment?.type === 'BANK' ? payment?.quantity : 0),
      0,
    );

    const totalBonus = data?.payments?.reduce(
      (sum, payment) => sum + (payment?.payment?.type === 'BONUS' ? payment?.value : 0),
      0,
    );

    const quantityBonus = data?.payments?.reduce(
      (sum, payment) => sum + (payment?.payment?.type === 'BONUS' ? payment?.quantity : 0),
      0,
    );

    const totalCredit = data?.payments?.reduce(
      (sum, payment) => sum + (payment?.payment?.type === 'CREDIT' ? payment?.value : 0),
      0,
    );

    const totalExpenses = data?.expenses?.reduce((sum, expense) => sum + expense?.value, 0);

    const cashRegister = { ...data?.cashRegister };
    if (cashRegister) {
      delete cashRegister['__typename'];
    }

    const totalCashRegister = Object.keys(cashRegister || {})?.reduce(
      (sum, key) => sum + parseInt(key.slice(1)) * parseInt(cashRegister[key]),
      0,
    );

    const paymentCreditCash = data?.paymentsCredit?.reduce(
      (sum, payment) => sum + (payment?.payment?.type === 'CASH' ? payment?.value : 0),
      0,
    );

    const quantityCreditBank = data?.paymentsCredit?.reduce(
      (sum, payment) => sum + (payment?.payment?.type === 'BANK' ? payment?.quantity : 0),
      0,
    );

    const paymentCreditBank = data?.paymentsCredit?.reduce(
      (sum, payment) => sum + (payment?.payment?.type === 'BANK' ? payment?.value : 0),
      0,
    );

    const paymentCreditBonus = data?.paymentsCredit?.reduce(
      (sum, payment) => sum + (payment?.payment?.type === 'BONUS' ? payment?.value : 0),
      0,
    );

    const totalCreditPayments = data?.paymentsCredit?.reduce(
      (sum, payment) => sum + payment?.value,
      0,
    );

    const diff = totalCashRegister + totalExpenses - (totalCash + paymentCreditCash);
    const diffBank =
      data?.quantityBank +
      quantityCreditBank -
      ((quantityBank || data?.quantityBank) + quantityCreditBank);

    return (
      <div style={classes.content}>
        <div style={classes.header}>
          <img src="/logo.svg" alt="logo" width="50%" style={{ marginBottom: -15 }} />
          <div style={{ ...classes.title, marginBottom: 5 }}>CIERRE Z</div>
          <div style={classes.text}>
            <div style={classes.row}>
              <div style={classes.col1}>
                <span style={{ fontWeight: 'bold' }}>CIERRE # </span>
                {data?.number}
              </div>
              <div style={classes.col2}>
                <span style={{ fontWeight: 'bold' }}>DIA </span>{' '}
                {moment(data?.closeDate).utc().format('DD/MM/YYYY')}
              </div>
            </div>
          </div>
          <div style={classes.text}>Registrado: {moment(data?.createdAt).format('DD/MM/YYYY')}</div>
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
                <div style={classes.col1}>Pedidos finalizados:</div>
                <div style={classes.col2}>{data?.summaryOrder?.quantityClosed}</div>
              </div>
            </div>
            <div style={classes.text}>
              <div style={classes.row}>
                <div style={classes.col1}>Pedidos cancelados:</div>
                <div style={classes.col2}>{data?.summaryOrder?.quantityCancel}</div>
              </div>
            </div>
            <div style={classes.text}>
              <div style={classes.row}>
                <div style={classes.col1}>Pedidos pendientes:</div>
                <div style={classes.col2}>{data?.summaryOrder?.quantityOpen}</div>
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
                  {numeral(totalPayments + totalCreditPayments).format('$ 0,0')}
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
                <div style={classes.col2}>{quantityBonus}</div>
              </div>
            </div>
            <div style={classes.text}>
              <div style={classes.row}>
                <div style={classes.col1}> Valor:</div>
                <div style={classes.col2}>{numeral(totalBonus).format('$ 0,0')}</div>
              </div>
            </div>
            <div style={classes.title}>
              <div style={classes.row}>
                <div>Devoluciones</div>
              </div>
            </div>
            <div style={classes.text}>
              <div style={classes.row}>
                <div style={classes.col1}>Valor:</div>
                <div style={classes.col2}>{numeral(data?.refunds?.value).format('$ 0,0')}</div>
              </div>
            </div>
            <div style={classes.text}>
              <div style={classes.row}>
                <div style={classes.col1}>Cantidad de Productos:</div>
                <div style={classes.col2}>{data?.refunds?.quantity || 0}</div>
              </div>
            </div>
            <div style={classes.title}>
              <div style={classes.row}>
                <div>Efectivo</div>
              </div>
            </div>
            <div style={classes.text}>
              <div style={classes.row}>
                <div style={classes.col1}>Registrado:</div>
                <div style={classes.col2}>
                  {numeral(totalCash + paymentCreditCash).format('$ 0,0')}
                </div>
              </div>
            </div>
            <div style={classes.text}>
              <div style={classes.row}>
                <div style={classes.col1}>Reportado:</div>
                <div style={classes.col2}>{numeral(totalCashRegister).format('$ 0,0')}</div>
              </div>
            </div>
            <div style={classes.text}>
              <div style={classes.row}>
                <div style={classes.col1}>Egresos:</div>
                <div style={classes.col2}>{numeral(totalExpenses).format('$ 0,0')}</div>
              </div>
            </div>
            {diff !== 0 && (
              <div style={classes.text}>
                <div style={classes.row}>
                  <div style={classes.col1}>{diff > 0 ? 'Sobrante' : 'Faltante'}:</div>
                  <div style={classes.col2}>
                    {numeral(diff > 0 ? diff : diff * -1).format('$ 0,0')}
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
                <div style={classes.col1}>Cantidad Registrado:</div>
                <div style={classes.col2}>{quantityBank + quantityCreditBank}</div>
              </div>
            </div>
            <div style={classes.text}>
              <div style={classes.row}>
                <div style={classes.col1}>Total Registrado:</div>
                <div style={classes.col2}>
                  {numeral(totalBank + paymentCreditBank).format('$ 0,0')}
                </div>
              </div>
            </div>
            <div style={classes.text}>
              <div style={classes.row}>
                <div style={classes.col1}>Cantidad Reportado:</div>
                <div style={classes.col2}>{data?.quantityBank}</div>
              </div>
            </div>
            {diffBank !== 0 && (
              <div style={classes.text}>
                <div style={classes.row}>
                  <div style={classes.col1}>{diffBank > 0 ? 'Sobrante' : 'Faltante'}:</div>
                  <div style={classes.col2}>{diffBank > 0 ? diffBank : diffBank * -1}</div>
                </div>
              </div>
            )}
            <div style={classes.title}>
              <div style={classes.row}>
                <div>Detalle pagos</div>
              </div>
            </div>
            {data?.paymentsCredit?.length < data?.payment?.length
              ? data?.payments?.map(({ payment, value }) => (
                  <div key={payment?._id} style={classes.text}>
                    <div style={classes.row}>
                      <div style={classes.col1}>{payment?.name}:</div>
                      {payment.type === 'BANK' ? (
                        <div style={classes.col2}>
                          {' '}
                          {numeral(value + paymentCreditBank).format('$ 0,0')}
                        </div>
                      ) : payment.type === 'CASH' ? (
                        <div style={classes.col2}>
                          {' '}
                          {numeral(value + paymentCreditCash).format('$ 0,0')}
                        </div>
                      ) : (
                        <div style={classes.col2}> {numeral(value).format('$ 0,0')}</div>
                      )}
                    </div>
                  </div>
                ))
              : data?.paymentsCredit?.map(({ payment, value }) => (
                  <div key={payment?._id} style={classes.text}>
                    <div style={classes.row}>
                      <div style={classes.col1}>{payment?.name}:</div>
                      {payment.type === 'BANK' ? (
                        <div style={classes.col2}>
                          {' '}
                          {numeral(value + totalBank).format('$ 0,0')}
                        </div>
                      ) : payment.type === 'CASH' ? (
                        <div style={classes.col2}>
                          {' '}
                          {numeral(value + totalCash).format('$ 0,0')}
                        </div>
                      ) : (
                        <div style={classes.col2}> {numeral(value).format('$ 0,0')}</div>
                      )}
                    </div>
                  </div>
                ))}
            <div style={classes.text}>
              <div style={classes.row}>
                <div style={classes.col1}>Total Pagos:</div>
                <div style={classes.col2}>
                  {numeral(totalPayments + totalCreditPayments).format('$ 0,0')}
                </div>
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
                <div style={classes.col2}> {numeral(totalCredit).format('$ 0,0')}</div>
              </div>
            </div>
            <div style={classes.text}>
              <div style={classes.row}>
                <div style={classes.col1}>Abonos a Crédito:</div>
                <div style={classes.col2}> {numeral(totalCreditPayments).format('$ 0,0')}</div>
              </div>
            </div>
          </div>
        </div>
        <div style={classes.header}>
          <img src="/logo.svg" alt="logo" width="50%" style={{ marginBottom: -15 }} />
          <div style={{ ...classes.title, marginBottom: 5 }}>ARQUEO</div>
          <div style={classes.text}>
            Fecha Registro: {moment(data?.createdAt).format('DD/MM/YYYY HH:mm:ss')}
          </div>
          <div style={{ width: '100%', lineHeight: 1.5 }}>
            <div style={classes.text}>
              <span style={classes.textBold}>Cierre No.</span>
              {data?.number}
            </div>
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
        </div>
        <div style={classes.body}>
          <div style={classes.title}>Lista de denominaciones</div>
          {Object.keys(cashRegister || {}).map((key) => (
            <div key={key} style={classes.text}>
              <div style={classes.row}>
                <div style={classes.col1}>{key}</div>
                <div style={classes.col2}>{cashRegister[key]}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ ...classes.text, fontWeight: 'bold', marginTop: 15, fontSize: 20 }}>
          <div style={classes.row}>
            <div style={classes.col1}>Total:</div>
            <div style={classes.col2}>
              {numeral(
                Object.keys(cashRegister || {}).reduce(
                  (sum, key) => sum + parseInt(cashRegister[key] * parseInt(key.slice(1)) || 0),
                  0,
                ),
              ).format('$ 0,0')}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
