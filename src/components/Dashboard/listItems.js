import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ForumIcon from "@mui/icons-material/Forum";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
import styledd from "styled-components";

const LinkStyled = styledd(Link)`
  color: black;
  text-decoration: none;
`;

export const mainListItems = (
  <React.Fragment>
    <LinkStyled to="/">
      <ListItemButton>
        <ListItemIcon>
          <ForumIcon />
        </ListItemIcon>
        <ListItemText primary="Chats" />
      </ListItemButton>
    </LinkStyled>
    <LinkStyled to="/">
      <ListItemButton>
        <ListItemIcon>
          <RecentActorsIcon />
        </ListItemIcon>
        <ListItemText primary="Contacts" />
      </ListItemButton>
    </LinkStyled>
    <ListItemButton>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItemButton>
  </React.Fragment>
);
