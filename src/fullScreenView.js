import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

class FullscreenView extends Component{
    render(){
        return(
            <div>
                <Dialog
                    fullScreen
                    open={this.props.fullscreenView}
                    >
                    <AppBar position="fixed">
                        <Toolbar className='navbarColor'>
                            <Typography>
                                {this.props.fullscreenText}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <div className='photoCardFull'>
                        <img src={this.props.fullscreenImage} className='pictureFullScreen' alt=''/>
                    </div>
                    <Button variant='fab' style={{position:'fixed',backgroundColor: '#ffffff', color: '#3366ff',bottom:10,right:10}} className='exitButton' onClick={()=>this.props.toggleFullScreen()}>
                        <Icon>close</Icon>
                    </Button>
                </Dialog>
            </div>
        );
    }
}

export default FullscreenView;
