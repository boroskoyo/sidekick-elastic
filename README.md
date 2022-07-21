<div id="top"></div>


<!-- PROJECT SHIELDS -->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://www.runsidekick.com">
    <img src="Sidekick_Logo.svg" alt="Logo" width="200" height="80">
  </a>
  <h2 align="center">+</h2>
   <a href="https://www.runsidekick.com">
    <img src="Elasticsearch_logo.png" alt="Logo" width="227" height="50">
  </a>

  <h3 align="center">Sidekick Recipes: Elasticsearch Ingest</h3>

  <p align="center">
    Send your logs and traces to Elasticsearch in seconds!
    <br />
    <a href="https://docs.runsidekick.com/"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://www.runsidekick.com">Sidekick Home</a>
    ·
    <a href="https://www.runsidekick.com/contact-us">Report Bug & Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-recipe">About The Recipe</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Recipe


Sidekick is a production debugging and on-demand logging tool where you can debug your running applications while they keep on running. Sidekick provides the ability to add logs and put non-breaking breakpoints in your application code which captures the snapshot of the application state, the call stack, variables, etc.

Sidekick Actions:
* A tracepoint is basically a non-breaking remote breakpoint. In short, it takes a screenshot of the variables when the code hits that line.
* Logpoints open the way for dynamic logging to Sidekick users. Replacing traditional logging with dynamic logging has the potential to lower stage sizes, costs, and time for log searching while adding the ability to add new logpoints without editing the source code, redeploying or restarting the application

This recipe aims to help you send your collected tracepoint & logpoint events to your own Elasticsearch instances.


<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [ws](https://github.com/websockets/ws)
* [@elastic/elasticsearch](https://github.com/elastic/elasticsearch-js)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started


### Prerequisites

tested with node v16.14.2
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   npm i sidekick-client
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

### Example usage
You can use sidekick client with any db integration, here is a elasticsearch integration example:

1. Edit `config.json` according to your needs
   ```js
    "elasticsearch-url": "<>",
    "elasticsearch-apikey": "<>",
    "sidekick_token": "",
    "sidekick_tracepoint_index": "sidekick_tracepoint",
    "sidekick_logpoint_index": "sidekick_logpoint",
    "sidekick_email":"<>",
    "sidekick_password":"<>",
   ```

2. Create an `ingest` function with using elasticsearch client:
    ```js
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
    ```
3. Call sidekickconnect function with proper parameters.
    
    ```js
        const { sidekickConnect } = require('sidekickingesterbeta')

        const sidekickClient = {
            sidekick_host : config['sidekick_host'], 
            sidekick_port : config['sidekick_port'], 
            sidekick_token : config['sidekick_token'], 
            sidekick_email : config['sidekick_email'], 
            sidekick_password : config['sidekick_password'], 
            tracepointFunction : ingestFunc(config['sidekick_tracepoint_index']),
            logpointFunction : ingestFunc(config['sidekick_logpoint_index']),
            stdout : true //console log
        }

        sidekickConnect(sidekickClient);
        ```


4. Run!
   ```sh
   npm start
   ```
<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

You can also run this recipe in a container. For this purpose a Dockerfile is located in the directory.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Add Tracepoint Support
- [x] Add Logpoint Support
- [x] Add Logpoint Detail setting
- [ ] Filter Logpoints
- [ ] Filter Tracepoints



<p align="right">(<a href="#top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Barış Kaya - [@boroskoyo](https://twitter.com/boroskoyo)

Sidekick: [website](https://www.runsidekick.com)

<p align="right">(<a href="#top">back to top</a>)</p>
