import React from 'react';
import {
  BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import "./styles.scss"
import axios from 'axios'


export default function ChartHouses() {
  const [housesPerDistrict, setHousesPerDistrict] = React.useState()

  React.useEffect(() => {
    fetchHousesPerDistrict()
  }, [])

  const fetchHousesPerDistrict = () => {
      axios.get(`http://127.0.0.1:5000/statistics/houses_per_district`)
        .then(response => {
          setHousesPerDistrict(response.data)
        })
    }

  return (
    <ResponsiveContainer height={300}>
      <BarChart
        width={500}
        height={300}
        data={housesPerDistrict}
        margin={{
          top: 5,
          right: 30,
          left: 50,
          bottom: 5
        }}
      >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="_id" />
            <YAxis domain={[0, 'dataMax']}/>
            <Tooltip />
            <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px', color: "white" }}/>
            <Bar dataKey="count_houses" fill="#8884d8"  />
      </BarChart>
    </ResponsiveContainer>
  );
}
