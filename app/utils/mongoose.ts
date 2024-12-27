import mongoose from 'mongoose';

const connection = {};
async function connectToDatabase() {
  try {
    if (connection.isConnected) {
      console.log('Use Existing Connection');
      return;
    }

    const db = await mongoose.connect(process.env.MONGODB_URI);

    connection.isConnected = (await db).connections[0].readyState;
  } catch (error) {
    console.log('Connection Error');
  }
}

export default connectToDatabase;
