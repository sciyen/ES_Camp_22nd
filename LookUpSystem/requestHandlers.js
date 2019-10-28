var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");

function start(response) {
    console.log("Request handler 'start' was called.");

    var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html; ' +
        'charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/upload" enctype="multipart/form-data" ' +
        'method="post">' +
        '<input type="file" name="upload" multiple="multiple" />' +
        '<input type="submit" value="Upload file" />' +
        '</form>' +
        '</body>' +
        '</html>';

    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(body);
    response.end();
}

function upload(response, request) {
    console.log("Request handler 'upload' was called.");

    var form = new formidable.IncomingForm();
    console.log("about to parse");
    form.parse(request, function(error, fields, files) {
        console.log("parsing done");

        //fs.renameSync(files.upload.path, "./tmp/test.png");
        var is = fs.createReadStream(files.upload.path);
        var os = fs.createWriteStream('./tmp/test.png');

        is.pipe(os);
        is.on('end', function() {
            fs.unlinkSync(files.upload.path);
        });


        response.writeHead(200, { "Content-Type": "text/html" });
        response.write("decoding url...");
        response.write("<img src='/show' />");
        //response.end();


        const Jimp = require('jimp');
        const jsQR = require("jsqr");

        path = './tmp/test.png';

        Jimp.read(path) // image path use path.join(__dirname,'/fileName')
            .then(image => {
                const code = jsQR(image.bitmap.data, image.bitmap.width, image.bitmap.height);

                if (code) {
                    console.log("Found QR code: ", code.data);
                    goto(response, code.data);
                }

            })
            .catch(err => {
                // Handle an exception.
                console.log("Errors:" + err);
            });

    });
}

function show(response) {
    console.log("Request handler 'show' was called.");
    fs.readFile("./tmp/test.png", "binary", function(error, file) {
        if (error) {
            response.writeHead(500, { "Content-Type": "text/plain" });
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, { "Content-Type": "image/png" });
            response.write(file, "binary");
            response.end();
        }
    });
}

function goto(response, path) {
    console.log("goto: " + path);
    response.write('<meta http-equiv="refresh"content="0;url=' + path + '">');
    response.end();
}

exports.start = start;
exports.upload = upload;
exports.show = show;