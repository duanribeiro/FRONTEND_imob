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
    label: "R$0",
  },
  {
    value: 2_500_000,
    label: "R$2.5 milhões",
  },
  {
    value: 5_000_000,
    label: "R$5 milhões",
  },
];

export const SliderSellPrices: React.FC = () => {
  const { state, dispatch } = useFiltersContext();
  const [sliderState, setSliderState] = useState<number[]>([0, 2_500_000]);

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
    if (Array.isArray(newValue) && state.checked[2]) {
      dispatch({ type: "CHANGE_SLIDER_SELL_PRICES", payload: newValue });
    }
  };

  return (
    <Box>
      <Typography id="input-slider" gutterBottom>
        Preço de Venda
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
        max={5_000_000}
      />
    </Box>
  );
};
