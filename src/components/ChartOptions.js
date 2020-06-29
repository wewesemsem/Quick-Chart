import React from 'react';
import LineGraph from './LineGraph';
import { Form } from 'react-bootstrap';

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
        <Form>
          <Form.Group>
            <Form.Label>Chart Type</Form.Label>
            <Form.Control
              as="select"
              value={this.state.selected}
              onChange={this.handleChange}
              className="Inputs"
            >
              {this.state.chartOptions.map((chart) => {
                return <option value={chart}>{chart}</option>;
              })}
            </Form.Control>
          </Form.Group>
        </Form>

        {this.state.selectedChart['Line Graph'] && (
          <LineGraph
            columnTitles={this.props.columnTitles}
            csvFilePath={this.props.csvFilePath}
          />
        )}
      </div>
    );
  }
}

export default ChartOptions;
