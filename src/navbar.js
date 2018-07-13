import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

class Navbar extends Component {
render(){
        return(
            <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton color="inherit" aria-label="Menu" onClick={()=>this.props.toggleMenu()}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="title" color="inherit">
                    SquaresTest
                    </Typography>
                </Toolbar>
            </AppBar>
            </div>
        );
        }
}

export default Navbar;
