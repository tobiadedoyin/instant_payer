const http = require("http");
const config = require("./Config/config");

const app = require("./app");
const { dbConnect } = require("./Config/databaseConfig");

const server = http.createServer(app);

const port = config.PORT;

server.listen(port, async () => {
  await dbConnect();
  console.log(`server running on port ${port}`);
});
