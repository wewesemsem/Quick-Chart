import React from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';

class LineGraph extends React.Component {
  constructor() {
    super();
    this.state = {
      XAxis: '',
      YAxis: '',
      charted: false,
      chartFile: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let state = { ...this.state };
    let axis = event.target.id;
    state[axis] = event.target.value;
    this.setState(state);
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      const data = new FormData();
      data.append('AxisOptions', [
        this.state.XAxis,
        this.state.YAxis,
        this.props.csvFilePath,
      ]);
      const res = await axios.post('/api/post_chart_options', data);

      let state = { ...this.state };
      state.charted = true;
      state.chartFile = process.env.PUBLIC_URL + res.data;
      this.setState(state);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>X Axis:</Form.Label>
            <Form.Control
              as="select"
              id="XAxis"
              value={this.state.XAxis}
              onChange={this.handleChange}
              className="Inputs"
            >
              {this.props.columnTitles.map((title) => {
                return <option value={title}>{title}</option>;
              })}
            </Form.Control>

            <Form.Label>Y Axis:</Form.Label>
            <Form.Control
              as="select"
              id="YAxis"
              value={this.state.YAxis}
              onChange={this.handleChange}
              className="Inputs"
            >
              {this.props.columnTitles.map((title) => {
                return <option value={title}>{title}</option>;
              })}
            </Form.Control>
          </Form.Group>

          <Button type="submit" variant="outline-success">
            Make Chart
          </Button>
        </Form>

        {this.state.charted && (
          <div>
            <img src={this.state.chartFile} alt="" />
          </div>
        )}
      </div>
    );
  }
}

export default LineGraph;
