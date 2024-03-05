import redis from "redis";

const redisURL = "redis://127.0.0.1:6379";
let client;

(async function () {
  client = await redis
    .createClient({ url: redisURL })
    .on("error", (err) =>
      console.log("Redis client not connected to the server:", err)
    )
    .on("connect", () => {
      console.log("Redis client connected to the server");
    });
  client.subscribe("holberton school channel");

  client.on("message", function (channel, message) {
    if (message === "KILL_SERVER") {
      client.unsubscribe("holberton school channel");
    } else {
      console.log(message);
    }
  });
})();
