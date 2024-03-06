import createPushNotificationsJobs from "./8-job.js";
let kue = require("kue"),
  queue = kue.createQueue();
const { expect } = require("chai");

describe("createPushNotificationsJobs", function () {
  before(function () {
    queue.testMode.enter();
  });

  after(function () {
    queue.testMode.clear();
    queue.testMode.exit();
  });

  it("Error if jobs is not array", function () {
    expect(function () {
      createPushNotificationsJobs(null, queue);
    }).to.throw("Jobs is not an array");
  });

  it("Test jobs creation", function () {
    const jobs = [
      {
        phoneNumber: "4153518743",
        message: "This is the code 4321 to verify your account",
      },
      {
        phoneNumber: "4153538781",
        message: "This is the code 4562 to verify your account",
      },
      {
        phoneNumber: "4153118782",
        message: "This is the code 4321 to verify your account",
      },
    ];
    createPushNotificationsJobs(jobs, queue);
    // expect(queue.testMode.jobs.length).to.equal(3);
    //expect(queue.testMode.jobs[0].phoneNumber).to.equal("4153518743");
    //expect(queue.testMode.jobs[1].phoneNumber).to.equal("4153538781");
    //expect(queue.testMode.jobs[2].phoneNumber).to.equal("4153118782");
  });
});
