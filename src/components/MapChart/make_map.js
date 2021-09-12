import L from 'leaflet'
import React from "react"
import ReactDOMServer from "react-dom/server";
import {dict_polygon_names, dict_polygon_colors} from './polygon_dicts'
import PopupRentHouse from "./../../components/PopupRentHouse"
import PopupNonHouse from "./../../components/PopupNonHouse"
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import api from "./../../plugins/axios";
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import $ from "jquery";


export class LeafletMap {
    constructor() {
      let initial_position = [-23.564942, -46.625]
      let initial_zoom = 15
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
    
    // TODO - PRECISA MELHORAR COMO IDENTIFICAR O TIPO DO ICONE
    makeIcon(item, icon_position, icon) {
      let LeafIcon = L.Icon.extend({
        options: {
          iconSize: [30, 33],
          iconAnchor: [15, 5]
        }
      })
      let icon_url = ''
      if (icon === 'school') {
        icon_url = 'https://icons-maps-google.s3.amazonaws.com/university.png'
      } else if (icon === 'subway_station') {
        icon_url = 'https://icons-maps-google.s3.amazonaws.com/underground.png'
      } else if (icon === 'shopping_mall') {
        icon_url = 'https://icons-maps-google.s3.amazonaws.com/mall.png'
      } else if (icon === 'bank') {
        icon_url = 'https://icons-maps-google.s3.amazonaws.com/bank_euro.png'
      } else if (icon === 'gas_station') {
        icon_url = 'https://icons-maps-google.s3.amazonaws.com/fillingstation.png'
      } else if (icon === 'gym') {
        icon_url = 'https://icons-maps-google.s3.amazonaws.com/weights.png'
      } else if (icon === 'rent_house') {
        icon_url = 'https://icons-maps-google.s3.amazonaws.com/home-2.png'
      }
      let myIcon = new LeafIcon({iconUrl: icon_url})

      if (item['real_estate']) {
        L.marker(icon_position, {icon: myIcon}).bindPopup(ReactDOMServer.renderToString(
        <PopupRentHouse item={item}/>
        ), {minWidth: 250}).on("popupopen", () => {
          $(".myButton").on("click", e => {
            e.preventDefault()
            api.post(`http://localhost:5000/wallet/add_house`, {
              "house_id": item['_id']
              })
              .then(response => {
              })
              .catch(error => {
                console.log(error)
              })
          })
        }).addTo(this.layer_group)
      } else {
        L.marker(icon_position, {icon: myIcon}).bindPopup(ReactDOMServer.renderToString(
        <PopupNonHouse item={item}/>
        ), {minWidth: 100}).addTo(this.layer_group)
      }
    }

    clearMap() {
      this.layer_group.clearLayers();
    }
  }
