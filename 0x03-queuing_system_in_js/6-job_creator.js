import kue from "kue";

const queue = kue.createQueue();
const job = queue
  .create("push_notification_code", {
    phoneNumber: "070000000",
    message: "Manucho is nice",
  })
  .save(function (err) {
    if (!err) {
      console.log(`Notification job created: ${job.id}`);
    }
  })
  .on("complete", function (result) {
    console.log("Notification job completed");
  })
  .on("failed attempt", function (errorMessage) {
    console.log("Notification job failed");
  });
