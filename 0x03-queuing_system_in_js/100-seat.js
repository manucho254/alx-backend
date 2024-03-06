import redis from "redis";
let kue = require("kue"),
  queue = kue.createQueue();
const redisURL = "redis://127.0.0.1:6379";
const express = require("express");
const util = require("util");
const app = express();
const port = 1245;
let client,
  reservationEnabled = true;

function reserveSeat(number) {
  client.set("available_seats", number);
}

const getItem = util.promisify(client.get).bind(client);
async function getCurrentAvailableSeats() {
  return await getItem("available_seats");
}

(async function () {
  client = redis.createClient({ url: redisURL });
  client.on("error", (err) =>
    console.log("Redis client not connected to the server:", err)
  );

  client.on("connect", () => {
    console.log("Redis client connected to the server");
    reserveSeat(50);
  });
})();

app.get("/available_seats", (req, res) => {
  const seats = getCurrentAvailableSeats();
  res.send(JSON.stringify({ numberOfAvailableSeats: seats }));
});

app.get("/reserve_seat", (req, res) => {
  if (!reservationEnabled) {
    res.send(JSON.stringify({ status: "Reservation are blocked" }));
  }
  const job = queue.create("reserve_seat", data);

  job
    .on("complete", function (result) {
      console.log(`Seat reservation job ${job.id} completed`);
    })
    .on("failed", function (errorMessage) {
      console.log(`Seat reservation job ${job.id} failed: ${errorMessage}`);
    })
    .save(function (err) {
      if (!err) {
        res.send(JSON.stringify({ status: "Reservation in process" }));
      }
      res.send(JSON.stringify({ status: "Reservation failed" }));
    });
});

app.get("/process", (req, res) => {
  queue.process("reserve_seat", function (job, done) {
    getCurrentAvailableSeats().then((currentSeats) => {
      let newNumber = currentSeats - 1;

      if (newNumber === 0) {
        reservationEnabled = false;
      }
      if (newNumber >= 1) {
        reserveSeat(newNumber);
        done();
      } else {
        const err = new Error("Not enough seats available");
        job.failed().error(err);
        done(err);
      }
    });
  });
  return { status: "Queue processing" };
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
