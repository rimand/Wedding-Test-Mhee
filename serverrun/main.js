var admin = require("firebase-admin");
var serviceAccount = require("./wedding-test-mhee-firebase-adminsdk-zgwt3-3f03ec9033.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://wedding-test-mhee.appspot.com"
});

var bucket = admin.storage().bucket();
var previousFiles = [];
let first = true;

function checkForNewFiles() {
    bucket.getFiles(function (err, files) {
        if (err) {
            console.error(err);
            return;
        }

        var newFiles = files.filter(file => !previousFiles.includes(file.name));
        console.log("number file : ", newFiles.length)

        if(first){
            first = false;
            previousFiles = files.map(file => file.name);
            return;
        }

        if (newFiles.length > 0) {
            // console.log('New files added: ', newFiles.map(file => file.name));
            for (let i = 0; i < newFiles.length; i++) {
                console.log(i, newFiles[i].name)

                filename = newFiles[i];

                var file = bucket.file(filename.name);
                var fs = require("fs");
                var stream = file.createReadStream();
                console.log("Donwload", file.name);
                stream.pipe(fs.createWriteStream("image/" + file.name));
            }
        }

        previousFiles = files.map(file => file.name);
    });
}

setInterval(checkForNewFiles, 5000);


// bucket.getFiles(function (err, files) {
//     if (err) {
//         console.error(err);
//         return;
//     }

//     files.sort(function (a, b) {
//         return b.metadata.updated - a.metadata.updated;
//     });

//     var mostRecentFile = files[0];

//     if (!file) return;

//     var file = bucket.file(mostRecentFile.name);

//     var fs = require("fs");
//     var stream = file.createReadStream();
//     console.log("check", file.name);
//     stream.pipe(fs.createWriteStream("image/" + file.name));
// });


