import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

class FullscreenView extends Component{
    render(){
        return(
            <div>
            <Dialog
            open={this.props.fullscreenView}
            >
            <DialogContent>
            <div className='picturFrame'>
            abc
            </div>
            </DialogContent>
            </Dialog>
            </div>
        );
    }
}

export default FullscreenView;
