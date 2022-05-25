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
    return (
      <div style={classes.content}>
        <div style={classes.header}>
          <img src="/logo.svg" alt="logo" width="50%" style={{ marginBottom: -15 }} />
          <div style={{ ...classes.title, marginBottom: 5 }}>CIERRE Z</div>
          <div style={classes.text}>
            <div style={classes.row}>
              <div style={classes.col1}>
                <span style={{ fontWeight: 'bold' }}>CIERRE # </span>
                {123}
              </div>
              <div style={classes.col2}>
                <span style={{ fontWeight: 'bold' }}>DIA </span>{' '}
                {moment('2022-05-04T18:10:20.727Z').utc().format(FORMAT_DATE)}
              </div>
            </div>
          </div>
          <div style={classes.text}>
            Registrado: {moment('2022-05-04T18:10:20.727Z').format(FORMAT_DATE)}
          </div>
          <div style={{ width: '100%', lineHeight: 1.5 }}>
            <div style={classes.text}>
              <span style={classes.textBold}>Tienda:</span>
              {'Gucci'}
            </div>
          </div>
          <div style={{ width: '100%', lineHeight: 1.5 }}>
            <div style={classes.text}>
              <span style={classes.textBold}>Usuario:</span>
              {'Jotaro'}
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
                <div style={classes.col1}>Número de facturas:</div>
                <div style={classes.col2}>{2 || 0}</div>
              </div>
            </div>
            <div style={classes.text}>
              <div style={classes.row}>
                <div style={classes.col1}>Última Factura:</div>
                <div style={classes.col2}>{1}</div>
              </div>
            </div>
            <div style={classes.text}>
              <div style={classes.row}>
                <div style={classes.col1}>Valor Facturas:</div>
                <div style={classes.col2}>{numeral(10000).format('$ 0,0')}</div>
              </div>
            </div>
            <div style={classes.text}>
              <div style={classes.row}>
                <div style={classes.col1}>Total Pagos:</div>
                <div style={classes.col2}>{numeral(10000).format('$ 0,0')}</div>
              </div>
            </div>
            <div style={classes.title}>
              <div style={classes.row}>
                <div>Cupones Generados</div>
              </div>
            </div>
            <div style={classes.text}>
              <div style={classes.row}>
                <div style={classes.col1}>Cantidad:</div>
                <div style={classes.col2}>{2}</div>
              </div>
            </div>
            <div style={classes.text}>
              <div style={classes.row}>
                <div style={classes.col1}> Valor:</div>
                <div style={classes.col2}>{numeral(10000).format('$ 0,0')}</div>
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
                <div style={classes.col2}>{1}</div>
              </div>
            </div>
            <div style={classes.text}>
              <div style={classes.row}>
                <div style={classes.col1}>Valor:</div>
                <div style={classes.col2}>{numeral(10000).format('$ 0,0')}</div>
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
                <div style={classes.col2}>{numeral(10000).format('$ 0,0')}</div>
              </div>
            </div>
            <div style={classes.text}>
              <div style={classes.row}>
                <div style={classes.col1}>Reportado En Caja:</div>
                <div style={classes.col2}>{numeral(10000).format('$ 0,0')}</div>
              </div>
            </div>
            <div style={classes.text}>
              <div style={classes.row}>
                <div style={classes.col1}>Cost. Operacionales:</div>
                <div style={classes.col2}>{numeral(10000).format('$ 0,0')}</div>
              </div>
            </div>
            {'' !== 'closed' && (
              <div style={classes.text}>
                <div style={classes.row}>
                  <div style={classes.col1}>{'status' === 'status' ? 'Sobrante' : 'Faltante'}:</div>
                  <div style={classes.col2}>
                    {numeral('status' === 'status' ? 10 : 10 * -1).format('$ 0,0')}
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
                <div style={classes.col2}>{2}</div>
              </div>
            </div>
            <div style={classes.text}>
              <div style={classes.row}>
                <div style={classes.col1}>Reportadas En Caja:</div>
                <div style={classes.col2}>{1}</div>
              </div>
            </div>
            {'' !== 'closed' && (
              <div style={classes.text}>
                <div style={classes.row}>
                  <div style={classes.col1}>{'status' === 'status' ? 'Sobrante' : 'Faltante'}:</div>
                  <div style={classes.col2}>{'status' === 'status' ? 1 : 2 * -1}</div>
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
                <div style={classes.col2}> {numeral(10000).format('$ 0,0')}</div>
              </div>
            </div>
            {
              <div key={1} style={classes.text}>
                <div style={classes.row}>
                  <div style={classes.col1}>{'BBVA'}:</div>
                  <div style={classes.col2}> {numeral(12222).format('$ 0,0')}</div>
                </div>
              </div>
            }

            <div style={classes.text}>
              <div style={classes.row}>
                <div style={classes.col1}>Total Pagos:</div>{' '}
                <div style={classes.col2}>{numeral(20000).format('$ 0,0')}</div>
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
                <div style={classes.col2}> {numeral(20000).format('$ 0,0')}</div>
              </div>
            </div>
            <div style={classes.text}>
              <div style={classes.row}>
                <div style={classes.col1}>Abonos a Crédito:</div>
                <div style={classes.col2}> {numeral(10000).format('$ 0,0')}</div>
              </div>
            </div>
            {
              <>
                {' '}
                <div style={classes.title}>
                  <div style={classes.row}>
                    <div>Observación</div>
                  </div>
                </div>
                <div style={classes.row}>
                  <div>{'Hola'}</div>
                </div>
              </>
            }
          </div>
        </div>
      </div>
    );
  }
}
