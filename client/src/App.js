import React from 'react';
import axios from 'axios'
import './App.css';

class App extends React.Component {
  state = {
    username: '',
    password: ''
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = e => {
    e.preventDefault();
    const newUser = {username: this.state.username, password: this.state.password}
    axios.post('http://localhost:3300/api/auth/register', newUser).then(res => {
      console.log(res.data)
    }).catch(err => {
      console.log(err.message)
    })

  }
  render() {
  return (
    <div className="App">
      <div className="register">
        <h2>Register Here</h2>
        <form onSubmit={this.handleSubmit}>
          <input placeholder="username" type="text" name="username" value={this.state.username} onChange={this.handleChange} />
          <input placeholder="password" type="password" name="password" value={this.state.password} onChange={this.handleChange} />
          <button>Register</button>
        </form>
      </div>
    </div>
  );}
}

export default App;
