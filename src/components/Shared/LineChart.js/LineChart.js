import React from 'react';

export default class BarChart extends React.Component {

    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
    }

    componentDidMount() {
            this.myChart = new Chart(this.canvasRef.current, {
            type: 'line',
            data: {
            labels: this.props.data.map(d => d.label),
            datasets: [{
                label: this.props.title,
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