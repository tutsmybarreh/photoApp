import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

class FullscreenView extends Component{
    render(){
        return(
            <div>
                <Dialog
                    fullScreen
                    open={this.props.fullscreenView}
                    >
                    <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                        open={this.props.fullscreenTextOn}
                        onClose={this.props.toggleText()}
                        message={<span id="message-id">{this.props.fullscreenText}</span>}
                        action={[
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                onClick={this.props.toggleText()}
                                >
                                <CloseIcon />
                            </IconButton>,
                        ]}
                        />
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
