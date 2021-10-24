import L from 'leaflet'
import React from "react"
import ReactDOMServer from "react-dom/server";
import {dict_polygon_names, dict_polygon_colors} from './polygon_dicts'
import PopupHouse from "./../../components/PopupHouse"
import PopupNonHouse from "./../../components/PopupNonHouse"
import api from "./../../plugins/axios"
import $ from "jquery"
import { LocalConvenienceStoreOutlined } from '@material-ui/icons';
import bank from './../../assets/map_icons/bank.png'
import university from './../../assets/map_icons/university.png'
import subway from './../../assets/map_icons/subway.png'
import shoppingmall from './../../assets/map_icons/shoppingmall.png'
import gazstation from './../../assets/map_icons/gazstation.png'
import gym from './../../assets/map_icons/gym.png'
import home from './../../assets/map_icons/home.png'
import 'leaflet.markercluster';


export class LeafletMap {
    constructor() {
      let initial_position = [-23.564942, -46.625]
      let initial_zoom = 12
      this.map = L.map('map', {attributionControl: false}).setView(initial_position, initial_zoom)
      L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=d7dce56d-10c6-4d8a-bd39-04f6e42c2683').addTo(this.map)
      this.layer_places = L.layerGroup()
      this.layer_group = L.markerClusterGroup({showCoverageOnHover: true, disableClusteringAtZoom: 18});

      // RASCUNHO DO CÍRCULO
      //   L.circle([-23.5962, -46.732088], {
      //     radius: 900,
      //     color: 'green',
      //     fillColor: 'light green',
      //     fillOpacity: 0.5,
      //   }).addTo(this.map)
    }

    flyTo(latitude, longitude) {
      this.map.flyTo([latitude, longitude], 18)  
    }
    
    
    makePolygon(active_districts) {
      active_districts.forEach(district => {
        L.polygon(dict_polygon_names[district], {'color': dict_polygon_colors[district]}).addTo(this.layer_group)
      })
    }
    
    // TODO - PRECISA MELHORAR COMO IDENTIFICAR O TIPO DO ICONE
    makeIcon(item, icon_position, icon, dispatch) {
      
      let LeafIcon = L.Icon.extend({
        options: {
          iconSize: [30, 33],
          iconAnchor: [15, 5]
        }
      })

      let icon_url = ''
      if (icon === 'school') {
        icon_url = university
      } else if (icon === 'subway_station') {
        icon_url = subway
      } else if (icon === 'shopping_mall') {
        icon_url = shoppingmall
      } else if (icon === 'bank') {
        icon_url = bank
      } else if (icon === 'gas_station') {
        icon_url = gazstation
      } else if (icon === 'gym') {
        icon_url = gym
      } else if (icon === 'rent_house') {
        icon_url = home
      }
      let myIcon = new LeafIcon({iconUrl: icon_url})

      if (item['real_estate']) {
        L.marker(icon_position, {icon: myIcon}).bindPopup(ReactDOMServer.renderToString(
        
        <PopupHouse item={item}/>
        ), {minWidth: 250}).on("popupopen", () => {
          $(".myButton").on("click", e => {
            e.preventDefault()
            api.post(`${process.env.REACT_APP_BACKEND_API}/wallet/add_house`, {
              "house_id": item['_id']
            })
            .then(response => {
              dispatch({type: 'ADD_HOUSE', payload: item})
            })
            .catch(error => {
              console.log(error)
            })
          })
        }).on("popupopen", () => {
          $(".myButton2").on("click", e => {
            e.preventDefault()
            window.open(item["url"], "_blank")
          })
        }).addTo(this.layer_group)
      } else {
        L.marker(icon_position, {icon: myIcon}).bindPopup(ReactDOMServer.renderToString(
        <PopupNonHouse item={item}/>
        ), {minWidth: 100}).addTo(this.layer_places)
      }
    }

    clearMap() {
      this.layer_group.clearLayers();
    }
    clearPlaces() {
      this.layer_places.clearLayers();
    }
    bindLayerMap() {
      this.map.addLayer(this.layer_group)
      this.map.addLayer(this.layer_places)
      this.map.fitBounds(this.layer_group.getBounds()); 
    }
  }
