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

    async function fetchChartData(coin) {
        let res = await fetch("http://localhost:5000/coingecko", {
            "method": "GET",
            "headers": {
                "endpoint": "/coins/" + coin.id + "/market_chart?vs_currency=usd&days=7&interval=daily"
            }
        })
        let json = await res.json();
        return json;
    }

    function formatChartData(chartData, coin) {
        let prices = chartData.prices.map((el) => {
            return el[1];
        });
        let maxPrice = Math.max.apply(null, prices);
        let percentages = chartData.prices.map((el) => {
            let price = el[1]; // extract price from timestamp / price pair
            return ((price - prices[0]) / maxPrice) * 100; // show percent difference 
        });

        let timestamps = chartData.prices.map((el) => {
            return el[0];
        });

        let outData = {
            "timestamps": timestamps,
            "label": coin.name,
            "data": percentages,
            "fill": false,
            "borderColor": 'rgb(75, 192, 192)',
            "tension": 0
        };
        return (outData);
    }


    async function fetchAllCharts() {
        //let labels = [];
        let datasets = [];
        for (let i = 0; i < coins.length; i++) {
            let coin = coins[i];
            let fetchedData = await fetchChartData(coin);
            //for(let j=0; j<chartData.prices; j++){}
            chartData = formatChartData(fetchedData, coin);
            datasets.push(chartData);
        }
        setChartData(datasets);
        console.log("fetchAllCharts newChartData", datasets);
        return datasets;
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
            data: { // NOTE: LABELS AND DATASETS CAN BUNDLED INSIDE CHART DATA!!
                //labels: chartData[0].timestamps,
                labels: [1, 2, 3, 4, 5, 6, 7], // since I hard coded daily interval and 7 days in fetch function
                datasets: chartData
            },
            options: {
                scales: {
                    x: {
                        grid: {
                            display: false,
                        },
                    },
                    y: {
                        ticks: {
                            // Include a dollar sign in the ticks
                            callback: function (value, index, values) {
                                return '%' + value;
                            }
                        }
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
        //fetchChartData(location.state.selectedCoin);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    useEffect(() => {
        //console.log("coins useEffect");
        // USE AXOIS TO FETCH(AND SET) CHART DATA FOR EVERY COIN, which will activate chartData's useEffect() to redisplay the chart
        fetchAllCharts();
        //redisplayChart();
    }, [coins]);


    useEffect(() => {
        console.log("chart data useEffect", chartData);
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