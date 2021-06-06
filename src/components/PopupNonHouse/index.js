import React from 'react'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import "./styles.scss"


export default function PopupNonHouse(item) {
  item = item["item"]
  
  return (
    <Card elevation={0}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {item["name"]}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <span style={{fontWeight: 'bold'}}>Avaliação:</span> {item["rating"]}<br/>
          <span style={{fontWeight: 'bold'}}>Setores:</span>  {item["types"].join(", ")} 
        </Typography>
      </CardContent>
      <Divider />
    </Card>
  )
}