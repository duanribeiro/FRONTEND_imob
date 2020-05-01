import React from "react";
import 'leaflet/dist/leaflet.css'
import "./styles.scss"
import { LeafletMap } from './make_map'
import axios from 'axios'


export default function MapChart() {
  const [map, setMap] = React.useState()
  const [results, setResults] = React.useState({
    "bank": [],
    "gas_station": [],
    "gym": [],
    "school": [],
    "shopping_mall": [],
    "subway_station": [],
  })


  const callAPI = () => {
    axios.get(`http://127.0.0.1:5000/api/v1/auth/get_district`)
      .then(response => {
        setResults(response.data)
      })
  }

  React.useEffect(() => {
    results["school"].forEach(element => {
      map.makeIcon([
        element["geometry"]["location"]["lat"],
        element["geometry"]["location"]["lng"]
        ],
        'red')
    })

    results["subway_station"].forEach(element => {
      map.makeIcon([
        element["geometry"]["location"]["lat"],
        element["geometry"]["location"]["lng"]
        ],
        'blue')
    })
  }, [results])

  React.useEffect(() => {
    setMap(new LeafletMap([-23.564942, -46.647168], 15))
    callAPI()
  }, [])

  return (
    <div className="map" id="map"/>
  );
}




