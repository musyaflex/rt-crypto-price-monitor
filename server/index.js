import express from "express"
import http from 'http';
import cors from 'cors'

const app = express();

// parse requests of content-type - application/json
app.use(express.json({
    type: "*/*" // optional, only if you want to be sure that everything is parsed as JSON. Wouldn't recommend
}));

app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});