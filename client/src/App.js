import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

const CryptoBlock = ({ name, price, volume, change }) => {
  return (
    <div className="crypto-block">
      <h3>{name}</h3>
      <p className="p-price">{price}</p>
      <div>
        <p>volume: {volume}</p>
        <p>change: {change}</p>
      </div>
    </div>
  );
};

function App() {
  const [cryptos, setCryptos] = useState([
    {
      name: 'Bitcoin',
      price: '$50,000',
      volume: '1,000,000',
      change: '+5%',
    },
    {
      name: 'Ether',
      price: '$2,000',
      volume: '500,000',
      change: '-2%',
    },
    {
      name: 'Litecoin',
      price: '$150',
      volume: '200,000',
      change: '+3%',
    },
    {
      name: 'Monero',
      price: '$100',
      volume: '100,000',
      change: '-1%',
    },
    {
      name: 'Ripple',
      price: '$0.50',
      volume: '50,000',
      change: '+1%',
    },
  ]);

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
