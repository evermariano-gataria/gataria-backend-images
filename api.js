const express = require("express");
const app = express();
require("./config/envs.js");

catApiURL = process.env.CATAPI_URL;
const apiPrefix = "/images"

if (!catApiURL) {
  console.error("CATAPI_URL environment variable is not configured");
  process.exit(1);
}

app.get(`${apiPrefix}/getimg`, async (req, res) => {
  try {
    const response = await fetch(catApiURL, {
      //   headers: {
      //     'x-api-key': API_KEY
      //   }
    });

    const data = await response.json();
    res.send([{ url: data[0].url }]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get(`${apiPrefix}/healthcheck`, (req, res) => res.json({ healthcheck: "OK" }));

app.listen(3020, () => console.log("Server is running on port 3020"));

module.exports = app;