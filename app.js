import express from "express"
import { config } from "dotenv"
import inventoryRoute from "./routes/inventoryRoute.js"
import cors from "cors"


const app = express();

config({
    path: "./config/config.env"
});

// to check port is working or not start here
app.use(cors())
app.get("/", (req, res, next) => {
    res.status(200).send(`<h1>port working please check frontend:<a href=${process.env.FRONTEND_URL} > click here </a></h1>`);
});
// to check port is working or not end here


app.use("/api", inventoryRoute);

export default app;