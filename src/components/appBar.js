import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import '../App.css';
import styled from "styled-components"

const PageLinks = styled.div`
display:flex;
flex-direction:row;
justify-content:flex-end;
color: white;
text-decoration:none;
color: inherit;
flex:1;
`

export default function TitleBar() {
    return (
        <div >
            <AppBar position="static" style={{ backgroundColor: "#303238" }}>
                <Toolbar>
                    <Typography variant="h6" >
                        Coronavirus
                   </Typography>
                    <PageLinks>
                        <Button align="left">
                            <Link style={{ textDecoration: "none", color: "white" }} to={'/'}>Dashboard</Link>
                        </Button>
                        <Button align="left">
                            <Link style={{ textDecoration: "none", color: "white" }} to={'/charts'}>Charts</Link>
                        </Button>
                    </PageLinks>
                </Toolbar>
            </AppBar>
        </div>
    );
}