let kue = require("kue"),
  queue = kue.createQueue();

const job = queue
  .create("push_notification_code", {
    phoneNumber: "070000000",
    message: "Manucho is nice",
  })
  .save(function (err) {
    if (!err) console.log("Notification job failed");
  });

job
  .on("complete", function (result) {
    console.log(`Notification job created: ${result}`);
  })
  .on("failed attempt", function (errorMessage) {
    console.log("Notification job failed");
  });
