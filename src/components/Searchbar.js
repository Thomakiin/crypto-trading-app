import { useState } from "react";
import { useEffect } from 'react';

let coinsList = [];

const Searchbar = () => {
    let [topResults, setTopResults] = useState([]);

    async function fetchCoinsList() {
        let res = await fetch("http://localhost:5000/coingecko", {
            "method": "GET",
            "headers": {
                "endpoint": "/coins/list"
            }
        })
        let json = await res.json();
        coinsList = json;
        console.log("coins list fetched");
    }

    function getMatchingResults(text, maxResults) {
        let successfulResults = 0;
        let coinsListCopy = [...coinsList];
        let results = coinsListCopy.filter((coin, i) => {
            if (successfulResults >= maxResults) { return false; }
            else if (coin.name.toLowerCase().substr(0, text.length) === text.toLowerCase() || coin.symbol.toLowerCase().substr(0, text.length) === text.toLowerCase()) {
                successfulResults += 1;
                return true;
            }

        });
        // Note: should make sure the EXACT match is placed at the top
        console.log("matchingResults: ", results);
        setTopResults(results);
    }

    function search(text) {
        fetch("http://localhost:5000/coingecko", {
            "method": "GET",
            "headers": {
                "endpoint": "/coins/" + text + "?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false"
            }
        })
            .then(res => res.json())
            .then(json => {
                console.log(json);
            })
            .catch(err => console.error(err));
    }

    function handleOnChange(text) {
        console.log("on change: " + text)
        getMatchingResults(text, 25);
    }

    function handleOnSubmit(text) {
        search(text);
    }

    // On component mount
    useEffect(() => {
        fetchCoinsList();
    }, []);


    return (
        <div>
            <input type="text"
                onChange={(e) => { handleOnChange(e.target.value); }}
                onSubmit={(e) => { handleOnSubmit(e.target.value); }}
            />
            {topResults.map((result) => (
                <div key={result.id} onClick={() => console.log("id: " + result.id)}>
                    <h2>
                        {result.name}
                    </h2>
                </div>
            ))}

        </div>
    );
}

export default Searchbar;
