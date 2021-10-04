import React from 'react';
import {
  BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import "./styles.scss"
import api from "./../../plugins/axios";


var formatter = new Intl.NumberFormat([], {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 0,
})

const yAxisTickFormatter = number =>  {
  return formatter.format(number)
}

export default function ChartAverageRent() {
  let [chartData, setChartData] = React.useState([])

  React.useEffect(() => {
    callAPIAverageRentByArea()
  }, [])

  const callAPIAverageRentByArea = () => {
      api.get(`https://01ldy5zq44.execute-api.us-east-1.amazonaws.com/dev/statistics/chart_average_rent_by_district`)
        .then(response => {
            setChartData(response.data)
        })
    }

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
            <Bar dataKey="average_rent" name='Preço médio do aluguel' fill="#B3B3B3"  />
          </BarChart>
    </ResponsiveContainer>
  );
}
