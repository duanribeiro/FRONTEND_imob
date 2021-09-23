import React from 'react'
import ChartAverageArea from './../../components/ChartAverageArea'
import ChartAverageRent from './../../components/ChartAverageRent'
import ChartHouses from '../../components/ChartHouses'
import LineChartAvgRent from './../../components/LineChartAvgRent'
import ChartHousesStdDeviation from './../../components/ChartHousesStdDeviation'
import BarChartDistrictAvgPrice from '../../components/BarChartZoneAvgPrice'
import ScatterChartAvgPriceRent from '../../components/ScatterChartAvgPriceRent'
import GridCards from './../../components/GridCards'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import PopupHouse from "./../../components/PopupHouse"
import "./styles.scss"


export default function DemoView() {
 let item = {
  "area": 42,
  "bathroom": 1,
  "bedroom": 2,
  "code": 228399,
  "description": "Ótimo apartamento, bem arejado, ventilado,  aconchegante, ótima disposição, amplo e com excelente entrada de iluminação natural. Área social e intima revestidas em piso com cimento queimado, demais ambientes em piso cerâmica, todas as luminárias com lampadas de LED. Repleto de armários embutidos, Sala com sanca de gesso, banheiro com box de vidro e chuveiro. Possui vaga de garagem. Pronto para morar!!! Não perca essa oportunidade, venha visitar!!!",
  "district": "liberdade",
  "garage": 1,
  "latitude": -23.5592698,
  "longitude": -46.6237434,
  "real_estate": "lello imoveis",
  "rent": [1670, 1670],
  "street": "Rua Otto de Alencar",
  "url": "https://www.lelloimoveis.com.br/imovel/228399/apartamento-2-dorms-liberdade-sao_paulo-aluguel",
  "last_update": ['15-03', '15-04']
 }
  return (
    <div style={{"margin-left":"40%"}}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        <PopupHouse item={item}/>
      </Grid>
    </div>
  )
}
