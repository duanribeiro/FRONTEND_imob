import * as React from "react";
import { Box, SxProps, TextField } from "@mui/material";
import { useFiltersContext } from "@/contexts";

const startDateSx: SxProps = {
  width: 135,
  marginRight: 1,
};

const endDateSx: SxProps = {
  width: 135,
};

export const DatePickerFilters: React.FC = () => {
  const { state, dispatch } = useFiltersContext();

  const handleChange =
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      if (name === "start_date") {
        dispatch({ type: "CHANGE_START_DATE", payload: value });
      } else {
        dispatch({ type: "CHANGE_END_DATE", payload: value });
      }
    };

  return (
    <Box>
      <TextField
        sx={startDateSx}
        size="small"
        id="start_date"
        label="Data Inicial"
        type="date"
        value={state.start_date}
        onChange={handleChange("start_date")}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        sx={endDateSx}
        size="small"
        id="end_date"
        label="Data Final"
        type="date"
        value={state.end_date}
        onChange={handleChange("end_date")}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Box>
  );
};
