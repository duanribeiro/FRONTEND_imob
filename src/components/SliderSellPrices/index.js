import * as React from 'react';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import {useSelector, useDispatch} from 'react-redux'

const marks = [
  {
    value: 1000000,
    label: 'R$1M',
  },
  {
    value: 5000000,
    label: 'R$5M',
  },

];


export default function SliderSellPrices() {
  const dispatch = useDispatch()
  const filters = useSelector(state => state.filters)

  const [value, setValue] = React.useState([1000, 5000]);

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return
    }
    dispatch({"type": "CHANGE_SLIDER_SELL_PRICES", "payload": newValue})
  };

  return (
    <Box sx={{ width: 330 }} style={{"paddingLeft": 0}}>
      <Typography id="input-slider" gutterBottom>
        Preço de Venda
      </Typography>
      <Slider
        style={{"width": 240}}
        value={filters.slider_sell_prices}
        onChange={handleChange}
        valueLabelDisplay="auto"
        disableSwap
        marks={marks}
        min={1000000}
        max={5000000}
      />
    </Box>
  );
}