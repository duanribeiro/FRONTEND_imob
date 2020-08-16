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
  const [filterResults, setFilterResults] = React.useState()
  const filters = useSelector(state => state)

  const callAPI = () => {
    // axios.post(`http://127.0.0.1:5000/api/v1/auth/get_district`, {
    //     "filters": filters
    //   })
    //   .then(response => {
    //     setFilterResults(response.data)
    //   })
  }

  const callRentHouse = () => {
    axios.post(`http://127.0.0.1:5000/api/v1/auth/get_rent_houses`, {
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

    if (rentHouses != null) {
      rentHouses.forEach(element => {
        map.makeIcon(
          `R$ ${element["rent"]}/mês`,
          [element["latitude"], element["longitude"]],
          "rent_house"
        )
      })
    }

    if (filterResults != null) {
      for (var key in filterResults) {
        if (filterResults.hasOwnProperty(key)) {  
          filterResults[key].forEach(element => {
            map.makeIcon(
              element["name"],
              [element["geometry"]["location"]["lat"], element["geometry"]["location"]["lng"]],
              key
            )
          })
        }
      }
    }
  }, [filters, rentHouses])

  

  React.useEffect(() => {
    setMap(new LeafletMap([-23.564942, -46.647168], 12))
    callRentHouse()
    callAPI()
  }, [])

  React.useEffect(() => {
    callAPI()
    callRentHouse()
  }, [filters])


  return (
    <>
      <div className="map" id="map"/>

      <div id="filters_button">
        <Sidebar/>
      </div>
      <div id="filters_button">
        <Sidebar/>
      </div>
      <div id="filters_button">
        <Sidebar/>
      </div>


      <div id="districts_button">
        <DrawerDistricts/>
      </div>
      
    </>
  );
}




