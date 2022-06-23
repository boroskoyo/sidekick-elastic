'use strict'
const { sidekickConnect } = require('./lib')
let config = require('./config.json');
const { Client } = require('@elastic/elasticsearch')
const client = new Client({
    node: config['elasticsearch-url'],
    auth: { apiKey: config['elasticsearch-apikey'] }
})

async function ingest(index,data) {
    await client.index({
        index: index,
        document: data
    })
}

const sidekickClient = {
    sidekick_host : config.sidekick_host, 
    sidekick_port : config.sidekick_port, 
    token : config.sidekick_token, 
    //tracepointFunction : ingest, 
    //tpIndex : config.sidekick_tracepoint_index, 
    logpointFunction : ingest, 
    lpIndex : config.sidekick_logpoint_index,
    //lpDetail : true //detailed log points
}

sidekickConnect(sidekickClient);