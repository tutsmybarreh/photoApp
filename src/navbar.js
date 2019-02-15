import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';

function Navbar(props){
    let color = '#3366ff';
    return(
        <div>
            <AppBar position={props.fixedNav ? 'fixed' : 'static'}>
                <Toolbar className='navbarColor'>
                    {props.isAuth ? (
                    <>
                    <IconButton style={{color: color}} color="default" aria-label="Menu" onClick={()=>props.toggleMenu()}>
                        <MenuIcon />
                    </IconButton>
                    <IconButton style={{color: color, marginLeft:'auto'}} onClick={()=>props.clearView()}>
                        <Icon>home</Icon>
                    </IconButton>
                    <IconButton style={{color: color}} onClick={()=>props.endSession()}>
                        <Icon>highlight_off</Icon>
                    </IconButton>
                    </>
                    ) : (
                    <IconButton style={{color: color, marginLeft:'auto'}} onClick={()=>props.toggleEditor()}>
                        <Icon>settings</Icon>
                    </IconButton>
                    )
                    }
                    { props.firebaseUser && props.isAuth ? (
                    <>
                    <Tooltip title={props.firebaseUser.email} placement="bottom">
                        <Avatar style={{color: color}} alt='test'>
                            {avatarLetter(props.firebaseUser.email)}
                        </Avatar>
                    </Tooltip>
                    <IconButton style={{color: color}} onClick={()=>props.logoutAdmin()}>
                        <Icon>exit_to_app</Icon>
                    </IconButton>
                    </>
                    ):null
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}

function avatarLetter(username){
    return username.charAt(0).toUpperCase();
}

export default Navbar;
