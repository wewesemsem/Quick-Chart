import React from 'react';
import axios from 'axios';

class Home extends React.Component {
  constructor() {
    super();
    this.state = { message: 'Oops not yet' };
  }
  async componentDidMount() {
    try {
      const message = await axios.get('/api/getChart');
      this.setState({ message: message.data });
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    return <div>{this.state.message}</div>;
  }
}

export default Home;
