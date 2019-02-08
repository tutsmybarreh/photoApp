import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DefaultScreen from'./defaultScreen.js';

let style = {backgroundColor: '#ffffff', color: '#000000', height: 60, width: 60};

function AuthScreen(props){
    const [pinCode, updateCode] = useState("");
    function keyPress(key){
        updateCode(pinCode+key)
    }
    function sendPin(input){
        if(input){
            props.enterPin(pinCode)
            updateCode("")
        }
        else{
            updateCode("")
        }
    }

    return(
        <div>
            {props.isAuth ? (
                <DefaultScreen />
            ):(
                <div>
                    <Typography style={{color: '000000'}} variant="headline" align='center'>
                        {pinCode === "" ? "Lösenkod": pinCode}
                    </Typography>
                    <div className='PadContainer'>
                        <div className='NumberPad'>
                            <Grid container spacing={32}>
                                <Grid item xs={12} container spacing={0} alignItems='center'>
                                    <Key input={1} keyPress={()=>keyPress("1")}/>
                                    <Key input={2} keyPress={()=>keyPress("2")}/>
                                    <Key input={3} keyPress={()=>keyPress("3")}/>
                                </Grid>
                                <Grid item xs={12} container spacing={0} alignItems='center'>
                                    <Key input={4} keyPress={()=>keyPress("4")}/>
                                    <Key input={5} keyPress={()=>keyPress("5")}/>
                                    <Key input={6} keyPress={()=>keyPress("6")}/>
                                </Grid>
                                <Grid item xs={12} container spacing={0} alignItems='center'>
                                    <Key input={7} keyPress={()=>keyPress("7")}/>
                                    <Key input={8} keyPress={()=>keyPress("8")}/>
                                    <Key input={9} keyPress={()=>keyPress("9")}/>
                                </Grid>
                                <Grid item xs={12} container spacing={0} alignItems='center'>
                                    <KeyIcon icon={"clear"} sendPin={()=>sendPin()} />
                                    <Key input={0} keyPress={()=>keyPress("0")}/>
                                    <KeyIcon icon={"keyboard_return"} sendPin={()=>sendPin(true)} />
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

function Key(props, value){
    return(
        <Grid item xs={4} align="center">
            <IconButton style={style} onClick={()=>props.keyPress(value)}>{props.input}</IconButton>
        </Grid>
    );
}

function KeyIcon(props, value){
    return(
        <Grid item xs={4} align="center">
            <IconButton style={style} onClick={()=>props.sendPin(value)}>
                <Icon>{props.icon}</Icon>
            </IconButton>
        </Grid>
    );
}

export default AuthScreen;
