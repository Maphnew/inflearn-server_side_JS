const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
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

app.get('/auth/logout', (req,res) => {
    delete req.session.displayName
    res.redirect('/welcome')
})

app.get('/welcome', (req,res) => {
    if (req.session.displayName) {
        res.send(`
            <h1>Hello, ${req.session.displayName}</h1>
            <a href="/auth/logout">logout</a>
        `)
    } else {
        res.send(`
            <h1>Welcome</h1>
            <a href="/auth/login">Login</a>
        `)
    }
   
})

app.post('/auth/login', (req,res) => {
    const user = {
        username: 'user',
        password: '1111',
        displayName: 'KSC'
    }

    const uname = req.body.username
    const pwd = req.body.password
    if(uname == user.username && pwd === user.password){
        req.session.displayName = user.displayName
        console.log(req.session)
        res.redirect('/welcome')
    } else {
        res.send('Who are you? <a href="/auth/login">login</a>')
    }

})

app.get('/auth/login', (req,res) => {
    const output = `
    <form action="/auth/login" method="post">
        <p>
            <input type="text" name="username" placeholder="username">
        </p>
        <p>
            <input type="password" name="password" placeholder="password">
        </p>
        <p>
            <input type="submit">
        </p>
    </form>
    `
    res.send(output)
})

// app.get('/tmp', (req,res) =>{
//     res.send('result:' + req.session.count)
// })

app.listen(3003, () => {
    console.log('Connected 3003 Port. http://localhost:3003')
})