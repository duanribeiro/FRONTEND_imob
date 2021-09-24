import * as React from 'react';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

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
];

function valuetext(value) {
  return `${value}°C`;
}

const minDistance = 1;

export default function SliderDates() {

  const [value2, setValue2] = React.useState([20, 37]);

  const handleChange2 = (event, newValue, activeThumb) => {
    console.log(activeThumb)
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 6 - minDistance);
        setValue2([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue2([clamped - minDistance, clamped]);
      }
    } else {
      setValue2(newValue);
    }
  };
  return (
    <Box sx={{ width: 300 }} style={{"paddingLeft": 0}}>
      <Typography id="input-slider" gutterBottom>
        Período
      </Typography>
      <Slider
        style={{"width": 200}}
        getAriaLabel={() => "Minimum distance"}
        value={value2}
        onChange={handleChange2}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
        min={4}
        max={9}
        marks={marks}
        step={1} 
      />
    </Box>
  );
}