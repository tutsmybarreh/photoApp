import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Icon from '@material-ui/core/Icon';

class Navbar extends Component {
    render(){
        let color = '#ffffff';
        if (this.props.isAuth())(
            color = '#3366ff'
        )
        return(
            <div>
                <AppBar position={this.props.fixedNav ? 'fixed' : 'static'}>
                    <Toolbar className='navbarColor'>
                        <IconButton style={{color: '#3366ff'}} color="default" aria-label="Menu" onClick={()=>this.props.toggleMenu()}>
                            <MenuIcon />
                        </IconButton>
                        <IconButton style={{color: color, marginLeft:'auto'}} onClick={()=>this.props.clearView()}>
                            <Icon>
                                home
                            </Icon>
                        </IconButton>
                        <IconButton style={{color: color}} onClick={()=>this.props.endSession()}>
                            <Icon>
                                highlight_off
                            </Icon>
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default Navbar;
