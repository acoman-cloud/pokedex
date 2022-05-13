import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import List from './components/List';
import Pokemon from './components/Pokemon';
import Home from './components/Home';


function App() {

  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <h1>Pokedex</h1>
        <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/list' onClick={localStorage.setItem('gen', 0)}>National</Link>
        </li>
      </ul>
      </header>
    </div>
    <Switch>
      <Route path="/pokemon" component={Pokemon} />
      <Route path="/list" component={List} />
      <Route path="/" component={Home} />
    </Switch>
    </Router>
  );
}

export default App;
