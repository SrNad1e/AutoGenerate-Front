import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import Barcode from 'react-barcode';

import style from './styles.css';

const classes = {
  container: {
    margin: 20,
    maxWidth: '60mm',
    color: 'black',
    fontFamily: 'Popings-Regular',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
  },
  logo: {
    marginBottom: 10,
  },
  textBold: {
    fontWeight: 'bold',
    fontSize: 10,
    lineHeight: 1.2,
  },
  text: {
    fontSize: 10,
    lineHeight: 1.2,
  },
  barcode: {
    borderBottom: 'solid 1px black',
    borderTop: 'solid 1px black',
    padding: '5px 0',
    paddingBottom: '1px',
    margin: '10px 0',
    marginBottom: 0,
    display: 'flex',
    justifyContent: 'center',
  },
  personalData: {
    padding: '10px 8px',
    borderBottom: 'dashed 1px black',
  },
  table: {
    display: 'flex',
  },
  body: {
    padding: '10px 5px',
    borderBottom: 'dashed 1px black',
  },
  headersTable: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: '10px',
  },
  lineItems: {
    display: 'flex',
    flexDirection: 'row',
  },
  footerTable: {
    display: 'flex',
    flexDirection: 'row',
    padding: '5px',
    borderBottom: 'dashed 1px black',
  },
  taxes: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px 5px',
    borderBottom: 'solid 1px black',
  },
  footerTaxes: {
    display: 'flex',
    flexDirection: 'column',
  },
  footerTaxesContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: '5px 0',
  },
  resolution: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px 5px',
    borderBottom: 'solid 1px black',
  },
  footer: {
    display: 'flex',
    padding: '10px 5px',
    flexDirection: 'column',
  },
};

