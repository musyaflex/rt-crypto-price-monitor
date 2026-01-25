# Real-Time Cryptocurrency Price Monitor
A real-time web application for monitoring cryptocurrency prices with live updates via WebSocket.

## Features
* Real-time price updates from Coinbase
* Monitor Bitcoin, Ethereum, Litecoin, XRP, Dogecoin, and Dash
* Live WebSocket communication to all connected clients

## Technologies Used
* Node.js & Express.js
* Socket.IO
* React
* Coinbase WebSocket API

## Getting Started
To run the backend and frontend applications locally, follow these steps:
1. Clone the backend repository: git clone https://github.com/musyaflex/rt-crypto-price-monitor
2. Navigate to the backend project directory: cd server
3. Install the dependencies: npm i
4. Start the backend server: npm run dev. The backend server should now be running on http://localhost:8000.
5. Navigate to the frontend project directory: cd client
6. Install the dependencies: npm i
7. Start the frontend development server: npm start

The frontend application should now be running on http://localhost:3000 and will connect to the backend server for retrieving cryptocurrency price data.


## Data Source
Prices are fetched in real-time from the Coinbase WebSocket API at `wss://ws-feed.exchange.coinbase.com` with no authentication required.
