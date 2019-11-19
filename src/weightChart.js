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
        title: 'Vikt (kg)',
    },
}

function WeightChart(props){
    // console.log(window.gadgets)
    return(
        <div className='photoCard noselect'>
            <Paper elevation={1} square={true}>
                {props.weight ? (
                    <Chart
                        height={'400px'}
                        chartType="LineChart"
                        loader={<LinearProgress />}
                        data={loadData(props.weight)}
                        options={options}
                        rootProps={{ 'data-testid': '1' }}
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
        'kg'
    ]];
    datapoints.forEach(
        function(value){
            data.push([new Date(value[0]), value[1]])
        }
    )
    return data;
}

export default WeightChart;
