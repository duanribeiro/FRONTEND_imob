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

  return (
    <>
    {/* <div>Preço do aluguel / m² por zona</div> */}
    <ComposedChart
      layout="vertical"
      width={300}
      height={300}
      data={chartData}
      margin={{
        top: 20,
      }}
    >
      <XAxis type="number" tickFormatter={xAxisTickFormatter}/>
      <YAxis dataKey="name" type="category"/>
      <Tooltip />
      <Legend wrapperStyle={{ lineHeight: '40px', color: "white" }} />
      <Bar dataKey="avg_rent" name="Preço médio aluguel por m²" fill="#B3B3B3" formatter={xAxisTickFormatter}/>
    </ComposedChart>
  </>

  );
}
