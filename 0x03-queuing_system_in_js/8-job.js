function createPushNotificationsJobs(jobs, queue) {
  if (!Array.isArray(jobs)) {
    throw new Error("Jobs is not an array");
  }

  jobs.forEach((data) => {
    const job = queue.create("push_notification_code", data);

    job
      .on("complete", function (result) {
        console.log(`Notification job ${job.id} completed`);
      })
      .on("failed", function (errorMessage) {
        console.log(`Notification ${job.id} job failed: ${errorMessage}`);
      })
      .on("progress", function (progress, data) {
        console.log(`Notification job ${job.id} ${progress}% complete`);
      })
      .save(function (err) {
        if (!err) {
          console.log(`Notification job created: ${job.id}`);
        }
      });
  });
}

module.exports = createPushNotificationsJobs;
