import React from 'react';
import axios from 'axios';
import ChartOptions from './ChartOptions';

class Home extends React.Component {
  constructor() {
    super();
    this.state = { uploaded: false, csvFile: null, columnTitles: null };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let state = {
      uploaded: false,
      csvFile: event.target.files[0],
    };
    this.setState(state);
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      const data = new FormData();
      data.append('dataFile', this.state.csvFile);
      const res = await axios.post('/api/post_csv_file', data);
      if (res.status === 200) {
        let columnTitles = res.data.split(',');
        this.setState({
          uploaded: true,
          csvFile: this.state.csvFile,
          columnTitles: columnTitles,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div>
        <h3>Upload a data file: </h3>
        <form onSubmit={this.handleSubmit}>
          <label>
            CSV file:
            <input
              name="dataFile"
              type="file"
              onChange={this.handleChange}
              required
            />
          </label>
          <button type="submit">Upload</button>
        </form>
        {this.state.uploaded && (
          <div>
            Your file has uploaded. Choose chart options below to generate your
            chart or click "choose file" to change the file.
            <ChartOptions columnTitles={this.state.columnTitles} />
          </div>
        )}
      </div>
    );
  }
}

export default Home;
