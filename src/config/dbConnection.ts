import mongoose from "mongoose";

export const dbConnection = () => {
	mongoose.connect(process.env.MONGO_URL!).
		then(() => console.log('Connected to MongoDB'))
		.catch(err => console.log('Failed to connect to MongoDB:', err));
}