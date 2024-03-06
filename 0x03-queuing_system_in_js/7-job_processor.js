import kue from "kue";
const queue = kue.createQueue();

const blacklisted = ["4153518780", "4153518781"];

function sendNotification(phoneNumber, message, job, done) {
  job.progress(0, 100);
  if (blacklisted.includes(phoneNumber)) {
    const err = new Error(`Phone number ${phoneNumber} is blacklisted`);
    job.failed().error(err);
    done(err);
  } else {
    job.progress(50, 100);
    console.log(
      `Sending notification to ${phoneNumber}, with message: ${message}`
    );
    done();
  }
}
queue.process("push_notification_code", function (job, done) {
  let phoneNumber = job.data.phoneNumber,
    message = job.data.message;
  sendNotification(phoneNumber, message, job, done);
});
