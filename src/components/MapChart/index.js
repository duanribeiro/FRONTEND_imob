import React from "react";
import { LeafletMap } from './make_map'
import axios from 'axios'
import DrawerDistricts from './../DrawerDistricts'
import DrawerWallet from './../DrawerWallet'
import DrawerPlaces from './../DrawerPlaces'
import api from "./../../plugins/axios";
import DrawerFilters from './../DrawerFilters'

import {useSelector, useDispatch} from 'react-redux'
import 'leaflet/dist/leaflet.css'
import "./styles.scss"


export default function MapChart() {

  const [map, setMap] = React.useState()
  const places = useSelector(state => state.places)
  const filters = useSelector(state => state.filters)

  const dispatch = useDispatch()

  const callWalletHouses = () => {
    api.get(`https://01ldy5zq44.execute-api.us-east-1.amazonaws.com/dev/wallet/get_houses`)
    .then(response => {
      dispatch({type: 'GET_HOUSES', payload: response.data["message"]});
    })
  }

  const callDistricts = () => {
    api.post(`https://01ldy5zq44.execute-api.us-east-1.amazonaws.com/dev/maps/get_district`, {
        "places": places,
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
    api.post(`https://01ldy5zq44.execute-api.us-east-1.amazonaws.com/dev/maps/get_houses`, {
       "places": places,
       "filters": filters,
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
    // if (places.rent_houses) {
    //   callHouses()
    // }
    callHouses()
    callDistricts()

    if (map){
      map.clearMap()
      map.makePolygon(places.active_districts)
    }
  }, [places])



  React.useEffect(() => {
    let map = new LeafletMap()
    setMap(map)
    map.clearMap()
    map.makePolygon(places.active_districts)
    callWalletHouses()
    dispatch({type: 'SET_MAP', payload: map})
  }, [])

  return (
    <>
      <div 
        style={{height: window.innerHeight * 0.95}}
        className="map"
        id="map"
      />

      <div id="places_button">
        <DrawerPlaces/>
      </div>
      <div id="districts_button">
        <DrawerDistricts/>
      </div>
      <div id="wallet_button">
        <DrawerWallet/>
      </div>
      <div id="filters_button">
        <DrawerFilters/>
      </div>
    </>
  );
}




