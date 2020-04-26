import React, { useState, useEffect } from "react";
import L, { icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import "./styles.scss"
import styled from 'styled-components'
import { bela_vista_polygon } from './../../maps/sao_paulo_districts'
import axios from 'axios'

const Wrapper = styled.div`
  width: ${props => props.width}
  height: ${props => props.height}
`

export default function MapChart() {
  const position_1 = new L.LatLng(-23.562, -46.6434)




  // useEffect(() => {
  //   axios.get(`http://127.0.0.1:5000/api/v1/auth/get_district`)
  //   .then(res => {
  //     const persons = res.data;
  //     this.setState({ persons });
  //   })
  // }, [])



  
  useEffect(() => {
    // Pré configurações
    let map = L.map('map', {
      zoom: 14,
      zoomControl: false
    })
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        maxNativeZoom: 17
    }).addTo(map)


    // Desenhando o bairro
    // L.polygon(bela_vista_polygon).addTo(map)
    var myIcon = L.icon({
      iconUrl: 'my-icon.png',
      iconSize: [38, 95],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
      shadowUrl: 'my-icon-shadow.png',
      shadowSize: [68, 95],
      shadowAnchor: [22, 94]
  });
    L.marker([-23.572216, -46.645222]).addTo(map)
    map.panTo(position_1)

  }, [])

  return (
    <Wrapper width="1200px" height="450px" id="map"/>
      
  );
}




