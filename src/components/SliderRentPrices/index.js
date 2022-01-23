import * as React from 'react';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import {useSelector, useDispatch} from 'react-redux'

const marks = [
  {
    value: 1000,
    label: 'R$1K',
  },
  {
    value: 30000,
    label: 'R$30K',
  },

];


export default function SliderRentPrices() {
  const dispatch = useDispatch()
  const filters = useSelector(state => state.filters)

  const [value, setValue] = React.useState([1000, 5000]);

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return
    }
    dispatch({"type": "CHANGE_SLIDER_RENT_PRICES", "payload": newValue})
  };

  return (
    <Box sx={{ width: 330 }} style={{"paddingLeft": 0}}>
      <Typography id="input-slider" gutterBottom>
        Preço do Aluguel
      </Typography>
      <Slider
        style={{"width": 240}}
        value={filters.slider_rent_prices}
        onChange={handleChange}
        valueLabelDisplay="auto"
        disableSwap
        marks={marks}
        min={0}
        max={30000}
      />
    </Box>
  );
}