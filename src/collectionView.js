import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';

class CollectionView extends Component {
    //FIX USING THE PATH
    createAlbum(images, align, path){
        const imagePath = require.context('./images', true);
        // const imagePath = require.context(this.props.collection.path, true);
        let album = [];
        for (var object in images){
            let image = imagePath(path+images[object]);
            console.log(image)
            album.push(
                <div key={object}>
                    <div className='photoCard'>
                        <Paper elevation={1} square={true}>
                            <div className='padderino'>
                                <div className='polaroid'>
                                    <div className='picturFrame'>
                                        <img src={image} className='pictureHolder' alt=''/>
                                    </div>
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
        let path = this.props.collection.path;
        return(
            <div>
                <Typography variant="headline" component="h1" align={align}>
                    {this.props.collection.name}
                </Typography>
                <Typography component="p" align={align}>
                    {this.props.collection.description}
                </Typography>
                <Divider />
                {this.createAlbum(images, align, path)}
            </div>
        );
    }
}

export default CollectionView;
