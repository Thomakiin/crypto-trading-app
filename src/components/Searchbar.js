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

    function handleOnChange(e) {
        console.log("on change: " + e.target.value)
        getMatchingResults(e.target.value, 5);
    }

    function handleOnSubmit(e) {
        search(e.target.value);
    }

    function handleOnFocus(e) {
        console.log("focus");
        let searchInput = document.getElementById("search-input");
        getMatchingResults(searchInput.value, 5);
        //getMatchingResults();
    }
    function handleOnBlur(e) {
        console.log("blur");
        // Remove search results. Done after a 1 milisecond to allow click events to register if a search result is clicked
        setTimeout(() => { setTopResults([]) }, 1);

        /*
        let searchResults = document.getElementsByClassName("search-result");
        for(let i=0; i< searchResults.length; i++){
            console.log(searchResults[i]);
            searchResults[i].style.visiblity = "hidden";
        }
        */

    }

    // On component mount
    useEffect(() => {
        fetchCoinsList();
    }, []);


    return (
        <div>

            <div className="searchbar-holder">
                <input
                    className="search-input"
                    id="search-input"
                    type="text"
                    onChange={(e) => { handleOnChange(e); }}
                    onSubmit={(e) => { handleOnSubmit(e); }}
                    onFocus={(e) => handleOnFocus(e)}
                    onBlur={(e) => handleOnBlur(e)}
                />
                <div className="search-results-holder">
                    {topResults.map((result) => (
                        <div className="search-result" key={result.id} onClick={() => { console.log("id: " + result.id); search(result.id) }}>
                            <p>
                                {result.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default Searchbar;
