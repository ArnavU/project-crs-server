import {config} from 'dotenv';
import express from "express";
import cors from "cors";
import listRouter from './routes/lists.js'
import cat_wise_data_router from './routes/cat_wise_data.js'
import formDataRouter from './routes/formData.js';

export const app = express();

// using middleware
app.use(express.json());
app.use(cors({
    // origin: [process.env.FRONTEND_URL],
    origin: process.env.ALLOW_ORIGIN.split(','),
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}))

// using routes
app.use('/api/v1/lists', listRouter);
app.use('/api/v1/colleges', cat_wise_data_router);
app.use('/api/v1/form', formDataRouter)

config({
    path: "./data/.env",
});
