import { connect, connection, ConnectionStates } from "mongoose";

export const connectDb = async () => {
  try {
    if (connection.readyState === ConnectionStates.connected) {
      return Promise.resolve();
    }
    await connect(process.env.DB_URL);
    console.log("CONNECTED TO DATABASE");
  } catch (error) {
    console.error(error);
  }
};
