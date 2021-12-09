import express from "express"
import RoomModel from "./model"

const chatRouter = express.Router()

chatRouter
    .get("/:room", async (req, res) => {
        const room = await RoomModel.findOne({ name: req.params.room })

        if (!room) {
            return res.status(404).send("Room not found")
        } else {
            return res.send(room)
        }
    })

export default chatRouter