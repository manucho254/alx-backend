import { createClient } from "redis";

const client = createClient()
  .on("error", (err) =>
    console.log("Redis client not connected to the server: ", err)
  )
  .connect();

console.log("Redis client connected to the server");
client.disconnect();
