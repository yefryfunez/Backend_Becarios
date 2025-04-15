const multer = require('multer');

const storage = multer.memoryStorage();

// almacena el archivo en un buffer de bytes para exportarlo
const upload = multer({
    storage
});

module.exports = upload;