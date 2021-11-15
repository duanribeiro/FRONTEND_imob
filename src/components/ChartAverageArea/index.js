import React from 'react';
import {
  BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList
} from 'recharts'
import "./styles.scss"
import api from "./../../plugins/axios"



const yAxisTickFormatter = number =>  {
  return `${number}m²`
}

export default function ScatterChartAvgPriceRent() {
  const [chartData, setChartData] = React.useState()

  const callAPIAverageRent = () => {
      api.get(`${process.env.REACT_APP_BACKEND_API}/statistics/chart_average_area_by_district`)
        .then(response => {
            setChartData(response.data)
        })
    }

  React.useEffect(() => {
    callAPIAverageRent()
  }, [])

  const renderCustomizedLabel = (props) => {
    let total = 0
    let counter = 0
    chartData.map(item => {
      total += item['average_area']
      counter += 1
    })
    const result = (total / counter).toFixed(2)
    return (
        <text x={"50%"} y={48} fill="white" textAnchor="middle">
          {result} m²
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
              bottom: 5
            }}
          >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="_id" />
            <YAxis tickFormatter={yAxisTickFormatter} domain={[0, 'dataMax']}/>
            <Tooltip formatter={yAxisTickFormatter}/>
            <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px', color: "white", paddingBottom: "30px"}}/>
            <Bar dataKey="average_area" name={"Área média"} fill="#B3B3B3">
              <LabelList dataKey="amountLabel" content={renderCustomizedLabel} position="center" style={{ fill: "white" }} />
            </Bar>
          </BarChart>
    </ResponsiveContainer>
  );
}
