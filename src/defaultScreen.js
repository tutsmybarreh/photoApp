import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import WeightChart from'./weightChart.js';
import LenghtChart from'./lenghtChart.js';

class DefaultScreen extends Component {
    render(){
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
                <Typography variant="headline" align='center'>
                    Tilde
                </Typography>
                <Typography variant="subheading" align='center' paragraph={true}>
                    {tildeBorn.toJSON().slice(0,10).replace(/-/g,'-')}
                </Typography>
                <Typography align='center' gutterBottom={true}>
                    Jag föddes klockan <b>11:34</b> måndagen den 24 september för <b>{daysAge}</b> dagar sen.
                </Typography>
                <Typography align='center' paragraph={true}>
                    Idag är jag <b>{years}</b> år, <b>{months}</b> månader och <b>{days}</b> dagar gammal.
                </Typography>

                <WeightChart />
                    <Typography align='center' paragraph={true}>
                        Vid min födsel vägde jag <b>3970</b> gram.
                    </Typography>
                <LenghtChart />
                    <Typography align='center' gutterBottom={true}>
                        Jag var <b>52</b> centimeter lång.
                    </Typography>
            </div>
        );
    }
}

export default DefaultScreen;
