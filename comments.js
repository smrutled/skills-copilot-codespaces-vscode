// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var server = http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;
    var ext = path.extname(pathname);
    var realPath = __dirname + pathname;
    if (ext) {
        fs.exists(realPath, function (exists) {
            if (!exists) {
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                res.write("This request URL " + pathname + " was not found on this server.");
                res.end();
            } else {
                fs.readFile(realPath, "binary", function (err, file) {
                    if (err) {
                        res.writeHead(500, {
                            'Content-Type': 'text/plain'
                        });
                        res.end(err);
                    } else {
                        var contentType = getContentType(ext);
                        res.writeHead(200, {
                            'Content-Type': contentType
                        });
                        res.write(file, "binary");
                        res.end();
                    }
                });
            }
        });
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        res.write("This request URL " + pathname + " was not found on this server.");
        res.end();
    }
});
server.listen(1337);