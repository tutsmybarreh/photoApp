var fs = require('graceful-fs');
var path = require('path');
var datastructure = require('./src/datastructure.json');
const imageSrc = './src/images/';
const extensions = ['jpeg', 'jpg', 'png', 'gif'];

fs.readdir(imageSrc, function(err, folders) {
    folders.map(
        function(folder){
            const currentFolder = imageSrc+folder;
            if (fs.lstatSync(currentFolder).isDirectory()){
                //check if Folder Exist datastructure
                var createFolder = true;
                for (album in datastructure.folders){
                    if (datastructure.folders[album].path==='./'+folder+'/'){
                        createFolder = false;
                    }
                }
                //Folder doesnt exist in datastructure description
                if (createFolder){
                    var newAlbum =
                    {
                        "name": folder,
                        "description": folder,
                        "path": "./"+folder+"/",
                        "images": {}
                    };
                    //Add folder to datastructure
                    datastructure.folders[datastructure.folders.length] = newAlbum;
                }
                fs.readdir(currentFolder, function(err, images){
                    var index;
                    for (album in datastructure.folders){
                        if (datastructure.folders[album].path==='./'+folder+'/'){
                            index = album;
                        }
                    }
                    images.map(
                        function (image, currentindex, array){
                            if (isImage(image)){
                                //Check if image exists in datastructure
                                var createImage = true;
                                for (key in datastructure.folders[index].images){
                                    if(image === datastructure.folders[index].images[key]){
                                        createImage = false;
                                    }
                                }
                                if (createImage){
                                    datastructure.folders[index].images[image] = image;
                                }
                                if (currentindex===array.length-1){
                                    write();
                                }
                            }
                        }
                    )
                })
            }
        }
    )
}, isImage());

function isImage(filename){
    var fnsplit = path.extname(filename||'').split('.');
    var ext = fnsplit[fnsplit.length - 1];
    if (extensions.indexOf(ext)>=0){
        return true;
    }
    else return false;
}

function write(){
    fs.writeFile('./src/datastructure.json', JSON.stringify(datastructure), function (err) {
  if (err) throw err;
  console.log('Saved!');
});
}
