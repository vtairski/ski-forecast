const express = require("express");
const app = express();
const fetch = require('node-fetch');

const TOKEN = '?key=2dadaadd732f41a68ac91755192311';
const BASE_API = 'http://api.worldweatheronline.com/premium/v1/weather.ashx';
const JSON_FORMAT = '&format=json';
const NUM_OF_DAYS = '&num_of_days=';

app.get("/forecast", (req, res) => {
  const town = req.query.town;
  const daysPayload = req.query.days;

  let days = 1;

  if (daysPayload && daysPayload > 0 && daysPayload <= 15) {
    days = daysPayload
  }

  const url = `${BASE_API}${TOKEN}&q=${town}${JSON_FORMAT}${NUM_OF_DAYS}${days}`

  fetch(url)
    .then(res => res.json())
    .then(data => res.send({ data }))
  .catch(err => {
    res.send('An error has occured', err);
  });
});


app.listen(3000, () => {
 console.log("Server running on port 3000");
});

