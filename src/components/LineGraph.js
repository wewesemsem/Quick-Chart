import React from 'react';
import axios from 'axios';

class LineGraph extends React.Component {
  constructor() {
    super();
    this.state = {
      XAxis: '',
      YAxis: '',
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
      data.append('AxisOptions', this.state);
      const res = await axios.post('/api/post_chart_options', data);
      console.log('Submitted!----->', res);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            X Axis:
            <select
              id="XAxis"
              value={this.state.XAxis}
              onChange={this.handleChange}
            >
              {this.props.columnTitles.map((title) => {
                return <option value={title}>{title}</option>;
              })}
            </select>
          </label>
          <label>
            Y Axis:
            <select
              id="YAxis"
              value={this.state.YAxis}
              onChange={this.handleChange}
            >
              {this.props.columnTitles.map((title) => {
                return <option value={title}>{title}</option>;
              })}
            </select>
          </label>
          <button type="submit">Make Chart</button>
        </form>
      </div>
    );
  }
}

export default LineGraph;
