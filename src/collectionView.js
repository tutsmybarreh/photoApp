import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

function CollectionView(props) {
    function createAlbum(images, align, path){
        const imagePath = require.context('./images', true);
        let album = [];
        for (let object in images){
            let image = imagePath(path+images[object]);
            album.push(
                <div key={object}>
                    <div className='photoCard' onClick={()=>props.toggleFullScreen(image, object)}>
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
    };

    let align = 'center';
    let images = props.collection.images;
    let path = props.collection.path;
    return(
        <div>
            <Typography variant="headline" align={align}>
                {props.collection.name}
            </Typography>
            <Typography align={align} variant="subheading" paragraph={true}>
                {props.collection.description}
            </Typography>
            {createAlbum(images, align, path)}
        </div>
    );
}

export default CollectionView;
