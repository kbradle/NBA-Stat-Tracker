import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div Classname = "Table">
        <table>
          <thead>
          <tr>
            <th>put</th>
            <th>stuff</th>
            <th>here</th>
          </tr>
          </thead>

          <tbody>
          <tr>
            <td>hello</td>
            <td>world</td>
            <td>!</td>
          </tr>
          <tr>
            <td>hello</td>
            <td>world</td>
            <td>!</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
