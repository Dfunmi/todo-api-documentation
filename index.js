import dotenv from "dotenv"
dotenv.config()

import express from "express"
import connectDB from "./config/db.js";

import cors from "cors"
import todoRoutes from "./routes/todoRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler,  notFound} from "./middleware/errorMiddleware.js"
import { swaggerDocs } from "./swagger.js";



connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

swaggerDocs(app)

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT||5000
app.listen(PORT, ()=>{
    console.log("Server running")
})