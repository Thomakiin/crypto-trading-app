import { useState, useEffect } from "react";
import { useLocation } from "react-router";

const CoinDisplay = (props) => {
    let [focusedCoin, setFocusedCoin] = useState(null);
    //let [coinsToCompare, setCoinsToCompare] = useState([]);
    const location = useLocation();

    console.log("CoinDisplay props.focusedCoin = ", location.state.selectedCoin);
    //setFocusedCoin(props.location.state.focusedCoin);


    useEffect(() => {
        setFocusedCoin(location.state.selectedCoin);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1>Coin Compare</h1>
            {focusedCoin &&
                <div>
                    <h1>{focusedCoin.name}</h1>
                    <img src={focusedCoin.image.small} alt={focusedCoin.name + " icon"} />
                    {<p>{"$" + focusedCoin.market_data.current_price.usd + " USD"}</p>}
                </div>
            }
        </div>
    );
}

export default CoinDisplay;