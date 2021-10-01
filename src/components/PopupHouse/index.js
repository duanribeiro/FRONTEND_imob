import React from 'react'
import Typography from '@material-ui/core/Typography'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Grid } from '@material-ui/core'
import StarIcon from '@material-ui/icons/Star';
import HomeIcon from '@material-ui/icons/Home';
import "./styles.scss"

const formatYAxis = (tickItem) => {
  if (tickItem >= 1000 && tickItem < 1000000) {
    return `R$ ${tickItem / 1000}K`
  } else {
    return `R$ ${tickItem / 1000000}M`
  }
}

const formatXAxis = (tickItem) => {
  return tickItem
}

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

export default function PopupHouse(item) {
  let house = item["item"]
  let graphData = []
  let priceArray = []
  let yTicks = house["rent"].concat(house["price"])
  let priceArraySize =   Array.isArray(house["price"]) ? house["price"].length : 0
  let rentArraySize = Array.isArray(house["rent"]) ? house["rent"].length : 0
  let biggerArray = rentArraySize - priceArraySize

  for (var i = 0; i < biggerArray; i++) {
    priceArray.push(null)
  }

  for (var i = 0; i < priceArraySize; i++) {
    priceArray.push(house["price"][i])
  }

  for (let i in house["last_update"]) {
      graphData.push({
        rent: house["rent"][i],
        price: priceArray[i],
        last_update: house["last_update"][i],
      })
  }
 
  const makeHeaderCard = (house) => {
    let headertext = ''
    if (house["area"]) {
      headertext += `${house["area"]}m²`
    }
    if (house["bedroom"]) {
      headertext += ` - ${house["bedroom"]} quartos`
    }
    if (house["garage"]) {
      headertext += ` - ${house["garage"]} vaga`
    }
    return headertext
  }

  return (
    <>
      <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={0}
      >
        <Grid item style={{"margin": 0, "padding": 0}}>
          {/* O OnClick desse botão fica em  "src\components\MapChart\make_map.js" */}
          <StarIcon className='myButton' style={{ "cursor": "pointer" }} variant="contained" color="inherit"/>
          <HomeIcon className='myButton2' style={{ "cursor": "pointer" }} variant="contained" color="inherit"/>
        </Grid>

        <Grid item style={{"margin": 0, "padding": 0}} className="capitalize">
          <Typography gutterBottom variant="body2">
          {house["real_estate"].capitalize()} <br/>
          {house["street"].toLowerCase().capitalize()},{house["number"]} - {house["district"].capitalize()} <br/>
          {makeHeaderCard(house)}              
          </Typography>
        </Grid>
      </Grid>

      <LineChart width={250} height={200} data={graphData}>
        <YAxis ticks={yTicks} interval={0} tickFormatter={formatYAxis}/>
        <XAxis dataKey='last_update' ticks={house["last_update"]} tickFormatter={formatXAxis}/>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
        <Line type="monotone" dataKey="rent" stroke="green" />
        <Line type="monotone" dataKey="price" stroke="red" />
        <Tooltip />
          <Legend width={300}/>
      </LineChart>
  </>
  )
}