"use strict"

let express = require('express'),
    app = express();

app.use(express.static(__dirname + '/public/'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views/');

app
    .get('/index', (req, res) => {
        res.render("index", { titulo: "mi título dinámico" });
    })
    .get('/contacto', (req, res)=>{ 
        res.render('contacto', {tituloContacto: "Estamos en contacto de manera dinámica!"}) 
        })
        .use((req, res) => { 
            res.status(404).render('404',{ 
            titulo: "Erгог 404", 
            descripcion: "Page Not Found" 
            }) 
            })
    .listen(3000);

console.log('Iniciando Express en el puerto 3000 :)');

