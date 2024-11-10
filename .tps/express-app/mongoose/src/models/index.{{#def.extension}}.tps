import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
	throw new Error('MONGO_URI environment variable is not defined');
}

export const connectDB = async () => {
	try {
		await mongoose.connect(MONGO_URI);
		console.log('Connected to MongoDB');
	} catch (error) {
		console.error('MongoDB connection error:', error);
		process.exit(1);
	}
};
