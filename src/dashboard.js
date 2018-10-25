import React, { Component } from 'react';
import CollectionView from'./collectionView.js';
import AuthScreen from'./authScreen.js';

class Dashboard extends Component {
    render(){
        return(
            <div>
                {this.props.getView() && this.props.isAuth() ? (
                    <CollectionView
                    collection={this.props.getCollections(this.props.getView())}
                    toggleFullScreen={this.props.toggleFullScreen.bind(this)}
                    />
                ) : (
                    <AuthScreen
                    isAuth={this.props.isAuth()}
                    pin={this.props.pin}
                    pinAddNumber={this.props.pinAddNumber.bind(this)}
                    clearPin={this.props.clearPin.bind(this)}
                    enterPin={this.props.enterPin.bind(this)}
                    />
                )}
            </div>
        );
    }
}

export default Dashboard;
