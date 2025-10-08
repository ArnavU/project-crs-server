import { app } from "./app.js"; 
import { connectDB } from "./data/database.js";
import cron from 'node-cron';

connectDB();

cron.schedule('* * * * *', () => {
  console.log('Running an empty task every minute'); // to keep the server alive
});

app.listen(process.env.PORT, ()=> {
    console.log(`Server is running at port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})