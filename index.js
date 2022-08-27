'use strict'
const { onTrigger } = require('@runsidekick/sidekick-client');
let config = require('./config.json');
const { Client } = require('@elastic/elasticsearch');
const client = new Client({
    node: config['elasticsearch-url'],
    auth: { apiKey: config['elasticsearch-apikey'] }
});

function ingestFunc (index) {
    return async function (data) {
        await client.index({
            index: index,
            document: data
        })
    }
}

const clientInfo = {
    sidekick_email : config['sidekick_email'], 
    sidekick_password : config['sidekick_password'], 
    tracepointFunction : ingestFunc(config['sidekick_tracepoint_index']),
    logpointFunction : ingestFunc(config['sidekick_logpoint_index'])
}

onTrigger(clientInfo);
