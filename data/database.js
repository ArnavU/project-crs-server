import mongoose from "mongoose";

export const connectDB = () => {
	mongoose
		.connect('mongodb://127.0.0.1:27017/', {
			dbName: "collegesCutoff",
		})
		.then((c) => console.log(`Database Connected with ${c.connection.host}`))
		.catch((e) => console.log(e));
};
