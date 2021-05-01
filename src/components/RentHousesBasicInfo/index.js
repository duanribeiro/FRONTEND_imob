import React from 'react';
import {
  BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import "./styles.scss"
import axios from 'axios'


export default function RentHousesBasicInfo() {
  const [countHouses, setCountHouses] = React.useState()

  React.useEffect(() => {
    callAPIAverageRentByRent()
  }, [])

  const callAPIAverageRentByRent = () => {
      axios.get(`http://127.0.0.1:5000/statistics/houses_per_district`)
        .then(response => {
          setCountHouses(response.data)
        })
    }

  return (
    <ResponsiveContainer height={300}>
      <BarChart
      width={500}
        height={300}
        data={countHouses}
        margin={{
          top: 5,
          right: 30,
          left: 50,
          bottom: 5
        }}
      >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px', color: "white" }}/>
            <Bar dataKey="count_houses" fill="#8884d8"  />
      </BarChart>
    </ResponsiveContainer>
  );
}
