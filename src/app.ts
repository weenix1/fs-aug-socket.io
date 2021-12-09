import cors from "cors";
import express from "express";
import chatRouter from "./chat";
import { shared } from "./shared";


// We are configuring our Express application 
const app = express();


app.use(cors())
app.get("/online-users", (req, res) => {
    res.send({ onlineUsers: shared.onlineUsers });
})

app.use("/chat", chatRouter)

export { app };
