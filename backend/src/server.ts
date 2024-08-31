import express from "express";
import cors from "cors";
import config from "./config/config";

const app = express();

app.use(cors());

// Handle post requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Need to setup routes here
app.get('/', (req, res) => {
    res.send('<h1>Hello, Express.js Server!</h1>');
});

const port = config.port;
app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});
