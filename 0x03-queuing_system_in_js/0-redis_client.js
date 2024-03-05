import redis from "redis";

(async function () {
  const redisURL = "redis://127.0.0.1:6379";
  const client = await redis.createClient({ url: redisURL });

  client.on("error", (err) =>
    console.log("Redis client not connected to the server:", err)
  );

  client.on("connect", () =>
    console.log("Redis client connected to the server")
  );
})();
