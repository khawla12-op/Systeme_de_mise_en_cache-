## Objectifs:

Ce Code décrit le système de mise en cache mis en place à l'aide de deux serveurs Express.js, avec l'objectif d'optimiser les temps de réponse et de réduire la charge sur la base de données MongoDB. 

Le système se compose d'un serveur proxy et d'un serveur API pour gérer les demandes entrantes.

**Architecture du Système :**

1. *Serveur Proxy :*
    - Le serveur proxy agit comme une interface d'entrée, recevant les demandes des clients.
    - Il vérifie la présence des données demandées dans le cache Redis.
    - Si les données sont trouvées dans le cache, le serveur proxy les renvoie directement au client, optimisant ainsi les temps de réponse.
    - En cas d'absence de données dans le cache, le serveur proxy interagit avec le serveur API.
2. *Serveur API :*
    - Le serveur API contient des endpoints pour gérer les différentes demandes.
    - Il interagit avec la base de données MongoDB pour récupérer les données demandées.
    - Une fois les données récupérées, le serveur API les transmet au serveur proxy, qui les met en cache dans Redis avant de les renvoyer au client.

**Technologies Utilisées :**

1. *Express.js :* Choisi pour sa flexibilité et sa facilité de mise en place d'une API RESTful.
2. *Redis :* Utilisé comme système de mise en cache pour stocker temporairement les données fréquemment demandées.
3. **MongoDB :** Base de données NoSQL utilisée pour stocker de manière persistante les entités "utilisateurs", "commentaires" et "posts".
