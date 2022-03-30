const express = require('express')
const app = express();
const port = 8000;

app.use(express.static('public'))
app.set('view engine', 'ejs')

// identification route
app.get('/',(req,res) =>{
    console.log("some one viste the website")
    res.send('hallo werld')
})

app.listen(port, () =>{
    console.log(`listening to the port ${port}`)
})