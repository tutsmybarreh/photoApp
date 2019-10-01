import React, {useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';


function CollectionView(props) {
    const [albumArray, setAlbum] = useState([]);                //Hook containing new collections
    const [albumIdentifier, setAlbumId] = useState('');         //Contains the latest loaded new album ID, based on name property.
    const [albumLoaded, setAlbumLoaded] = useState(false);      //Pre-Toggle set on intiate new collection load start
    const [albumDone, setDone] = useState(false);               //Post-Toggle set on new collection load done
    const [checkForSwap, setSwapCheck] = useState(false);       //When Both toggles are on, Activate tracking of new album

    useEffect(() => {
        //Reset Master Toggle
        if (props.collection.name!==albumIdentifier && checkForSwap){
            setAlbum([]);
            setSwapCheck(false);
            setDone(false);
        }
        if (albumLoaded && albumDone){
            setAlbumId(props.collection.name)
            setSwapCheck(true);
            setAlbumLoaded(false);
        }
    })

    //Old Stuff
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

    //New Stuff
    function createFirebaseAlbum(align){
        return (
            <div>
                {albumArray.sort((a,b)=> a.index-b.index).map(
                    (value, index)=>{return imageCard(value.url, value.description, index, align)}
                )}
            </div>
    )
    }

    //New Stuff
    function imageCard(path, description, key, align){
        return (
            <div key={key}>
                <div className='photoCard' onClick={()=>props.toggleFullScreen(path, description)}>
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

    //New Stuff
    function firebaseAlbum(images, path){
        // console.log('firbaseloadStart')
        let album = [...albumArray];
        let itemsProcessed = 0;
        images.forEach(
            (value, index, array) => {
                let imagePath = path+value.name;
                 props.getImage(imagePath).then(
                     (url) => {
                         let image = {
                             'index':value.index,
                             'url':url,
                             'description':value.description
                         }
                         album.push(image);
                         itemsProcessed++;
                         if (itemsProcessed === array.length){
                             // console.log('firebase load done')
                             setAlbum(album);
                             setDone(true);
                        }
                     }
                 )
            }
        )
    }

    let align = 'center';
    let images = props.collection.images;
    let path = props.collection.path;
    let newCollection = typeof props.collection.Index === 'number';
    if (images && newCollection && !albumLoaded && !albumDone){
        firebaseAlbum(images, path);
        setAlbumLoaded(true);
    }
    return(
        <div>
            <Typography variant="h5" align={align}>
                {props.collection.name}
            </Typography>
            <Typography align={align} paragraph={true}>
                {props.collection.description}
            </Typography>
            {newCollection ? albumArray.length !== 0 ?
            createFirebaseAlbum(align)
            : null
            : createAlbum(images, align, path)
            }
        </div>
    );
}

export default CollectionView;
