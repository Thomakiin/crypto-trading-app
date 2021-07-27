import './App.css';
import Home from './Home';
import Coins from './Coins';
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
      </Switch>
    </BrowserRouter >
  );
}

export default App;
