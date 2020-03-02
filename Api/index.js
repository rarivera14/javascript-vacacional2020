const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');

const app = express();

let peliculas = [
  {
    "Title": "Her",
    "Year": "2013",
    "imdbID": "1",
    "Type": "Movie",
    "Poster": "https://images-na.ssl-images-amazon.com/images/I/71pj45KrjXL._SY679_.jpg"
  },
  {
    "Title": "Ready Player Oner",
    "Year": "2018",
    "imdbID": "2",
    "Type": "Movie",
    "Poster": "https://images-na.ssl-images-amazon.com/images/I/71NaQGqIhAL._AC_SY606_.jpg"
  },
  {
    "Title": "Scott Pilgrim vs The World",
    "Year": "2013",
    "imdbID": "3",
    "Type": "Movie",
    "Poster": "https://i.pinimg.com/originals/a8/89/47/a8894734c452331512f3eefbeb638933.jpg"
  },
  {
    "Title": "Star Wars: Rise of SkyWalker",
    "Year": "2019",
    "imdbID": "4",
    "Type": "Movie",
    "Poster": "https://upload.wikimedia.org/wikipedia/en/a/af/Star_Wars_The_Rise_of_Skywalker_poster.jpg"
  },
  {
    "Title": "Marriage Story",
    "Year": "2019",
    "imdbID": "5",
    "Type": "Movie",
    "Poster": "https://i.pinimg.com/originals/57/ca/c2/57cac21632f3591737699fc1f7d7d525.png"
  },
  {
    "Title": "500 days of Summer",
    "Year": "2009",
    "imdbID": "6",
    "Type": "Movie",
    "Poster": "https://img.ecartelera.com/noticias/fotos/3900/3959/1.jpg"
  },
  {
    "Title": "Overwatch: Uprising",
    "Year": "2018",
    "imdbID": "7",
    "Type": "Movie",
    "Poster": "https://i.pinimg.com/originals/00/9f/03/009f03859f2ed1789c61bf2b9be844f1.png"
  },
  {
    "Title": "Avengers: Infinity War",
    "Year": "2019",
    "imdbID": "8",
    "Type": "Movie",
    "Poster": "https://images-na.ssl-images-amazon.com/images/I/811xdZfsUqL._SY741_.jpg"
  },
  {
    "Title": "Doom Eternal",
    "Year": "2020",
    "imdbID": "9",
    "Type": "Game",
    "Poster": "https://images-na.ssl-images-amazon.com/images/I/81Fy8c66TxL._AC_SY879_.jpg"
  },
  {
    "Title": "Brooklyn 99",
    "Year": "2015",
    "imdbID": "10",
    "Type": "Series",
    "Poster": "https://www.bolsamania.com/seriesadictos/wp-content/uploads/2016/08/brooklyn-nine-nine-season-4-poster.jpg"
  },

];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(express.static(path.join(__dirname, '../public')));

app.get("/saludar", function (req, res){
    res.send('Hola mundo!'+ JSON.stringify(req.query));  
  });

  app.post('/saludar/:accion', function(req, res){
    res.send('Hola por post!' + req.params.accion+''+ JSON.stringify(req.body))
  });

  app.put('/saludar', function(req, res){
    res.send('Hola por put!' + JSON.stringify(req.body))
  });

  
  app.get("/pelicula", function (req, res){
    res.send(peliculas);  
  });

  app.get("/pelicula/:imdbID", function (req, res){
    let pelicula = peliculas.find(function(item){
      return item.imdbID == req.params.imdbID
    })
    res.send(pelicula);
  });

  app.post("/pelicula", function (req, res){
    peliculas.push({...req.body, imdbID: peliculas.length + 1});  
    res.send({mensaje: 'Pelicula guardada!'});
  });

  app.put("/pelicula", function (req, res){
    let index = peliculas.findIndex(function(item){
      return item.imdbID == req.body.imdbID
    });
    peliculas[index] = req.body; 
    res.send({mensaje: 'Pelicula modificada!'}); 
  });

  app.delete('/pelicula/:imdbID', function(req,res){
    let index = peliculas.findIndex(function(item){
      return item.imdbID == req.params.imdbID
    });
    peliculas.splice(index,1);
    res.send({mensaje:'Pelicula Eliminada'});
  })

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

const port = process.env.PORT || "9000";
app.set("port", port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Magic Happens on port: ${port}`));
