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
    value: 5_000_000,
    label: "R$5 milhões",
  },
];

const formatValueLabel = (value: number) => {
  if (value < 1_000) {
    return `R$${value}`;
  } else if (value < 100_000) {
    return `R$${(value / 1_000).toLocaleString("pt-BR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })} mil`;
  } else if (value < 1_000_000) {
    return `R$${(value / 1_000).toLocaleString("pt-BR", {})} mil`;
  } else if (value < 2_000_000) {
    return `R$${(value / 1_000_000).toLocaleString("pt-BR", {})} milhão`;
  } else {
    return `R$${(value / 1_000_000).toLocaleString("pt-BR", {})} milhões`;
  }
};

export const SliderSellPrices: React.FC = () => {
  const { state, dispatch } = useFiltersContext();
  const [sliderState, setSliderState] = useState<number[]>(
    state.slider_sell_prices
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
    if (Array.isArray(newValue) && state.actives["slider_sell_prices"]) {
      dispatch({ type: "CHANGE_SLIDER_SELL_PRICES", payload: newValue });
      setSliderState(newValue);
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
        valueLabelFormat={formatValueLabel}
        disableSwap
        marks={marks}
        min={0}
        max={5_000_000}
        step={100_000}
      />
    </Box>
  );
};
