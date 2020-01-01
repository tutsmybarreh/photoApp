import React, {useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

function CollectionView(props) {
    const [albumArray, setAlbum] = useState([]); //Hook containing new collections

    useEffect(() => {
        setAlbum([]);
        const images = props.collection.images;
        const path = props.collection.path;
        firebaseAlbum(images, path);
    }, [props.collection.images])

    function createFirebaseAlbum(align){
        return (
            <div>
                {albumArray.sort((a,b)=> a.index-b.index).map(
                    (value, index, array)=>{return imageCard(value.url, value.description, index, value.id, align, array.length)}
                )}
            </div>
        )
    }

    function imageCard(path, description, key, id, align, size){
        return (
            <div key={key}>
                <div className='photoCard noselect' onClick={()=>props.toggleFullScreen(path, description, id, key, size)}>
                    <Paper elevation={1} square={true}>
                        <div className='padderino'>
                            <div className='polaroid'>
                                <div className='picturFrame'>
                                    <img src={path} className='pictureHolder' alt=''/>
                                </div>
                            </div>
                        </div>
                    </Paper>
                </div>
                <Typography align={align} paragraph={true}>
                    {description}
                </Typography>
            </div>
        )
    }

    function firebaseAlbum(images, path){
        let album = [];
        let itemsProcessed = 0;
        if (images){
            images.forEach(
                (value, index, array) => {
                    let imagePath = path+value.name;
                    props.getImage(imagePath).then(
                        (url) => {
                            let image = {
                                'index':value.index,
                                'url':url,
                                'description':value.description,
                                'id':value.id
                            }
                            album.push(image);
                            itemsProcessed++;
                            if (itemsProcessed === array.length){
                                setAlbum(album);
                                if (props.scrollTo){
                                    props.scrollBackToImage();
                                }
                            }
                        }
                    )
                }
            )
        }
    }
    const align = 'center';
    return(
        <div>
            <Typography variant="h5" align={align}>
                {props.collection.name}
            </Typography>
            <Typography align={align} paragraph={true}>
                {props.collection.description}
            </Typography>
            {albumArray.length !== 0 ?
                createFirebaseAlbum(align)
                : null
            }
        </div>
    );
}

export default CollectionView;
