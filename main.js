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
            "margin-top": '50px',
            "margin-left": "20%"
        },
        legend: {
            "layout": "6x1",
            "align": "left",
            "vertical-align": "top",
            "toggle-action": "hide",
            "highlight-plot": true,
        },
        "scale-x": {
            "min-value": new Date().getTime(),
            step: "1second",
            transform: {
                type: "date",
                all: "%h:%i:%s" //format to be present in the x-axis
            },
            item: {
                "font-size": 9
            }
        },
        crosshairX: {
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
                "line-color": "black",
                "line-width": 2,
                "line-style": "solid" //"solid", "dotted", "dashed", "dashdot"
            },
            values: '0:100:20',
            "minor-ticks": 3,
            "minor-guide": {
                "line-color": "grey",
                "line-width": 1,
                "line-style": "solid",
                "alpha": 1
            }
        },
        tooltip: {
            visible: false
        },
        //real-time feed
        refresh: {
            type: 'feed',
            transport: 'js',
            url: 'feed()',
            interval: 1250
        },
        plot: {
            shadow: 1,
            shadowColor: '#eee',
            shadowDistance: '10px',
            lineWidth: 5,
            hoverState: { visible: false },
            marker: { visible: false },
            aspect: 'spline',
            "highlight-state": {
                "line-width": "10 px"
            },
        },
        series: [{
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
            lineColor: 'Orange',
            text: '216'
        }]
    };

    //real-time feed random math function
    window.feed = function(callback) {
        var xValue = new Date().getTime() / 1000;
        var sinValue = Math.sin(0.4 * Math.PI * xValue);
        var tick = {}; //sin(0.4*PI*x)
        tick.plot0 = parseInt((85 + 100) / 2 + 7.5 * Math.random() * sinValue, 10);
        tick.plot1 = parseInt((75 + 90) / 2 + 7.5 * Math.random() * sinValue, 10);
        tick.plot2 = parseInt((65 + 80) / 2 + 7.5 * Math.random() * sinValue, 10);
        tick.plot3 = parseInt((55 + 75) / 2 + 7.5 * Math.random() * sinValue, 10);
        tick.plot4 = parseInt((50 + 70) / 2 + 7.5 * Math.random() * sinValue, 10);
        tick.plot5 = parseInt((45 + 65) / 2 + 7.5 * Math.random() * sinValue, 10);
        callback(JSON.stringify(tick));
    };


    $scope.clearGraph = function() {
        zingchart.exec('chart-1', 'clearfeed')
    }

    $scope.startGraph = function() {
        zingchart.exec('chart-1', 'startfeed');
    }

    $scope.stopGraph = function() {
        zingchart.exec('chart-1', 'stopfeed');
    }
});