export default class InvoiceReport extends React.PureComponent {
  render() {
    const { data } = this.props;

    const totalItems = data?.details?.reduce((acc, { quantity }) => acc + quantity, 0);

    return (
      <div style={classes.container}>
        <div style={classes.header}>
          <img style={classes.logo} width="85%" src={`${CDN_URL}/${data?.company?.logo}`} />
          <div style={classes.textBold}>{data?.company?.name}</div>
          <div style={classes.text}>NIT {data?.company?.document}</div>
          <div style={classes.text}>Dirección: {data?.company?.address}</div>
          <div style={classes.text}>Ciudad: Itagûí, Antioquia</div>
          <div style={classes.text}>Correo: {data?.company?.email}</div>
        </div>
        <div style={classes.barcode}>
          <Barcode
            value={`${data?.authorization?.prefix} ${data?.number}`}
            height={50}
            text={`N° ${data?.authorization?.prefix} ${data?.number}`}
            fontSize={8}
          />
        </div>
        <div style={classes.personalData}>
          <div style={classes.table}>
            <div style={{ ...classes.tableCol, width: '20%' }}>
              <div style={classes.textBold}>Fecha</div>
              <div style={classes.textBold}>Cajera</div>
              <div style={classes.textBold}>Cédula</div>
              <div style={classes.textBold}>Cliente</div>
              <div style={classes.textBold}>Caja</div>
            </div>
            <div style={{ ...classes.tableCol, textAlign: 'center', width: '10%' }}>
              <div style={classes.text}>:</div>
              <div style={classes.text}>:</div>
              <div style={classes.text}>:</div>
              <div style={classes.text}>:</div>
              <div style={classes.text}>:</div>
            </div>
            <div style={{ ...classes.tableCol, width: '70%' }}>
              <div style={classes.text}>
                {moment(data?.createdAt).format('DD/MM/YYYY HH:mm:ss')}
              </div>
              <div style={classes.text}>{data?.user?.username}</div>
              <div
                style={classes.text}
              >{`${data?.customer?.firstName} ${data?.customer?.lastName}`}</div>
              <div style={classes.text}>{data?.customer?.document}</div>
              <div style={classes.text}>{data?.shop?.name}</div>
            </div>
          </div>
        </div>
        <div style={classes.body}>
          <div style={classes.headersTable}>
            <div style={{ ...classes.textBold, width: '39%' }}>REF</div>
            <div style={{ ...classes.textBold, textAlign: 'center', width: '11%' }}>CANT</div>
            <div style={{ ...classes.textBold, width: '25%', textAlign: 'end' }}>PRECIO</div>
            <div style={{ ...classes.textBold, width: '25%', textAlign: 'end' }}>TOTAL</div>
          </div>
          {data?.details?.map(({ product, quantity, price }) => (
            <div style={classes.lineItems} key={product?.barcode}>
              <div
                style={{ ...classes.text, width: '39%' }}
              >{`${product?.reference?.name} - ${product?.size?.value} - ${product?.color?.name}`}</div>
              <div style={{ ...classes.text, textAlign: 'center', width: '11%' }}>{quantity}</div>
              <div style={{ ...classes.text, width: '25%', textAlign: 'end' }}>
                {numeral(price).format('0,0.00')}
              </div>
              <div style={{ ...classes.text, width: '25%', textAlign: 'end' }}>
                {numeral(price * quantity).format('0,0.00')}
              </div>
            </div>
          ))}
        </div>
        <div style={classes.footerTable}>
          <div style={{ ...classes.textBold, width: '39%' }}>UNIDADES</div>
          <div style={{ ...classes.textBold, width: '11%', textAlign: 'center' }}>{totalItems}</div>
        </div>
        <div style={classes.footerTable}>
          <div style={{ ...classes.textBold, width: '50%' }}>TOTAL NETO A PAGAR</div>
          <div style={{ ...classes.textBold, textAlign: 'end', width: '50%' }}>
            {numeral(data?.summary?.total).format('$  0,0.00')}
          </div>
        </div>
        <div style={classes.taxes}>
          <div style={{ ...classes.textBold, textAlign: 'center' }}>DESGLOSE DE IMPUESTOS</div>
          <div style={classes.footerTaxesContainer}>
            <div style={{ ...classes.footerTaxes, width: '50%' }}>
              <div style={classes.textBold}>Venta gravada</div>
              <div style={classes.text}>{numeral(data?.summary?.subtotal).format('0,0.00')}</div>
            </div>
            <div style={{ ...classes.footerTaxes, width: '25%' }}>
              <div style={classes.textBold}>IVA 19%</div>
              <div style={classes.text}>{numeral(data?.summary?.tax).format('0,0.00')}</div>
            </div>
            <div style={{ ...classes.footerTaxes, width: '25%' }}>
              <div style={classes.textBold}>Total</div>
              <div style={classes.text}>{numeral(data?.summary?.total).format('0,0.00')}</div>
            </div>
          </div>
          <div style={classes.text}>
            <span style={classes.textBold}>Medios de pago:</span>
            {data?.payments?.reduce((text, { payment }) => `${text} ${payment?.name},`, ' ')}
          </div>
        </div>
        <div style={classes.resolution}>
          <div style={{ ...classes.textBold, textAlign: 'center', marginBottom: '5px' }}>
            FACTURA DE VENTA POS
          </div>
          <div style={classes.table}>
            <div style={{ ...classes.tableCol, width: '45%' }}>
              <div style={classes.text}>Resolución</div>
              <div style={classes.text}>Fecha de emisión</div>
              <div style={classes.text}>Fecha de vigencia</div>
              <div style={classes.text}>Prefijo</div>
              <div style={classes.text}>Consecutivos</div>
            </div>
            <div style={{ ...classes.tableCol, textAlign: 'center', width: '10%' }}>
              <div style={classes.text}>:</div>
              <div style={classes.text}>:</div>
              <div style={classes.text}>:</div>
              <div style={classes.text}>:</div>
              <div style={classes.text}>:</div>
            </div>
            <div style={{ ...classes.tableCol, width: '45%' }}>
              <div style={classes.text}>{data?.authorization?.resolution}</div>
              <div style={classes.text}>
                {moment(data?.authorization?.dateInitial).format('YYYY/MM/DD')}
              </div>
              <div style={classes.text}>
                {moment(data?.authorization?.dateFinal).format('YYYY/MM/DD')}
              </div>
              <div style={classes.text}>{data?.authorization?.prefix}</div>
              <div
                style={classes.text}
              >{`${data?.authorization?.numberInitial} - ${data?.authorization?.numberFinal}`}</div>
            </div>
          </div>
        </div>
        <div style={classes.footer}>
          <div style={{ ...classes.textBold, textAlign: 'center', marginBottom: '5px' }}>
            ¡INFORMACIÓN IMPORTANTE!
          </div>
          <div style={classes.items}>
            <div style={classes.text}>● 8 días calendario para cambios.</div>
            <div style={classes.text}>
              ● 2 meses para garantía (bisutería 20 días) a partir de la fecha de compra.
            </div>
            <div style={classes.text}>Debes presentar la factura.</div>
            <div style={classes.text}>
              ● No cambiamos panties, bodies ni bisutería, sin excepción.
            </div>
            <div style={classes.text}>
              ● Deben tener las etiquetas puestas y en perfecto estado.
            </div>
            <div style={classes.text}>● No deben estar sucias, rotas, desgastadas o manchadas.</div>
            <div style={classes.text}>
              ● Las copas de los brasieres deben estar intactas, sin estrías ni dobleces.
            </div>
          </div>
        </div>
      </div>
    );
  }
}
