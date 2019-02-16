import React, { Component } from 'react';
import './App.css';

import Navbar from "./navbar.js";
import Menu from "./menu.js";
import CollectionView from'./collectionView.js';
import AuthScreen from'./authScreen.js';
import FullscreenView from'./fullScreenView.js'
import DefaultScreen from'./defaultScreen.js';
import AdminLogin from './adminLogin.js';

import filestructure from './dataStructure.json';
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
            collection:null,
            fixedNav: false,
            fullscreenView: false,
            fullscreenImage:"",
            fullscreenText:"",
            storeState: true,
            timestamp:new Date().getTime(),
            editor:false,
            firebaseUser:null,
        }
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        if(iOS()){
        this.loadState();
        }
        this.setState({
            filestructure:filestructure.folders,
        });
        window.addEventListener('scroll', this.handleScroll);
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
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
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

    handleScroll() {
        if (window.scrollY > 65 && !this.state.fixedNav) {
            this.setState({
                fixedNav: true,
            });
        }
        else if (window.scrollY < 65 && this.state.fixedNav) {
            this.setState({
                fixedNav: false,
            });
        }
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
            var collections = this.state.filestructure.map(
                function(value){
                    return value;
                }
            )
            if (input){
                collections = collections.find(function(value) {
                    return value.name === input;
                })
            }
            return collections;
        }
        else return [];
    }

    selectCollection(input){
        if (this.state.auth){
            this.setState({
                collection:input,
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

    toggleFullScreen(input, text){
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
            <div className={this.state.fixedNav ? 'navBarStick':''}>
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
                        fixedNav={this.state.fixedNav}
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
                            />
                    :!this.state.collection && this.state.auth ?
                        <DefaultScreen />
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
