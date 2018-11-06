import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Chart from 'react-google-charts';

class WeightChart extends Component {
    render(){
        return(
            <div className='photoCard'>
            <Paper elevation={1} square={true}>
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
                [new Date('2018-10-22'), 4.550],
                [new Date('2018-10-31'), 4.760],
                [new Date('2018-11-05'), 4.900],
            ]}
            options={{
                pointSize: 5,
                legend: 'none',
                hAxis: {
                    title: 'Datum',
                    format:'yyyy-MM-dd',
                },
                vAxis: {
                    title: 'Vikt (kg)',
                },
            }}
            rootProps={{ 'data-testid': '1' }}
            />
            </Paper>
            </div>
        );
    }
}

export default WeightChart;
