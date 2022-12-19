/* eslint-disable no-use-before-define */
import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import './styles.css';

const classes = {
  content: {
    margin: '20px 2cm',
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
    fontSize: 18,
    color: 'black',
  },
  textBold: {
    fontWeight: 'bold',
    marginRight: 18,
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
    width: '100%',
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',
    lineHeight: 1.5,
    color: 'black',
  },
};

export default class OrderProduction extends React.PureComponent {
  render() {
    const { data } = this.props;

    const styleBorders = {
      display: 'flex',
      border: 'solid 1pt black',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    };

    const columnsHeader1 = [
      <div style={{ ...styleBorders, width: '43%', fontWeight: 'bold' }}>
        Producto - Referencia
      </div>,
      <div style={{ ...styleBorders, borderLeft: 'none', width: '15%', fontWeight: 'bold' }}>
        Color
      </div>,
      <div style={{ ...styleBorders, borderLeft: 'none', width: '10%', fontWeight: 'bold' }}>
        Talla
      </div>,
      <div style={{ ...styleBorders, borderLeft: 'none', width: '12%', fontWeight: 'bold' }}>
        Cantidad
      </div>,
      <div style={{ ...styleBorders, borderLeft: 'none', width: '15%', fontWeight: 'bold' }}>
        Valor U.
      </div>,
      <div style={{ ...styleBorders, borderLeft: 'none', width: '15%', fontWeight: 'bold' }}>
        Total
      </div>,
    ];

    const getQuantity = () => {
      let quantity = 0;

      // eslint-disable-next-line no-unused-expressions
      data?.details?.forEach((detail) => {
        quantity += detail.quantity;
      });

      return quantity;
    };
    return (
      <div style={classes.content}>
        <div style={classes.header}>
          <img src="/logo.svg" alt="logo" width="35%" style={{ marginBottom: -50 }} />
          <div style={classes.text}>
            <span>Fecha: </span>
            {moment(data?.createdAt).format('YYYY/MM/DD HH:mm:SS')}
          </div>
          <div style={{ width: '100%', lineHeight: 1.2, marginTop: 10 }}>
            <div style={classes.text}>
              <span style={classes.textBold}>Nombre: </span>
              {data?.customer?.firstName} {data?.customer?.lastName}
            </div>
            <div style={classes.text}>
              <span style={classes.textBold}>Teléfono: </span>
              {data?.customer?.phone || 'No registra'}
            </div>
            <div style={classes.text}>
              <span style={classes.textBold}>Dirección: </span>
              {data?.address?.field1} {data?.address?.number || 'No registra'}{' '}
              {data?.address?.city?.name} / {data?.address?.city?.state}
            </div>
            <div style={classes.text}>
              <span style={classes.textBold}>Documento: </span>
              {data?.customer?.document || 0}
            </div>
          </div>
        </div>
        <div style={classes.body}>
          <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            {columnsHeader1?.map((item) => item)}
          </div>
          {data?.details?.map((detail) => (
            <div
              key={1}
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
              }}
            >
              <div style={{ ...styleBorders, width: '43%', borderTop: 'none' }}>
                {detail?.product?.reference?.description} {detail?.product?.reference?.name}
              </div>
              <div style={{ ...styleBorders, borderLeft: 'none', width: '15%', borderTop: 'none' }}>
                {detail?.product?.color?.name}
              </div>
              <div style={{ ...styleBorders, borderLeft: 'none', width: '10%', borderTop: 'none' }}>
                {detail?.product?.size?.value}
              </div>
              <div style={{ ...styleBorders, borderLeft: 'none', width: '12%', borderTop: 'none' }}>
                {detail?.quantity}
              </div>
              <div
                style={{
                  ...styleBorders,
                  borderLeft: 'none',
                  width: '14.8%',
                  borderTop: 'none',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  paddingRight: 10,
                }}
              >
                {numeral(detail?.price - detail?.discount).format('$ 0,0')}
              </div>
              <div
                style={{
                  ...styleBorders,
                  borderLeft: 'none',
                  width: '14.8%',
                  borderTop: 'none',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  paddingRight: 10,
                }}
              >
                {numeral((detail?.price - detail?.discount) * detail?.quantity).format('$ 0,0')}
              </div>
            </div>
          ))}
        </div>
        <div style={classes.footer}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
            }}
          >
            <div style={{ width: '75%' }} />
            <div style={{ ...styleBorders, width: '14%', fontWeight: 'bold' }}>
              Total Productos:
            </div>
            <div
              style={{
                ...styleBorders,
                width: '14%',
                borderLeft: 'none',
                display: 'flex',
                justifyContent: 'flex-end',
                paddingRight: 10,
              }}
            >
              {data?.details?.reduce((a, detail) => a + detail?.quantity, 0)}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
            }}
          >
            <div style={{ width: '75%' }} />
            <div style={{ ...styleBorders, width: '14%', fontWeight: 'bold', borderTop: 'none' }}>
              Subtotal:
            </div>
            <div
              style={{
                ...styleBorders,
                width: '14%',
                borderTop: 'none',
                borderLeft: 'none',
                display: 'flex',
                justifyContent: 'flex-end',
                paddingRight: 10,
              }}
            >
              {numeral(data?.summary?.subtotal).format('$ 0,0')}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
            }}
          >
            <div style={{ width: '75%' }} />
            <div style={{ ...styleBorders, width: '14%', fontWeight: 'bold', borderTop: 'none' }}>
              Descuento:
            </div>
            <div
              style={{
                ...styleBorders,
                width: '14%',
                borderLeft: 'none',
                borderTop: 'none',
                display: 'flex',
                justifyContent: 'flex-end',
                paddingRight: 10,
              }}
            >
              {numeral(data?.summary?.discount).format('$ 0,0')}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
            }}
          >
            <div style={{ width: '75%' }} />
            <div style={{ ...styleBorders, width: '14%', fontWeight: 'bold', borderTop: 'none' }}>
              Envío:
            </div>
            <div
              style={{
                ...styleBorders,
                width: '14%',
                borderLeft: 'none',
                borderTop: 'none',
                display: 'flex',
                justifyContent: 'flex-end',
                paddingRight: 10,
              }}
            >
              {numeral(data?.summary?.shipping).format('$ 0,0')}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
            }}
          >
            <div style={{ width: '75%' }} />
            <div style={{ ...styleBorders, width: '14%', fontWeight: 'bold', borderTop: 'none' }}>
              Total:
            </div>
            <div
              style={{
                ...styleBorders,
                width: '14%',
                borderLeft: 'none',
                borderTop: 'none',
                display: 'flex',
                justifyContent: 'flex-end',
                paddingRight: 10,
              }}
            >
              {numeral(data?.summary?.total).format('$ 0,0')}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
            }}
          >
            <div style={{ width: '75%' }} />
            <div style={{ ...styleBorders, width: '14%', fontWeight: 'bold', borderTop: 'none' }}>
              Abonos:
            </div>
            <div
              style={{
                ...styleBorders,
                width: '14%',
                borderLeft: 'none',
                borderTop: 'none',
                display: 'flex',
                justifyContent: 'flex-end',
                paddingRight: 10,
              }}
            >
              {numeral(data?.summary?.totalPaid).format('$ 0,0')}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
            }}
          >
            <div style={{ width: '75%' }} />
            <div style={{ ...styleBorders, width: '14%', fontWeight: 'bold', borderTop: 'none' }}>
              Saldo:
            </div>
            <div
              style={{
                ...styleBorders,
                width: '14%',
                borderLeft: 'none',
                borderTop: 'none',
                display: 'flex',
                justifyContent: 'flex-end',
                paddingRight: 10,
              }}
            >
              {numeral(data?.summary?.total - data?.summary?.totalPaid).format('$ 0,0')}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
