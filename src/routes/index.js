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
import Statistics from '../pages/Statistics/Statistics'
import Recommendations from '../pages/Recommendations/Recommendations'


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
      <DefaultRoute exact path={'/estadisticas'} component={Statistics}/>
      <DefaultRoute exact path={'/recomendaciones'} component={Recommendations}/>
    </Switch>
  </Router>
)

export default MainRoute





