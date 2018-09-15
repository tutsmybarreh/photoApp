import React, { Component } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ImageIcon from '@material-ui/icons/Image';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

class Menu extends Component {
    render(){
        return(
            <div>
                <SwipeableDrawer
                    open={this.props.menutoggle}
                    onClose={()=>this.props.toggleMenu("close")}
                    onOpen={()=>this.props.toggleMenu("open")}
                    >
                    <div>
                        <List>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                            <ImageIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Bilder" />
                            </ListItem>
                        </List>
                        <Divider />
                        <List>
                            {this.props.getCollections().map(
                                function (value){
                                    return (
                                        <ListItem button
                                            key={value.name}
                                            onClick={()=>this.props.selectCollection(value.name)}>
                                            <ListItemText primary={value.name}
                                        />
                                        </ListItem>
                                    );
                                }, this
                            )}
                        </List>
                    </div>
                </SwipeableDrawer>
            </div>
        );
    }
}

export default Menu;
