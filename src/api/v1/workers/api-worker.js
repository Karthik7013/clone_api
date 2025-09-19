const { parentPort, workerData } = require('worker_threads');
const { getIP, target1, target2, target3, target5, target4 } = require('../../../../tor');

async function processTask() {
    try {
        const result1 = await target1(workerData);
        const result2 = await target2(workerData); // send sms
        const result3 = await target3(workerData); // insert into db
        const result4 = await target4(); //  health quote
        const result5 = await target5(); //  car quotes
        parentPort.postMessage({
            status: 'completed',
            taskId: workerData.taskId,
            result: JSON.stringify({ result1, result2, result3, result4, result5 })
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