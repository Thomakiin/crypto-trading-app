import './App.css'
import Searchbar from './components/Searchbar';
import { useState } from 'react';

function Home() {
  let [selectedCoinData, setSelectedCoinData] = useState(null);

  function test(coinData) {
       setSelectedCoinData(coinData); 
       console.log("Coins Page, selectedCoinData: ", selectedCoinData);
      }

  return (
      <div>
          <h1 >Home</h1>
          <Searchbar onSelected={test} />
          {selectedCoinData &&
              <div>
                  <img src={selectedCoinData.image.small} alt={selectedCoinData.name + " icon"} />
                  <h1>{selectedCoinData.name}</h1>
                  {<p>{"$" + selectedCoinData.market_data.current_price.usd + " USD"}</p>}

              </div>
          }

      </div>
  );
}

export default Home;