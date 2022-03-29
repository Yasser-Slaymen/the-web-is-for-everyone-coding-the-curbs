const express = require('express');
const {readFile} = require('fs');
const app = express();

app.get('/',(request,response) => {
    readFile('/index.html','utf8', (eer,html) =>{
        if(err){
            response.status(500)
        }else{
            response.send(html)
        }
    })
})

app.listen(3000,() => {
    console.log(' App Exampl')
})