//server
'use strict'

const koa = require('koa')
const parse = require('co-body')
const route = require('koa-route')
const render = require('./render')
const serve = require('koa-static-folder')
const logger = require('koa-logger')

let app = koa()


// Logging
app.use(logger())


// Routes
// Gets
app.use(route.get('/', index))

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


module.exports = app
