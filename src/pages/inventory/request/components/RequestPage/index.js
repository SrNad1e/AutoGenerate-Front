import './App.css';

const styleClasses = {
  p: {
    padding: '10px',
  },
  a: {
    align: 'center',
  },
  pl: {
    paddingLeft: '10px',
  },
  w: {
    width: '15%',
  },
  al: {
    align: 'left',
  },
  ps: {
    padding: '5px',
  },
  pls: {
    paddingLeft: '5px',
  },
};

const RequestPage = () => {
  return (
    <>
      <div align="center">
        <h1>SOLICITUD DE PEDIDO</h1>
      </div>
      <br />
      <table border="1" className="header" width="90%">
        <tr>
          <th style={styleClasses.p}>Fecha</th>
          <th style={styleClasses.p}>Codigo</th>
          <th style={styleClasses.p}>Bodega de origen</th>
          <th style={styleClasses.p}>Bodega que solicita</th>
          <th style={styleClasses.p}>Estado</th>
          <th style={styleClasses.p}>Usuario</th>
          <th style={styleClasses.p}>Fecha de actualizacion</th>
        </tr>
        <tr>
          <td style={styleClasses.pl}>15/03/2022-14:47</td>
          <td style={styleClasses.pl}>1010</td>
          <td style={styleClasses.pl}>Bodega</td>
          <td style={styleClasses.pl}>Bodega</td>
          <td style={styleClasses.pl}>Enviado</td>
          <td style={styleClasses.pl}>Camilo B.</td>
          <td style={styleClasses.pl}>18/03/2022-15:30</td>
        </tr>
      </table>
      <br />
      <table border="1" className="footer" width="90%">
        <tr>
          <th style={styleClasses.w}>Numero</th>
          <th style={styleClasses.w}>Referencia</th>
          <th style={styleClasses.w}>Color</th>
          <th style={styleClasses.w}>Talla</th>
          <th style={styleClasses.w}>Inventario</th>
          <th style={styleClasses.w}>Cantidad</th>
        </tr>
        <tr>
          <td style={styleClasses.pl}>50</td>
          <td style={styleClasses.pl}>2</td>
          <td style={styleClasses.pl}>Blue</td>
          <td style={styleClasses.pl}>M</td>
          <td style={styleClasses.pl}>96</td>
          <td style={styleClasses.pl}>200</td>
        </tr>
        <tr>
          <td style={styleClasses.pl}>50</td>
          <td style={styleClasses.pl}>2</td>
          <td style={styleClasses.pl}>Blue</td>
          <td style={styleClasses.pl}>M</td>
          <td style={styleClasses.pl}>96</td>
          <td style={styleClasses.pl}>200</td>
        </tr>
        <tr>
          <td style={styleClasses.pl}>50</td>
          <td style={styleClasses.pl}>2</td>
          <td style={styleClasses.pl}>Blue</td>
          <td style={styleClasses.pl}>M</td>
          <td style={styleClasses.pl}>96</td>
          <td style={styleClasses.pl}>200</td>
        </tr>
        <tr>
          <td style={styleClasses.pl}>50</td>
          <td style={styleClasses.pl}>2</td>
          <td style={styleClasses.pl}>Blue</td>
          <td style={styleClasses.pl}>M</td>
          <td style={styleClasses.pl}>96</td>
          <td style={styleClasses.pl}>200</td>
        </tr>
        <tr>
          <td style={styleClasses.pl}>50</td>
          <td style={styleClasses.pl}>2</td>
          <td style={styleClasses.pl}>Blue</td>
          <td style={styleClasses.pl}>M</td>
          <td style={styleClasses.pl}>96</td>
          <td style={styleClasses.pl}>200</td>
        </tr>
        <tr>
          <td style={styleClasses.pl}>50</td>
          <td style={styleClasses.pl}>2</td>
          <td style={styleClasses.pl}>Blue</td>
          <td style={styleClasses.pl}>M</td>
          <td style={styleClasses.pl}>96</td>
          <td style={styleClasses.pl}>200</td>
        </tr>
        <tr>
          <td style={styleClasses.pl}>50</td>
          <td style={styleClasses.pl}>2</td>
          <td style={styleClasses.pl}>Blue</td>
          <td style={styleClasses.pl}>M</td>
          <td style={styleClasses.pl}>96</td>
          <td style={styleClasses.pl}>200</td>
        </tr>
        <tr>
          <td style={styleClasses.pl}>50</td>
          <td style={styleClasses.pl}>2</td>
          <td style={styleClasses.pl}>Blue</td>
          <td style={styleClasses.pl}>M</td>
          <td style={styleClasses.pl}>96</td>
          <td style={styleClasses.pl}>200</td>
        </tr>
        <tr>
          <td style={styleClasses.pl}>50</td>
          <td style={styleClasses.pl}>2</td>
          <td style={styleClasses.pl}>Blue</td>
          <td style={styleClasses.pl}>M</td>
          <td style={styleClasses.pl}>96</td>
          <td style={styleClasses.pl}>200</td>
        </tr>
        <tr>
          <td style={styleClasses.pl}>50</td>
          <td style={styleClasses.pl}>2</td>
          <td style={styleClasses.pl}>Blue</td>
          <td style={styleClasses.pl}>M</td>
          <td style={styleClasses.pl}>96</td>
          <td style={styleClasses.pl}>200</td>
        </tr>
      </table>
      <table border={false} className="observacion" width="90%">
        <tr>
          <th align="left" style={{ paddingLeft: '10px' }}>
            Observación:
          </th>
        </tr>
        <tr>
          <td style={{ paddingLeft: '10px' }}>Aqui va la observación</td>
        </tr>
      </table>
      <table border="1" className="total" width="200px">
        <tr>
          <th style={styleClasses.ps}>Total Ref</th>
          <th style={styleClasses.ps}>Total Uni</th>
        </tr>
        <tr>
          <td style={styleClasses.pls}>133</td>
          <td style={styleClasses.pls}>133</td>
        </tr>
      </table>
    </>
  );
};
