import React from 'react'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import "./styles.scss"
import { Grid } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';


const formatYAxis = (tickItem) => {
  return `R$${tickItem}`
}

const formatXAxis = (tickItem) => {
   
  return tickItem
}

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

export default function PopupRentHouse(item) {
  
  let house = item["item"]
  let graphData = []
  for (let i in house["rent"]) {
    graphData.push({
      rent: house["rent"][i],
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
            <Grid item style={{"margin": -20, "padding": 0}}>
              <IconButton>
                <AddCircleOutlineIcon variant="contained" color="primary"/>
              </IconButton>
            </Grid>
    
            <Grid item style={{"margin": 0, "padding": 0}} className="capitalize">
              <Typography gutterBottom variant="body2">
              {house["real_estate"].capitalize()} <br/>
              {house["street"].toLowerCase().capitalize()} - {house["district"].capitalize()} <br/>
              {makeHeaderCard(house)}              
              </Typography>
            </Grid>

            <Grid item style={{"paddingBottom": 10, "paddingLeft": 20}}>

            </Grid>
            
          </Grid>

          <LineChart width={250} height={200} data={graphData}>
            <YAxis ticks={house["rent"]} interval={0} tickFormatter={formatYAxis}/>
            <XAxis dataKey = 'last_update' ticks={house["last_update"]} tickFormatter={formatXAxis}/>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
            <Line type="monotone" dataKey="rent" stroke="#B3B3B3" />
          </LineChart>
      </>
  )
}