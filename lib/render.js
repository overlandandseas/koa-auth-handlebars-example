'use strict'
//dependencies
const views = require('co-views')

//constants
const DEFAULT_LAYOUT = 'layout'

let base = views(__dirname + '/../views', {
    ext: 'handlebars'
});


let page = function (view, context){

    let { title, loggedIn } = context

    return base(view, context)
        .then(body => base(DEFAULT_LAYOUT, {
            title,
            body,
            loggedIn
        }))
}

let edit = function (view, context) {

    let { title, loggedIn } = context

    return base(view, context)
        .then(body => base('edit', { title, body, loggedIn }))
        .then(body => base(DEFAULT_LAYOUT, { title, body, loggedIn }))
}


module.exports = { base, page, edit }
