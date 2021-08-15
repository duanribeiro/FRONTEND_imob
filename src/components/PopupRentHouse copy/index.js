import React from 'react'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import "./styles.scss"

const formatYAxis = (tickItem) => {
  return `R$${tickItem}`
}

export default function PopupRentHouse(item) {
  let house = item["item"]
  let graphData = []

  for (let i in house["rent"]) {
    graphData.push({
      rent: house["rent"][i],
    })
  }
  
  return (
    <Card elevation={0}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {house["real_estate"].toUpperCase()}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {house["description"]}
        </Typography>
      </CardContent>
      <Divider />
      <Typography>
          EVOLUÇÃO DO PREÇO DE ALUGUEL
      </Typography>
      <LineChart margin={{ top: 20, left: 0, right: 20, bottom: 20 }} width={500} height={200} data={graphData}>
        <YAxis ticks={house["rent"]} interval={0} tickFormatter={formatYAxis}/>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
        <Line type="monotone" dataKey="rent" stroke="#B3B3B3" />
      </LineChart>
    </Card>
  )
}