import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Icon from '@material-ui/core/Icon';

function Navbar(props){
    let color = '#ffffff';
    if (props.isAuth)(
        color = '#3366ff'
    )
    return(
        <div>
            <AppBar position={props.fixedNav ? 'fixed' : 'static'}>
                <Toolbar className='navbarColor'>
                    <IconButton style={{color: '#3366ff'}} color="default" aria-label="Menu" onClick={()=>props.toggleMenu()}>
                        <MenuIcon />
                    </IconButton>
                    <IconButton style={{color: color, marginLeft:'auto'}} onClick={()=>props.clearView()}>
                        <Icon>home</Icon>
                    </IconButton>
                    <IconButton style={{color: color}} onClick={()=>props.endSession()}>
                        <Icon>highlight_off</Icon>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Navbar;
