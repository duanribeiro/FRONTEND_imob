import React from 'react'
import ChartAverageArea from './../../components/ChartAverageArea/index'
import ChartAverageRent from './../../components/ChartAverageRent/index'
import ChartHouses from './../../components/ChartHouses/index'
import ChartHousesStdDeviation from './../../components/ChartHousesStdDeviation/index'
import "./styles.scss"


export default function StatisticsView() {

  return (
    <>
      <ChartHousesStdDeviation/>
      <ChartHouses/>
      <ChartAverageRent/>
      <ChartAverageArea/>
    </>
  )
}
