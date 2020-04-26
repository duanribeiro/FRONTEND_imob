import React, { useState, useEffect } from "react";
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import "./styles.scss"
import styled from 'styled-components'

const Wrapper = styled.div`
  width: ${props => props.width}
  height: ${props => props.height}
`


export default function MapChart() {
  useEffect(() => {
    let map = L.map('map', {
      zoom: 18,
      zoomControl: false
    })

    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
        maxZoom: 20,
        maxNativeZoom: 17
    }).addTo(map)

    map.panTo(new L.LatLng(-23.564902, -46.647170))

  }, [])

    


  return (
    <Wrapper width="1200px" height="450px" id="map"/>
      
  );
}




