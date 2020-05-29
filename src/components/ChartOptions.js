import React from 'react';
import LineGraph from './LineGraph';

class ChartOptions extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: '',
      chartOptions: ['Bar Chart', 'Line Graph', 'Pie Chart'],
      selectedChart: {
        'Bar Chart': false,
        'Line Graph': false,
        'Pie Chart': false,
      },
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let chart = event.target.value;
    let selectedChart = { ...this.state.selectedChart };
    this.state.chartOptions.forEach((option) => {
      if (chart === option) {
        selectedChart[option] = true;
      } else {
        selectedChart[option] = false;
      }
    });
    this.setState({
      selected: chart,
      chartOptions: this.state.chartOptions,
      selectedChart,
    });
  }

  render() {
    return (
      <div>
        <select value={this.state.selected} onChange={this.handleChange}>
          {this.state.chartOptions.map((chart) => {
            return <option value={chart}>{chart}</option>;
          })}
        </select>
        {this.state.selectedChart['Line Graph'] && (
          <LineGraph columnTitles={this.props.columnTitles} />
        )}
      </div>
    );
  }
}

export default ChartOptions;
