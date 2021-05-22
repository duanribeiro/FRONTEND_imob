import React from 'react'
import ChartAverageArea from './../../components/ChartAverageArea/index'
import ChartAverageRent from './../../components/ChartAverageRent/index'
import ChartHouses from './../../components/ChartHouses/index'
import ChartHousesStdDeviation from './../../components/ChartHousesStdDeviation/index'
import CardReport from './../../components/CardReport'
import Grid from '@material-ui/core/Grid';
import "./styles.scss"


export default function StatisticsView() {

  return (
    <>
      {/* <ChartHousesStdDeviation/> */}
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={6}
      >
        <Grid item>
          <CardReport title={'Aluguel'} text={'Preço de aluguel mensal na cidade está em R$3.494 para os apartamentos de 65m² e dois quartos.'}/>
        </Grid>
          <Grid item>
        <CardReport title={'Aluguel'} text={'Em 2019 aluguel subiu 5,3% e outros 5,6% em 2020. Em 2021, sobe 1,1%, abaixo da inflação e bem abaixo do IGP-M.'}/>
        </Grid>
          <Grid item>
        <CardReport title={'Aluguel'} text={'Oeste é a região mais cara da cidade, R$ 4.081 por mês. Leste tem a oferta mais barata com preço médio de R$ 1.648 por mês.'}/>
          </Grid>
        <Grid item>
          <CardReport title={'Aluguel'} text={'Itaim Bibi é o que tem o maior preço médio de aluguel da cidade, R$ 4.910 por mês. '}/>
        </Grid>
        <Grid item>
          <CardReport title={'Aluguel'} text={'Sul é a região que oferece maior retorno para investidores em busca de renda, 6.5% ao ano.'}/>
        </Grid>
      </Grid>


      <ChartHouses/>
      <ChartAverageRent/>
      <ChartAverageArea/>
    </>
  )
}
