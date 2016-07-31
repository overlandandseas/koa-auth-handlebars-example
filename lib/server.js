//server
'use strict'

const     fs = require('fs')
const    koa = require('koa')
const  parse = require('co-body')
const render = require('./render')
const  route = require('koa-route')
const logger = require('koa-logger')
const  serve = require('koa-static-folder')

// "In Memory Scalable DataBase!"
let db = updatedb()


let app = koa()


// Logging
app.use(logger())


// Routes
// Gets
app.use(route.get('/', index))

// Posts
app.use(route.post('/post', saveData))

// Server static public files
app.use(serve('./assets'))

// Index when user hits page.
function *index() {
    this.body = yield render.page('index', {
        title: 'Homepage',
        homepage: {
            title: 'T I T L E',
            content: 'There is no c o n t e n t.'
        }
    })
}

// Save Data when logged in user saves content
function *saveData() {
    let body = yield parse(this)
    fs.writeFileSync('db/data.json', JSON.stringify(body))
    db = updatedb();
}

//update db
function updatedb() {
    return JSON.parse(fs.readFileSync('db/data.json'))
}

module.exports = app
