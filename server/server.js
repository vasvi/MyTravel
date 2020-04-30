const express = require('express')
const app = express()
const port = 8080

app.get('/', (req, res, next) => {
    res.send('hello from cloudbuild');
})

// app.use(express.static(__dirname + '/public/'));

// app.use((req, res, next) => {
//     res.setHeader('content-type', 'text/html');
//     res.sendFile(__dirname+'/public/index.html');
// })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
