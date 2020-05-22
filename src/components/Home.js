import React from 'react';
import axios from 'axios';

class Home extends React.Component {
  constructor() {
    super();
    this.state = { uploaded: false, csvFile: null };
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
      console.log("SUCCHESSS",res);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    if (this.state.uploaded) {
      return (
        <div>
          Your file has uploaded. Choose chart options below to generate your
          chart.
        </div>
      );
    }
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
      </div>
    );
  }
}

export default Home;
