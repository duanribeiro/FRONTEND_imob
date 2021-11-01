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
        <Grid item xs={12} md={4}>
          <Card className="card">
            <CardContent>
              <WhiteTextTypography variant="body1">
                Médias de metragem e valor de aluguel para casas com 2 ou 3 quartos.
              </WhiteTextTypography>
            </CardContent>
            <ScatterChartAvgPriceRent/>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card className="card">
            <CardContent>
              <WhiteTextTypography variant="body1">
                Média do valor do aluguel do m² de cada região de São Paulo.
              </WhiteTextTypography>
            </CardContent>
            <BarChartDistrictAvgPrice/>
          </Card>
        </Grid>
              
        {/* <Grid item xs={12} md={4}>
          <Card className="card">
            <CardContent>
              <WhiteTextTypography variant="body1">
                Média do valor do aluguel do m² de cada região de São Paulo.
              </WhiteTextTypography>
            </CardContent>
            <BarChartDistrictAvgPrice/>
          </Card>
        </Grid> */}

        <Grid item xs={12}>
          <Card className="graph_card">
            <ChartHouses/>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card className="graph_card">
            <ChartAverageRent/>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card className="graph_card">
            <ChartAverageArea/>
          </Card>
        </Grid>
      </Grid>

    </>
  )
}
