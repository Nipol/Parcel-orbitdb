const IPFS = require('ipfs');
const OrbitDB = require('orbit-db');

const ipfsOptions = {
	EXPERIMENTAL : {
		pubsub : true
	}
};

const ipfs = new IPFS(ipfsOptions);

ipfs.on('error', (e) => console.error(e));
ipfs.on('ready', async () => {
	// Create a database
	const orbitdb = new OrbitDB(ipfs);
	const db = await orbitdb.log('database name');
	// Add an entry to the database
	const hash = await db.add('hello world');
	// Get last 5 entries
	const latest = db.iterator({ limit: 5 }).collect();
	console.log(JSON.stringify(latest, null, 2));
});
