import './App.css';
import React, { useEffect, useState } from 'react';

const CryptoBlock = ({ name, price, volume, change }) => {
  return (
    <div className="crypto-block">
      <h3>{name}</h3>
      <p className="p-price">{price}</p>
      <div>
        <p>Volume: {volume}</p>
        <p>24 Hour Change: {change}</p>
      </div>
    </div>
  );
};

function App() {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        // Make API call to fetch cryptocurrency data
        const response = await fetch('http://localhost:8080/api/crypto/getPrices');
        const data = await response.json();

        // Extract the message array from the received data
        const message = data.message;

        // Map the message array to format the data for the CryptoBlock component
        const formattedCryptos = message.map((item) => ({
          name: item.key,
          price: item.value.price,
          volume: item.value.volume,
          change: item.value.change,
        }));

        // Update the cryptos state with the formatted data
        setCryptos(formattedCryptos);
      } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
      }
    };

    fetchCryptos();
  }, []);

  return (
    <div className="wrapper">
      <div className="crypto-tracker">
        <h1>Cryptocurrency Realtime Price</h1>
        <div className="crypto-row">
          {cryptos.map((crypto, index) => (
            <CryptoBlock
              key={index}
              name={crypto.name}
              price={crypto.price}
              volume={crypto.volume}
              change={crypto.change}
            />
          ))}
        </div>
      </div>
    </div>
    
  );
}

export default App;
