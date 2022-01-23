import * as React from 'react';
import Box from '@material-ui/core/Box';
import {useSelector, useDispatch} from 'react-redux'
import TextField from '@material-ui/core/TextField';
import "./styles.scss";


export default function TextfieldFilterDates() {
  const dispatch = useDispatch()
  const filters = useSelector(state => state.filters)

  const handleChange = name => event => {
    if (event.target.id == "start_date") {
      dispatch({"type": "CHANGE_START_DATE", "payload": event.target.value})
    } else {
      dispatch({"type": "CHANGE_END_DATE", "payload": event.target.value})
    }
  }

  return (
    <Box sx={{ width: 330 }} style={{"paddingLeft": 0}}>
      <TextField
        size="small"
        style={{"marginRight": "10px"}}
        className="textField"
        id="start_date"
        label="Data Inicial"
        type="date"
        value={filters.start_date}
        onChange={handleChange()}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        size="small"
        className="textField"
        id="end_date"
        label="Data Final"
        type="date"
        value={filters.end_date}
        onChange={handleChange()}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Box>
  );
}