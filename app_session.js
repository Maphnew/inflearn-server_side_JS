const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const app = express()

app.use(session({
    secret: 'ASDM3JH12@R*HJ7436DUJ@IF',
    resave: false,
    saveUninitialized: true
}))

app.get('/count', (req,res)=> {
    if(req.session.count){
        req.session.count++

    } else {
        req.session.count = 1
    }

    res.send('count: ' + req.session.count)
})

// app.get('/tmp', (req,res) =>{
//     res.send('result:' + req.session.count)
// })

app.listen(3003, () => {
    console.log('Connected 3003 Port. http://localhost:3003')
})