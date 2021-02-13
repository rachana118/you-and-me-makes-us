import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';
import { useSelector, useDispatch } from 'react-redux'

function App() {
  const isLogged = useSelector(state => state.isLogged)
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
