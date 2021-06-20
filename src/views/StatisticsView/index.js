import React from 'react'
import ChartAverageArea from './../../components/ChartAverageArea'
import ChartAverageRent from './../../components/ChartAverageRent'
import ChartHouses from '../../components/ChartHouses'
import LineChartAvgRent from './../../components/LineChartAvgRent'
import BarChartDistrictAvgPrice from '../../components/BarChartZoneAvgPrice'
import ScatterChartAvgPriceRent from '../../components/ScatterChartAvgPriceRent'
import GridCards from './../../components/GridCards'
import Grid from '@material-ui/core/Grid';
import "./styles.scss"


export default function StatisticsView() {

  return (
    <>
      {/* <ChartHousesStdDeviation/> */}
      <GridCards/>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >

        <Grid item xs={3} sm={3}>
          <div className="chart_description">
            O preço médio da cidade está em R$ 9.278/m², 0.4% acima do mês anterior.
            A tendência a partir de preço é para cima:
            Os preços aumentaram 1.2% sobre 2018, 2.6% sobre 2019 e 3.4% em 2020.
            Já em 2021 aumentou 1.3%, abaixo da inflação.
          </div>
        </Grid>
        <Grid item xs={12} sm={9}>
          <LineChartAvgRent/>
        </Grid>

        <Grid item xs={6} sm={6}>
          <BarChartDistrictAvgPrice/>
        </Grid>
        <Grid item xs={6} sm={6}>
          <ScatterChartAvgPriceRent/>
        </Grid>
        
      </Grid>
      
      
      <ChartHouses/>
      <ChartAverageRent/>
      <ChartAverageArea/>
    </>
  )
}
