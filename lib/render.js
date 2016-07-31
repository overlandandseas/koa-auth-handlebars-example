'use strict'
//dependencies
const views = require('co-views')

//constants
const DEFAULT_LAYOUT = 'layout'

let base = views(__dirname + '/../views', {
    ext: 'handlebars'
});

let page = function (view, context){
    return base(view, context).then(body => base (DEFAULT_LAYOUT, {
        title: context.title, body
    }))
}


module.exports = { base, page }
