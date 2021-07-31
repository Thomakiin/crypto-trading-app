import './App.css'
import Searchbar from './components/Searchbar';
import { useState } from 'react';
import { useHistory } from 'react-router';

function Home() {
  let [selectedCoin, setSelectedCoinData] = useState(null);
  const history = useHistory();

  function test(coinData) {
    setSelectedCoinData(coinData);
    console.log("Home: selectedCoin: ", selectedCoin);
    if (selectedCoin !== null) {
      history.push("/coincompare", { selectedCoin: selectedCoin });
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