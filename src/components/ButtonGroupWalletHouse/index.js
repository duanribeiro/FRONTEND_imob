import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import HomeIcon from '@material-ui/icons/Home';


export default function ButtonGroupWalletHouse() {

  return (
      <ButtonGroup
        orientation="vertical"
        color="inherit"
        aria-label="vertical outlined primary button group"
      >
        <IconButton>
          <HomeIcon />
        </IconButton>
        <IconButton aria-label="delete">
          <DeleteForeverIcon />
        </IconButton>
      </ButtonGroup>
  );
}
