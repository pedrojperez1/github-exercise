/* server.js
Starts app.js as a server
*/

const app = require("./app.js");
const config = require("./config");

app.listen(config.PORT, () => {
  console.log(`App running on port ${config.PORT}`);
});
