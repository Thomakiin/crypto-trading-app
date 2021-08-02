import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Chart from 'chart.js/auto'

import Searchbar from './components/Searchbar';

let LineChart;

const CoinDisplay = (props) => {
    let [focusedCoin, setFocusedCoin] = useState(null);
    let [chartData, setChartData] = useState(null);
    let [coins, setCoins] = useState([]);
    //let [coinsChartData, setCoins] = useState([]);

    const location = useLocation();

    async function fetchChartData(id) {
        let res = await fetch("http://localhost:5000/coingecko", {
            "method": "GET",
            "headers": {
                "endpoint": "/coins/" + id + "/market_chart?vs_currency=usd&days=7"
            }
        })
        let json = await res.json();

        let prices = json.prices.map((el) => {
            return el[1];
        });
        let timestamps = json.prices.map((el) => {
            return el[0];
        });

        let outData = { "prices": prices, "timestamps": timestamps };
        //console.log("fetchChartData outData: ", outData);
        setChartData(outData);
        return (outData);
    }

    async function redisplayChart() {
        //console.log("redisplay chart, chartData: ", chartData);
        if (!chartData) {
            return;
        }
        //if (chartData.prices.length < 0 || chartData.timestamps.length < 0) {
        //return;
        //}
        var ctx = document.getElementById("chart").getContext("2d");
        if (typeof LineChart !== "undefined") LineChart.destroy();
        LineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: chartData.timestamps,
                datasets: coins.map(coin => {
                    return ({
                        "label": location.state.selectedCoin.name,
                        "data": chartData.prices,
                        "fill": false,
                        "borderColor": 'rgb(75, 192, 192)',
                        "tension": 0.1
                    });
                })
            },
            options: {
                scales: {
                    x: {
                        grid: {
                            display: false,
                        },
                    }
                },
                animation: {
                    duration: 750,
                }
            }
        });
    }

    function handleCoinSelected(inCoin) {
        console.log("handleSelected: ", inCoin.name);
        setCoins(coins.concat([inCoin])); // add the selected coin to the array
    }

    useEffect(() => {
        //console.log("CoinDisplay props.focusedCoin = ", location.state.selectedCoin);
        //setFocusedCoin(location.state.selectedCoin);
        setCoins([location.state.selectedCoin]);

        fetchChartData(location.state.selectedCoin.id);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    
    useEffect(() => {
        console.log("coins useEffect");
        // USE AXOIS TO FETCH(AND SET) CHART DATA FOR EVERY COIN, which will activate chartData's useEffect() to redisplay the chart
    }, [coins]);

    useEffect(() => {
        console.log("chart data useEffect");
        redisplayChart();
    }, [chartData]);


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
            <div>
                <canvas id="chart" width="1000" height="400"></canvas>
            </div>
            <Searchbar onSelected={handleCoinSelected} />
        </div>
    );
}

export default CoinDisplay;