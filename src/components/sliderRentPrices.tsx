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
    value: 1000,
    label: "R$1 mil",
  },
  {
    value: 30000,
    label: "R$30 mil",
  },
];

export const SliderRentPrices: React.FC = () => {
  const { state, dispatch } = useFiltersContext();
  const [sliderState, setSliderState] = useState<number[]>(
    state.slider_rent_prices
  );

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    setSliderState(newValue);
  };

  const handleChangeCommitted = (
    event: React.SyntheticEvent | Event,
    newValue: number | number[]
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (state.actives["slider_rent_prices"]) {
      dispatch({ type: "CHANGE_SLIDER_RENT_PRICES", payload: newValue });
      setSliderState(newValue);
    }
  };

  return (
    <Box>
      <Typography id="input-slider" gutterBottom>
        Preço do Aluguel
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
        max={30000}
      />
    </Box>
  );
};
