import React from 'react';
import Chart from 'chart.js'

export default class BarChart extends React.Component {

    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
    }

    state = {
        examenId: false
    }

    componentWillReceiveProps(props) {
        if (props.examenId !== this.props.examenId) {
            this.myChart.update();
        }
    }

    componentDidMount() {
        this.myChart =  new Chart(this.chartRef.current, {
            type: 'bar',
            data: {
                labels: ['Intento', 'Aciertos'],
                datasets: [{
                    label: this.props.dataS.label,
                    data: this.props.dataS.data.map(x => x.value),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    minBarLength: 1,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

    render() {
        return <canvas ref={this.chartRef} />
    }
}
