import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import DrawerComponent from "./DrawerComponent";
import Button from '@mui/material/Button';

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(5),
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(20),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
}));

function Header() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          Welcome
        </Typography>
        {isMobile ? (
          <DrawerComponent />
        ) : (
          <div className={classes.navlinks}>
            <Link to="/ownerHome" className={classes.link}>
              Home
            </Link>
            <Link to="/addAgent" className={classes.link}>
              Add Agent
            </Link>
            <Link to="/addItem" className={classes.link}>
              Add Item
            </Link>
            <Link to="/updateRestaraunt" className={classes.link}>
              Update Restaurants
            </Link>
            <Link to="/logout" className={classes.link}>
              Logout
            </Link>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default Header;