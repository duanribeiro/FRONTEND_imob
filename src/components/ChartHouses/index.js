import React from 'react';
import {
  BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList
} from 'recharts'
import "./styles.scss"
import api from "./../../plugins/axios";



export default function ChartHouses() {
  const [housesPerDistrict, setHousesPerDistrict] = React.useState()

  React.useEffect(() => {
    fetchHousesPerDistrict()
  }, [])

  const fetchHousesPerDistrict = () => {
      api.get(`${process.env.REACT_APP_BACKEND_API}/statistics/houses_per_district`)
        .then(response => {
          setHousesPerDistrict(response.data)
        })
    }

  const renderCustomizedLabel = (props) => {
    let total = 0
    housesPerDistrict.map(item => {
      total += item['count_houses']
    })
    return (
        <text x={"52%"} y={40} fill="white" textAnchor="end">
          {total}
        </text>
    );
  };

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
            <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '20px', color: "white", paddingBottom: "30px"}}/>
            <Bar dataKey="count_houses" name="Quantidade de imóveis cadastrados" fill="#B3B3B3">
              <LabelList dataKey="amountLabel" content={renderCustomizedLabel} position="insideRight" style={{ fill: "white" }} />
            </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
