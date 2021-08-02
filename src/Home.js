import './App.css'
import Searchbar from './components/Searchbar';
//import { useState } from 'react';
import { useHistory } from 'react-router';

function Home() {
  //let [selectedCoin, setSelectedCoin] = useState();
  const history = useHistory();

  function test(coinData) {
    console.log("Home: inCoinData: ", coinData);
    //setSelectedCoin(coinData);
    //console.log("Home: selectedCoin: ", selectedCoin);
    if (coinData !== null) {
      history.push("/coincompare", { selectedCoin: coinData });
    }

  }

  return (
    <div>
      <h1 >Home</h1>
      <Searchbar onSelected={test} />
    </div>
  );
}

export default Home;