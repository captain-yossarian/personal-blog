import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  handleClick() {
    fetch('https://react-backend.azurewebsites.net/add').then(data => {
      if (typeof data.json === 'function') {
        data.json().then(elem => {
          console.log({ elem })
        })
      } else {
        console.log({ data })
      }
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={this.handleClick}>
            <img src={logo} className="App-logo" alt="logo" />
          </button>
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Keep calm and Learn React 1
        </a>
        </header>
      </div>
    );
  }

}

export default App;
