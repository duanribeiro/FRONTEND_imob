import "./styles.scss";
import React from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import api from "../../plugins/axios";


export default function BarChartZoneAvgPrice() {
  const [chartData, setChartData] = React.useState([])

  const xAxisTickFormatter = number =>  {
    return `R$ ${number}`
  }

  React.useEffect(() => {
    fetchZoneAvgPrice()
  }, [])

  const fetchZoneAvgPrice = () => {
      api.get(`${process.env.REACT_APP_BACKEND_API}/statistics/zone_average_rent`)
        .then(response => {
          setChartData(response.data)
        })
    }

  const barColors = ["red", "yellow", "green", "purple", "blue"]
  return (
    <>
    {/* <div>Preço do aluguel / m² por zona</div> */}
    <ResponsiveContainer width="90%" height="80%" >
    <ComposedChart
      layout="vertical"
      width={450}
      height={320}
      data={chartData}
      margin={{
        top: 20,
        right: 20
      }}
    >
      <XAxis type="number" tickFormatter={xAxisTickFormatter}/>
      <YAxis dataKey="name" type="category"/>
      <Tooltip wrapperStyle={{ fontSize: 10}}/>
      <Legend wrapperStyle={{ lineHeight: '40px', color: "white" }} />
      <Bar dataKey="avg_rent" name="Preço médio aluguel por m²" fill="#B3B3B3" formatter={xAxisTickFormatter}>
      {
          chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={barColors[index % 20]} />
          ))
      }
      </Bar>

      {/* <Bar dataKey="avg_rent" name="Preço médio aluguel por m²" fill="#B3B3B3" formatter={xAxisTickFormatter}/> */}
    </ComposedChart>
    </ResponsiveContainer>
  </>

  );
}
