import React from 'react';
import {
  BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList
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
      api.get(`${process.env.REACT_APP_BACKEND_API}/statistics/chart_average_rent_by_district`)
        .then(response => {
            setChartData(response.data)
        })
    }
    
  const renderCustomizedLabel = (props) => {
    let total = 0
    let counter = 0
    chartData.map(item => {
      total += item['average_rent']
      counter += 1
    })
    const result = (total / counter).toFixed(2)
    return (
        <text x={"53%"} y={50} fill="white" textAnchor="end">
          R$ {result}
        </text>
    );
  };
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
            <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px', color: "white", paddingBottom: "30px"}}/>
            <Bar dataKey="average_rent" name='Preço médio do aluguel' fill="#B3B3B3">
              <LabelList dataKey="amountLabel" content={renderCustomizedLabel} position="insideRight" style={{ fill: "white" }} />
            </Bar>
          </BarChart>
    </ResponsiveContainer>
  );
}
