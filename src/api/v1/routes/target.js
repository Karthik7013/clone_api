const { Worker } = require('worker_threads');
const path = require('path');

let taskCounter = 0;

function handleTargetRequest(req, res, next) {
    const taskId = `task_${Date.now()}_${++taskCounter}`;
    const requestData = { ...req.query, taskId };

    // Immediate response to client
    res.json({
        status: 'accepted',
        taskId: taskId,
        message: 'Your request is being processed asynchronously',
        queuedAt: new Date().toISOString()
    });

    // Offload the time-consuming task to a worker thread
    const worker = new Worker(path.join(__dirname, '../workers/api-worker.js'), {
        workerData: requestData
    });

    worker.on('message', (result) => {
        console.log(`Task ${result.taskId} completed:`, result);
    });

    worker.on('error', (error) => {
        console.error(`Worker error for task ${taskId}:`, error);
    });

    worker.on('exit', (code) => {
        if (code !== 0) {
            console.error(`Worker stopped with exit code ${code} for task ${taskId}`);
        }
    });
}

module.exports = { handleTargetRequest };