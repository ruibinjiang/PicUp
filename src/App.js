import logo from './logo.svg';
import './App.css';

import { Switch, Route , Redirect} from 'react-router-dom';
import Login from './features/Login';
import Home from './features/Home';

const Main = () => {
  return (
      <Switch> {/* The Switch decides which component to show based on the current URL.*/}
        <Route path="/login" component={Login} />
        <Route path="/app/home" component={Home} />
        <Redirect from="/" to="/login" />
      </Switch>
  );
}

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
    </div>
  );
}

export default Main;
