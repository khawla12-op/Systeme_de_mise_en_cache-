const express = require('express');
const mongoose = require('mongoose');
const app = express();
const uri='mongodb+srv://khaoula:azer1234@cluster0.85mjxym.mongodb.net/Managing_Users_Posts?retryWrites=true&w=majority'
async function connect(){
    try{
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    }catch(error){
        console.error(error);
    }
}
connect();
app.use('/users', require('./routes/users'));
app.use('/posts', require('./routes/posts'));

// Démarrage du serveur API
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Serveur API en écoute sur le port ${PORT}`);
});
