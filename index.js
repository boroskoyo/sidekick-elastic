'use strict'
const { sidekickConnect } = require('./lib')
let config = require('./config.json');
const { Client } = require('@elastic/elasticsearch')
const client = new Client({
    node: config['elasticsearch-url'],
    auth: { apiKey: config['elasticsearch-apikey'] }
})

function ingestFunc (index) {
    return async function (data) {
        
         client.index({
            index: index,
            document: data.frames[0].variables
        }).then((res)=>{
            console.log("Items saved: \n",res)
        })
    }
}

const sidekickClient = {
    sidekick_host : config['sidekick_host'], 
    sidekick_port : config['sidekick_port'], 
    sidekick_token : config['sidekick_token'], 
    sidekick_email : config['sidekick_email'], 
    sidekick_password : config['sidekick_password'], 
    tracepointFunction : ingestFunc(config['sidekick_tracepoint_index']), 
    logpointFunction : ingestFunc(config['sidekick_logpoint_index'])
    //lpDetail : true //detailed log points
    ,stdout : true //console log
}

sidekickConnect(sidekickClient);