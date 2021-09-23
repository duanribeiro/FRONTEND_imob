import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import HomeIcon from '@material-ui/icons/Home';
import api from "./../../plugins/axios";
import {useSelector, useDispatch} from 'react-redux'


export default function ButtonGroupWalletHouse(item) {
  const dispatch = useDispatch()
  const removeHouse = (item) => {
    api.post(`http://localhost:5000/wallet/remove_house`, {
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
        aria-label="vertical outlined primary button group"
      >
        <IconButton>
          <HomeIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={() => removeHouse(item)}>
          <DeleteForeverIcon />
        </IconButton>
      </ButtonGroup>
  );
}
