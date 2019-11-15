import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    username: '',
    password: ''
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }
  render() {
  return (
    <div className="App">
      <div className="register">
        <h2>Register Here</h2>
        <form>
          <input placeholder="username" type="text" name="username" value={this.state.username} onChange={this.handleChange} />
        </form>
      </div>
    </div>
  );}
}

export default App;
