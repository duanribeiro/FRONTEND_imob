import React from "react";
import { LeafletMap } from './make_map'
import axios from 'axios'
import {useSelector} from 'react-redux'
import DrawerDistricts from './../DrawerDistricts'
import DrawerWallet from './../DrawerWallet'
import DrawerFilter from './../DrawerFilter'
import api from "./../../plugins/axios";

import 'leaflet/dist/leaflet.css'
import "./styles.scss"


export default function MapChart() {
  const [map, setMap] = React.useState()
  const filters = useSelector(state => state.mapFilters)
  const [rentHouses, setRentHouses] = React.useState([])
  const [districtsResults, setDistrictsResults] = React.useState([])
  const auth = useSelector(state => state.auth)

  
  const callDistricts = () => {
    api.post(`http://127.0.0.1:5000/maps/get_district`, {
        "filters": filters
      })
      .then(response => {
        setDistrictsResults(response.data)

        for (var key in response.data) {
          if (response.data.hasOwnProperty(key)) {  
            response.data[key].forEach(element => {
              map.makeIcon(
                element,
                [element["geometry"]["location"]["lat"], element["geometry"]["location"]["lng"]],
                key
              )
            })
          }
        }
      })
  }


  const callRentHouse = () => {
    api.post(`http://127.0.0.1:5000/maps/get_rent_houses`, {
       "filters": filters
     })
     .then(response => {
       if (response.data) {
         response.data.forEach(element => {
           map.makeIcon(
            element,
             [element["latitude"], element["longitude"]],
             "rent_house"
           )
         })
       }
     })
 }

  React.useEffect(() => {
    if (filters.rent_houses) {
      callRentHouse()
    }
    callDistricts()

    if (map){
      map.clearMap()
      map.makePolygon(filters.active_districts)
    }
  }, [filters])


  React.useEffect(() => {
    let map = new LeafletMap()
    setMap(map)
    map.clearMap()
    map.makePolygon(filters.active_districts)
  }, [])

  return (
    <>
      <div 
        style={{height: window.innerHeight * 0.95}}
        className="map"
        id="map"
      />

      <div id="filters_button">
        <DrawerFilter/>
      </div>
      <div id="districts_button">
        <DrawerDistricts/>
      </div>
      <div id="wallet_button">
        <DrawerWallet user_id={auth._id}/>
      </div>
    </>
  );
}




