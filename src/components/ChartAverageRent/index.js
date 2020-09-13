import React from 'react';
import {
  BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import "./styles.scss"
import axios from 'axios'


export default function ChartAverageArea() {
  const [data, setData] = React.useState()
  const callAPIAverageRentByArea = () => {
      axios.get(`http://127.0.0.1:5000/maps/chart_average_by_district`)
        .then(response => {
            console.log(response.data)
            setData(response.data)
        })
    }

  React.useEffect(() => {
    callAPIAverageRentByArea()
  }, [])


  return (
    <ResponsiveContainer width="95%" height={300}>
      <BarChart
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="_id" />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px', color: "white" }}/>
        <ReferenceLine y={0} stroke="#000" />
        <Brush dataKey="uv" height={30} stroke="black" />
        <Bar dataKey="average_rent" fill="darkgray" />
      </BarChart>
    </ResponsiveContainer>
  );
}
