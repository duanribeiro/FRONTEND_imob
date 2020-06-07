import L from 'leaflet'
import {dict_polygon_names, dict_polygon_colors} from './polygon_dicts'


export class LeafletMap {

    constructor(initial_position, initial_zoom) {

      this.initial_position = initial_position
      this.initial_zoom = initial_zoom
      this.map = L.map('map', {attributionControl: false}).setView(initial_position, initial_zoom)

      L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png').addTo(this.map)
      this.layer_group = L.layerGroup().addTo(this.map)
      

      // RASCUNHO DO CÍRCULO
      L.circle([-23.673, -46.7188], {
        radius: 1800,
        color: 'green',
        fillColor: 'light green',
        fillOpacity: 0.5,
      }).addTo(this.map)
    }

    makePolygon(active_districts) {
      active_districts.forEach(district => {
        L.polygon(dict_polygon_names[district], {'color': dict_polygon_colors[district]}).addTo(this.layer_group)
      })
    }
    
    makeIcon(name, icon_position, icon) {
      let LeafIcon = L.Icon.extend({
        options: {
          iconSize: [30, 33],
          // iconAnchor: [1, 33]
        }
      })
    
      let icon_url = ''
      if (icon == 'school'){
        icon_url = 'https://icons-maps-google.s3.amazonaws.com/university.png'
      } else if (icon == 'subway_station') {
        icon_url = 'https://icons-maps-google.s3.amazonaws.com/underground.png'
      } else if (icon == 'shopping_mall') {
        icon_url = 'https://icons-maps-google.s3.amazonaws.com/mall.png'
      } else if (icon == 'bank') {
        icon_url = 'https://icons-maps-google.s3.amazonaws.com/bank_euro.png'
      } else if (icon == 'gas_station') {
        icon_url = 'https://icons-maps-google.s3.amazonaws.com/fillingstation.png'
      } else if (icon == 'gym') {
        icon_url = 'https://icons-maps-google.s3.amazonaws.com/weights.png'
      }

      else if (icon == 'rent_house') {
        icon_url = 'https://icons-maps-google.s3.amazonaws.com/home-2.png'
      }

      let myIcon = new LeafIcon({iconUrl: icon_url})
      L.marker(icon_position,  {icon: myIcon}).bindPopup(name).addTo(this.layer_group)
    }

    clearMap() {
      this.layer_group.clearLayers();
    }
  }
