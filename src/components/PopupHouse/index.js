import React from 'react'
import Typography from '@material-ui/core/Typography'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Grid } from '@material-ui/core'
import StarIcon from '@material-ui/icons/Star';
import HomeIcon from '@material-ui/icons/Home';
import Chip from '@material-ui/core/Chip';
import "./styles.scss"

const formatYAxis = (tickItem) => {
  if (tickItem >= 1000 && tickItem < 1000000) {
    return `R$ ${(tickItem / 1000).toFixed(1)}K`
  } else {
    return `R$ ${(tickItem / 1000000).toFixed(1)}M`
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
 
    const makeChips = house => {
    let chips = []
    if (house["area"]) {
      chips.push(<Chip label={`${house["area"]}m²`} variant="outlined" size="small" style={{marginRight: 5}}/>)
    }
    if (house["bedroom"]) {
      let suffix = house["bedroom"] == 1 ? 'quarto'  : 'quartos'
      chips.push(<Chip label={`${house["bedroom"]} ${suffix}`} variant="outlined" size="small" style={{marginRight: 5}}/>)
    }
    if (house["garage"]) {
      let suffix = house["garage"] == 1 ? 'vaga' : 'vagas'
      chips.push(<Chip label={`${house["garage"]} ${suffix}`} variant="outlined" size="small" style={{marginRight: 5}}/>)
    }
    return chips
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
          {/* <StarIcon className='myButton' style={{ "cursor": "pointer" }} variant="contained" color="inherit"/> */}
          {/* <HomeIcon className='myButton2' style={{ "cursor": "pointer" }} variant="contained" color="inherit"/> */}
        </Grid>

        <Grid item style={{"margin": 0, "padding": 0}} className="capitalize"> 
          <Typography gutterBottom variant="body2">
          {/* {house["real_estate"].capitalize()} <br/> */}
          {house["street"].toLowerCase().capitalize()}{house["number"] ? `, ${house["number"]}` : ''} - {house["district"].capitalize()}
          {makeChips(house)}              
          </Typography>
        </Grid>
      </Grid>

      <LineChart width={300} height={200} data={graphData} style={{"marginLeft": -30, "padding": 0}} >
        <YAxis ticks={yTicks} interval={0} tickFormatter={formatYAxis} width={80}/>
        <XAxis dataKey='last_update' ticks={house["last_update"]} tickFormatter={formatXAxis}/>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
        <Line type="monotone" dataKey="rent" name="Aluguel" stroke="green" />
        <Line type="monotone" dataKey="price" name="Venda" stroke="red" />
        <Tooltip />
          <Legend width={300}/>
      </LineChart>
  </>
  )
}