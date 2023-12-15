const express = require('express');
const axios = require('axios');
const redis = require('redis');
const app = express();
const client = redis.createClient();
app.use(express.static('static'))
const baseURL="https://jsonplaceholder.typicode.com"
app.use(express.json())

//Middleware pour la gaestion de la mise en cache:
const cacheMiddleware = async (req, res, next) => {
  // Vérifiez si la donnée est en cache dans Redis
  const cachedData = await client.get(req.path);

  if (cachedData) {
      console.log('Cache hit');
      const data = JSON.parse(cachedData);
      return res.status(200).json(data);
  }

  // Si la donnée n'est pas en cache, continuez vers le serveur API
  next();
};

app.use(cacheMiddleware);
//Middeleware pour la gestion des requetes vers le serveur API:
const apiMiddleware = async (req, res) => {
  try {
      const response = await axios.get(`http://localhost:3001${req.originalUrl}`);
      const responseData = response.data;

      // Mettez la réponse en cache dans Redis
      client.setex(req.path, 300, JSON.stringify(responseData));

      res.status(200).json(responseData);
  } catch (error) {
      console.error(error);
      res.status(500).send('Erreur interne du serveur');
  }
};

app.use(apiMiddleware);
//Demarrage du serveur Proxy:
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur proxy en écoute sur le port ${PORT}`);
});
