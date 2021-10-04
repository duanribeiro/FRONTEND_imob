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
    if (1000 >= number >= 1000000) {
      return `R$ ${number / 1000}K`
    } else {
      return `R$ ${number / 1000000}M`
    }
  }

  React.useEffect(() => {
    fetchZoneAvgPrice()
  }, [])

  const fetchZoneAvgPrice = () => {
      api.get(`https://01ldy5zq44.execute-api.us-east-1.amazonaws.com/dev/statistics/zone_average_rent`)
        .then(response => {
          setChartData(response.data)
        })
    }

  return (
    <>
    {/* <div>Preço do aluguel / m² por zona</div> */}
    <ComposedChart
      layout="vertical"
      width={400}
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
