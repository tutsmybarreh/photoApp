import React, { Component } from 'react';
import Navbar from "./navbar.js";
import Menu from "./menu.js";
import './App.css';
import Dashboard from'./dashboard.js'
import FullscreenView from'./fullScreenView.js'
import filestructure from './dataStructure.json';
import token from './token.json';
import hash from 'crypto-js/sha256';

var localStorageTime = 43200000;

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            menutoggle:false,
            filestructure:null,
            auth:false,            //Auth with PIN
            collection:null,
            pin:"",
            fixedNav: false,
            fullscreenView: false,
            fullscreenImage:"",
            fullscreenText:"",
            storeState: true,
            timestamp:new Date().getTime(),
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
                localStorage.setItem(key, JSON.stringify(this.state[key]));
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

    getView(){
        return this.state.collection;
    }

    clearView(){
        this.setState({
            collection:null,
        });
    }

    isAuth(){
        if (this.state.auth){
            return true;
        }
        else return false;
    }

    pinAddNumber(number){
        this.setState({
            pin:this.state.pin+number,
        });
    }

    clearPin(){
        this.setState({
            pin:"",
        });
    }

    enterPin(){
        let hashed = hash(this.state.pin).toString().toLowerCase();
        this.setState({
            pin:"",
        });
        if (hashed===token.token.toLowerCase()){
            this.setState({
                auth:true,
                pin:"",
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
                        isAuth={this.isAuth.bind(this)}
                        clearView={()=>this.clearView()}
                        endSession={()=>this.endSession()}
                        />
                </div>
                <div className='dashpadding'>
                    <Dashboard
                        getCollections={this.getCollections.bind(this)}
                        getView={this.getView.bind(this)}
                        isAuth={this.isAuth.bind(this)}
                        pin={this.state.pin}
                        pinAddNumber={this.pinAddNumber.bind(this)}
                        clearPin={this.clearPin.bind(this)}
                        enterPin={this.enterPin.bind(this)}
                        toggleFullScreen={this.toggleFullScreen.bind(this)}
                        />
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
