const port = 3000
const portH2 = 3001
const spdy = require('spdy')
const express = require('express')
const path = require('path')
const fs = require('fs')
const htdocs_path = "./htdocs"

const app = express()

const options = {
    key: fs.readFileSync(__dirname + '/server.key'),
    cert:  fs.readFileSync(__dirname + '/server.crt')
}



app.get('*', (req, res) => {


    // Server push example
    if ( req.path==="/" && res.push ) {
        res.push('/client.js', {
            status: 200, // optional
            method: 'GET', // optional
            request: {
                accept: '*/*'
            },
            response: {
                'content-type': 'application/javascript'
            }
        }, function (err, stream) {
            stream.end(fs.readFileSync(path.join(__dirname, htdocs_path, '/client.js')))
        })


        res.push('/image.jpg', {
            request: {
                accept: '*/*'
            },
            response: {
                'content-type': 'image/jpeg'
            }
        }, function (err, stream) {

            stream.end(fs.readFileSync(path.join(__dirname, htdocs_path, '/image.jpg')))

        })
    }

    /*res.writeHead(200, {'content-type': 'text/html'});
    res.end("<html><head><title>App</title><script src='/client.js'></script><head><body><h1>bla bla</h1></body><html>")*/


    // return file if it exists
    let fn = path.join(__dirname, htdocs_path, (req.path==="/"?"/index.html":req.path));
    fs.stat(fn, function(err, stat) {
        if(err == null) {
            res.sendFile(fn)
        } else if(err.code == 'ENOENT') {
            console.log(`File ${fn} doesn't exist!`)
            res.status(404).send(`<h1>File "${fn}" doesn't exist!</h1>`)
        } else {
            console.log('Some other error: ', err.code)
            res.status(500).send(`<h1>Server error ${err.code}</h1>`)
        }
    });

})


// listening for unsecure http requests
app.listen(port, function () {
    console.log(`Listening for HTTP on port: ${port}.`)
});


// listening for secure http/2 requests
spdy
    .createServer(options, app)
    .listen(portH2, (error) => {
    if (error) {
        console.error(error)
        return process.exit(1)
    } else {
        console.log(`Listening for HTTP/2 on port: ${portH2}.`)
}
})
