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
app.use(route.get('/editor', editor))

// Posts
app.use(route.post('/post', saveData))

// Server static public files
app.use(serve('./assets'))
app.use(serve('./node_modules/alloyeditor/dist/alloy-editor'))

// Index when user hits page.
function *index() {
    this.body = yield render.page('index', {
        title: 'Homepage',
        homepage: db,
        other: {
            link: '/editor',
            name: 'Editor'
        }
    })
}

// Editor when logged in user accesses page that wishes to editor content
function *editor() {
    this.body  = yield render.edit('index', {
        title: 'Editing Homepage',
        homepage: db
    })
}

// Save Data when logged in user saves content
function *saveData() {
    let body = yield parse(this)
    fs.writeFileSync('db/data.json', JSON.stringify(body))
    db = updatedb()
    this.redirect('/')
}

//update db
function updatedb() {
    console.log('Updating Database...');
    return JSON.parse(fs.readFileSync('db/data.json'))
}

module.exports = app
