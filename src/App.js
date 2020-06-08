import React, { Component } from 'react';
import './App.css';
import Navbar from "./navbar.js";
import Menu from "./menu.js";

import CollectionView from'./collectionView.js';
import CollectionEdit from'./collectionEdit.js';
import CollectionAdd from'./collectionAdd.js';
import AuthScreen from'./authScreen.js';
import FullscreenView from'./fullScreenView.js'
import DefaultScreen from'./defaultScreen.js';
import AdminLogin from './adminLogin.js';

import token from './token.json';
import hash from 'crypto-js/sha256';
import firebase from './firebase.js';

let dbListner;

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            menutoggle:false,
            filestructure:[],
            dbListner: null,
            auth:false,            //Auth with PIN
            collection:null,       //Merge theese two when old stuff is gone?
            collectionId:null,     //Merge theese two when old stuff is gone?
            fullscreenView: false,      
            fullscreenImage:"",     //fullScrenData
            fullscreenText:"",      //fullScrenData
            fullscreenIndex:null,   //fullScrenData
            fullscreenSize:null,    //fullScrenData
            collectionEditor:false,
            collectionEditData:null,
            collectionAdd:false,
            editor:false,
            firebaseUser:null,
            weight:null,
            height:null,
            pictureId:null,
            scrollTo:null,
        }
    }

    componentDidMount() {
        firebase.auth.onAuthStateChanged(firebaseUser=>{
            this.setState({
                firebaseUser:firebaseUser,
            })
            if (firebaseUser){
                this.setState({
                    auth:true,
                    editor:false,
                })
            }
        })
        let me = this;
        let filestructure = me.state.filestructure;
        dbListner = firebase.db.collection('folders')
        .onSnapshot(function(snapshot) {
            snapshot.docChanges().forEach(function(change, index, collections) {
                if (change.type === 'added') {
                    let header = change.doc.data();
                    header['id']=change.doc.id; 
                    me.loadCollection(change.doc.id).then((value) => header = me.setImages(value, header));
                    filestructure.push(header);
                }
                if (change.type === 'modified') {
                    let header = change.doc.data();
                    header['id']=change.doc.id; 
                    me.loadCollection(change.doc.id).then((value) => header = me.setImages(value, header));
                    let record = filestructure.find(collection => collection.id === header.id);
                    let index = filestructure.indexOf(record);
                    filestructure[index]=header;
                    me.setState({
                        filestructure:filestructure.sort((a,b) => a.Index - b.Index),
                    });
                }
                if (change.type === 'removed') {
                    let record = filestructure.find(collection => collection.id === change.doc.id);
                    let index = filestructure.indexOf(record);
                    filestructure.splice(index, 1)
                    me.setState({
                        filestructure:filestructure.sort((a,b) => a.Index - b.Index),
                    });
                }
                if (index === collections.length -1) {
                    me.setState({
                        filestructure:filestructure.sort((a,b) => a.Index - b.Index),
                    });
                }
            })
        });
        this.reloadCharts();
    }

    componentWillUnmount() {
        dbListner();
    }

    

    reloadCharts(targetchart){
        if (targetchart){
            this.loadChart(targetchart);
        }
        else {
            this.loadChart('heightChart');
            this.loadChart('weightChart');
        }
    }

    async loadChart(name){
        let chartData = firebase.db.collection(name);
        let dataMap = [];
        await chartData.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                let date = Object(doc.data()).date.toDate();
                let fieldName = Object.keys(doc.data())[1];
                let value = Object(doc.data())[fieldName];
                let id = doc.id;
                dataMap.push([date, value, id]);
            });
        });
        let returnValue =  dataMap.sort((a, b)=> {return new Date(a[0]) - new Date(b[0])});
        if (name==='heightChart'){
            this.setState({
                height: returnValue,
            });
        }
        if (name==='weightChart'){
            this.setState({
                weight: returnValue,
            });
        }
    }

    reloadState(reload){
        if (reload){
            this.setState({
                collection:reload,
            });
        }
    }

    async loadCollection(images) {
        let collection = await firebase.db.collection('folders').doc(images).collection('images').get();
        return collection.docs.map((doc)=>{
            let returnValue = doc.data();
            returnValue['id']=doc.id;
            return returnValue;
        });
    }

    //2do Trigger Reload on image edit.
    reloadCollection(collection) {
        this.reloadState(collection);
    }

    setImages(value, header) {
        if (value.length !== 0){            //Should take into account non-existing images if album empty.
            header['images'] = value;
        }
        else {
            header['images'] = null;
        }
        return header;
    }

    getImage(image){
        return firebase.storage.ref(image).getDownloadURL();
    }

    editImage(text, id, index=null){
        let shuffleIndex = index===null ? index : this.makeShuffleArray(index);
        const saveCollection = this.state.collection;
        this.setState({
            scrollTo:window.scrollY,
            fullscreenText:text,
            fullscreenIndex: index!==null ? index : this.state.fullscreenIndex,
        });
        let editImage = firebase.db.collection('folders').doc(this.state.collectionId).collection('images').doc(id);
        editImage.set(
            {description:text},
            {merge:true})
            .then(()=>{
                if (shuffleIndex===null){
                    this.reloadCollection(saveCollection);
                }
                else {
                    this.setShuffleArray(shuffleIndex, saveCollection);
                }
            })
            .catch(e => console.log(e.message));
    }

    editCollection(id, name, description, newIndex=null, oldIndex){
        //Check if Index && newIndex !== this.state.index
        let collision = this.state.filestructure.find(
            (value) => value.name === name && value.id !== id
        ) ? true : false;
        let swapIndex = newIndex!==null ? this.makeSwapCollections(newIndex, oldIndex) : false;
        if (collision===false){
            const saveCollection = this.saveCollectionState(this.state.saveCollectionState === id && id!==null ? name : this.state.collection);
            let collection = firebase.db.collection('folders').doc(id);
            collection.set(
                {
                    name:name,
                    description:description,
                },
                {merge:true})
                .then(()=>{
                    if (!swapIndex){
                        this.reloadState(saveCollection)
                    }
                    else {
                        this.setSwapCollections(swapIndex, saveCollection)
                    }
                })
                .catch(e => console.log(e.message));
        }

    }

    addCollection(name, description){
        let collision = this.state.filestructure.find(
            (value) => value.name === name 
        ) ? true : false;
        if (!collision && name.length > 1){
            const saveCollection = this.saveCollectionState(this.state.collection);
            let collection = firebase.db.collection('folders');
            let nameSpace = name.replace(/[^a-zA-Z]+/g, '').toLowerCase()+this.state.filestructure.length+'/'
            let path = 'images/'+nameSpace;
            // let storage = firebase.storage.ref().child('images/');
            // storage.put(nameSpace).then(function(snapshot) {
            //     console.log('Uploaded a blob or file!');
            // });
            collection.add({
                Index:this.state.filestructure.length,
                name:name,
                description:description,
                isTest:false,
                path:path,
            })
            .then(()=> {
                this.reloadState(saveCollection);
            })
            .catch(e => console.log(e.message));
        }
    }

    deleteCollection(id){
        let collection = this.state.filestructure.find(
            (value) => value.id === id 
        )
        let hasImages = Boolean(collection.images);
        if (hasImages === false) {
            const saveCollection = this.saveCollectionState(this.state.collectionId === id ? null : this.state.collection);
            let dbCollection = firebase.db.collection('folders');
            dbCollection.doc(id).delete()
            .then(() => {
                //2Fix, only pass Indexes above deleted 
                let filestructure = this.state.filestructure.sort((a,b) => a.Index-b.Index);
                let swapArray = filestructure.filter(value => value.id !== id).map((value, index) => {
                    value.Index = index
                    return value;
                });
                this.setSwapCollections(swapArray, saveCollection);
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
            
        }
    }

    saveCollectionState(condition){
        const saveCollection = condition;
        this.setState({
            scrollTo: saveCollection ? window.scrollY : null,
            collection:null,
        });
        return saveCollection;
    }

    setShuffleArray(array, collection){
        array.forEach(
            (picture, arrayIndex) => {
                let editImage = firebase.db.collection('folders').doc(this.state.collectionId).collection('images').doc(picture.id);
                editImage.set(
                    {index:picture.index},
                    {merge:true})
                .then(()=>{
                    if (arrayIndex === array.length - 1){
                        this.reloadCollection(collection);
                    }
                })
                .catch(e => console.log(e.message));
            }
        )
    }

    setSwapCollections(collections, saveCollection){
        collections.forEach(
            (collection, arrayIndex) => {
                firebase.db.collection('folders').doc(collection.id).set(
                    {Index:collection.Index},
                    {merge:true})
                .then(()=>{
                    if (arrayIndex === collections.length - 1){
                        this.reloadState(saveCollection)
                    }
                })
                .catch(e => console.log(e.message));
            }
        )
    }

    //Remake like makeSwapCollections
    makeShuffleArray(index){
        let shuffleIndex = this.getCollections(this.state.collection).images.filter(function(value) {
            if (this.state.fullscreenIndex > index){
                return value.index >= index && value.index <= this.state.fullscreenIndex;
            }
            else {
                return value.index <= index && value.index >= this.state.fullscreenIndex;
            }
        }, this);
        let fromObject = shuffleIndex.find((value) => value.index === this.state.fullscreenIndex);
        fromObject.index = index;
        shuffleIndex.forEach(
            (value)=>{
                if (this.state.fullscreenIndex > index){
                    if (value.id!==fromObject.id){
                        value.index += 1;
                    }
                }
                else {
                    if (value.id!==fromObject.id){
                        value.index -=1;
                    }
                }
            }
        )
        return shuffleIndex;
    }

    makeSwapCollections(newIndex, oldIndex){
        let filestructure = this.state.filestructure.sort((a,b) => a.Index-b.Index);
        filestructure.splice(newIndex, 0, filestructure.splice(oldIndex, 1)[0]);
        // eslint-disable-next-line
        const swapArray = filestructure.filter((collection, index)=>{
            if (collection.Index!==index){
                collection.Index = index;
                return collection;
            }
        })
        return swapArray;
    }

    updateChart(name, dateValue, value){
        let collectionName = name + 'Chart'
        let collection = firebase.db.collection(collectionName);
        collection.add({
            date: dateValue,
            [name]: value,
        })
        .then(this.reloadCharts(collectionName))
        .catch(e => console.log(e.message));
    }

    deleteFromChart(name, id){
        let collectionName = name + 'Chart';
        let collection = firebase.db.collection(collectionName).doc(id);
        collection.delete().then(this.reloadCharts(collectionName))
        .catch(e => console.log(e.message));
    }

    toggleCollectionEditor(id, name, description, index, hasImages){
        if (id){
            this.setState({
                collectionEditor:true,
                collectionEditData:{
                    id:id,
                    name:name,
                    description:description,
                    index:index,
                    hasImages:hasImages,
                },
            });
        }
        else {
            this.setState({
                collectionEditor:false,
                collectionEditData:null,
            });
        }
    }

    toggleCollectionAdd(){
        this.setState({
            collectionAdd:!this.state.collectionAdd,
        })
    }

    toggleMenu(input = undefined){
        this.setState({
            menutoggle: input === undefined ? !this.state.menutoggle : input,
        });
    }

    getCollections(input){
        if(this.state.filestructure){
            if (input){
                return this.state.filestructure.find(function(value) {
                    return value.name === input;
                })
            } else {
                return this.state.filestructure;
            }
        }
        else return [];
    }

    selectCollection(input, collectionId){
        if (this.state.auth){
            this.setState({
                collection:input,
                collectionId:collectionId,
            });
        }
        else {
            this.setState({
                collection:false,
            });
        }
        window.scrollTo(0,0);
    }

    clearView(){
        this.setState({
            collection:null,
        });
    }

    scrollBackToImage(){
        window.scrollTo(0, this.state.scrollTo);
        this.setState({
            scrollTo:null,
        })
    }

    enterPin(pin){
        let hashed = hash(pin).toString().toLowerCase();
        if (hashed===token.token.toLowerCase()){
            this.setState({
                auth:true,
            });
        }
    }

    toggleFullScreen(input, text, id, index, size){
        if (this.state.fullscreenView){
            this.setState({
                fullscreenView:false,
            });
            document.getElementsByTagName("Meta").viewport.setAttribute('content', 'viewport-fit=cover, width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no')
        }
        else {
            this.setState({
                fullscreenView:true,
                fullscreenImage:input,
                fullscreenText:text,
                fullscreenIndex:index,
                fullscreenSize:size,
                pictureId:id,
            });
            document.getElementsByTagName("Meta").viewport.setAttribute('content', 'viewport-fit=cover, width=device-width, initial-scale=1, maximum-scale=2.0, user-scalable=yes, shrink-to-fit=no')
        }
    }

    toggleEditor(){
        this.setState({
            editor:!this.state.editor,
            collection:false,
        })
    }

    

    loginAdmin(mail, password){
        const login = firebase.auth.signInWithEmailAndPassword(mail, password);
        login.catch(e => console.log(e.message));
    }

    logoutAdmin(){
        firebase.auth.signOut();
    }

    endSession(){
        this.setState({
            auth:false,
        });
    }

    render() {
        return (
            <div className='navBarStick'>
                <div>
                    <Menu
                        menutoggle={this.state.menutoggle}
                        toggleMenu={this.toggleMenu.bind(this)}
                        getCollections={this.getCollections.bind(this)}
                        selectCollection={this.selectCollection.bind(this)}
                        isAdmin={this.state.firebaseUser}
                        toggleCollectionEditor={this.toggleCollectionEditor.bind(this)}
                        toggleCollectionAdd={this.toggleCollectionAdd.bind(this)}
                        />
                </div>
                <div>
                    <Navbar
                        menutoggle={this.state.menutoggle}
                        toggleMenu={()=>this.toggleMenu()}
                        isAuth={this.state.auth}
                        clearView={()=>this.clearView()}
                        endSession={()=>this.endSession()}
                        toggleEditor={()=>this.toggleEditor()}
                        firebaseUser={this.state.firebaseUser}
                        logoutAdmin={this.logoutAdmin.bind(this)}
                        />
                </div>
                <div className='dashpadding'>
                    {this.state.collection && this.state.auth ?
                        <CollectionView
                            collection={this.getCollections(this.state.collection)}
                            toggleFullScreen={this.toggleFullScreen.bind(this)}
                            getImage={this.getImage.bind(this)}
                            firebaseUser={this.state.firebaseUser}
                            scrollTo={this.state.scrollTo}
                            scrollBackToImage={this.scrollBackToImage.bind(this)}
                            />
                        :!this.state.collection && this.state.auth ?
                        <DefaultScreen
                            weight={this.state.weight}
                            height={this.state.height}
                            firebaseUser={this.state.firebaseUser}
                            updateChart={this.updateChart.bind(this)}
                            deleteFromChart={this.deleteFromChart.bind(this)}
                            />
                        :this.state.editor ?
                        <AdminLogin
                            loginAdmin={this.loginAdmin.bind(this)}
                            firebaseUser={this.state.firebaseUser}
                            logoutAdmin={this.logoutAdmin.bind(this)}
                            />
                        :
                        <AuthScreen enterPin={this.enterPin.bind(this)}/>
                    }
                </div>
                <div>
                    <FullscreenView
                        fullscreenView={this.state.fullscreenView}
                        toggleFullScreen={this.toggleFullScreen.bind(this)}
                        fullscreenImage={this.state.fullscreenImage}
                        fullscreenText={this.state.fullscreenText}
                        fullscreenIndex={this.state.fullscreenIndex}
                        fullscreenSize={this.state.fullscreenSize}
                        pictureId={this.state.pictureId}
                        isAdmin={this.state.firebaseUser}
                        editImage={this.editImage.bind(this)}
                        />
                </div>
                <CollectionEdit
                    collectionEditor={this.state.collectionEditor}
                    toggleCollectionEditor={()=>this.toggleCollectionEditor()}
                    collectionEditData={this.state.collectionEditData}
                    editCollection={this.editCollection.bind(this)}
                    numberOfCollections={this.state.filestructure ? this.state.filestructure.length : null}
                    delete={this.deleteCollection.bind(this)}
                />
                <CollectionAdd
                    show={this.state.collectionAdd}
                    toggle={this.toggleCollectionAdd.bind(this)}
                    add={this.addCollection.bind(this)}
                />
            </div>
        );
    }
}

export default App;
