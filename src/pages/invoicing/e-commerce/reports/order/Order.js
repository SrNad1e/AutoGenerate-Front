/* eslint-disable no-use-before-define */
import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import './styles.css';

const classes = {
  content: {
    margin: '20px 2cm',
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
      <div
        key={0}
        style={{ ...styleBorders, width: '42%', borderBottom: 'none', fontWeight: 'bold' }}
      >
        Producto - Referencia
      </div>,
      <div
        key={2}
        style={{
          ...styleBorders,
          borderLeft: 'none',
          borderBottom: 'none',
          width: '25%',
          fontWeight: 'bold',
        }}
      >
        Color - Color Interno
      </div>,
      <div
        key={4}
        style={{
          ...styleBorders,
          borderLeft: 'none',
          borderBottom: 'none',
          width: '10%',
          fontWeight: 'bold',
        }}
      >
        Talla
      </div>,
      <div
        key={5}
        style={{
          ...styleBorders,
          borderLeft: 'none',
          borderBottom: 'none',
          width: '12%',
          fontWeight: 'bold',
        }}
      >
        Cantidad
      </div>,
      <div
        key={6}
        style={{
          ...styleBorders,
          borderLeft: 'none',
          borderBottom: 'none',
          width: '15%',
          fontWeight: 'bold',
        }}
      >
        Valor U.
      </div>,
      <div
        key={7}
        style={{
          ...styleBorders,
          borderLeft: 'none',
          borderBottom: 'none',
          width: '15%',
          fontWeight: 'bold',
        }}
      >
        Total
      </div>,
    ];

    const pag = 1;
    const totalPag = Math.ceil(data?.details?.length / 20);

    return (
      <div style={classes.content}>
        <div style={classes.header}>
          <div
            style={{
              fontWeight: 'bold',
              marginBottom: -50,
              marginRight: '3cm',
              fontSize: '17px',
              width: '100%',
              textAlign: 'right',
            }}
          >
            Página {pag} de {totalPag}
          </div>
          <img src="/logo.svg" alt="logo" width="35%" style={{ marginBottom: -50 }} />
          <div style={classes.text}>
            <span>Pedido # </span>
            {data?.number}
          </div>
          <div style={classes.text}>
            <span>Fecha: </span>
            {moment(data.createdAt).format('YYYY/MM/DD HH:mm:SS')}
          </div>
          <div style={{ width: '100%', lineHeight: 1.2, marginTop: 10 }}>
            <div style={classes.text}>
              <span style={classes.textBold}>Nombre: </span>
              {data?.customer?.firstName} {data?.customer?.lastName}
            </div>
            <div style={classes.text}>
              <span style={classes.textBold}>Teléfono: </span>
              {data?.customer?.phone || '(No Registra Teléfono)'}
            </div>
            <div style={classes.text}>
              <span style={classes.textBold}>Dirección: </span>
              {data?.address?.field1 || '(N/A)'} {data?.address?.number1 || '(N/A)'}
              {' # '}
              {data?.address?.loteNumber || '(N/A)'}
              {' - '}
              {data?.address?.number2 || '(N/A)'} {data?.address?.city?.name || '(N/A)'} /{' '}
              {data?.address?.city?.state || '(N/A)'}
            </div>
            <div style={classes.text}>
              <span style={classes.textBold}>Documento: </span>
              {data?.customer?.document}
            </div>
          </div>
        </div>
        <div style={classes.body}>
          <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            {columnsHeader1?.map((item) => item)}
          </div>
          <div style={{ borderBottom: 'solid 1px black' }}>
            {data?.details?.map((detail) => (
              <div
                key={1}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                }}
              >
                <div style={{ ...styleBorders, width: '42%', borderBottom: 'none' }}>
                  {detail?.product?.reference?.description} {detail?.product?.reference?.name}
                </div>
                <div
                  style={{
                    ...styleBorders,
                    borderLeft: 'none',
                    width: '25%',
                    borderBottom: 'none',
                  }}
                >
                  {detail?.product?.color?.name} - {detail?.product?.color?.name_internal}
                </div>
                <div
                  style={{
                    ...styleBorders,
                    borderLeft: 'none',
                    width: '10%',
                    borderBottom: 'none',
                  }}
                >
                  {detail?.product?.size?.value}
                </div>
                <div
                  style={{
                    ...styleBorders,
                    borderLeft: 'none',
                    width: '12%',
                    borderBottom: 'none',
                  }}
                >
                  {detail?.quantity}
                </div>
                <div
                  style={{
                    ...styleBorders,
                    borderLeft: 'none',
                    width: '14.8%',
                    borderBottom: 'none',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    paddingRight: 10,
                  }}
                >
                  {numeral(detail?.price).format('$ 0,0')}
                </div>
                <div
                  style={{
                    ...styleBorders,
                    borderLeft: 'none',
                    width: '14.8%',
                    borderBottom: 'none',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    paddingRight: 10,
                  }}
                >
                  {numeral(detail?.price * detail?.quantity).format('$ 0,0')}
                </div>
              </div>
            ))}
          </div>
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
            <div style={{ ...styleBorders, width: '14%', fontWeight: 'bold' }}>Subtotal:</div>
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
              {numeral(data?.conveyorOrder?.value).format('$ 0,0')}
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
