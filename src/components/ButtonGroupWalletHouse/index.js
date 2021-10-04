import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import HomeIcon from '@material-ui/icons/Home';
import api from "./../../plugins/axios";
import {useSelector, useDispatch} from 'react-redux'
import "./styles.scss";

export default function ButtonGroupWalletHouse(item) {
  const dispatch = useDispatch()
  const map = useSelector(state => state.map)

  const goHouse = (item) => {
    map.flyTo(item['item']['latitude'], item['item']['longitude'])  
  }

  const removeHouse = (item) => {
    api.post(`https://01ldy5zq44.execute-api.us-east-1.amazonaws.com/dev/wallet/remove_house`, {
      "house_id": item['item']['_id']
    })
    .then(response => {
      dispatch({type: 'REMOVE_HOUSE', payload: item['item']})
    })
    .catch(error => {
      console.log(error)
    })
  }


  return (

      <ButtonGroup
        orientation="vertical"
        color="inherit"
        aria-label="outlined primary button group"
      >
        <IconButton>
          <HomeIcon onClick={() => goHouse(item)} />
        </IconButton>
        <IconButton aria-label="delete" onClick={() => removeHouse(item)}>
          <DeleteForeverIcon />
        </IconButton>
      </ButtonGroup>
  );
}
