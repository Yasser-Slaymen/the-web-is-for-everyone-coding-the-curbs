const express = require('express')
const app = express();
const port = 8001;
// serve public files
app.use(express.static('public'))
// hook up tamplats engine
app.set('view engine', 'ejs')
app.set('views', './views')
app.use('/assets', express.static('assets'))



// identification route
app.get('/',(request, response) =>{
    response.render('pages/home')
})

app.listen(port, () =>{
    console.log(`listening to the port ${port}`)
})