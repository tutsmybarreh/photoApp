import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';

class CollectionView extends Component {
    createAlbum(images,align){
        let album = [];
        for (var object in images){
            album.push(
                <div key={object}>
                    <div className='photoCard'>
                        <Paper elevation={1} square={true}>
                            <div className='padderino'>
                                <div className='polaroid'>
                                    <div className='testPicture'></div>
                                    <Typography variant="caption">
                                        {object}
                                    </Typography>
                                </div>
                            </div>
                        </Paper>
                    </div>
                </div>
            )
        }
        return album;
    }

    render(){
        let align = 'center';
        let images = this.props.collection.images;
        return(
            <div>
                <Typography variant="headline" component="h1" align={align}>
                    {this.props.collection.name}
                </Typography>
                <Typography component="p" align={align}>
                    {this.props.collection.description}
                </Typography>
                <Divider />
                {this.createAlbum(images,align)}
            </div>
        );
    }
}

export default CollectionView;
