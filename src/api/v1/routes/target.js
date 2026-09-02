const { Worker } = require("worker_threads");
const path = require("path");
const os = require("os");

const MAX_QUEUE = Number(process.env.TARGET_QUEUE_MAX) || 200;
const WORKER_COUNT = Math.min(
    Number(process.env.TARGET_WORKERS) || Math.max(1, Math.floor(os.cpus().length / 2)),
    4
);

let taskCounter = 0;
const queue = [];
const workers = [];
let nextWorker = 0;

function createWorker() {
    const worker = new Worker(path.join(__dirname, "../workers/api-worker.js"));
    worker.busy = false;
    worker.on("error", (err) => {
        console.error("[target] worker error:", err.message);
        worker.busy = false;
    });
    worker.on("exit", (code) => {
        const idx = workers.indexOf(worker);
        if (idx !== -1) workers.splice(idx, 1);
        if (code !== 0) console.error(`[target] worker exited code=${code}`);
    });
    return worker;
}

for (let i = 0; i < WORKER_COUNT; i++) workers.push(createWorker());

function pump() {
    while (queue.length > 0) {
        const worker = workers.find((w) => !w.busy) || workers[nextWorker];
        nextWorker = (nextWorker + 1) % workers.length;
        if (worker.busy) break;

        const job = queue.shift();
        worker.busy = true;
        worker.once("message", () => {
            worker.busy = false;
            pump();
        });
        worker.postMessage(job.data);
    }
}

function handleTargetRequest(req, res, next) {
    if (queue.length >= MAX_QUEUE) {
        return res.status(503).json({
            status: "rejected",
            message: "Queue full, try again later"
        });
    }

    const taskId = `task_${Date.now()}_${++taskCounter}`;
    const requestData = { ...req.query, taskId };

    res.json({
        status: "accepted",
        taskId,
        message: "Your request is being processed asynchronously",
        queuedAt: new Date().toISOString()
    });

    queue.push({ data: requestData });
    pump();
}

module.exports = { handleTargetRequest };
