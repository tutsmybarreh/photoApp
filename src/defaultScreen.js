import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Chart from 'react-google-charts';

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
            <Typography align='center' gutterBottom={true}>
            Idag är jag <b>{years}</b> år, <b>{months}</b> månader och <b>{days}</b> dagar gammal.
            </Typography>
            <Typography align='center' gutterBottom={true}>
            Vid min födsel vägde jag <b>3970</b> gram.
            </Typography>
            <Chart
            height={'400px'}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={[
                [
                    { type: 'date', label: 'Datum' },
                    'kg'
                ],
                [new Date('2018-09-24'), 3.970],
                [new Date('2018-09-28'), 3.500],
                [new Date('2018-09-29'), 3.620],
                [new Date('2018-10-01'), 3.756],
                [new Date('2018-10-04'), 3.870],
                [new Date('2018-10-08'), 4.000],
            ]}
            rootProps={{ 'data-testid': '1' }}
            />
            <Typography align='center' gutterBottom={true}>
            Vikt, längd, huvudomfång!
            </Typography>
            </div>
        );
    }
}

export default DefaultScreen;