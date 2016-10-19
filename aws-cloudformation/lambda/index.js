var cv = require('opencv');
var AWS = require('aws-sdk');
var s3 = new AWS.S3()

function getImage(event, context, callback) {
	var params = {Bucket:event.bucket, Key:event.key}

	var buffer;
	var buffers = [];
	var length = 0;

	s3.getObject(params)
		.on("httpData", function(chunk) {
			buffers.push(chunk); 
			length += chunk.length
		})
		.on("httpDone", function(){
			buffer = Buffer.concat(buffers, length);

			console.log("got file of length " + length);

			processImage(buffer, callback);
		})
		.send()

};
	
function processImage(buffer, callback) {
	cv.readImage(buffer, function(err, im){
		if (err) {
			callback(err)
		}
		if (im.width() < 1 || im.height() < 1) {
			callback("Image has no size")
		}

		im.detectObject("data/haarcascade_frontalface_alt.xml", {}, function(err, faces) {
			if (err) {
				callback(err)
			}

			callback(null, faces)
		});
	});
}

exports.handler = getImage
