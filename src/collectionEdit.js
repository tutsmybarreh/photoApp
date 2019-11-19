import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import Toolbar from '@material-ui/core/Toolbar';
// import MenuItem from '@material-ui/core/MenuItem';

const color = '#3366ff';

function CollectionEdit(props){
    function sendAndClose(){
        props.editCollection(props.collectionEditData.id, document.getElementById('namn').value, document.getElementById('Beskrivning').value);
        props.toggleCollectionEditor();
    }
    return(
            <Dialog open={props.collectionEditor} onClose={()=>props.toggleCollectionEditor()} aria-labelledby="form-dialog-title" fullWidth>
                <DialogTitle id="form-dialog-title">Ändra Samling</DialogTitle>
                <DialogContent>
                    <TextField
                        id="namn"
                        label="Ändra namn:"
                        type="text"
                        defaultValue={props.collectionEditData ? props.collectionEditData.name : null}
                        fullWidth
                        />
                        <TextField
                            id="Beskrivning"
                            label="Ändra beskrivning:"
                            type="text"
                            defaultValue={props.collectionEditData ? props.collectionEditData.description : null}
                            multiline
                            fullWidth
                            margin="normal"
                            />
                    <Toolbar>
                        <IconButton style={{color:color, marginLeft:'auto'}} onClick={()=>sendAndClose()}>
                            <CheckIcon />
                        </IconButton>
                        <IconButton style={{color:color, marginRight:'auto'}} onClick={()=>props.toggleCollectionEditor()}>
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </DialogContent>
            </Dialog>
        );
}


export default CollectionEdit;
