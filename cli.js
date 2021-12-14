/* cli.js
Simple command line interface for interacting with server
*/

const axios = require("axios");
const config = require("./config");

const BASE_URL = `http://localhost:${config.PORT}`;

const url = process.argv[2];

function isValidUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return (
    url.host === "github.com" &&
    (url.protocol === "http:" || url.protocol === "https:")
  );
}

function getPathName(urlString) {
  const url = new URL(urlString);
  return url.pathname;
}

if (!isValidUrl(url)) {
  console.log(
    "Invalid URL provided. Make sure your command looks like: 'npm run gh <repoUrl>'"
  );
} else {
  console.log("Valid URL provided:", url);
  console.log("Fetching ", BASE_URL + getPathName(url));
  const data = axios.get(BASE_URL + getPathName(url));
  data
    .then(data => {
      console.log(data.data);
    })
    .catch(err => {
      console.log("There was an error with your request.", err);
    });
}
