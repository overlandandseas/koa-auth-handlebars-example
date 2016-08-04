//server
'use strict'

const     fs = require('fs')
const    koa = require('koa')
const render = require('./render')
const  route = require('koa-route')
const logger = require('koa-logger')
const  serve = require('koa-static-folder')
const session = require('koa-generic-session')
const bodyParser = require('koa-bodyparser')


// "In Memory Scalable DataBase!"
let db = updatedb()


let app = koa()


// Logging
app.use(logger())

// proxy
app.proxy = true

// session
app.keys = ['super-secret-key']
app.use(session())

// body parsing
app.use(bodyParser())

// passport
require('./auth')
const passport = require('koa-passport')
app.use(passport.initialize())
app.use(passport.session())

// Server static public files
app.use(serve('./assets'))
app.use(serve('./node_modules/alloyeditor/dist/alloy-editor'))

// Public Routes
// Gets
app.use(route.get('/', index))
app.use(route.get('/login', admin))
app.use(route.get('/logout', logout))

// Posts
app.use(route.post('/login', passport.authenticate('local', {
    successRedirect: '/editor',
    failureRedirect: '/?fail'
})))

//
// AUTHENTICATE!!!!!
//
app.use(function*(next) {
    if (this.isAuthenticated())
        yield next
    else
        this.redirect('/login')
})

// Secure Routes
app.use(route.get('/editor', editor))
app.use(route.post('/post', saveData))












// Index when user hits page.
function *index() {
    this.body = yield render.page('index', {
        title: 'Homepage',
        homepage: db,
        other: {
            link: '/editor',
            name: 'Editor'
        },
        loggedIn: this.isAuthenticated()
    })
}
function *admin() {
    this.body = yield render.page('login', {
        title: 'Login',
        loggedIn: this.isAuthenticated()
    })
}

// Editor when logged in user accesses page that wishes to editor content
function *editor() {
    this.body  = yield render.edit('index', {
        title: 'Editing Homepage',
        homepage: db,
        loggedIn: this.isAuthenticated()
    })
}
function *logout() {
    this.logout()
    this.redirect('/')
}

// Save Data when logged in user saves content
function *saveData() {
    // let body = yield parse(this)
    fs.writeFileSync('db/data.json', JSON.stringify(this.request.body))
    db = updatedb()
    this.redirect('/')
}

//update db
function updatedb() {
    console.log('Updating Database...');
    return JSON.parse(fs.readFileSync('db/data.json'))
}

module.exports = app
