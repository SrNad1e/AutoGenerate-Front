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
      width: '12.5%',
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
      width: '17.5%',
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
      width: '10%',
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
      width: '12.5%',
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
      width: '14.5%',
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
      width: '11.5%',
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
      width: '11.5%',
      fontWeight: 'bold',
    }}
  >
    Sobrante
  </div>,
];

export default class ReportTransferComparative extends React.PureComponent {
  render() {
    const { data } = this.props;
    console.log(data);
    return (
      <div style={classes.content}>
        <div style={classes.body}>
          <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            {columnsHeader?.map((item) => item)}
          </div>
          <div style={{ borderBottom: 'solid 1px black' }}>
            {data &&
              data?.length &&
              data?.map((detail) => (
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
                      width: '12.5%',
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
                      width: '17.5%',
                    }}
                  >
                    {detail?.product?.barcode}
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
                      width: '10%',
                    }}
                  >
                    {detail?.product?.color?.name_internal}
                  </div>
                  <div
                    style={{
                      ...styleBorders,
                      borderLeft: 'none',
                      borderBottom: 'none',
                      width: '12.5%',
                    }}
                  >
                    {detail?.quantity}
                  </div>
                  <div
                    style={{
                      ...styleBorders,
                      borderLeft: 'none',
                      borderBottom: 'none',
                      width: '14.5%',
                    }}
                  >
                    {detail?.quantityConfirmed}
                  </div>
                  <div
                    style={{
                      ...styleBorders,
                      borderLeft: 'none',
                      borderBottom: 'none',
                      width: '11.5%',
                    }}
                  >
                    {detail?.quantity === detail?.quantityConfirmed
                      ? 0
                      : detail?.quantity > detail?.quantityConfirmed
                      ? detail?.quantity - detail?.quantityConfirmed
                      : 0}
                  </div>
                  <div
                    style={{
                      ...styleBorders,
                      borderLeft: 'none',
                      borderBottom: 'none',
                      width: '11.5%',
                    }}
                  >
                    {detail?.quantity === detail?.quantityConfirmed
                      ? 0
                      : detail?.quantityConfirmed > detail?.quantity
                      ? detail?.quantityConfirmed - detail?.quantity
                      : 0}
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
              {data?.length}
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
          </div>
        </div>
      </div>
    );
  }
}
