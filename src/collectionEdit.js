import React, { useState, useEffect} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import Icon from '@material-ui/core/Icon';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';

const color = '#3366ff';

function CollectionEdit(props){
    let collections = [...Array(props.numberOfCollections).keys()];
    const [currentIndex, setIndex] = useState(0);
    const [indexLoaded, setLoaded] = useState(false);
    useEffect(() => {
        if (props.collectionEditData && !indexLoaded){
            // console.log(currentIndex, indexLoaded, props.collectionEditData ? props.collectionEditData.index :null)
            setIndex(props.collectionEditData.index)
            setLoaded(true)
        }
    })
    function sendAndClose(){
        props.editCollection(props.collectionEditData.id, document.getElementById('namn').value, document.getElementById('Beskrivning').value, currentIndex!==props.collectionEditData.index ? currentIndex : null, props.collectionEditData.index);
        close();
    }
    function deleteAndClose(){
        props.delete(props.collectionEditData.id);
        close();
    }
    function close(){
        setLoaded(false);
        props.toggleCollectionEditor();
    }

    return(
            <Dialog open={props.collectionEditor} onClose={()=>close()} aria-labelledby="form-dialog-title" fullWidth>
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
                    <TextField
                        fullWidth
                        id="arangeCollectionns"
                        select
                        label="Ändra ordning:"
                        margin="normal"
                        value={!indexLoaded && props.collectionEditData ? props.collectionEditData.index : currentIndex}
                        onChange={(e)=>{setIndex(e.target.value)}}
                        >
                        {collections.map(
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
                        { props.collectionEditData && props.collectionEditData.hasImages === false ? (
                        <IconButton style={{color:color}} onClick={()=>deleteAndClose()}>
                            <Icon>delete_forever</Icon>
                        </IconButton>
                        ):null}
                        <IconButton style={{color:color, marginRight:'auto'}} onClick={()=>close()}>
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </DialogContent>
            </Dialog>
        );
}


export default CollectionEdit;
