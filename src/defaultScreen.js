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
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';

let color = '#3366ff';

function DefaultScreen(props){
    //Add feature hooks
    const [addMeasurment, toggleMeasurment] = useState("");
    const [valueHolder, toggleValue] = useState(null);
    const [dateHolder, toggleDate] = useState(null);
    //Remove Feature Hooks
    const [verifyDelete, deletePromt] = useState(false);
    const [removeMeasurment, toggleRemove] = useState("");
    const [targetCollection, toggleTarget] = useState("");
    const [deleteId, toggleId] = useState(null);

    function toggleMeasurmentAndSetHook(input){
        toggleMeasurment(input)
        toggleDate(new Date());
        toggleValue(props[input][props[input].length-1][1])
    }

    function closeDialogUpdateChart(){
        props.updateChart(addMeasurment, dateHolder, parseFloat(valueHolder));
        toggleMeasurment("");
    }

    function closeDialogRemove(collection, object){
        //Promt OK
        toggleRemove("");
        toggleId(object[2]);
        toggleTarget(collection);
        deletePromt(true);
    }

    function closeDialogReply(reply = false){
        if (reply){
            props.deleteFromChart(targetCollection, deleteId)
        }
        deletePromt(false);
        toggleId(null);
        toggleTarget("");
    }

    let currentDate = new Date();
    let tildeBorn = new Date('2018-09-24T11:34:00');
    let daysAge = ((Math.round((currentDate.getTime()-tildeBorn.getTime())/8640000))/10).toFixed(1);
    //Calculate Years, Months, Days
    let years = new Date(currentDate-tildeBorn).getYear()-70;
    let months = new Date(currentDate-tildeBorn).getMonth();
    let days = new Date(currentDate-tildeBorn).getDate()-1;

    return(
        <div>
            <Typography variant="h4" align='center'>Tilde</Typography>
            <Typography variant="h5" align='center' paragraph={true}>{tildeBorn.toJSON().slice(0,10).replace(/-/g,'-')}</Typography>
            <Typography align='center' paragraph={true}>Jag föddes klockan <b>11:34</b> måndagen den 24 september för <b>{daysAge}</b> dagar sen.</Typography>
            <Typography align='center' paragraph={true}>Idag är jag <b>{years}</b> år, <b>{months}</b> månader och <b>{days}</b> dagar gammal.</Typography>
            <Typography align='center' paragraph={true}>Den 9 november, 2019, bestämde jag mig för att börja gå istället för att krypa.</Typography>

            <Typography align='center'>Vid min födsel vägde jag <b>3970</b> gram.</Typography>
            <WeightChart weight={props.weight} firebaseUser={props.firebaseUser}/>
            {props.firebaseUser ? editBar(()=>toggleMeasurmentAndSetHook('weight'), ()=>toggleRemove('weight')):null}

            <Typography align='center'>Jag var <b>52</b> centimeter lång.</Typography>
            <LenghtChart height={props.height} firebaseUser={props.firebaseUser}/>
            {props.firebaseUser ? editBar(()=>toggleMeasurmentAndSetHook('height'), ()=>toggleRemove('height')):null}

            <Dialog open={addMeasurment === 'weight' || addMeasurment === 'height'} onClose={()=>toggleMeasurment('')} fullWidth>
                <DialogTitle id="addMeasure">{addMeasurment === 'weight' ? 'Lägg till vikt': addMeasurment === 'height' ? 'Lägg till längd':''}</DialogTitle>
                <DialogContent>
                    <TextField
                        id="date"
                        label="Datum"
                        type="date"
                        defaultValue={new Date().toJSON().slice(0,10).replace(/-/g,'-')}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={e=>toggleDate(new Date(e.target.value))}
                        fullWidth
                    />
                    <TextField
                        id="standard-name"
                        label={addMeasurment === 'weight' ? 'Vikt (kg)': addMeasurment === 'height' ? 'Längd (cm)':''}
                        margin="normal"
                        type="number"
                        defaultValue={getLatest(props, addMeasurment)}
                        onChange={e=>toggleValue(e.target.value)}
                        fullWidth
                    />
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
            <Dialog open={removeMeasurment === 'weight' || removeMeasurment === 'height'} onClose={()=>toggleRemove('')} fullWidth>
                <DialogContent>
                    <List>
                        {props[removeMeasurment] ? (
                            props[removeMeasurment].map(
                                function(value){
                                    let date = value[0].toJSON().slice(0,10).replace(/-/g,'-');
                                    let unit = removeMeasurment === 'weight' ? 'kg' : 'cm';
                                    return <ListItem key={value[2]}>
                                        <IconButton aria-label="Delete" onClick={()=>closeDialogRemove(removeMeasurment, value)}>
                                            <DeleteIcon />
                                        </IconButton>
                                        <ListItemText
                                            primary={date}
                                            secondary={value[1]+' '+unit}
                                            />
                                    </ListItem>;
                                }
                            ).reverse()
                        ):null
                    }
                </List>
            </DialogContent>
        </Dialog>
        <Dialog open={verifyDelete} onClose={()=>deletePromt(false)} fullWidth>
            <DialogTitle id="approveDelete">Ta bort?</DialogTitle>
            <DialogContent>
                <Toolbar>
                    <IconButton style={{color:color, marginLeft:'auto'}} onClick={()=>closeDialogReply(true)}>
                        <Icon>check</Icon>
                    </IconButton>
                    <IconButton style={{color:color, marginRight:'auto'}} onClick={()=>closeDialogReply()}>
                        <Icon>close</Icon>
                    </IconButton>
                </Toolbar>
            </DialogContent>
        </Dialog>
    </div>
);
}

function getLatest(props, sort){
    if (props[sort])
    return props[sort][props[sort].length-1][1]
}

function editBar(toggle, toggleDelete){
    return (
        <Toolbar>
            <IconButton style={{color:color, marginLeft:'auto'}} onClick={toggle}>
                <Icon>add</Icon>
            </IconButton>
            <IconButton style={{color:color, marginRight:'auto'}} onClick={toggleDelete}>
                <Icon>remove</Icon>
            </IconButton>
        </Toolbar>
    )
}

export default DefaultScreen;
