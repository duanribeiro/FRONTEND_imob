import { useDistrictsContext } from "@/contexts";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Checkbox,
  Drawer,
  FormControlLabel,
  IconButton,
  List,
  ListItemIcon,
  ListSubheader,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import * as React from "react";

export function DrawerDistricts() {
  const { state, dispatch } = useDistrictsContext();
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      "type" in event && event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      setSearchTerm("")
      return;
    }
    setSearchTerm("")
    setDrawerOpen(open);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filterDistricts = (districts: string[]) => {
    return districts.filter((district) => district.toLowerCase().startsWith(searchTerm));
  };

  const make_districts_checkbox = (array_districts: string[]) =>
    filterDistricts(array_districts).map((district, idx) => (
      <React.Fragment key={`fragment_${idx}`}>
        <ListItemIcon key={`listicon_${idx}`}>
          <FormControlLabel
            key={`formcontrol_${idx}`}
            control={
              <Checkbox
                key={`checkbox_${idx}`}
                size="small"
                sx={{ margin: "0 0 0 20px", width: 10, height: 1 }}
                onClick={() => dispatch({ type: "ACTIVE_DISTRICT", district })}
                checked={state.actives.includes(district)}
              />
            }
            label={
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ paddingLeft: "10px" }}
              >
                {district}
              </Typography>
            }
          />
        </ListItemIcon>
        <br />
      </React.Fragment>
    ));

  const createDrawerContent = () => (
    <Box role="presentation" sx={{ width: "40vh", padding: "10px" }}>
      <IconButton aria-label="close" onClick={toggleDrawer(false)}>
        <CloseIcon />
      </IconButton>

      <Typography
        align="justify"
        variant="overline"
        gutterBottom
        component="div"
        sx={{ padding: "0px 20px 0px 20px" }}
      >
        NESTA ABA ESCOLHEMOS QUAIS BAIRROS DEVEM SER ATIVOS PARA AS BUSCAS.
      </Typography>
      
      <TextField
        fullWidth
        label="Filtrar bairros"
        variant="outlined"
        size="small"
        onChange={handleSearchChange}
        sx={{
          marginBottom: "10px",
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "black",
            },
            "&.Mui-focused": {
              color: "black",
            },
          },
          "& .MuiInputLabel-root": {
            color: "black !important",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "black !important",
          },
        }}
      />
      <List component="nav" subheader={<ListSubheader sx={{ fontWeight: 'bold' }}>Centro</ListSubheader>}>
        {make_districts_checkbox(state.center_districts)}
      </List>
      <List component="nav" subheader={<ListSubheader sx={{ fontWeight: 'bold' }}>Norte</ListSubheader>}>
        {make_districts_checkbox(state.north_districts)}
      </List>
      <List component="nav" subheader={<ListSubheader sx={{ fontWeight: 'bold' }}>Leste</ListSubheader>}>
        {make_districts_checkbox(state.east_districts)}
      </List>
      <List component="nav" subheader={<ListSubheader sx={{ fontWeight: 'bold' }}>Sudeste</ListSubheader>}>
        {make_districts_checkbox(state.southeast_districts)}
      </List>
      <List component="nav" subheader={<ListSubheader sx={{ fontWeight: 'bold' }}>Oeste</ListSubheader>}>
        {make_districts_checkbox(state.west_districts)}
      </List>
      <List component="nav" subheader={<ListSubheader sx={{ fontWeight: 'bold' }}>Sul</ListSubheader>}>
        {make_districts_checkbox(state.south_districts)}
      </List>
    </Box>
  );
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const buttonWidth = isMobile ? '106px' : '150px';

  return (
    <div>
      <Button
        sx={{
          color: "black",
          backgroundColor: "white",
          fontWeight: 500,
          width: buttonWidth,
        }}
        variant="contained"
        onClick={toggleDrawer(true)}
        color="inherit"
      >
        Bairros
      </Button>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        slotProps={{
          backdrop: {
            invisible: true,
          },
        }}
      >
        {createDrawerContent()}
      </Drawer>
    </div>
  );
}