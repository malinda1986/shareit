const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

//detecting face from local image
function detectFaces(filePath, cb) {
    // Creates a client
    const fileName = filePath; // e.g. /path/to/image.png';
    client.faceDetection(fileName)
        .then(results => {
            const faces = results[0].faceAnnotations;
            if (faces.length === 0) {
                return cb(null, {hasFace: false});
            }
            return cb(null, {hasFace: true});
        })
        .catch(err => {
            return cb(err, null);
        });
}

module.exports = {
    detectFaces
};
