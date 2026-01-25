import WebSocket from 'ws';

const status = true;
const coinbaseProductIds = ['BTC-USD', 'ETH-USD', 'LTC-USD', 'XRP-USD', 'DOGE-USD', 'DASH-USD'];
const coinNameMap = {
    'BTC-USD': 'Bitcoin',
    'ETH-USD': 'Ethereum',
    'LTC-USD': 'Litecoin',
    'XRP-USD': 'XRP',
    'DOGE-USD': 'Dogecoin',
    'DASH-USD': 'Dash'
};

let ws;

function setProposalExpiredCronJob(io) {
    ws = new WebSocket('wss://ws-feed.exchange.coinbase.com');

    ws.on('open', () => {
        console.log('Connected to Coinbase WebSocket');
        const subscribeMessage = {
            type: 'subscribe',
            product_ids: coinbaseProductIds,
            channels: ['ticker']
        };
        ws.send(JSON.stringify(subscribeMessage));
    });

    ws.on('message', (data) => {
        try {
            const message = JSON.parse(data);
            
            if (message.type === 'ticker' && message.price) {
                const coinName = coinNameMap[message.product_id];
                
                if (coinName) {
                    const newData = {
                        price: message.price,
                        volume: message.volume_24h || 'N/A',
                        change: message.best_ask || 'N/A'
                    };

                    const prevPrice = global.mapObject.get(coinName);
                    if (!(prevPrice && prevPrice.price === newData.price)) {
                        global.mapObject.set(coinName, newData);
                        const serializedMap = [...global.mapObject.entries()];
                        console.log(`Price update for ${coinName}: $${newData.price}`);
                        io.emit('cryptoPriceUpdate', serializedMap);
                    }
                }
            }
        } catch (error) {
            console.log(`Error processing message: ${error}`);
        }
    });

    ws.on('error', (error) => {
        console.log(`WebSocket Error: ${error}`);
    });

    ws.on('close', () => {
        console.log('Disconnected from Coinbase WebSocket');
        setTimeout(() => setProposalExpiredCronJob(io), 5000);
    });
}
const startCronJob = (io) => {
    if (status) {
        console.log("Cronjob started");
        setProposalExpiredCronJob(io);
    }
};

export { startCronJob };