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
    value: 0,
    label: "0m²",
  },
  {
    value: 1000,
    label: "1000m²",
  },
];

export const SliderArea: React.FC = () => {
  const { state, dispatch } = useFiltersContext();
  const [sliderState, setSliderState] = useState<number[]>(state.slider_area);

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
    if (Array.isArray(newValue) && state.actives["slider_area"]) {
      dispatch({ type: "CHANGE_SLIDER_AREA", payload: newValue });
      setSliderState(newValue);
    }
  };

  return (
    <Box>
      <Typography id="input-slider" gutterBottom>
        Área
      </Typography>
      <Slider
        sx={SliderSx}
        value={sliderState}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
        valueLabelDisplay="auto"
        disableSwap
        marks={marks}
        min={0}
        max={1000}
      />
    </Box>
  );
};
