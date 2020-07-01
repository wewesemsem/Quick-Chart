import React from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';

class PieChart extends React.Component {
  constructor() {
    super();
    this.state = {
      labels: '',
      sizes: '',
      charted: false,
      chartFile: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let state = { ...this.state };
    let choice = event.target.id;
    state[choice] = event.target.value;
    this.setState(state);
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      const data = new FormData();
      data.append('AxisOptions', [
        this.state.labels,
        this.state.sizes,
        this.props.csvFilePath,
      ]);
      const res = await axios.post('/api/post_pie_chart', data);

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
            <Form.Label>Labels:</Form.Label>
            <Form.Control
              as="select"
              id="labels"
              value={this.state.XAxis}
              onChange={this.handleChange}
              className="Inputs"
            >
              {this.props.columnTitles.map((title) => {
                return <option value={title}>{title}</option>;
              })}
            </Form.Control>

            <Form.Label>Sizes:</Form.Label>
            <Form.Control
              as="select"
              id="sizes"
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

export default PieChart;
