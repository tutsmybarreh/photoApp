import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

class CollectionView extends Component {
    //FIX USING THE PATH
    createAlbum(images, align, path){
        const imagePath = require.context('./images', true);
        // const imagePath = require.context(this.props.collection.path, true);
        let album = [];
        for (let object in images){
            let image = imagePath(path+images[object]);
            album.push(
                <div key={object}>
                    <div className='photoCard' onClick={()=>this.props.toggleFullScreen(image, object)}>
                        <Paper elevation={1} square={true}>
                            <div className='padderino'>
                                <div className='polaroid'>
                                    <div className='picturFrame'>
                                        <img src={image} className='pictureHolder' alt=''/>
                                    </div>
                                </div>
                            </div>
                        </Paper>
                    </div>
                    <Typography align={align} paragraph={true}>
                        {object}
                    </Typography>
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
                <Typography variant="headline" align={align}>
                    {this.props.collection.name}
                </Typography>
                <Typography align={align} variant="subheading" paragraph={true}>
                    {this.props.collection.description}
                </Typography>
                {this.createAlbum(images, align, path)}
            </div>
        );
    }
}

export default CollectionView;
