import React from 'react';
import Paper from '@material-ui/core/Paper';
import Chart from 'react-google-charts';
import LinearProgress from '@material-ui/core/LinearProgress';

let options = {
    pointSize: 5,
    legend: 'none',
    hAxis: {
        title: 'Datum',
        format:'yyyy-MM-dd',
    },
    vAxis: {
        title: 'Längd (cm)',
    },
};

function LenghtChart(props){
    return(
        <div className='photoCard noselect'>
            <Paper elevation={1} square={true}>
                {props.height ? (
                    <Chart
                        height={'400px'}
                        chartType="LineChart"
                        loader={<LinearProgress />}
                        data={loadData(props.height)}
                        options={options}
                        rootProps={{ 'data-testid': '2' }}
                        />
                ):(
                    <LinearProgress />
                )
            }
        </Paper>
    </div>
);
}

function loadData(datapoints){
    let data = [[
        { type: 'date', label: 'Datum' },
        'cm'
    ]];
    datapoints.forEach(
        function(value){
            data.push([new Date(value[0]), value[1]])
        }
    )
    return data;
}

export default LenghtChart;
