import React from 'react';
import { 
  BrowserRouter as Router, 
  Route,
  Switch
} from "react-router-dom"


//layouts
import DefaultLayout from '../layouts/default/default'

//views
import Home from '../pages/Home/Home'


const DefaultRoute = ({ component: Component, ...rest} ) => (
  <Route
    {...rest}
    render= { props => (
      <DefaultLayout><Component {...props}/></DefaultLayout>
    )}
  />
)


const MainRoute  = () => (
  <Router>
    <Switch>
      <DefaultRoute exact path={'/'} component={Home}/>
    </Switch>
  </Router>
)

export default MainRoute





