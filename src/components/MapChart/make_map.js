import L from 'leaflet'
import React, { Component } from "react"
import ReactDOMServer from "react-dom/server";
import {dict_polygon_names, dict_polygon_colors} from './polygon_dicts'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const formatYAxis = (tickItem) => {
  return `R$ ${tickItem}`
}

const RentHousePopup = item => {
  let house = item["item"]

  let graphData = []
  for (let i in house["rent"]) {
    graphData.push({
      rent: house["rent"][i],
    })
  }
  console.log(house)
  
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
      <LineChart margin={{ top: 20, left: 0, right: 20, bottom: 20 }} width={300} height={200} data={graphData}>
        <YAxis ticks={house["rent"]} interval={0} tickFormatter={formatYAxis}/>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
        <Line type="monotone" dataKey="rent" stroke="#8884d8" />
      </LineChart>
    </Card>
  );
};


export class LeafletMap {

    constructor(initial_position, initial_zoom) {

      this.initial_position = initial_position
      this.initial_zoom = initial_zoom
      this.map = L.map('map', {attributionControl: false}).setView(initial_position, initial_zoom)
      L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png').addTo(this.map)
      this.layer_group = L.layerGroup().addTo(this.map)
      

      // RASCUNHO DO CÍRCULO
      //   L.circle([-23.5962, -46.732088], {
      //     radius: 900,
      //     color: 'green',
      //     fillColor: 'light green',
      //     fillOpacity: 0.5,
      //   }).addTo(this.map)
    }

    makePolygon(active_districts) {
      active_districts.forEach(district => {
        L.polygon(dict_polygon_names[district], {'color': dict_polygon_colors[district]}).addTo(this.layer_group)
      })
    }
    
    makeIcon(item, icon_position, icon) {
      let LeafIcon = L.Icon.extend({
        options: {
          iconSize: [30, 33],
          iconAnchor: [15, 5]
        }
      })
    
      let icon_url = ''
      if (icon == 'school'){
        icon_url = 'https://icons-maps-google.s3.amazonaws.com/university.png'
      } else if (icon == 'subway_station') {
        icon_url = 'https://icons-maps-google.s3.amazonaws.com/underground.png'
      } else if (icon == 'shopping_mall') {
        icon_url = 'https://icons-maps-google.s3.amazonaws.com/mall.png'
      } else if (icon == 'bank') {
        icon_url = 'https://icons-maps-google.s3.amazonaws.com/bank_euro.png'
      } else if (icon == 'gas_station') {
        icon_url = 'https://icons-maps-google.s3.amazonaws.com/fillingstation.png'
      } else if (icon == 'gym') {
        icon_url = 'https://icons-maps-google.s3.amazonaws.com/weights.png'
      } else if (icon == 'rent_house') {
        icon_url = 'https://icons-maps-google.s3.amazonaws.com/home-2.png'
      }

      let myIcon = new LeafIcon({iconUrl: icon_url})
      if (item["real_estate"]){
      L.marker(icon_position, {icon: myIcon}).bindPopup(ReactDOMServer.renderToString(<RentHousePopup item={item}/>)).addTo(this.layer_group)
      }
      L.marker(icon_position, {icon: myIcon}).bindPopup(item["name"]).addTo(this.layer_group)


    }

    clearMap() {
      this.layer_group.clearLayers();
    }
  }
