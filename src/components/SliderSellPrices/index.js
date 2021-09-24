import * as React from 'react';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

const marks = [
  {
    value: 1000000,
    label: 'R$1M',
  },
  {
    value: 10000000,
    label: 'R$10M',
  },

];


export default function SliderSellPrices() {

  const [value, setValue] = React.useState([1000000, 3000000]);

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    } else {
      setValue(newValue);
    }
  };

  return (
    <Box sx={{ width: 300 }} style={{"paddingLeft": 0}}>
      <Typography id="input-slider" gutterBottom>
        Preço de Venda
      </Typography>
      <Slider
        style={{"width": 200}}
        getAriaLabel={() => 'Minimum distance shift'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        disableSwap
        marks={marks}
        min={0}
        max={10000000}
      />
    </Box>
  );
}