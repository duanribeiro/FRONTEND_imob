import "./styles.scss";
import React from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area
} from "recharts";
import api from "../../plugins/axios";


export default function BarChartZoneAvgPrice() {
  const [chartData, setChartData] = React.useState([])

  React.useEffect(() => {
    fetchZoneAvgPrice()
  }, [])

  const fetchZoneAvgPrice = () => {
      api.get(`http://127.0.0.1:5000/statistics/zone_average_price`)
        .then(response => {
          console.log(response.data)
          setChartData(response.data)
        })
    }

  return (
    <ComposedChart
      layout="vertical"
      width={500}
      height={400}
      data={chartData}
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
      }}
    >
      {/* <CartesianGrid stroke="#f5f5f5" /> */}
      <XAxis type="number" />
      <YAxis dataKey="name" type="category"/>
      <Tooltip />
      <Legend />
      <Bar dataKey="avg_price"  fill="#B3B3B3" />
    </ComposedChart>
  );
}
