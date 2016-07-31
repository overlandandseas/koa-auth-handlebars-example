'use strict'
const views = require('co-views')

let base = views(__dirname + '/../views', {
    ext: 'handlebars'
});

let page = function (view, context){
    return base(view, context).then(body => base ('layout', {
        title: context.title, body
    }))
}


module.exports = { base, page }
