import React, { Component } from 'react';
import CollectionView from'./collectionView.js'

class Dashboard extends Component {
    render(){
        return(
            <div>
                {this.props.getView() && this.props.isAuth() ? (
                    <CollectionView
                    collection={this.props.getCollections(this.props.getView())}
                    />
                ) : (
                    <h1>Handle No Auth and Default Screen</h1>
                )}
            </div>
        );
    }
}

export default Dashboard;
