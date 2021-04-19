

import React from 'react'
import Signup from "./Component/Signup"
import Login from "./Component/Login"
import List from "./Component/List"
import {
  Switch,
  Route,
} from "react-router-dom";

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/signUp">
          <Signup />
        </Route>
        <Route exact path="/list">
          <List />
        </Route>
      </Switch>
    </div>
  )
}

