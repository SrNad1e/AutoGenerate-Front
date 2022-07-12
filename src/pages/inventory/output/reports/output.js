import moment from 'moment';
import React from 'react';
import numeral from 'numeral';

import { StatusTypeOutput } from '../output.data';
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
  },
  text: {
    fontSize: 18,
  },
  textBold: {
    fontWeight: 'bold',
    marginRight: 18,
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
    width: '100%',
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',
    lineHeight: 1.5,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 1,
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
      width: '20%',
      fontWeight: 'bold',
    }}
  >
    Código
  </div>,
  <div
    style={{
      ...styleBorders,
      width: '30%',
      borderBottom: 'none',
      borderLeft: 'none',
      fontWeight: 'bold',
    }}
  >
    Producto - Referencia
  </div>,
  <div
    style={{
      ...styleBorders,
      borderLeft: 'none',
      borderBottom: 'none',
      width: '15%',
      fontWeight: 'bold',
    }}
  >
    Color
  </div>,
  <div
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
    style={{
      ...styleBorders,
      borderLeft: 'none',
      borderBottom: 'none',
      width: '13%',
      fontWeight: 'bold',
    }}
  >
    Total
  </div>,
];

export default class ReportOutput extends React.PureComponent {
  render() {
    const { data } = this.props;
    return (
      <div style={classes.content}>
        <div style={classes.header}>
          <div style={classes.title}>SALIDA DE MERCANCIA</div>
          <div style={classes.title}>No. {data?.number}</div>
          <div style={classes.body}>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
              <div
                style={{
                  ...styleBorders,
                  width: '50%',
                  fontWeight: 'bold',
                }}
              >
                Bodega
              </div>
              <div
                style={{
                  ...styleBorders,
                  width: '50%',
                }}
              >
                {data?.warehouse?.name}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
              <div
                style={{
                  ...styleBorders,
                  width: '12%',
                  borderRight: 'none',
                  borderTop: 'none',
                  fontWeight: 'bold',
                }}
              >
                Estado
              </div>
              <div
                style={{
                  ...styleBorders,
                  borderTop: 'none',
                  width: '15%',
                }}
              >
                {StatusTypeOutput[data?.status || '']?.label}
              </div>
              <div
                style={{
                  ...styleBorders,
                  width: '20%',
                  borderRight: 'none',
                  borderLeft: 'none',
                  borderTop: 'none',
                  fontWeight: 'bold',
                }}
              >
                Fecha Creación
              </div>
              <div
                style={{
                  ...styleBorders,
                  borderTop: 'none',
                  width: '25%',
                }}
              >
                {moment(data?.createdAt).format('YYYY/MM/DD HH:mm:ss')}
              </div>
              <div
                style={{
                  ...styleBorders,
                  width: '20%',
                  borderRight: 'none',
                  borderLeft: 'none',
                  borderTop: 'none',
                  fontWeight: 'bold',
                }}
              >
                Ultima fecha
              </div>
              <div
                style={{
                  ...styleBorders,
                  borderTop: 'none',
                  width: '25%',
                }}
              >
                {moment(data?.updatedAt).format('YYYY/MM/DD HH:mm:ss')}
              </div>
            </div>
          </div>
        </div>
        <div style={classes.body}>
          <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            {columnsHeader?.map((item) => item)}
          </div>
          <div style={{ borderBottom: 'solid 1px black' }}>
            {data?.details?.map((detail) => (
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
                    width: '20%',
                  }}
                >
                  {detail?.product?.barcode}
                </div>
                <div
                  style={{
                    ...styleBorders,
                    width: '30%',
                    borderLeft: 'none',
                    borderBottom: 'none',
                  }}
                >
                  {detail?.product?.reference?.name} / {detail?.product?.reference?.description}
                </div>
                <div
                  style={{
                    ...styleBorders,
                    borderLeft: 'none',
                    borderBottom: 'none',
                    width: '15%',
                  }}
                >
                  {detail?.product?.color?.name_internal}
                </div>
                <div
                  style={{
                    ...styleBorders,
                    borderLeft: 'none',
                    borderBottom: 'none',
                    width: '10%',
                  }}
                >
                  {detail?.product?.size?.value}
                </div>
                <div
                  style={{
                    ...styleBorders,
                    borderLeft: 'none',
                    borderBottom: 'none',
                    width: '12%',
                  }}
                >
                  {detail?.quantity}
                </div>
                <div
                  style={{
                    ...styleBorders,
                    borderLeft: 'none',
                    borderBottom: 'none',
                    width: '13%',
                  }}
                >
                  {numeral(detail?.product?.reference?.cost * detail?.quantity).format('$ 0,0')}
                </div>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontWeight: 'bold' }}>Observación: </div>
            <div>{data?.observation} </div>
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
            <div style={{ ...styleBorders, width: '18%', fontWeight: 'bold' }}>Referencias:</div>
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
              {data?.details?.length}
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
            <div style={{ ...styleBorders, width: '18%', fontWeight: 'bold', borderTop: 'none' }}>
              Productos:
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
              {data?.details?.reduce((sum, detail) => sum + detail?.quantity, 0)}
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
            <div style={{ ...styleBorders, width: '18%', fontWeight: 'bold', borderTop: 'none' }}>
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
              {numeral(
                data?.details?.reduce(
                  (sum, item) => sum + item?.product?.reference?.cost * item?.quantity,
                  0,
                ),
              ).format('$ 0,0')}
            </div>
          </div>
          <div style={{ fontSize: 12, marginTop: 10 }}>Creado por: {data?.user?.name}</div>
        </div>
      </div>
    );
  }
}
