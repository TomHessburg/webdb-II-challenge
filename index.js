const express = require('express');
const helmet = require('helmet');
 
const server = express();

server.use(express.json());
server.use(helmet());


const knex = require('knex');
const knexConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: './data/lambda.sqlite3'
  }
}
const db = knex(knexConfig);

// endpoints for zoos here here

      //basic endpoint
server.get('/', (req,res) => {
  res.send('im working');
})
      //post 
server.post('/api/zoos', (req, res) => {
  db('zoos')
    .insert(req.body)
    .then(ids => {
      const id = ids[0]
      db('zoos').where({ id: id })
        .first()
        .then(zoo => {
          res.status(200).json(zoo)
        })
        .catch(err => res.status(500).json(err))
    })
    .catch(err => res.status(500).json(err))
})
      //baseline get request
server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(zoos => res.status(200).json(zoos))
    .catch(err => res.status(500).json(err))
})
      //get specific zoo
server.get('/api/zoos/:id', (req, res) => {
  const id = req.params.id;
  db('zoos').where({id: id})
    .then(zoo => res.status(200).json(zoo))
    .catch(err => res.status(500).json(err))
})
      //delete by specific id
server.delete('/api/zoos/:id', (req,res) => {
  const id = req.params.id;

  db('zoos').where({ id: id }).del()
    .then(count => {
      if(count > 0 ){
        res.status(204).json("successfully deleted item")
      } else {
        res.status(404).json({message: 'couldnt delete this item'})
      }
    })
    .catch(err => res.status(500).json(err))
})
      //update zoo
server.put('/api/zoos/:id', (req,res) => {
  db('zoos').where({ id: req.params.id }).update(req.body)
    .then(count => {
      if(count > 0 ){
        res.status(201).json(count)
      }else{
        res.status(404).json({message: 'zoo not found'})
      }
    })
    .catch(err => res.status(500).json(err))
})




// endpoints for bears here here
      //post 
server.post('/api/bears', (req, res) => {
  db('bears')
    .insert(req.body)
    .then(ids => {
      const id = ids[0]
      db('bears').where({ id: id })
        .first()
        .then(zoo => {
          res.status(200).json(zoo)
        })
        .catch(err => res.status(500).json(err))
    })
    .catch(err => res.status(500).json(err))
})
      //baseline get request
server.get('/api/bears', (req, res) => {
  db('bears')
    .then(zoos => res.status(200).json(zoos))
    .catch(err => res.status(500).json(err))
})
      //get specific zoo
server.get('/api/bears/:id', (req, res) => {
  const id = req.params.id;
  db('bears').where({id: id})
    .then(zoo => res.status(200).json(zoo))
    .catch(err => res.status(500).json(err))
})
      //delete by specific id
server.delete('/api/bears/:id', (req,res) => {
  const id = req.params.id;

  db('bears').where({ id: id }).del()
    .then(count => {
      if(count > 0 ){
        res.status(204).json("successfully deleted bear")
      } else {
        res.status(404).json({message: 'couldnt delete this bear'})
      }
    })
    .catch(err => res.status(500).json(err))
})
      //update zoo
server.put('/api/bears/:id', (req,res) => {
  db('bears').where({ id: req.params.id }).update(req.body)
    .then(count => {
      if(count > 0 ){
        res.status(201).json(count)
      }else{
        res.status(404).json({message: 'bear not found'})
      }
    })
    .catch(err => res.status(500).json(err))
})





const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
