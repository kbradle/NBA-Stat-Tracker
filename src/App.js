import './App.css';
import {Switch, Route} from 'react-router-dom';
import Query1 from './Query1';
import Query2 from './Query2';
import Query3 from './Query3';
import Query4 from './Query4';
import Query5 from './Query5';
import Query6 from './Query6';
import Home from './Home';

function App() {
  return (
    <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/query1' component={Query1}></Route>
        <Route exact path='/query2' component={Query2}></Route>
        <Route exact path='/query3' component={Query3}></Route>
        <Route exact path='/query4' component={Query4}></Route>
        <Route exact path='/query5' component={Query5}></Route>
        <Route exact path='/query6' component={Query6}></Route>
      </Switch>
  );
}

export default App;
