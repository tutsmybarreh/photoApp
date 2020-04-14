import React, { useState } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import EditIcon from '@material-ui/icons/Edit';
import PhotoAlbumIcon from '@material-ui/icons/PhotoAlbum';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';

let color = '#3366ff';

function Menu(props){
    const [edit, toggleEdit] = useState(false);

    function closeAndReset(){
        toggleEdit(false);
        props.toggleMenu("close");
    }
    return(
        <div>
            <SwipeableDrawer
                open={props.menutoggle}
                onClose={()=>closeAndReset()}
                onOpen={()=>props.toggleMenu("open")}
                >
                <div>
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <PhotoAlbumIcon style={{color:color}}/>
                            </ListItemIcon>
                            <ListItemText primary="Album" />
                        </ListItem>
                        {props.isAdmin && !edit ? (
                        <ListItem button
                            onClick={()=>toggleEdit(true)}
                            >
                            <ListItemIcon>
                                <EditIcon style={{color:color}}/>
                            </ListItemIcon>
                            <ListItemText primary="Ändra" />
                        </ListItem>) : null
                        }
                    </List>
                    <Divider />
                    <List>
                        {edit ? (
                            <ListItem button
                                onClick={()=> props.toggleCollectionAdd()}
                            >
                                <ListItemIcon>
                                    <AddToPhotosIcon style={{color:color}} />
                                </ListItemIcon>
                                <ListItemText primary={'Nytt Album'} />
                            </ListItem>
                        ):null}
                        {props.getCollections().map(
                            function (value){
                                if (process.env.NODE_ENV === 'production' && value.isTest){
                                    return null;
                                } else {
                                    return (
                                        <ListItem button
                                            key={value.name}
                                            onClick={()=>{edit ?
                                                props.toggleCollectionEditor(value.id, value.name, value.description, value.Index, value.images ? true : false) :
                                                props.selectCollection(value.name, value.id ? value.id : null)
                                            }}>
                                            {edit ? (
                                                <ListItemIcon>
                                                    <EditIcon style={{color:color}} />
                                                </ListItemIcon>
                                            ):null
                                        }
                                        <ListItemText primary={value.name} />
                                    </ListItem>
                                );
                            }
                        }
                    )}
                    </List>
                </div>
            </SwipeableDrawer>
        </div>
    );
}

export default Menu;
