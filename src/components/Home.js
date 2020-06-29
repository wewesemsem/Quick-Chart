import React from 'react';
import axios from 'axios';
import ChartOptions from './ChartOptions';
import { Form, Button, Alert } from 'react-bootstrap';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      uploaded: false,
      csvFile: null,
      columnTitles: null,
      csvFilePath: null,
    };
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
        let csvFilePath = columnTitles.pop();
        this.setState({
          uploaded: true,
          csvFile: this.state.csvFile,
          columnTitles: columnTitles,
          csvFilePath,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div>
        <h3>Quick-Chart: Upload a data file to create a chart.</h3>
        <Form inline onSubmit={this.handleSubmit}>
          <Form.Label>CSV file: </Form.Label>
          <Form.Group>
            <Form.File name="dataFile" onChange={this.handleChange} required />
          </Form.Group>
          <Button type="submit" variant="outline-success">
            Upload
          </Button>
        </Form>
        {this.state.uploaded && (
          <div>
            <Alert variant="success" className="Inputs Alert">
              Your file has uploaded. Select chart options below or click
              "choose file" to change the file.
            </Alert>
            <ChartOptions
              columnTitles={this.state.columnTitles}
              csvFilePath={this.state.csvFilePath}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Home;
