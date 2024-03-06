function createPushNotificationsJobs(jobs, queue) {
  if (!Array.isArray(jobs)) {
    throw new Error("Jobs is not an array");
  }

  jobs.forEach((data) => {
    console.log(data)
    const job = queue
      .create("push_notification_code", data)
      .save(function (err) {
	if (!err) {
          console.log(`Notification job created: ${job.id}`);
        }
      })
      .on("complete", function (result) {
        console.log(`Notification job ${job.id} completed`);
      })
      .on("failed", function (errorMessage) {
        console.log(`Notification ${job.id} job failed: ${errorMessage}`);
      })
      .on("progress", function (progress, data) {
        console.log(`Notification job ${job.id} ${progress}% complete`);
      });
  });
}

module.exports = createPushNotificationsJobs;
