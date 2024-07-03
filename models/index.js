require('dotenv').config()
const mongoose = require("mongoose")
// Connect to MongoDB - database login is retrieved from environment variables - YOU SHOULDUSE YOUR OWN ATLAS CLUSTER
CONNECTION_STRING ="mongodb+srv://leminht:devdogtest@devdogscluster.cmckvcr.mongodb.net/?retryWrites=true&w=majority&appName=DevDogsCluster"
// MONGO_URL =CONNECTION_STRING.replace("<username>",process.env.MONGO_USERNAME).replace("<password>",process.env.MONGO_PASSWORD)
mongoose.connect(CONNECTION_STRING || "mongodb://localhost", {
 useNewUrlParser: true,
 useUnifiedTopology: true,
 dbName: "CRMSystem"
})
const db = mongoose.connection
db.on("error", err => {
 console.error(err);
 process.exit(1)
})
db.once("open", async () => {
 console.log("Mongo connection started on " + db.host + ":" + db.port)
})
require("./customer")
require("./lists")
require("./administrator")