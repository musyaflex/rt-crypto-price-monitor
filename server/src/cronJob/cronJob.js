import cron from "cron";
import axios from 'axios';

const status = true
const cronJobExpression = "*/10 * * * * *"

async function setProposalExpiredCronJob(io) {
    new cron.CronJob(
        cronJobExpression,
        async () => {
            try {
                var changed = false;
                const coins = ["bitcoin", "ethereum", "litecoin", "monero", "xrp", "dogecoin", "dash"];

                for (const coin of coins) {
                    var config = {
                        method: 'get',
                        maxBodyLength: Infinity,
                        url: `https://api.coincap.io/v2/assets/${coin}`,
                        headers: {}
                    };

                    await axios(config)
                        .then(function (resp) {
                            var data = {
                                price: resp.data.data.priceUsd,
                                volume: resp.data.data.volumeUsd24Hr,
                                change: resp.data.data.changePercent24Hr
                            }
                            var prevPrice = global.mapObject.get(coin);
                            if (!(prevPrice && prevPrice.price == data.price)) {
                                changed = true;
                                global.mapObject.set(coin, data);
                            }
                        });
                }

                if(changed) {
                    const serializedMap = [...global.mapObject.entries()];
                    console.log("Emitting Change Message to all clients!");
                    io.emit('cryptoPriceUpdate', serializedMap);
                }
            } catch (error) {
                console.log(` Error: ${error}`);
            } finally {
                console.log("CronJob: ended");
            }
        },
        null,
        status
    );
}
const startCronJob = (io) => {
    if (status) {
        console.log("Cronjob started");
        setProposalExpiredCronJob(io);
    }
};

export { startCronJob };