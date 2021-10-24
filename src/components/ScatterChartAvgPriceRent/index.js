import React from "react"
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList
} from "recharts"
import api from "./../../plugins/axios"
import "./styles.scss"


export default function ScatterChartAvgPriceRent() {
  const [northData, setNorthData] = React.useState([
    { area: 0, bedroom: 0, rent: "R$ 0" },
    { area: 0, bedroom: 0, rent: "R$ 0" },
  ])
  const [southData, setSouthData] = React.useState([
    { area: 0, bedroom: 0, rent: "R$ 0" },
    { area: 0, bedroom: 0, rent: "R$ 0" },
  ])
  const [eastData, setEastData] = React.useState([
    { area: 0, bedroom: 0, rent: "R$ 0" },
    { area: 0, bedroom: 0, rent: "R$ 0" },
  ])
  const [westData, setWestData] = React.useState([
    { area: 0, bedroom: 0, rent: "R$ 0" },
    { area: 0, bedroom: 0, rent: "R$ 0" },
  ])
  const [centerData, setCenterData] = React.useState([
    { area: 0, bedroom: 0, rent: "R$ 0" },
    { area: 0, bedroom: 0, rent: "R$ 0" },
  ])


  const callAPIAveragePriceRent = () => {
      api.get(`${process.env.REACT_APP_BACKEND_API}/statistics/chart_average_price_rent`)
        .then(response => {
            setNorthData([{  
              bedroom: 2,
              area: response.data['2_bedroom']['north']['avg_area'],
              rent: response.data['2_bedroom']['north']['avg_rent']
            }, {  
              bedroom: 3,
              area: response.data['3_bedroom']['north']['avg_area'],
              rent: response.data['3_bedroom']['north']['avg_rent']
            }])
            setSouthData([{  
              bedroom: 2,
              area: response.data['2_bedroom']['south']['avg_area'],
              rent: response.data['2_bedroom']['south']['avg_rent']
            }, {  
              bedroom: 3,
              area: response.data['3_bedroom']['south']['avg_area'],
              rent: response.data['3_bedroom']['south']['avg_rent']
            }])
            setEastData([{  
              bedroom: 2,
              area: response.data['2_bedroom']['east']['avg_area'],
              rent: response.data['2_bedroom']['east']['avg_rent']
            }, {  
              bedroom: 3,
              area: response.data['3_bedroom']['east']['avg_area'],
              rent: response.data['3_bedroom']['east']['avg_rent']
            }])
            setWestData([{  
              bedroom: 2,
              area: response.data['2_bedroom']['west']['avg_area'],
              rent: response.data['2_bedroom']['west']['avg_rent']
            }, {  
              bedroom: 3,
              area: response.data['3_bedroom']['west']['avg_area'],
              rent: response.data['3_bedroom']['west']['avg_rent']
            }])
            setCenterData([{  
              bedroom: 2,
              area: response.data['2_bedroom']['center']['avg_area'],
              rent: response.data['2_bedroom']['center']['avg_rent']
            }, {  
              bedroom: 3,
              area: response.data['3_bedroom']['center']['avg_area'],
              rent: response.data['3_bedroom']['center']['avg_rent']
            }])
        })
  }

  React.useEffect(() => {
    callAPIAveragePriceRent()
  }, [])

  return (
    <ScatterChart
      width={300}
      height={300}
      margin={{
        top: 20,
        right: 20,
        left: 20
      }}
    >
      <CartesianGrid />
      <XAxis type="number" dataKey="area" name="Área" unit="m²"/>
      <YAxis type="number" dataKey="bedroom" name="Quartos" unit=" quartos" ticks={[1, 2, 3, 4]}/>
      <ZAxis dataKey="rent" name="Preço do aluguel por mês"/>
      <Tooltip cursor={{ strokeDasharray: "3 3" }} />
      <Legend wrapperStyle={{ lineHeight: '40px', color: "white" }}/>
      <Scatter name="Norte" data={northData} color="red" fill= 'red' />
      <Scatter name="Oeste" data={westData} color="red" fill= 'green' />
      <Scatter name="Sul" data={southData} color="red" fill= 'purple' />
      <Scatter name="Leste" data={eastData} color="red" fill= 'yellow' />
      <Scatter name="Centro" data={centerData} color="red" fill= 'blue' />
    </ScatterChart>
  );
}
