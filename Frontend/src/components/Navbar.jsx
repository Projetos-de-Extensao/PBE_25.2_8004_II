import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ position = "fixed" }) {
  const { isLoggedIn, logout } = useAuth();

  return (
    <AppBar position={position} color="primary" elevation={3}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="home"
          sx={{ mr: 2 }}
          component={RouterLink}
          to="/"
        >
          <MonitorHeartIcon />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
          Monitoria App
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>

          {isLoggedIn ? (
            <Button
              variant="outlined"
              color="error"
              onClick={logout}
              sx={{
                fontWeight: 700,
                borderWidth: 2,
                ":hover": { borderWidth: 2 },
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              color="inherit"
              variant="outlined"
              component={RouterLink}
              to="/login"
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}