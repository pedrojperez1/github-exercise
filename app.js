/* app.js
Define routes to be used by server.js
*/

const { default: axios } = require("axios");
const express = require("express");
const app = express();

const BASE_URL = "https://api.github.com/";

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.get("/:owner/:repoName", async (req, res) => {
  const { owner, repoName } = req.params;

  try {
    const pulls = await axios.get(
      BASE_URL + `repos/${owner}/${repoName}/pulls`
    );
    if (pulls.data.length === 0) {
      // return immediately if no PRs
      res
        .status(200)
        .json({ status: 200, msg: "This repo has zero open PRs!" });
    } else {
      // GET commits concurrently and map them back to `result`
      const result = pulls.data.map(pull => {
        return {
          pullId: pull.id,
          pullNumber: pull.number
        };
      });
      const commitsData = await axios.all(
        // request concurrently
        pulls.data.map(pull => axios.get(pull.commits_url))
      );
      for (let [idx, val] of commitsData.entries()) {
        // map response to `result`
        result[idx]["numCommits"] = val.data.length;
      }
      res.status(200).json({ status: 200, data: result });
    }
  } catch (err) {
    if (err.response.status === 404) {
      res.status(404).json({
        status: 404,
        msg: "Could not find a repo by this name. Did you check for typos?"
      });
    } else {
      console.log(err);
      res.json({
        status: err.status,
        msg: "There was an error with your request.",
        err: err
      });
    }
  }
});

module.exports = app;
