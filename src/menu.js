import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ImageIcon from '@material-ui/icons/Image';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

function Menu(props){
    return(
        <div>
            <SwipeableDrawer
                open={props.menutoggle}
                onClose={()=>props.toggleMenu("close")}
                onOpen={()=>props.toggleMenu("open")}
                >
                <div>
                    <List>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                        <ImageIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Album" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        {props.getCollections().map(
                            function (value){
                                if (process.env.NODE_ENV === 'production' && value.isTest){
                                    return null;
                                } else {
                                    return (
                                        <ListItem button
                                            key={value.name}
                                            onClick={()=>props.selectCollection(value.name, value.id ? value.id : null)}>
                                            <ListItemText primary={value.name}
                                        />
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
