import mongoose from "mongoose"

const MessageSchema = new mongoose.Schema({
    text: { type: String },
    sender: { type: String },
    timestamp: { type: Date, default: Date.now() }
})

export const RoomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    chatHistory: { type: [MessageSchema], required: true }
})

