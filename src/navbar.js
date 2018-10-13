import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

class Navbar extends Component {
    render(){
        return(
            <div>
                <AppBar position={this.props.fixedNav ? 'fixed' : 'static'}>
                    <Toolbar className='navbarColor'>
                        <IconButton style={{backgroundColor: '#fafafa', color: '#000000'}} color="default" aria-label="Menu" onClick={()=>this.props.toggleMenu()}>
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default Navbar;
