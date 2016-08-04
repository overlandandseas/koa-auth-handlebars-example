//RUN THE TRAP
'use strict'
const     fs = require('fs')
const server = require('./lib/server')




// generateAssets()
server.listen(3000)

console.log('Server Started...')
console.log('Listing on port 3000...')




// /**
//  * [generateAssets description]
//  * @return {[type]} [description]
//  */
// function generateAssets() {
//
//     console.log('Generating Assets...');
//
//     //create alloy editor javascript file
//     fs.createReadStream('node_modules/alloyeditor/dist/alloy-editor/alloy-editor-all-min.js')
//         .pipe(fs.createWriteStream('assets/js/ASSET_alloy-editor-all-min.js'))
//
//     //create alloy editor css file
//     fs.createReadStream('node_modules/alloyeditor/dist/alloy-editor/assets/alloy-editor-moono-min.css')
//         .pipe(fs.createWriteStream('assets/css/ASSET_allow-editor-moono-min.css'))
// }
