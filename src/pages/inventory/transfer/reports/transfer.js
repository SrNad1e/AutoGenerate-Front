/* eslint-disable react/jsx-key */
import React from 'react';
import moment from 'moment';

import { StatusType } from '../tranfer.data';

import './style.css';
import { StatusStockTransfer } from '@/graphql/graphql';

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
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 1,
    color: 'black',
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
      width: '43%',
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
];

export default class ReportTransfer extends React.PureComponent {
  render() {
    const { data } = this.props;

    return (
      <div style={classes.content}>
        <div style={classes.header}>
          <div style={classes.title}>TRASLADO DE MERCANCIA</div>
          <div style={classes.title}>No. {data?.number}</div>
          <div style={classes.body}>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
              <div
                style={{ ...styleBorders, width: '25%', borderRight: 'none', fontWeight: 'bold' }}
              >
                Bodega de despacho
              </div>
              <div
                style={{
                  ...styleBorders,
                  width: '25%',
                }}
              >
                {data?.warehouseOrigin?.name}
              </div>
              <div
                style={{
                  ...styleBorders,
                  width: '25%',
                  borderRight: 'none',
                  borderLeft: 'none',
                  fontWeight: 'bold',
                }}
              >
                Bodega que recibe
              </div>
              <div
                style={{
                  ...styleBorders,
                  width: '25%',
                }}
              >
                {data?.warehouseDestination?.name}
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
                {StatusType[data?.status || '']?.text}
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
                Última fecha
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
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
              <div
                style={{ ...styleBorders, width: '25%', borderRight: 'none', fontWeight: 'bold' }}
              >
                Observación Origen
              </div>
              <div
                style={{
                  border: 'solid 1pt black',
                  width: '25%',
                  wordWrap: 'break-word',
                }}
              >
                {data?.observationOrigin}
              </div>
              <div
                style={{
                  ...styleBorders,
                  width: '25%',
                  borderRight: 'none',
                  borderLeft: 'none',
                  fontWeight: 'bold',
                }}
              >
                Observación Destino
              </div>
              <div
                style={{
                  ...styleBorders,
                  width: '25%',
                }}
              >
                {data?.observationDestination}
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
                    width: '43%',
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
          <div style={{ fontSize: 12, marginTop: 10 }}>Creado por: {data?.userOrigin?.name}</div>
        </div>
      </div>
    );
  }
}
