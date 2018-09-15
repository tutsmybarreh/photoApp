import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

class CollectionView extends Component {
    render(){
        let align = 'center';
        return(
            <div>
                <Typography variant="headline" component="h1" align={align}>
                    {this.props.collection.name}
                </Typography>
                <Typography component="p" align={align}>
                    {this.props.collection.description}
                </Typography>
                <Divider />
            </div>
        );
    }
}

export default CollectionView;
