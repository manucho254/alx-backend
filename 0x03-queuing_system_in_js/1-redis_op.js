import redis from "redis";

const redisURL = "redis://127.0.0.1:6379";
const client = await redis.createClient({ url: redisURL });

(async function () {
  client.on("error", (err) =>
    console.log("Redis client not connected to the server:", err)
  );

  client.on("connect", () =>
    console.log("Redis client connected to the server")
  );
})();

const setNewSchool = (schoolName, value) => {
  client.set(schoolName, value).print({ reply: "OK" });
};
const displaySchoolValue = (schoolName) => {
  console.log(client.get(schoolName));
};

displaySchoolValue("Holberton");
setNewSchool("HolbertonSanFrancisco", "100");
displaySchoolValue("HolbertonSanFrancisco");
