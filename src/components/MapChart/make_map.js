import L from 'leaflet'
import { bela_vista_polygon } from './../../maps/sao_paulo_districts'

export class LeafletMap {

    constructor(initial_position, initial_zoom) {
      this.initial_position = initial_position
      this.initial_zoom = initial_zoom
      this.map = L.map('map', {attributionControl: false}).setView(initial_position, initial_zoom)


      L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png').addTo(this.map)
      L.polygon(bela_vista_polygon).addTo(this.map)
      this.layer_group = L.layerGroup().addTo(this.map);

    }
    
    makeIcon(icon_position, icon) {
      let LeafIcon = L.Icon.extend({
        options: {
          iconSize: [30, 30],
          iconAnchor: [10, 33]
        }
      })
    
      let icon_url = ''
      if (icon == 'red'){
        icon_url = 'http://icons.veryicon.com/128/System/Small%20%26%20Flat/map%20marker.png'
      } else if (icon == 'blue') {
        icon_url = 'https://image.flaticon.com/icons/svg/2642/2642502.svg'
      }

      let myIcon = new LeafIcon({iconUrl: icon_url})

      L.marker(icon_position,  {icon: myIcon}).bindPopup("Parque Fluvial Renato Poblete").addTo(this.layer_group)
    }

    clearMap() {
      this.layer_group.clearLayers();

    }
  }
