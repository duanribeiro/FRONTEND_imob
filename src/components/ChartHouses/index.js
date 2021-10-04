import React from 'react';
import {
  BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import "./styles.scss"
import api from "./../../plugins/axios";



export default function ChartHouses() {
  const [housesPerDistrict, setHousesPerDistrict] = React.useState()

  React.useEffect(() => {
    fetchHousesPerDistrict()
  }, [])

  const fetchHousesPerDistrict = () => {
      api.get(`https://01ldy5zq44.execute-api.us-east-1.amazonaws.com/dev/statistics/houses_per_district`)
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
            <Bar dataKey="count_houses" name="Quantidade de imóveis cadastrados" fill="#B3B3B3"  />
      </BarChart>
    </ResponsiveContainer>
  );
}
