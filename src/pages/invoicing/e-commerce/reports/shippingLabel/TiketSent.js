/* eslint-disable no-use-before-define */
import React from 'react';
import moment from 'moment';
import Barcode from 'react-barcode';
import './styles.css';

const classes = {
  content: {
    padding: 10,
    margin: 0,
    width: '10cm',
    heigth: '6cm',
    display: 'flex',
    flexDirection: 'column',
    border: '1pt solid black',
  },
  bodyContent: {
    width: '100%',
    flexDirection: 'column',
  },
  bodyBarCode: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
  title1: {
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 17,
    marginTop: 10,
  },
  text: {
    paddingLeft: 20,
  },
};

export default class ShippingLabel extends React.PureComponent {
  render() {
    const { data } = this.props;
    return (
      <div style={classes.content}>
        <div style={classes.bodyBarCode}>
          <img
            src="/logo.svg"
            alt="logo"
            width="50%"
            style={{ marginBottom: -25, marginTop: -25 }}
          />
          <Barcode
            value={data?.conveyorOrder?.guideCode}
            height={50}
            text={`Pedido # ${data?.number}`}
            fontSize={12}
          />
        </div>
        <div style={classes.bodyContent}>
          <div style={classes.title1}>Destinatario: </div>
          <div style={classes.text}>
            <span style={classes.title}>Dirección: </span>
            {data?.address?.field1} {data?.address?.number1}
            {' # '}
            {data?.address?.loteNumber}
            {' - '}
            {data?.address?.number2}{' '}
          </div>
          <div style={classes.text}>
            <span style={classes.title}>Ciudad: </span>
            {data?.address?.city?.name} / {data?.address?.city?.state}
          </div>
          <div style={classes.text}>
            <span style={classes.title}>Nombre: </span>
            {data?.customer?.firstName} {data?.customer?.lastName}
          </div>
          <div style={classes.text}>
            <span style={classes.title}>Teléfono: </span>
            {data?.customer?.phone || '(No Registra Teléfono)'}
          </div>
          <div style={classes.text}>
            <span style={classes.title}>Fecha: </span>
            {moment(data?.createdAt).format('YYYY/MM/DD HH:mm:SS')}
          </div>
          <div style={classes.text}>
            <span style={classes.title}>Tienda: </span>
            {data?.shop?.name}
          </div>
          <div style={classes.text}>
            <span style={classes.title}>Método de envío: </span>
            {data?.conveyorOrder?.conveyor?.name} <br />
            {data?.conveyorOrder?.guideCode}
          </div>
          <div style={classes.title1}>Remitente: </div>
          <div style={classes.text}>
            <span style={classes.title}>Nombre: </span>
            Manufacturas Cirotex SAS
          </div>
          <div style={classes.text}>
            <span style={classes.title}>Teléfono: </span>
            321-8574070
          </div>
          <div style={classes.text}>
            <span style={classes.title}>Nit: </span>
            900406732-1
          </div>
          <div style={classes.text}>
            <span style={classes.title}>Dirección: </span>
            Carrera 56 #72a-258
          </div>
          <div style={classes.text}>
            <span style={classes.title}>Ciudad: </span>
            Itagui, Antioquia
          </div>
        </div>
      </div>
    );
  }
}
