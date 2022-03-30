const express = require('express')
const app = express();
const port = 5000;

app.use(express.static('public'))
app.set('view engine', 'ejs')

// identification route
app.get('/',(request, response) =>{
    response.render('pages/home')
})

app.listen(port, () =>{
    console.log(`listening to the port ${port}`)
})