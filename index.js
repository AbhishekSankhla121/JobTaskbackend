import app from "./app.js";
import connectDB from "./database/connectToDB.js";
connectDB()

app.listen(process.env.PORT, () => {
    console.log(`listen PORT on: http://localhost:${process.env.PORT}`);
});