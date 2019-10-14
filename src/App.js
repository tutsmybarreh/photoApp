import React, { Component } from 'react';
import './App.css';

import Navbar from "./navbar.js";
import Menu from "./menu.js";
import CollectionView from'./collectionView.js';
import AuthScreen from'./authScreen.js';
import FullscreenView from'./fullScreenView.js'
import DefaultScreen from'./defaultScreen.js';
import AdminLogin from './adminLogin.js';

import oldFilestructure from './dataStructure.json';
import token from './token.json';
import hash from 'crypto-js/sha256';
import firebase from './firebase.js';

var localStorageTime = 43200000;

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            menutoggle:false,
            filestructure:null,
            auth:false,            //Auth with PIN
            collection:null,       //Merge theese two when old stuff is gone?
            collectionId:null,     //Merge theese two when old stuff is gone?
            fullscreenView: false,
            fullscreenImage:"",
            fullscreenText:"",
            storeState: true,
            timestamp:new Date().getTime(),
            editor:false,
            firebaseUser:null,
            weight:null,
            height:null,
            pictureId:null,
        }
    }

    componentDidMount() {
        if(iOS()){
        this.loadState();
        }
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
        this.reloadCharts();
        this.loadAlbums();
    }

    componentDidUpdate(){
        if(iOS()){
            this.saveState();
        }
    }

    saveState(){
        if (this.state.storeState){
            for (let key in this.state) {
                if (key!=='firebaseUser'){
                localStorage.setItem(key, JSON.stringify(this.state[key]));
                }
            }
        }
    }

    loadState(){
        let currentDate = new Date(this.state.timestamp);
        let localStorageDate = new Date(parseInt(localStorage['timestamp'], 10));
        if (currentDate.getTime() - localStorageDate.getTime() < localStorageTime){
            for (let key in this.state) {
                if (localStorage.hasOwnProperty(key)) {
                    try {
                        this.setState({
                            [key]: JSON.parse(localStorage.getItem(key)),
                        });
                    } catch (e) {
                        this.setState({
                            [key]: localStorage.getItem(key),
                        });
                    }
                }
            }
        }
    }

    reloadCharts(){
        this.loadChart('heightChart');
        this.loadChart('weightChart');
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

    async loadAlbums(){
        let albums = await firebase.db.collection('folders').get().then(
            (querySnapshot) => {
                let data = [];
                querySnapshot.forEach(doc => {
                    data.push(doc)
                })
                return data;
            }
        )
        let filestructure = albums.map(
            (value) => {
                let header = value.data();
                header['id']=value.id;
                this.loadCollection(value.id).then(
                    (value) => {
                        if (Object.entries(value[0]).length !== 0){
                            header['images'] = value;
                        }
                        else {
                            header['images'] = null;
                        }
                    }
                );
                return header;
            }
        )
        let existingFileSruct = oldFilestructure.folders;
        filestructure.sort((a,b) => a.Index - b.Index).forEach(
            (value) => {existingFileSruct.push(value)}
        )
        this.setState({
            filestructure: existingFileSruct,
        });
    }

    async loadCollection(images) {
        let collection = await firebase.db.collection('folders').doc(images).collection('images').get();
        return collection.docs.map((doc)=>{
            let returnValue = doc.data();
            returnValue['id']=doc.id;
            return returnValue;
        });
    }

    getImage(image){
        return firebase.storage.ref(image).getDownloadURL();
    }

    editImage(text, id){
        console.log(this.state.collectionId, id, text);
        let editImage = firebase.db.collection('folders').doc(this.state.collectionId).collection('images').doc(id);
        editImage.set(
            {description:text},
            {merge:true})
            .then(
                //Fix Here for proper reload
                console.log('Refresh To update ^_^')
            )
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
    }

    updateChart(name, dateValue, value){
        let collectionName = name + 'Chart'
        let collection = firebase.db.collection(collectionName);
        collection.add({
        date: dateValue,
        [name]: value,
        })
        .then(this.reloadCharts())
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }

    deleteFromChart(name, id){
        let collectionName = name + 'Chart';
        let collection = firebase.db.collection(collectionName).doc(id);
        collection.delete().then(this.reloadCharts())
        .catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }

    toggleMenu(input){
        if (!input){
            if (this.state.menutoggle){
                this.setState({
                    menutoggle:false,
                });
            }
            else {
                this.setState({
                    menutoggle:true,
                });
            }
        }
        else {
            if (input==="open"){
                this.setState({
                    menutoggle:true,
                });
            }
            if (input==="close"){
                this.setState({
                    menutoggle:false,
                });
            }
        }
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

    enterPin(pin){
        let hashed = hash(pin).toString().toLowerCase();
        if (hashed===token.token.toLowerCase()){
            this.setState({
                auth:true,
            });
            if (iOS()){
                this.setState({
                    storeState:true,
                });
            }
        }
    }

    toggleFullScreen(input, text, id){
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
            storeState:false,
        });
        localStorage.clear();
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
                        pictureId={this.state.pictureId}
                        isAdmin={this.state.firebaseUser}
                        editImage={this.editImage.bind(this)}
                        />
                </div>
            </div>
        );
    }
}

function iOS() {
  var iDevices = [
     // 'MacIntel',
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ];

  if (!!navigator.platform) {
    while (iDevices.length) {
      if (navigator.platform === iDevices.pop()){return true; }
    }
  }
  return false;
}

export default App;
