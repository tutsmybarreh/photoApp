import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

class AuthScreen extends Component {
    render(){
        return(
            <div>
            {this.props.isAuth ? (
                <h1>Default Screen</h1>
            ):(
                <div className='PadContainer'>
                <div className='NumberPad'>
                    <Grid container spacing={16}>
                        <Grid item xs={12} align="center">
                            <Typography variant="headline" component="h1" align='center'>
                                {this.props.pin === "" ? "Lösenkod": this.props.pin}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={16}>
                        <Grid item xs={12} container spacing={0} alignItems='center'>
                            <Grid item xs={4} align="center">
                                <Button variant="fab" onClick={()=>this.props.pinAddNumber("1")}>1</Button>
                            </Grid>
                            <Grid item xs={4} align="center">
                                <Button variant="fab" onClick={()=>this.props.pinAddNumber("2")}>2</Button>
                            </Grid>
                            <Grid item xs={4} align="center">
                                <Button variant="fab" onClick={()=>this.props.pinAddNumber("3")}>3</Button>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} container spacing={0} alignItems='center'>
                            <Grid item xs={4} align="center">
                                <Button variant="fab" onClick={()=>this.props.pinAddNumber("4")}>4</Button>
                            </Grid>
                            <Grid item xs={4} align="center">
                                <Button variant="fab" onClick={()=>this.props.pinAddNumber("5")}>5</Button>
                            </Grid>
                            <Grid item xs={4} align="center">
                                <Button variant="fab" onClick={()=>this.props.pinAddNumber("6")}>6</Button>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} container spacing={0} alignItems='center'>
                            <Grid item xs={4} align="center">
                                <Button variant="fab" onClick={()=>this.props.pinAddNumber("7")}>7</Button>
                            </Grid>
                            <Grid item xs={4} align="center">
                                <Button variant="fab" onClick={()=>this.props.pinAddNumber("8")}>8</Button>
                            </Grid>
                            <Grid item xs={4} align="center">
                                <Button variant="fab" onClick={()=>this.props.pinAddNumber("9")}>9</Button>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} container spacing={0} alignItems='center'>
                            <Grid item xs={4} align="center">
                                <Button variant="fab" onClick={()=>this.props.clearPin()}>
                                    <Icon>clear</Icon>
                                </Button>
                            </Grid>
                            <Grid item xs={4} align="center">
                                <Button variant="fab" onClick={()=>this.props.pinAddNumber("0")}>0</Button>
                            </Grid>
                            <Grid item xs={4} align="center">
                                <Button variant="fab" onClick={()=>this.props.enterPin()}>
                                    <Icon>keyboard_return</Icon>
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
                </div>
            )
            }
            </div>
        );
    }
}

export default AuthScreen;
