//import { useState } from "react";
import Form from './Form';

const Searchbar = () => {

    function search(text) {
        fetch("https://coingecko.p.rapidapi.com/coins/" + text + "?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "", /* Make sure to deal with API key in backend */
                "x-rapidapi-host": "coingecko.p.rapidapi.com"
            }
        })
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(json => {
                console.log(json);
            })
            .catch(err => {
                console.error(err);
            });
    }

    return (
        <Form onSubmit={(text) => { search(text) }}>
        </Form>
    );
}

export default Searchbar;
