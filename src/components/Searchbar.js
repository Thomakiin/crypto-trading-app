import { useState } from "react";
import { useEffect } from 'react';
import axios from 'axios';

let coinsList = [];

const Searchbar = (props) => {
    let [topResults, setTopResults] = useState([]);

    async function fetchCoinsList() {
        const res = await axios.get("http://localhost:5000/coingecko", {
            "method": "GET",
            "headers": {
                "endpoint": "/coins/list"
            }
        })
        if (res.data.message) { // if error message
            console.log(res.data.message);
            return [];
        }
        //let json = await res.json();
        coinsList = res.data;
        //console.log("coins list fetched", json);
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
            else {
                return false;
            }

        });
        // Note: should make sure the EXACT match is placed at the top
        //console.log("matchingResults: ", results);
        setTopResults(results);
    }

    function tryFetchCoinByID(text) {
        fetch("http://localhost:5000/coingecko", {
            "method": "GET",
            "headers": {
                "endpoint": "/coins/" + text + "?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false"
            }
        })
            .then(res => res.json())
            .then(json => {
                console.log(json);
                props.onSelected(json);
                return json;
            })
            .catch(err => {
                console.error(err)
                return false;
            });
    }

    function handleOnChange(e) {
        //console.log("on change: " + e.target.value)
        getMatchingResults(e.target.value, 5);
    }

    function handleOnSubmit(e) {
        tryFetchCoinByID(e.target.value);
    }

    function handleOnFocus(e) {
        //console.log("focus");
        let searchInput = document.getElementById("search-input");
        getMatchingResults(searchInput.value, 5);
        //getMatchingResults();
    }
    function handleOnBlur(e) {
        //console.log("blur");
        // Remove search results. Done after a 100 miliseconds to allow click events to register if a search result is clicked
        setTimeout(() => { setTopResults([]) }, 100);

        /*
        let searchResults = document.getElementsByClassName("search-result");
        for(let i=0; i< searchResults.length; i++){
            console.log(searchResults[i]);
            searchResults[i].style.visiblity = "hidden";
        }
        */

    }
    function handleSearchResultClicked(result) {
        tryFetchCoinByID(result.id)
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
                        <div className="search-result" key={result.id} onClick={() => { handleSearchResultClicked(result) }}>
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
