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

	    printLatencies(clients);
	    
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

}

// Implement your code here:
const findLowestLatencyReplicated = ( clients ) => {

}
