# Real-Time Cryptocurrency Price Monitor
This is a simple real-time web application that allows users to monitor the prices of cryptocurrencies such as Bitcoin, Ether, Litecoin, and more. 
It provides users with up-to-date information on the prices, volume, and percentage change of various cryptocurrencies.

## Features
* Real-time Updates: The application fetches the latest cryptocurrency prices from an API and provides real-time updates to the users.
* Multiple Cryptocurrencies: Users can monitor the prices of popular cryptocurrencies such as Bitcoin, Ether, Litecoin, Monero, XRP, Dogecoin, and Dash.
* User-Friendly Interface: The web application offers a clean and intuitive interface that allows users to easily view and track cryptocurrency prices.
* WebSocket Communication: The application utilizes WebSocket communication to provide real-time updates to all connected clients, ensuring a seamless and responsive user experience.

## Technologies Used
* Node.js: A powerful JavaScript runtime that allows server-side execution of JavaScript code.
* Express.js: A fast and minimalist web application framework for Node.js.
* Socket.IO: A library that enables real-time, bidirectional communication between web clients and servers using WebSockets.
* Axios: A promise-based HTTP client for making API requests.
* React: Front-end technology for building the user interface and handling client-side interactions.

## Getting Started
To run the backend and frontend applications locally, follow these steps:
1. Clone the backend repository: git clone https://github.com/musyaflex/eventx_coding_challenge
2. Navigate to the backend project directory: cd server
3. Install the dependencies: npm i
4. Start the backend server: npm run dev. The backend server should now be running on http://localhost:8000.
5. Navigate to the frontend project directory: cd client
6. Install the dependencies: npm i
7. Start the frontend development server: npm start

The frontend application should now be running on http://localhost:3000 and will connect to the backend server for retrieving cryptocurrency price data.

## API Used
The application retrieves cryptocurrency price data from the CoinCap API (https://api.coincap.io/v2). The API provides a wide range of cryptocurrency market data, including prices, volumes, and historical data.
