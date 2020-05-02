import React from "react";
import 'leaflet/dist/leaflet.css'
import "./styles.scss"
import { LeafletMap } from './make_map'
import axios from 'axios'
import Sidebar from './../../layouts/components/Sidebar'
import {useSelector, useDispatch} from 'react-redux'


export default function MapChart() {
  const [map, setMap] = React.useState()
  const [results, setResults] = React.useState()

  const filters = useSelector(state => state)

  const callAPI = () => {

    axios.post(`http://127.0.0.1:5000/api/v1/auth/get_district`, {
        "district_name": filters.active_district,
        "filters": filters
      })
      .then(response => {
        setResults(response.data)
      })
  }

  React.useEffect(() => {
    if (map) {map.clearMap()}

    if (results != null) {
      for (var key in results) {
        if (results.hasOwnProperty(key)) {  
          results[key].forEach(element => {
            map.makeIcon([
              element["geometry"]["location"]["lat"],
              element["geometry"]["location"]["lng"]
              ],
              key)
          })
        }
    }
  
  }
  }, [results])

  React.useEffect(() => {
    setMap(new LeafletMap([-23.564942, -46.647168], 15))
    
    callAPI()
  }, [])

  React.useEffect(() => {
    callAPI()
  }, [filters])

  return (
    <>
      <div className="map" id="map"/>

      <div id="refreshButton">
        <Sidebar/>
      </div>
    </>
  );
}




