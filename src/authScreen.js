import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

class AuthScreen extends Component {
    render(){
        let style = {backgroundColor: '#ffffff', color: '#000000'};
        return(
            <div>
            {this.props.isAuth ? (
                <h1>Default Screen</h1>
            ):(
                <div>
                    <Typography style={{color: '000000'}} variant="headline" component="h1" align='center'>
                        {this.props.pin === "" ? "Lösenkod": this.props.pin}
                    </Typography>

                <div className='PadContainer'>
                <div className='NumberPad'>

                    <Grid container spacing={32}>
                        <Grid item xs={12} container spacing={0} alignItems='center'>
                            <Grid item xs={4} align="center">
                                <IconButton style={style} onClick={()=>this.props.pinAddNumber("1")}>1</IconButton>
                            </Grid>
                            <Grid item xs={4} align="center">
                                <IconButton style={style} onClick={()=>this.props.pinAddNumber("2")}>2</IconButton>
                            </Grid>
                            <Grid item xs={4} align="center">
                                <IconButton style={style} onClick={()=>this.props.pinAddNumber("3")}>3</IconButton>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} container spacing={0} alignItems='center'>
                            <Grid item xs={4} align="center">
                                <IconButton style={style} onClick={()=>this.props.pinAddNumber("4")}>4</IconButton>
                            </Grid>
                            <Grid item xs={4} align="center">
                                <IconButton style={style} onClick={()=>this.props.pinAddNumber("5")}>5</IconButton>
                            </Grid>
                            <Grid item xs={4} align="center">
                                <IconButton style={style} onClick={()=>this.props.pinAddNumber("6")}>6</IconButton>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} container spacing={0} alignItems='center'>
                            <Grid item xs={4} align="center">
                                <IconButton style={style} onClick={()=>this.props.pinAddNumber("7")}>7</IconButton>
                            </Grid>
                            <Grid item xs={4} align="center">
                                <IconButton style={style} onClick={()=>this.props.pinAddNumber("8")}>8</IconButton>
                            </Grid>
                            <Grid item xs={4} align="center">
                                <IconButton style={style} onClick={()=>this.props.pinAddNumber("9")}>9</IconButton>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} container spacing={0} alignItems='center'>
                            <Grid item xs={4} align="center">
                                <IconButton style={style} onClick={()=>this.props.clearPin()}>
                                    <Icon>clear</Icon>
                                </IconButton>
                            </Grid>
                            <Grid item xs={4} align="center">
                                <IconButton style={style} onClick={()=>this.props.pinAddNumber("0")}>0</IconButton>
                            </Grid>
                            <Grid item xs={4} align="center">
                                <IconButton style={style} onClick={()=>this.props.enterPin()}>
                                    <Icon>keyboard_return</Icon>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
                </div>
                </div>
            )
            }
            </div>
        );
    }
}

export default AuthScreen;
