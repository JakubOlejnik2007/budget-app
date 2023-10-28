import React from "react";
import { Link, Route, Routes, Navigate } from "react-router-dom";
import { AuthData } from "../../auth/AuthWrapper";
import { nav } from "./navigation";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Hidden,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import urls from "../../utils/urls";
import icon from "../../assets/ikona_192.png";

export const RenderRoutes = () => {
  const flattenNav = (nav) => {
    let flattenedNav = [];

    const flatten = (navItem) => {
      if (!("navs" in navItem)) flattenedNav.push(navItem);
      else {
        navItem.navs.forEach(flatten);
      }
    };

    nav.forEach(flatten);

    return flattenedNav;
  };

  const { user } = AuthData();

  return (
    <Routes>
      {flattenNav(nav).map((r) => {
        if ("path" in r) {
          if ((r.isPrivate && user.AuthToken) || !r.isPrivate)
            return <Route key={r.id} path={r.path} element={r.element} />;
          else return null;
        } else return null;
      })}

      <Route
        key={0}
        path="*"
        element={<Navigate to={urls.client.homepage} replace />}
      />
    </Routes>
  );
};

export const RenderMenu = () => {
  const [isDrawerOpen, setDrawerOpen] = React.useState(false); // Stan do zarządzania otwarciem/ukryciem menu

  // Funkcja do otwierania/ukrywania menu
  const toggleDrawer = (open) => (event) => {
    setDrawerOpen(open);
  };

  const { user, logout } = AuthData();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenuItem = (r) => {
    if ((!r.isPrivate || user.AuthToken) && r.isMenu) {
      return (
        <Button
          sx={{
            display: "box",
          }}
          key={r.id}
          component={Link}
          to={r.path}
          color="inherit"
        >
          {r.name}
        </Button>
      );
    } else return null;
  };

  const renderDropdownMenuItem = (r) => {
    if ((!r.isPrivate || user.AuthToken) && r.isMenu) {
      return (
        <MenuItem
          key={r.id}
          component={Link}
          to={r.path}
          onClick={handleMenuClose}
        >
          {r.name}
        </MenuItem>
      );
    } else return null;
  };

  const renderMenuItems = (navs) => {
    return navs.map((r) => {
      if ("path" in r) return renderMenuItem(r);
      else if ("navs" in r) {
        if ((!r.isPrivate || user.AuthToken) && r.isMenu) {
          return (
            <div key={-2}>
              <Button
                color="inherit"
                onClick={handleMenuOpen}
                aria-controls="menu-appbar"
                aria-haspopup="true"
              >
                {r.name}
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {r.navs.map((item) => {
                  return renderDropdownMenuItem(item);
                })}
              </Menu>
            </div>
          );
        } else return null;
      } else return null;
    });
  };

  return (
    <AppBar position="static" color="warning">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">
          <Link to="/">
            <img src={icon} alt="Logo" height={50} />
          </Link>
        </Typography>
        <Hidden smUp>
          {/* Przycisk hamburgera na ekranach o szerokości poniżej 960px (md) */}
          <IconButton color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Hidden smDown>
          {/* Menu na ekranach o szerokości powyżej 600px (sm) */}
          {renderMenuItems(nav)}
        </Hidden>
        <Box sx={{ marginLeft: "auto" }}>
          {user.AuthToken ? (
            <Button color="inherit" onClick={logout}>
              Wyloguj
            </Button>
          ) : (
            <Button
              component={Link}
              to={urls.client.login}
              color="inherit"
              sx={{
                textAlign: "right",
              }}
            >
              Zaloguj / Zarejestruj
            </Button>
          )}
        </Box>
      </Toolbar>
      {/* Rozwijane menu */}
      <Drawer open={isDrawerOpen} onClose={toggleDrawer(false)}>
        {renderMenuItems(nav)}
      </Drawer>
    </AppBar>
  );
};
