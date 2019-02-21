import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import WeightChart from'./weightChart.js';
import LenghtChart from'./lenghtChart.js';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

let color = '#3366ff';

function DefaultScreen(props){
    const [addMeasurment, toggleMeasurment] = useState("");
    const [dateHolder, toggleDate] = useState(null);
    const [valueHolder, toggleValue] = useState(null);

    function toggleMeasurmentAndSetHook(input){
        toggleMeasurment(input)
        toggleDate(new Date());
        if (input==='vikt'){
            toggleValue(props.weight[props.weight.length-1][1])
        }
        if (input==='längd'){
            toggleValue(props.height[props.height.length-1][1])
        }
    }

    function closeDialogUpdateChart(){
        props.updateChart(addMeasurment, dateHolder, valueHolder);
        toggleMeasurment("");
    }

    let currentDate = new Date();
    let tildeBorn = new Date('2018-09-24T11:34:00');
    let daysAge = ((Math.round((currentDate.getTime()-tildeBorn.getTime())/8640000))/10).toFixed(1);
    //Calculate Years, Months, Days
    let years = currentDate.getFullYear()-tildeBorn.getFullYear();
    let months = currentDate.getMonth()-tildeBorn.getMonth();
    let days = currentDate.getDate()-tildeBorn.getDate();
    let DaysLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    if (months < 0){
        months+=12;
        years-=1;
    }
    if (days < 0){
        months -=1;
        days+=DaysLastMonth;
    }
    return(
        <div>
            <Typography variant="headline" align='center'>Tilde</Typography>
            <Typography variant="subheading" align='center' paragraph={true}>{tildeBorn.toJSON().slice(0,10).replace(/-/g,'-')}</Typography>
            <Typography align='center' paragraph={true}>Jag föddes klockan <b>11:34</b> måndagen den 24 september för <b>{daysAge}</b> dagar sen.</Typography>
            <Typography align='center' paragraph={true}>Idag är jag <b>{years}</b> år, <b>{months}</b> månader och <b>{days}</b> dagar gammal.</Typography>

            <Typography align='center'>Vid min födsel vägde jag <b>3970</b> gram.</Typography>
            <WeightChart weight={props.weight} firebaseUser={props.firebaseUser}/>
            {props.firebaseUser ? editBar(()=>toggleMeasurmentAndSetHook('vikt')):null}

            <Typography align='center'>Jag var <b>52</b> centimeter lång.</Typography>
            <LenghtChart height={props.height} firebaseUser={props.firebaseUser}/>
            {props.firebaseUser ? editBar(()=>toggleMeasurmentAndSetHook('längd')):null}

            <Dialog open={addMeasurment === 'vikt' || addMeasurment === 'längd'} onClose={()=>toggleMeasurment('')}>
                <DialogTitle id="testing">Lägg till {addMeasurment}</DialogTitle>
                <DialogContent>
                    <List>
                        <ListItem>
                            <TextField
                                id="date"
                                label="Datum"
                                type="date"
                                defaultValue={new Date().toJSON().slice(0,10).replace(/-/g,'-')}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={e=>toggleDate(new Date(e.target.value))}
                                />
                        </ListItem>
                        <ListItem>
                            <TextField
                                id="standard-name"
                                label={addMeasurment.charAt(0).toUpperCase() + addMeasurment.slice(1)}
                                margin="normal"
                                type="number"
                                defaultValue={getLatest(props, addMeasurment)}
                                onChange={e=>toggleValue(e.target.value)}
                                />
                        </ListItem>
                    </List>
                    <ListItem>
                        <IconButton onClick={()=>closeDialogUpdateChart()} style={{color:color, marginLeft:'auto'}}>
                            <Icon>check</Icon>
                        </IconButton>
                        <IconButton onClick={()=>toggleMeasurment('')} style={{color:color, marginRight:'auto'}}>
                            <Icon>close</Icon>
                        </IconButton>
                    </ListItem>
                </DialogContent>
            </Dialog>
        </div>
    );
}

function getLatest(props, sort){
    if (sort==='vikt' && props.weight){
        return props.weight[props.weight.length-1][1]
    }
    if (sort==='längd' && props.height){
        return props.height[props.height.length-1][1]
    }
}

function editBar(toggle){
    return (
        <Toolbar>
            <IconButton style={{color:color, marginLeft:'auto'}} onClick={toggle}>
                <Icon>add</Icon>
            </IconButton>
            <IconButton style={{color:color, marginRight:'auto'}}>
                <Icon>remove</Icon>
            </IconButton>
        </Toolbar>
    )
}

export default DefaultScreen;
