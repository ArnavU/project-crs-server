import { app } from "./app.js"; 
import { connectDB } from "./data/database.js";

connectDB();

app.get('/', (req, res) => {
    console.log("API is working fine.");
    res.send('Welcome to the API CRS(College Recommendation System). Made with love by Arnav Umarkar.');
});

app.listen(process.env.PORT, ()=> {
    console.log(`Server is running at port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})