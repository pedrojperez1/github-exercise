# github-exercise

This project defines a simple Node.js/Express server that fetches data about a specific Github repo.

### To install and run locally: 

1. Clone this repo to local directory and install dependencies with `npm install`. 
2. Start the server by running `node server.js`. If you need to specify a different port to run the server on, change `config.js`.
3. Once the server is running, you can make CLI requests by running `npm run gh <repoURL>`. For example: `npm run gh https://github.com/pedrojperez1/github-exercise` would fetch the data for this repo.
