import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Icon from '@material-ui/core/Icon';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Fab from '@material-ui/core/Fab';

function FullscreenView(props){
    const [showText, toggleText] = useState(true);
    return(
        <div>
            <Dialog
                fullScreen
                open={props.fullscreenView}
                >
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                    open={showText}
                    message={<span id="message-id">{props.fullscreenText}</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={()=>toggleText(!showText)}
                            >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                    />
                <div className='photoCardFull'
                    onClick={()=>toggleText(!showText)}
                    >
                    <img src={props.fullscreenImage} className='pictureFullScreen' alt=''/>
                </div>
                <Fab variant='round' style={{position:'fixed',backgroundColor: '#ffffff', color: '#3366ff',bottom:10,right:10}} className='exitButton' onClick={()=>props.toggleFullScreen()}>
                    <Icon>close</Icon>
                </Fab>
            </Dialog>
        </div>
    );
}


export default FullscreenView;
