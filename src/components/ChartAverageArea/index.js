import React from 'react';
import {
  BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import "./styles.scss"
import api from "./../../plugins/axios"



const yAxisTickFormatter = number =>  {
  return `${number}m²`
}

export default function ScatterChartAvgPriceRent() {
  const [chartData, setChartData] = React.useState()

  const callAPIAverageRent = () => {
      api.get(`http://127.0.0.1:5000/statistics/chart_average_area_by_district`)
        .then(response => {
            setChartData(response.data)
        })
    }

  React.useEffect(() => {
    callAPIAverageRent()
  }, [])


  return (
    <ResponsiveContainer height={300}>
      <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 50,
              bottom: 5
            }}
          >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="_id" />
            <YAxis tickFormatter={yAxisTickFormatter} domain={[0, 'dataMax']}/>
            <Tooltip formatter={yAxisTickFormatter}/>
            <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px', color: "white" }}/>
            <Bar dataKey="average_area" fill="#B3B3B3"  />
          </BarChart>
    </ResponsiveContainer>
  );
}
