import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';

import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '../Menu'
import logo from '../../assets/Logo football.png'
import { useState } from 'react';

import Shortmenu from "../Shortmenu.jsx";


const drawerWidth = 240;
const shortDrawerWidth=80

export default function Navbar({content}) {
  const [isBigMenu,setIsBigMenu] = useState(false)
  const changemenu=()=>{
    setIsBigMenu(!isBigMenu)
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton sx={{ma:"25px", color: 'white',mr:2}} onClick={changemenu} edge="start"  >
            {isBigMenu ? <MenuOpenIcon/>: <MenuIcon />}

          </IconButton >
         <img  width="10%" src={logo}/>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: isBigMenu ? drawerWidth:shortDrawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: isBigMenu ? drawerWidth:shortDrawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        {isBigMenu ? <Menu/>: <Shortmenu/>}
        
        {/* <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box> */}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {
            content
        }
        
      </Box>
    </Box>
  );
}
