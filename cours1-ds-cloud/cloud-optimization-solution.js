// Inspired from: https://stackabuse.com/reading-and-writing-csv-files-with-node-js/
const readLatencies = (filename) => {

    const csv = require('csv-parser');
    const fs = require('fs');

    let clients = [];
    
    fs.createReadStream(filename)
	.pipe(csv())
	.on('data', (row) => {

	    // Get RowID
	    const rowId = parseInt( row['Clients/Region'] )
	    // Delete RowID
	    delete row['Clients/Region']

	    // parse-int all values
	    for (const key in row) {
		row[key] = parseInt(row[key]);
	    }
	    
	    // Add to array
	    clients[rowId] = row
	    
	    //console.log(row);
	})
	.on('end', () => {
	    console.log('CSV file successfully processed');

	    // Done reading

	    //printLatencies(clients);
	    
	    findBestRegion(clients);
	    findLowestLatencyReplicated(clients);

	    // latencies is an array indexed by the IoT client ID
	    // Each latency is an object / hashmap that contains
	    // the latency from that client to each cloud region
	});

}

// Read latencies file
readLatencies('cloud-optimization.csv')

// Test function to show how to use 'clients'
const printLatencies = ( clients ) => {

    for (let i=0; i<clients.length; i++) {
	console.log(`Client ${i}: `);
	for (const [key, value] of Object.entries(clients[i])) {
	    console.log(`   ${key}: ${value}`);
	}
    }
    
}

// Implement your code here:
const findBestRegion = ( clients ) => {

    // Get list of regions
    const regions = Object.keys(clients[0]);

    let averageLatencies = {}
    let bestLatency = 99999;
    let bestRegion = "";
    
    // Iterate for all regions
    for (let region of regions) {
	let sum = 0;
	let count = 0;

	// Iterate for all pairs of clients (e.g., 0-0, 0-1, 0-2, ...)
	for (let clientSource of clients) {

	    for (let clientDestination of clients) {

		// Calculate latency using that AWS region
		sum += clientSource[region]/2 + clientDestination[region]/2;
		count++;
		
	    }
	    
	}

	// Compute average
	averageLatencies[region] = sum/count

	// Check if it's better than the current best one
	if (averageLatencies[region] < bestLatency) {
	    bestLatency = averageLatencies[region];
	    bestRegion = region;
	}
    }

    // Print stuff
    console.log(averageLatencies);
    console.log(`Region to use: ${bestRegion}, latency of ${bestLatency}`)
    
}

// Implement your code here:
const findLowestLatencyReplicated = ( clients ) => {
    
}
