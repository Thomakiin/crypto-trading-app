//import './App.css';
import Home from './Home';
import Coins from './Coins';
import CoinCompare from './CoinCompare';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>

      <nav>
      <Link to="/"> 
        Home 
        </Link>
        <Link to="/coins"> 
        Coins 
        </Link>
      </nav>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/coins">
          <Coins />
        </Route>
        <Route exact path="/coincompare">
          <CoinCompare />
        </Route>
      </Switch>
    </BrowserRouter >
  );
}

export default App;
