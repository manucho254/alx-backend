import redis from "redis";

const redisURL = "redis://127.0.0.1:6379";
let client;

(async function () {
  client = redis.createClient({ url: redisURL });
  client.on("error", (err) =>
    console.log("Redis client not connected to the server:", err)
  );

  client.on("connect", () =>
    console.log("Redis client connected to the server")
  );
})();

client.hSet(
  "HolbertonSchools",
  {
    Portland: 50,
    Seattle: 80,
    "New York": 20,
    Bogota: 20,
    Cali: 40,
    Paris: 2,
  },
  redis.print({ reply: 1 })
);

const userSession = await client.hGetAll("HolbertonSchools");
console.log(JSON.stringify(userSession, null, 2));
