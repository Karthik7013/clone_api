const { parentPort } = require('worker_threads');
const { target1, target2, target3 } = require('../../../../tor');

async function processTask(workerData) {
    try {
        console.log(workerData);
        const result1 = await target1(workerData);
        const result2 = await target2(workerData);
        const result3 = await target3(workerData);
        parentPort.postMessage({
            status: 'completed',
            taskId: workerData.taskId,
            result: JSON.stringify({ result1, result2, result3 })
        });
    } catch (error) {
        parentPort.postMessage({
            status: 'error',
            taskId: workerData && workerData.taskId,
            error: error.message
        });
    }
}

parentPort.on('message', (data) => {
    processTask(data);
});
