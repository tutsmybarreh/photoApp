import React from 'react';
import Chart from 'react-google-charts';
import LinearProgress from '@material-ui/core/LinearProgress';

function DataChart(props){
    let options = {
        pointSize: 5,
        legend: 'none',
        hAxis: {
            title: 'Datum',
            format:'yyyy-MM-dd',
        },
        vAxis: {
            title: props.title,
        },
        backgroundColor: 'transparent'
    };
    return(
        <div className='photoCard noselect'>
            {props.data ? (
                <Chart
                    height={'400px'}
                    chartType="LineChart"
                    loader={<LinearProgress />}
                    data={loadData(props.data, props.dataPoint)}
                    options={options}
                    rootProps={{'data-testid' : props.value}}
                />
            ):(
                <LinearProgress />
            )
            }   
    </div>
);
}

function loadData(datapoints, pointTitle){
    let data = [[
        { type: 'date', label: 'Datum' },
        pointTitle
    ]];
    datapoints.forEach(
        function(value){
            data.push([new Date(value[0]), value[1]])
        }
    )
    return data;
}

export default DataChart;
