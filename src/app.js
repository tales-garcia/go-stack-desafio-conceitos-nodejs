const express = require("express");
const cors = require("cors");

const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repo);

  return response.status(201).json(repo);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if(!repoIndex)
    return response.status(400).json({ msg: 'Invalid repositoty id' })


  const repo = repositories[repoIndex];

  repo.title = title;
  repo.url = url;
  repo.techs = techs;

  repositories[repoIndex] = repo;

  return response.status(200).json(repo);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if(!repoIndex)
    return response.status(400).json({ msg: 'Invalid repositoty id' })

  repositories.splice(repoIndex, 1);

  return response.status(200).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if(!repoIndex)
    return response.status(400).json({ msg: 'Invalid repositoty id' })


  if(!repoIndex)
   return response.status(400).json({ msg: 'Invalid repositoty id' })

  repositories[repoIndex].likes++;

  return response.status(200).json(repositories[repoIndex])
});

module.exports = app;
