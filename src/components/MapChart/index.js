import React from "react";
import { LeafletMap } from './make_map'
import axios from 'axios'
import Sidebar from './../../layouts/components/Sidebar'
import {useSelector} from 'react-redux'
import DrawerDistricts from './../DrawerDistricts'
import 'leaflet/dist/leaflet.css'
import "./styles.scss"


export default function MapChart() {
  const [map, setMap] = React.useState()
  const [rentHouses, setRentHouses] = React.useState()
  const filters = useSelector(state => state)
  const [filterResults, setFilterResults] = React.useState()


  const callFilterAPI = async () => {
    await axios.post(`http://127.0.0.1:5000/maps/get_district`, {
        "filters": filters
      })
      .then(response => {
        setFilterResults(response.data)
        for (var key in response.data) {
          if (response.data.hasOwnProperty(key)) {  
            response.data[key].forEach(element => {
              map.makeIcon(
                element["name"],
                [element["geometry"]["location"]["lat"], element["geometry"]["location"]["lng"]],
                key
              )
            })
          }
        }
      })
  }

  const callRentHouse = async () => {
    await axios.post(`http://127.0.0.1:5000/maps/get_rent_houses`, {
        "filters": filters
      })
      .then(response => {
        setRentHouses(response.data)
      })
  }

  React.useEffect(() => {
    if (map) {
      map.clearMap()
      map.makePolygon(filters.active_districts)
    }
    callFilterAPI()

    if (filters.rent_houses) {
      callRentHouse()
    }
    if (rentHouses != null) {
      rentHouses.forEach(element => {
        map.makeIcon(
          `R$ ${element["rent"]}/mês`,
          [element["latitude"], element["longitude"]],
          "rent_house"
        )
      })
    }
  }, [filters, rentHouses])

  

  React.useEffect(() => {
    setMap(new LeafletMap([-23.564942, -46.625], 12))
    setRentHouses([])
  }, [])

  return (
    <>
      <div 
        style={{height: window.innerHeight * 0.95}}
        className="map"
        id="map"
      />

      <div id="filters_button">
        <Sidebar/>
      </div>
      <div id="districts_button">
        <DrawerDistricts/>
      </div>
      
    </>
  );
}




