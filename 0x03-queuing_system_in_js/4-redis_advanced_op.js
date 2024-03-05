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

      const obj = {
        Portland: 50,
        Seattle: 80,
        "New York": 20,
        Bogota: 20,
        Cali: 40,
        Paris: 2,
      };

      for (let [key, value] of Object.entries(obj)) {
        client.hset("HolbertonSchools", key, value, redis.print("Reply: 1"));
      }

      client.hgetall("HolbertonSchools", function (err, data) {
        if (err) {
          console.error(err);
        } else {
          console.log(data); // Print all values
        }
      });
    });
})();
