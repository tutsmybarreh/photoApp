import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class AuthScreen extends Component {
    render(){
        console.log(this.props.isAuth)
        return(
            <div>
            {this.props.isAuth ? (
                <h1>Default Screen</h1>
            ):(
                <div className='NumberPad'>
                    <Button variant="fab">1</Button>
                    <Button variant="fab">2</Button>
                    <Button variant="fab">3</Button>
                </div>
            )
            }
            </div>
        );
    }
}

export default AuthScreen;
