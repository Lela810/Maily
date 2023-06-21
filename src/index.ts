import brain from 'brain.js';
import fs from 'fs';

const data = [
	{
		input:
			'This email is to notify you that an alarm has been triggered in your vCenter:',
		output: 'Fehler',
	},
	{
		input: 'SEPPmail Backup  Device ID ff50-5609-0100 Version 12.0.14',
		output: '[1]',
	},
];

const net = new brain.recurrent.LSTM();

const loadnetworkState = JSON.parse(
	fs.readFileSync('network_state.json', 'utf-8')
);
net.fromJSON(loadnetworkState);

let promise = new Promise((resolve, reject) => {
	net.train(data, {
		iterations: 1000,
		errorThresh: 0.005,
		log: true,
		logPeriod: 10,
	});
});

/* const savenetworkState = net.toJSON();
fs.writeFileSync(
	'network_state.json',
	JSON.stringify(savenetworkState),
	'utf-8'
); */

console.log(
	net.run('SEPPmail Backup  Device ID ff50-5609-0100 Version 12.0.14')
);

await promise;

/* const newData = [
	{ input: [0, 0], output: [0] },
	{ input: [0, 1], output: [1] },
	{ input: [1, 0], output: [1] },
	{ input: [1, 1], output: [0] },
];

net.train(newData);

console.log(net.run([0, 0])); // sollte [1] ausgeben */
