import React from 'react'
import ChartAverageArea from './../../components/ChartAverageArea/index'
import ChartAverageRent from './../../components/ChartAverageRent/index'

import "./styles.scss"


export default function StatisticsView() {

  return (
    <>
      <ChartAverageRent/>
      <ChartAverageArea/>
    </>
  )
}
