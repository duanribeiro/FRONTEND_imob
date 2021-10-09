import React from 'react';
import {
  BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import "./styles.scss"
import api from "./../../plugins/axios";



export default function ChartHousesStdDeviation() {
  const [housesStdDeviation, setHousesStdDeviation] = React.useState()

  React.useEffect(() => {
    fetchHousesStdDeviation()
  }, [])

  const fetchHousesStdDeviation = () => {
      api.get(`${process.env.REACT_APP_BACKEND_API}/statistics/houses_std_deviation_per_district`)
        .then(response => {
          setHousesStdDeviation(response.data)
        })
    }

  return (
    <ResponsiveContainer height={300}>
      <BarChart
          width={500}
          height={300}
          data={housesStdDeviation}
          margin={{
            top: 5,
            right: 30,
            left: 50,
            bottom: 5,
          }}
        >
          <XAxis dataKey="districts" />
          <YAxis domain={['dataMin', 'dataMax']} />
          <Tooltip />
          <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px', color: "white"  }} />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="rents_std_deviation" fill="#B3B3B3" />
        </BarChart>
    </ResponsiveContainer>
  );
}
