import React, { Component } from 'react';
import Navbar from "./navbar.js";
import Menu from "./menu.js";
import './App.css';
import Dashboard from'./dashboard.js'
import filestructure from './dataStructure.json';
import token from './token.json';
import hash from 'crypto-js/sha256';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            menutoggle:false,
            filestructure:null,
            auth:false,            //Auth with PIN
            collection:null,       //Allways false if auth false,
            pin:"",
        }
    }

    componentDidMount() {
        this.setState({
            filestructure:filestructure.folders,
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
                    menutoggle:true,
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
    }

    getView(){
        return this.state.collection;
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
            });
        }
    }

    render() {
        return (
            <div>
                <Menu
                    menutoggle={this.state.menutoggle}
                    toggleMenu={()=>this.toggleMenu()}
                    getCollections={this.getCollections.bind(this)}
                    selectCollection={this.selectCollection.bind(this)}
                />
                <div>
                    <Navbar toggleMenu={()=>this.toggleMenu()}/>
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
                    />
                </div>
            </div>
        );
    }
}

export default App;
