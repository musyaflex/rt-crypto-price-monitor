import './App.css';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

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

  useEffect(() => {
    const socket = io('http://localhost:8080'); // Replace with your server URL

    // Subscribe to the "cryptoPriceUpdate" event from the Socket.IO server
    socket.on("cryptoPriceUpdate", (updatedCryptos) => {
      // Update the cryptos state when a price update is received
      setCryptos((prevCryptos) => {
        // Create a copy of the previous cryptos state
        const updatedCryptosMap = new Map(
          prevCryptos.map((crypto) => [crypto.name, crypto])
        );
  
        // Update the prices, volumes, and changes for the received cryptos
        updatedCryptos.forEach(([name, updatedCrypto]) => {
          if (updatedCryptosMap.has(name)) {
            updatedCryptosMap.set(name, {
              ...updatedCryptosMap.get(name),
              price: updatedCrypto.price,
              volume: updatedCrypto.volume,
              change: updatedCrypto.change,
            });
          }
        });
  
        // Convert the updated cryptos map back to an array
        return Array.from(updatedCryptosMap.values());
      });
    });
  
    return () => {
      // Clean up the event listener when the component unmounts
      socket.off("cryptoPriceUpdate");
      socket.disconnect();
    };
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
