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
                    />
                ) : (
                    <AuthScreen
                    isAuth={this.props.isAuth()}
                    />
                )}
            </div>
        );
    }
}

export default Dashboard;
