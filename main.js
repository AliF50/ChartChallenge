var app = angular.module('myApp', ['zingchart-angularjs']);

app.controller('MainController', function($scope) {
    $scope.myConfig = {
        //chart styling
        type: 'line', //line graph
        globals: {
            fontFamily: 'Roboto',
        },
        backgroundColor: '#fff',
        plotarea: {
            marginTop: '50px', //positioning of graph itself
            marginLeft: '20%'
        },
        legend: {
            layout: '6x1', //make it 6 rows by 1 column
            align: 'left', //position of legend
            verticalAlign: 'top', //position of legend
            toggleAction: 'hide', //hides series if clicked on
            highlightPlot: true, //highlights the series if mouse hovers over
        },
        scaleX: {
            minValue: new Date().getTime(),
            step: '1250', //every x value will be 1250s
            transform: {
                type: 'date', //type of date
                all: '%h:%i:%s' //format to be present in the x-axis
            },
            item: {
                fontSize: 9
            },
            maxItems: 4 //display maximum 4 values on the x-axis
        },
        crosshairX: { //options for crosshair when user hovers over points in graph
            lineWidth: 4,
            lineStyle: 'dashed',
            lineColor: '#424242',
            marker: {
                visible: true,
                size: 9
            },
            plotLabel: {
                backgroundColor: '#fff',
                borderColor: '#e3e3e3',
                borderRadius: 5,
                padding: 15,
                fontSize: 15,
                shadow: true,
                shadowAlpha: 0.2,
                shadowBlur: 5,
                shadowDistance: 4,
            },
            scaleLabel: {
                backgroundColor: '#424242',
                padding: 5
            }
        },
        scaleY: {
            guide: {
                lineColor: 'black', //main guides every 20 units
                lineWidth: 2,
                lineStyle: 'solid' //"solid", "dotted", "dashed", "dashdot"
            },
            values: '0:100:20', //go from 0 to 100, put a guide every 20 units
            minorTicks: 3, //3 minor ticks between each guide
            minorGuide: { //styling of minor guides
                lineColor: 'grey',
                lineWidth: 1,
                lineStyle: 'solid',
                alpha: 1
            }
        },
        tooltip: {
            visible: false
        },
        //real-time feed
        refresh: { //gets realtime data from window.feed function
            type: 'feed',
            transport: 'js',
            url: 'feed()',
            interval: 1250, //update every 1.25seconds
            adjustScale: true, //make graph start from the left
            resetTimeout: 1000 //used to create a flow of data and no refreshes, default is after 100 points, it refereshes
        },
        plot: { //properties of the plot function
            shadow: 1,
            shadowColor: '#eee',
            shadowDistance: '10px',
            lineWidth: 5,
            hoverState: { visible: false },
            marker: { visible: false },
            aspect: 'spline', //spline to make smooth curves
            highlightState: {
                lineWidth: '10px'
            },
        },
        series: [{ //all of the series data
            values: [],
            lineColor: 'teal',
            text: '211'
        }, {
            values: [],
            lineColor: 'cyan',
            text: '212'
        }, {
            values: [],
            lineColor: 'blue',
            text: '213'
        }, {
            values: [],
            lineColor: 'purple',
            text: '214'
        }, {
            values: [],
            lineColor: 'magenta',
            text: '215'
        }, {
            values: [],
            lineColor: 'orange',
            text: '216'
        }]
    };

    //real-time feed random math function
    window.feed = function(callback) {
        var xValue = new Date().getTime() / 1000; //make the sin value as a function of time in seconds
        var sinValue = Math.sin(0.4 * Math.PI * xValue); //get the value of sin
        var tick = {}; //sin(0.4*PI*x)
        tick.plot0 = parseInt((85 + 100) / 2 + 7.5 * Math.random() * sinValue, 10); //some math to determine the 
        tick.plot1 = parseInt((75 + 90) / 2 + 7.5 * Math.random() * sinValue, 10); //axis of symmetry and
        tick.plot2 = parseInt((65 + 80) / 2 + 7.5 * Math.random() * sinValue, 10); //amplitude (amplitude is random between 0-7.5)
        tick.plot3 = parseInt((55 + 75) / 2 + 7.5 * Math.random() * sinValue, 10);
        tick.plot4 = parseInt((50 + 70) / 2 + 7.5 * Math.random() * sinValue, 10);
        tick.plot5 = parseInt((45 + 65) / 2 + 7.5 * Math.random() * sinValue, 10);
        callback(JSON.stringify(tick));
    };


    $scope.clearGraph = function() { //for the clear button
        zingchart.exec('chart-1', 'clearfeed'); //chart-1 is the id in the html
    }

    $scope.startGraph = function() { //for the start button
        zingchart.exec('chart-1', 'startfeed');
    }

    $scope.stopGraph = function() { //for the stop button
        zingchart.exec('chart-1', 'stopfeed');
    }
});
