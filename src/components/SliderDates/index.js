import * as React from 'react';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import {useSelector, useDispatch} from 'react-redux'

const marks = [
  {
    value: 4,
    label: 'Abr.',
  },
  {
    value: 5,
    label: 'Mai.',
  },
  {
    value: 6,
    label: 'Jun.',
  },
  {
    value: 7,
    label: 'Jul.',
  },
  {
    value: 8,
    label: 'Ago.',
  },
  {
    value: 9,
    label: 'Set.',
  },
  {
    value: 10,
    label: 'Out.',
  },
  {
    value: 11,
    label: 'Nov.',
  },
  // {
  //   value: 12,
  //   label: 'Dez.',
  // },
];

export default function SliderDates() {
  const dispatch = useDispatch()
  const filters = useSelector(state => state.filters)
  
  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return
    }
    dispatch({"type": "CHANGE_SLIDER_DATES", "payload": newValue})
  };

  return (
    <Box sx={{ width: 300 }} style={{"paddingLeft": 0}}>
      <Typography id="input-slider" gutterBottom>
        Período
      </Typography>
      <Slider
        style={{"width": 200}}
        value={filters.slider_dates}
        onChange={handleChange}
        valueLabelDisplay="auto"
        disableSwap
        min={4}
        max={11}
        marks={marks}
        step={1} 
      />
    </Box>
  );
}