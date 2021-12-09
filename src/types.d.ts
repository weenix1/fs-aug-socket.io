type OnlineUser = {
    username: string
    socketId: string
    room: Room
}

type Room = "blue" | "red"