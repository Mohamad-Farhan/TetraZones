var saller = require("firebase-admin");

var serviceAccount = require("../config/fbServiceAccountKey.json");

saller.initializeApp({
    credential: saller.credential.cert(serviceAccount),
    databaseURL: "https://tetra-669d6.firebaseio.com"
});

module.exports = saller