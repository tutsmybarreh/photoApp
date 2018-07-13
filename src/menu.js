import React, { Component } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

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
                    <h1>testing123456789</h1>
                    </div>
                </SwipeableDrawer>
            </div>
        );
    }
}

export default Menu;
