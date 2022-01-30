import React from 'react'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import "./styles.scss"


function createData(name, total) {
  return { name, total };
}

Object.defineProperty(String.prototype, 'capitalize', {
  value: function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false
});


export default function PopupPoliceStation(item) {
  item = item["item"]

  const rows = [
    createData('PORTE DE ENTORPECENTES',  item["data"]["ocorrências de porte de entorpecentes"]),
    createData('TRÁFICO DE ENTORPECENTES',  item["data"]["ocorrências de tráfico de entorpecentes"]),
    createData('APREENSÃO DE ENTORPECENTES',  item["data"]["ocorrências de apreensão de entorpecentes(1)"]),
    createData('PORTE ILEGAL DE ARMA',  item["data"]["ocorrências de porte de entorpecentes"]),
    createData('ARMAS DE FOGO APREENDIDAS', item["data"]["nº de armas de fogo apreendidas"]),
    createData('FLAGRANTES LAVRADOS',  item["data"]["nº de flagrantes lavrados"]),
    createData('INFRATORES APREENDIDOS EM FLAGRANTE',  item["data"]["nº de infratores apreendidos em flagrante"]),
    createData('INFRATORES APREENDIDOS POR MANDADO',  item["data"]["nº de infratores apreendidos por mandado"]),
    createData('PESSOAS PRESAS EM FLAGRANTE',  item["data"]["nº de pessoas presas em flagrante"]),
    createData('PESSOAS PRESAS POR MANDADO',  item["data"]["nº de infratores apreendidos por mandado"]),
    createData('PRISÕES EFETUADAS',  item["data"]["nº de prisões efetuadas"]),
    createData('VEÍCULOS RECUPERADOS', item["data"]["nº de veículos recuperados"]),
    createData('INQUÉRITOS POLICIAIS', item["data"]["tot. de inquéritos policiais instaurados"]),
  ];
  

  return (
    <Card elevation={0}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {item["name"]}
        </Typography>
        <Typography gutterBottom variant="caption">
        O tamanho do círculo representa a quantidade de delitos.
        </Typography>
        

        <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table" >
          <TableHead style={{"backgroundColor": "#151515"}}>
            <TableRow>
              <TableCell colSpan={2} align="center" style={{"fontWeight": "bold", "color": "white"}}>Total de ocorrências - 2021</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name.toLowerCase().capitalize()}
                </TableCell>
                <TableCell align="right">{row.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      </CardContent>
    </Card>
  )
}