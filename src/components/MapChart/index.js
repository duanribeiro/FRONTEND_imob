import React from "react";
import { LeafletMap } from './make_map'
import axios from 'axios'
import DrawerDistricts from './../DrawerDistricts'
import DrawerWallet from './../DrawerWallet'
import DrawerFilter from './../DrawerFilter'
import api from "./../../plugins/axios";
import {useSelector, useDispatch} from 'react-redux'

import 'leaflet/dist/leaflet.css'
import "./styles.scss"


export default function MapChart() {

  const [map, setMap] = React.useState()
  const filters = useSelector(state => state.mapFilters)
  const dispatch = useDispatch()

  const callWalletHouses = () => {
    api.get(`http://127.0.0.1:5000/wallet/get_houses`)
    .then(response => {
      dispatch({type: 'GET_HOUSES', payload: response.data["message"]});
    })
  }

  const callDistricts = () => {
    api.post(`http://127.0.0.1:5000/maps/get_district`, {
        "filters": filters
      })
      .then(response => {
        for (var key in response.data) {
          if (response.data.hasOwnProperty(key)) {  
            response.data[key].forEach(element => {
              map.makeIcon(
                element,
                [element["geometry"]["location"]["lat"], element["geometry"]["location"]["lng"]],
                key,
                dispatch
              )
            })
          }
        }
      })
  }

  const callHouses = () => {
    api.post(`http://127.0.0.1:5000/maps/get_houses`, {
       "filters": filters
     })
     .then(response => {
       if (response.data) {
         response.data.forEach(element => {
           map.makeIcon(
            element,
             [element["latitude"], element["longitude"]],
             "rent_house",
             dispatch
           )
         })
       }
     })
 }

  React.useEffect(() => {
    if (filters.rent_houses) {
      callHouses()
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
    callWalletHouses()
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
        <DrawerWallet/>
      </div>
    </>
  );
}




