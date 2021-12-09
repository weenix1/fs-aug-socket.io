import mongoose from "mongoose"
import { RoomSchema } from "./schema"

const RoomModel = mongoose.model("rooms", RoomSchema)

export default RoomModel