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
      width: '18.7%',
      borderBottom: 'none',
      borderRight: 'none',
      fontWeight: 'bold',
    }}
  >
    Referencia
  </div>,
  <div
    style={{
      ...styleBorders,
      borderBottom: 'none',
      width: '19%',
      fontWeight: 'bold',
    }}
  >
    Código
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
    Talla
  </div>,
  <div
    style={{
      ...styleBorders,
      borderLeft: 'none',
      borderBottom: 'none',
      width: '10.7%',
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
      width: '13%',
      fontWeight: 'bold',
    }}
  >
    Cantidades en el Traslado
  </div>,
  <div
    style={{
      ...styleBorders,
      borderLeft: 'none',
      borderBottom: 'none',
      width: '13.5%',
      fontWeight: 'bold',
    }}
  >
    Cantidades Confirmadas en Tienda
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
    Faltante
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
    Sobrante
  </div>,
];

export default class ReportTransferComparative extends React.PureComponent {
  render() {
    const { data } = this.props;

    return (
      <div style={classes.content}>
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
                    width: '19.8%',
                    borderRight: 'none',
                    borderBottom: 'none',
                  }}
                >
                  {detail?.product?.reference?.name}
                </div>
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
                    borderLeft: 'none',
                    borderBottom: 'none',
                    width: '12%',
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
                  {detail?.product?.color?.name_internal}
                </div>
                <div
                  style={{
                    ...styleBorders,
                    borderLeft: 'none',
                    borderBottom: 'none',
                    width: '12%',
                  }}
                >
                  {'Cantidad confirmada'}
                </div>
                <div
                  style={{
                    ...styleBorders,
                    borderLeft: 'none',
                    borderBottom: 'none',
                    width: '12%',
                  }}
                >
                  {'Cantidad'}
                </div>
                <div
                  style={{
                    ...styleBorders,
                    borderLeft: 'none',
                    borderBottom: 'none',
                    width: '12%',
                  }}
                >
                  {'Cantidad'}
                </div>
                <div
                  style={{
                    ...styleBorders,
                    borderLeft: 'none',
                    borderBottom: 'none',
                    width: '12%',
                  }}
                >
                  {'Cantidad'}
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
            <div style={{ ...styleBorders, width: '18%', fontWeight: 'bold' }}>
              Total Referencias Traslados
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
              Total Unds con Inconsistencias
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
        </div>
      </div>
    );
  }
}
