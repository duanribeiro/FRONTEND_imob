import L from 'leaflet'
import { 
  bela_vista_polygon, 
  consolacao_polygon, 
  liberdade_polygon, 
  santa_cecilia_polygon,
  republica_polygon,
  cambuci_polygon,
  bom_retiro_polygon,
  se_polygon,
  barra_funda_polygon,
  bras_polygon,
  pari_polygon
} from './../../maps/sao_paulo_districts'


export class LeafletMap {

    constructor(initial_position, initial_zoom) {

      this.initial_position = initial_position
      this.initial_zoom = initial_zoom
      this.map = L.map('map', {attributionControl: false}).setView(initial_position, initial_zoom)

      L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png').addTo(this.map)
      this.layer_group = L.layerGroup().addTo(this.map)
      

      // RASCUNHO DO CÍRCULO
      // var circle = L.circle([-23.5275, -46.612333], {
      //   color: 'red',
      //   fillColor: '#f03',
      //   fillOpacity: 0.5,
      //   radius: 820
      // }).addTo(this.map);
    }

    makePolygon(active_districts) {
      active_districts.forEach(district => {
        console.log(district)
        if (district == 'bela vista') {
          L.polygon(bela_vista_polygon).addTo(this.layer_group)
        }
        if (district == 'consolação') {
          L.polygon(consolacao_polygon).addTo(this.layer_group)
        }
        if (district == 'liberdade') {
          L.polygon(liberdade_polygon).addTo(this.layer_group)
        }
        if (district == 'santa cecília') {
          L.polygon(santa_cecilia_polygon).addTo(this.layer_group)
        }
        if (district == 'república') {
          L.polygon(republica_polygon).addTo(this.layer_group)
        }
        if (district == 'cambuci') {
          L.polygon(cambuci_polygon).addTo(this.layer_group)
        }
        if (district == 'bom retiro') {
          L.polygon(bom_retiro_polygon).addTo(this.layer_group)
        }
        if (district == 'sé') {
          L.polygon(se_polygon).addTo(this.layer_group)
        }
        if (district == 'barra funda') {
          L.polygon(barra_funda_polygon).addTo(this.layer_group)
        }
        if (district == 'brás') {
          L.polygon(bras_polygon).addTo(this.layer_group)
        }
        if (district == 'pari') {
          L.polygon(pari_polygon).addTo(this.layer_group)
        }
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
