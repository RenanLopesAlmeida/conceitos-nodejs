const express = require("express");
const router = express.Router();

const { uuid, isUuid } = require("uuidv4");



const repositories = [];

router.get("/repositories", (request, response) => {

  if(!repositories) {

    return response.status(400).json({
      error:true,
      msg: "This repository does not exists!"
    });
  }

  return response.json(repositories);
});

router.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes:0
  };

  repositories.push(repository);

  return response.json(repository);

});

router.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { url, title , techs } = request.body;
  const repositoryIndex = repositories.findIndex(repository => repository.id == id);
  

  if(repositoryIndex < 0) {
    return response.status(400).json({
      error:true,
      msg: "This repository does not exists!"
    });
  }

  const likes = repositories[repositoryIndex].likes;
  const repository = { id, title, url, techs, likes};

  repositories[repositoryIndex] = repository;

  return response.json(repositories[repositoryIndex]);
  
});

router.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id == id);

  if(repositoryIndex < 0) {
    return response.status(400).json({
      error:true,
      msg: "This repository does not exists!"
    });
  }

  repositories.splice(repositoryIndex, 1);
  
  return response.status(204).send();
  
});

router.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repository = repositories.find(repository => repository.id == id);
  const repositoryIndex = repositories.findIndex(repository => repository.id == id);

  if(!repository) {
    return response.status(400).send();
  }

  repository.likes++;
  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

module.exports = router;