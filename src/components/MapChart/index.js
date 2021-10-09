import React from "react";
import { LeafletMap } from './make_map'
import DrawerDistricts from './../DrawerDistricts'
import DrawerWallet from './../DrawerWallet'
import DrawerPlaces from './../DrawerPlaces'
import api from "./../../plugins/axios"
import {isAuthenticated} from "./../../plugins/auth"
import DrawerFilters from './../DrawerFilters'
import {useSelector, useDispatch} from 'react-redux'
import 'leaflet/dist/leaflet.css'
import "./styles.scss"
import CircularProgress from '@material-ui/core/CircularProgress';

export default function MapChart() {

  const [map, setMap] = React.useState()
  const places = useSelector(state => state.places)
  const filters = useSelector(state => state.filters)
  const loading = useSelector(state => state.loading)


  const dispatch = useDispatch()

  const callWalletHouses = () => {
    api.get(`${process.env.REACT_APP_BACKEND_API}/wallet/get_houses`)
    .then(response => {
      dispatch({type: 'GET_HOUSES', payload: response.data["message"]});
    })
  }

  const callDistricts = () => {
    api.post(`${process.env.REACT_APP_BACKEND_API}/maps/get_district`, {
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
    dispatch({type: 'SET_LOADING_ON'})
    api.post(`${process.env.REACT_APP_BACKEND_API}/maps/get_houses`, {
       "places": places,
       "filters": filters,
     })
     .then(response => {
       dispatch({type: 'SET_LOADING_OFF'})
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


  let wallet_button = null;
  if (isAuthenticated) {
    let wallet_button = <DrawerWallet/>;
  }

  let loading_button = null
  if (loading === true) {
    loading_button = <CircularProgress size="60px" style={{'color': 'white'}}/>
  } else {
    loading_button = null
  }

  return (
    <>
      <div 
        style={{height: window.innerHeight * 0.91}}
        className="map"
        id="map"
      />

      <div id="wallet_button">
        {wallet_button}
      </div>

      <div id="districts_button">
        <DrawerDistricts/>
      </div>
      <div id="places_button">
        <DrawerPlaces/>
      </div>
      <div id="filters_button">
        <DrawerFilters/>
      </div>

      <div id="loading">
        {loading_button}
      </div>
    </>
  );
}




