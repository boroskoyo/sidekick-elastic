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
   git clone https://github.com/boroskoyo/sidekickelastic.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

3. Edit `config.json` according to your needs
   ```js
    "elasticsearch-url": "<>",
    "elasticsearch-apikey": "<>",
    "sidekick_email": "",
    "sidekick_password": ""
   ```

  Log event index is sidekick_logpoint & snapshot event is sidekick_tracepoint by default. You can change them like below:

   ```js
    "sidekick_tracepoint_index": "sidekick_tracepoint",
    "sidekick_logpoint_index": "sidekick_logpoint"
   ```
   
  if have an on-premise setup add the fields below according to your setup 

   ```js
    "sidekick_host": "ws://127.0.0.1",
    "sidekick_port": "7777"
   ```

  if have your user token you can use it instead of email & password 

   ```js
    "sidekick_token": "<>"
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
