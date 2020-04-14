import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import Toolbar from '@material-ui/core/Toolbar';

const color = '#3366ff';

function CollectionAdd(props){
    // let collections = [...Array(props.numberOfCollections).keys()];

    function sendAndClose(){
        props.add(document.getElementById('namn').value, document.getElementById('Beskrivning').value);
        props.toggle();
    }
 
    return(
            <Dialog open={props.show} onClose={()=>props.toggle()} aria-labelledby="form-dialog-title" fullWidth>
                <DialogTitle id="form-dialog-title">Lägg Till Samling</DialogTitle>
                <DialogContent>
                    <TextField
                        id="namn"
                        label="Namn:"
                        type="text"
                        defaultValue=''
                        fullWidth
                        />
                    <TextField
                        id="Beskrivning"
                        label="Beskrivning:"
                        type="text"
                        defaultValue=''
                        multiline
                        fullWidth
                        margin="normal"
                        />
                    <Toolbar>
                        <IconButton style={{color:color, marginLeft:'auto'}} onClick={()=>sendAndClose()}>
                            <CheckIcon />
                        </IconButton>
                        <IconButton style={{color:color, marginRight:'auto'}} onClick={()=>props.toggle()}>
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </DialogContent>
            </Dialog>
        );
}


export default CollectionAdd;
