import redis from "redis";
import util from "util";

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

// add new key and value pair
async function setNewSchool(schoolName, value) {
  await client.set(schoolName, value, redis.print);
}

// display by key
async function displaySchoolValue(schoolName) {
  await client.get(schoolName, (err, data) => {
    if (err) {
      throw err;
    }
    console.log(data);
  });
}

//  promisify displaySchoolValue
displaySchoolValue = util.promisify(displaySchoolValue);

displaySchoolValue("Holberton");
setNewSchool("HolbertonSanFrancisco", "100");
displaySchoolValue("HolbertonSanFrancisco");
