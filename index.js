import { Worker } from "worker_threads";

const num = 1e9;

function fun(data) {
	let count = 0;
	for (let i = 0; i < data; i++) {
		count++;
	}
	return count;
}

function runWorker(data) {
	return new Promise((resolve, reject) => {
		const start = Date.now();

		/* without threading */
		const result = fun(data);
		console.log(`[without threading]: ${Date.now() - start}ms`);
		resolve(result);

		/* with threading */
		// const worker = new Worker("./worker.js", { workerData: data });
		// worker.once("message", (data) => {
		// 	console.log(`[thread ${worker.threadId}]: ${Date.now() - start}ms `);
		// 	resolve(data);
		// });
	});
}

async function main() {
	console.time(`[main ${process.pid}]`);
	const results = await Promise.all([
		runWorker(num),
		runWorker(num),
		runWorker(num),
		runWorker(num),
		runWorker(num),
		// runWorker(num),
		// runWorker(num),
		// runWorker(num),
		// runWorker(num),
		// runWorker(num),
	]);
	console.timeEnd(`[main ${process.pid}]`);
	console.log("[results]: ", results);
}

main().then(() => {});
