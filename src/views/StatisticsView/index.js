import React from 'react'
import ChartAverageArea from './../../components/ChartAverageArea'
import ChartAverageRent from './../../components/ChartAverageRent'
import ChartHouses from '../../components/ChartHouses'
import LineChartAvgRent from './../../components/LineChartAvgRent'
import ChartHousesStdDeviation from './../../components/ChartHousesStdDeviation'
import BarChartDistrictAvgPrice from '../../components/BarChartZoneAvgPrice'
import ScatterChartAvgPriceRent from '../../components/ScatterChartAvgPriceRent'
import GridCards from './../../components/GridCards'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import "./styles.scss"

const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF"
  }
})(Typography);

export default function StatisticsView() {

  return (
    <>
      {/* <ChartHousesStdDeviation/> */}
      {/* <LineChartAvgRent/> */}
      {/* <GridCards/> */}

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item>
          <Card className="small_card" style={{"width": 350}}>
            <CardContent>
              <WhiteTextTypography variant="body1">
                O preço médio da cidade está em R$ 9.278/m², 0.4% acima do mês anterior.
                A tendência a partir de preço é para cima:
                Os preços aumentaram 1.2% sobre 2018, 2.6% sobre 2019 e 3.4% em 2020.
                Já em 2021 aumentou 1.3%, abaixo da inflação.
              </WhiteTextTypography>
            <div className="chart">
              <ScatterChartAvgPriceRent/>
            </div>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item>
          <Card className="small_card" style={{"width": 350}}>
            <CardContent>
              <WhiteTextTypography variant="body1">
              O valor do metro quadrado em São Paulo também se baseia na proximidade dos imóveis com a região central e
              sul da cidade. Bairros como Pinheiros, Vila Madalena e Itaim Bibi concentram boa parte dos prédios
              empresariais da capital, o que faz o valor dos imóveis ser mais alto.
              </WhiteTextTypography>
              <div>
                <BarChartDistrictAvgPrice/>
              </div>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
      
      <Grid
        direction="column"
        justifyContent="center"
        spacing={4}
      >
        <Grid item >
          <Card className="big_card" style={{"width": "95%", "margin": "0 auto"}}>
            <ChartHouses/>
          </Card>
        </Grid>
        <br/>
        <Grid item>
          <Card className="big_card"  style={{"width": "95%", "margin": "0 auto"}}>
            <ChartAverageRent/>
          </Card>
        </Grid>
        <br/>
        <Grid item>
          <Card className="big_card"  style={{"width": "95%", "margin": "0 auto"}}>
            <ChartAverageArea/>
          </Card>
        </Grid>
      </Grid>

    </>
  )
}
