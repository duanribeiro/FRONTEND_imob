"use client";
import * as React from "react";
import { Box, Slider, SxProps, Typography } from "@mui/material";
import { useFiltersContext } from "@/contexts";
import { useState } from "react";

const SliderSx: SxProps = {
  width: 240,
  color: "#393E46",
};

const marks = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 10,
    label: "10",
  },
];

export const SliderBathrooms: React.FC = () => {
  const { state, dispatch } = useFiltersContext();
  const [sliderState, setSliderState] = useState<number[]>(
    state.slider_bathrooms
  );

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (Array.isArray(newValue)) {
      setSliderState(newValue);
    }
  };

  const handleChangeCommitted = (
    event: React.SyntheticEvent | Event,
    newValue: number | number[]
  ) => {
    if (Array.isArray(newValue) && state.actives["slider_bathrooms"]) {
      dispatch({ type: "CHANGE_SLIDER_BATHROOMS", payload: newValue });
      setSliderState(newValue);
    }
  };

  return (
    <Box>
      <Typography id="input-slider" gutterBottom>
        Banheiros
      </Typography>
      <Slider
        sx={SliderSx}
        value={sliderState}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
        valueLabelDisplay="auto"
        disableSwap
        marks={marks}
        min={1}
        max={10}
      />
    </Box>
  );
};
