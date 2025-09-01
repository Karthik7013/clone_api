const { parentPort, workerData } = require('worker_threads');
const { getIP } = require('../../../../tor');


async function processTask() {
    try {
        console.log(`Worker processing task: ${workerData.taskId}`);
        const result = await getIP(workerData);
        parentPort.postMessage({
            status: 'completed',
            taskId: workerData.taskId,
            result: JSON.stringify(result)
        });
    } catch (error) {
        parentPort.postMessage({
            status: 'error',
            taskId: workerData.taskId,
            error: error.message
        });
    }
}

processTask();