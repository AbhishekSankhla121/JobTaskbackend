import mongoose from "mongoose"

const connectDB = async () => {

    try {
        const { connection } = await mongoose.connect(process.env.MOGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Mongodb Connected with : ${connection.host}`)

    } catch (error) {
        console.log("error in DATABASE connection", error);
    }
}

export default connectDB;