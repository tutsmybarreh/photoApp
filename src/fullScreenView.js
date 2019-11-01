import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';

let color = '#3366ff';

function FullscreenView(props){
    const [showText, toggleText] = useState(true);
    const [editText, toggleEdit] = useState(false);
    const [currentIndex, setIndex] = useState(0);

    let collectionLength = [...Array(props.fullscreenSize).keys()];

    function sendAndClose(){
        props.editImage(document.getElementById('Beskrivning').value, props.pictureId, currentIndex === props.fullScreenIndex ? null : currentIndex);
        toggleEdit(!editText);
    }

    function openEdit(){
        setIndex(props.fullScreenIndex)
        toggleEdit(!editText)
    }

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
                    action={ props.pictureId && props.isAdmin ? [
                        <IconButton
                            key="edit"
                            aria-label="Close"
                            color="inherit"
                            onClick={()=>openEdit()}
                            >
                            <EditIcon />
                        </IconButton>,
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={()=>toggleText(!showText)}
                            >
                            <CloseIcon />
                        </IconButton>,
                    ]:[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={()=>toggleText(!showText)}
                            >
                            <CloseIcon />
                        </IconButton>,
                    ]
                }
                />
            <div className='photoCardFull'
                onClick={()=>toggleText(!showText)}
                >
                <img src={props.fullscreenImage} className='pictureFullScreen' alt=''/>
            </div>
            <Fab variant='round' style={{position:'fixed',backgroundColor: '#ffffff', color: color, bottom:10, right:10}} className='exitButton' onClick={()=>props.toggleFullScreen()}>
                <Icon>close</Icon>
            </Fab>
            <Dialog open={editText} onClose={()=>toggleEdit(false)} aria-labelledby="form-dialog-title" fullWidth>
                <DialogTitle id="form-dialog-title">Ändra bild</DialogTitle>
                <DialogContent>
                    <TextField
                        id="Beskrivning"
                        label="Ändra beskrivning:"
                        type="text"
                        defaultValue={props.fullscreenText}
                        multiline
                        fullWidth
                        />
                    <TextField
                        fullWidth
                        id="Index-Toggle"
                        select
                        label="Ändra ordning"
                        margin="normal"
                        value={currentIndex}
                        onChange={(e)=>{setIndex(e.target.value)}}
                        >
                        {collectionLength.map(
                            (value) => (
                                <MenuItem key={value} value={value}>
                                    {value+1}
                                </MenuItem>
                            )
                        )}
                    </TextField>
                    <Toolbar>
                        <IconButton style={{color:color, marginLeft:'auto'}} onClick={()=>sendAndClose()}>
                            <CheckIcon />
                        </IconButton>
                        <IconButton style={{color:color, marginRight:'auto'}} onClick={()=>toggleEdit(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </DialogContent>
            </Dialog>
        </Dialog>
    </div>
);
}


export default FullscreenView;
