import { parentPort, workerData } from "worker_threads";

let count = fun(workerData);
parentPort.postMessage(count);

function fun(data) {
	let count = 0;
	for (let i = 0; i < data; i++) {
		count++;
	}
	return count;
}
