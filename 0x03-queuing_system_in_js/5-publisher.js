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

      // Define a sleep function that returns a promise
      function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }

      async function publishMessage(message, time) {
        console.log(`About to send ${message}`);
        await sleep(time);
        client.publish("holberton school channel", message);
      }

      publishMessage("Holberton Student #1 starts course", 100);
      publishMessage("Holberton Student #2 starts course", 200);
      publishMessage("KILL_SERVER", 300);
      publishMessage("Holberton Student #3 starts course", 400);
    });
})();
