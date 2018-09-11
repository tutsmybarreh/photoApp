import React, { Component } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

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
                <List subheader={<ListSubheader><b>Settings</b></ListSubheader>}>
                </List>
                </div>
                <Divider />
            </SwipeableDrawer>
            </div>
        );
    }
}

export default Menu;
