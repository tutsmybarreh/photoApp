import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function AdminLogin(props){
    const [user, updateUser] = useState("");
    const [password, updatePassword] = useState("");
    return props.firebaseUser === null ? (
        <div className='loginContainer'>
            <div className='AdminInputField'>
                <TextField
                    style={{width:200}}
                    id="emailInput"
                    label="Mailadress"
                    margin="normal"
                    type="email"
                    onChange={e => updateUser(e.target.value)}
                />
                </div>
                <div className='AdminInputField'>
                <TextField
                    style={{width:200}}
                    id="passwordInput"
                    label="Lösenord"
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    onChange={e => updatePassword(e.target.value)}
                />
                </div>
                <div className='AdminInputField'>
                <Button variant="outlined" onClick={()=>props.loginAdmin(user, password)} style={{width:200}}>
                    Logga in
                </Button>
                </div>
        </div>
    ) : (
        <div className='loginContainer'>
        <Typography variant="h7" align='center' paragraph={true}>
        Inloggad som <b>{props.firebaseUser.email}</b>
        </Typography>
        <div className='AdminInputField'>
            <Button variant="outlined" style={{width:200}} onClick={()=>props.logoutAdmin()}>
                Logga ut
            </Button>
            </div>

        </div>
    );
}

export default AdminLogin;
