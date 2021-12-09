import { httpServer } from "../server"
import supertest from "supertest"
import mongoose from "mongoose"
import { io, Socket } from 'socket.io-client'
import dotenv from "dotenv"
import { DefaultEventsMap } from "@socket.io/component-emitter"

dotenv.config()

const request = supertest(httpServer)

describe("Testing Jest config", () => {
    it("should pass", () => {
        expect(true).toBe(true);
    })
})

describe("Testing server", () => {
    let clientSocket: Socket<DefaultEventsMap, DefaultEventsMap>
    beforeAll(done => {

        // Starting the http server
        httpServer.listen(process.env.PORT, () => {

            if (!process.env.MONGO_URL_TEST) {
                throw new Error("MONGO_URL_TEST is not defined")
            }

            const port = (httpServer.address() as any).port

            // Connecting the client socket for the test...
            clientSocket = io(`http://localhost:${port}`, { transports: ['websocket'] })

            mongoose.connect(process.env.MONGO_URL_TEST).then(() => {
                console.log("Connected to test database")
                done()
            })
        })

    })

    it("should test that when sending a setUsername event, the server has the username in the online users array", done => {
        // testing the setUsername event
        clientSocket.emit("setUsername", { username: "Alice", room: "blue" })

        // we needed a setTimeout so that the server can process the event in time
        setTimeout(async () => {
            const response = await request.get("/online-users")

            console.log(response.body.onlineUsers)
            expect(response.body.onlineUsers[0].username).toBe("Alice")
            done()
        }, 250)

    })

    it("should test that when retrieving messages for the blue room, we are getting the list of messages", async () => {
        const response = await request.get("/chat/blue")

        expect(response.status).toBe(200)
        expect(response.body.chatHistory).toBeDefined()
        expect(response.body.chatHistory.length).toBe(0)
    })


    afterAll(done => {

        // Closing the http server gracefully tearing down the connection
        clientSocket.disconnect()
        httpServer.close()
        mongoose.connection.close()
            .then(() => {
                console.log("Disconnected from test database")
                done()
            })
    })
})