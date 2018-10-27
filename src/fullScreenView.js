import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Chip from '@material-ui/core/Chip';

class FullscreenView extends Component{
    render(){
        return(
            <div>
                <Dialog
                    fullScreen
                    open={this.props.fullscreenView}
                    >
                    {this.props.fullscreenTextOn ? (
                        <Chip style={{position:'fixed',backgroundColor: '#ffffff',top:10,left:10}}
                            label={this.props.fullscreenText}
                            onDelete={()=>this.props.toggleText()}
                            variant='outlined'
                            />
                    ):''}
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
