import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import "./App.css"
import "./App.scss"
import Exercise1 from './containers/Exercise1'
import Exercise2 from './containers/Exercise2'

const App = () => {
  return(
    <Router>
      <div className="app">
        <h1>
          Hello Webpack React
        </h1>
        <div className="links">
          <ul>
            <li>
              <Link to="/exercise1">Exercise 1</Link>
            </li>
            <li>
              <Link to="/exercise2">Exercise 2</Link>
            </li>
          </ul>
        </div>
        <section className="container">
          <Switch>
            <Route exact path="/exercise1">
              <Exercise1 />
            </Route>
            <Route exact path="/exercise2">
              <Exercise2 />
            </Route>
          </Switch>
        </section>
      </div>
    </Router>
  )
}

export default App