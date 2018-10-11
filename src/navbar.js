import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';

class Navbar extends Component {
    render(){
        return(
            <div>
                <AppBar position={this.props.fixedNav ? 'fixed' : 'static'}>
                    <Toolbar className='navbarColor'>
                        <IconButton style={{backgroundColor: '#fafafa', color: '#000000'}} color="default" aria-label="Menu" onClick={()=>this.props.toggleMenu()}>
                            <MenuIcon />
                        </IconButton>
                        <Avatar style={{marginLeft: 'auto', backgroundColor: '#ffcc33'}}>
                        <Typography variant="title" style={{color: '#3366ff'}} color="inherit">
                            ~
                        </Typography>
                        </Avatar>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default Navbar;
