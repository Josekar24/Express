"use strict "

let express= require('express'),
app=express()

app 
    .get ("/", (req, res) => {
        
        res.sendFile ('%{_dirname} / assets/index.html')

    })

    .listen(3000)
