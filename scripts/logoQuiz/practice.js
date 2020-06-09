var fs = require('fs');

const testFolder = './images/';

fs.readdir(testFolder, (err, files) => {
    files.forEach(file => {
        console.log(file);
    });
});