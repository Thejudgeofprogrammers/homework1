const express = require('express');
const route = express.Router();
const { handlerCounterRequest, deleteKeyValue } = require('./optimize/functions');

route.use(express.json());

module.exports = (client) => {
  route.get("/morecounter/:id", async (req, res) => {
    await handlerCounterRequest(req, res, client.get.bind(client));
  });

  route.post("/counter/:id", async (req, res) => {
    await handlerCounterRequest(req, res, client.incr.bind(client));
  });

  route.post("/counter/delete/:id", async (req, res) => {
    await deleteKeyValue(req, res, client.del.bind(client));
    res.redirect("http://website:3000/api/books");
  });

  return route;
};