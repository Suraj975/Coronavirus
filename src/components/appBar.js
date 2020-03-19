import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import '../App.css';


export default function TitleBar() {

    return (
        <div >
            <AppBar position="static" style={{ backgroundColor: "#303238" }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" >
                    Coronavirus 
          </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}