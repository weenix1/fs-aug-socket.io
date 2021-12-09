import { httpServer } from "./server";
import mongoose from "mongoose"
// We are starting our HTTP server and NOT our Express app
// Starting app.listen here would initialize and start another instance of a HTTP Server,
// which would be not including our io configuration

mongoose.connect(process.env.MONGO_URL!).then(
    () => {
        httpServer.listen(3030, () => {
            console.log("Listening on port 3030");
        });
    }
)