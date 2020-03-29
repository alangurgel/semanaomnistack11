const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);


routes.get('/ongs', OngController.index); //LISTAGEM DE ONGS 
routes.post('/ongs', OngController.create);//CADASTRO DA ONG

routes.get('/profile', ProfileController.index);//LISTAGEM DE ONG ESPECIFICA

routes.get('/incidents', IncidentController.index);//LISTAGEM DE TODOS INSIDENTE
routes.post('/incidents', IncidentController.create);//CRIAR UM INSIDENTE
routes.delete('/incidents/:id', IncidentController.delete);//DELETAR UM INSIDENTE

module.exports = routes;