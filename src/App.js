import React, { Component } from 'react';
import Navbar from "./navbar.js";
import Menu from "./menu.js";
import './App.css'

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            menutoggle:false,
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
                    menutoggle:true,
                });
            }
        }
    }


    render() {
        console.log(this.state)
        return (
            <div>
                <Menu
                menutoggle={this.state.menutoggle}
                toggleMenu={()=>this.toggleMenu()}
                />
                <div>
                    <Navbar toggleMenu={()=>this.toggleMenu()}/>
                </div>
            </div>
        );
    }
}

export default App;
