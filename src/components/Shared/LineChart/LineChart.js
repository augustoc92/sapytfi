import React from 'react';
import Chart from 'chart.js'

export default class BarChart extends React.Component {

    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
    }

    componentDidMount() {
        console.log('this.props.data', this.props)

        this.myChart = new Chart(this.chartRef.current, {
            type: 'line',
            data: {
            labels: this.props.data.map(d => d.label),
            datasets: [{
                label: this.props.label,
                data: this.props.data.map(d => d.value),
                backgroundColor: this.props.color
            }]
            }
        });
    }

    render() {
        return <canvas ref={this.chartRef} />
    }
}