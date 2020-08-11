const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyCSBQ3XhInl0mJjYAN0vmqtGwLi24hbj84",
    authDomain: "friesbureau-demo.firebaseapp.com",
    projectId: "friesbureau-demo"
  });
  
var db = firebase.firestore();

var lytogtal =[  
    {  
        "id":1,
        "opgave":"Lyt og udtal bogstaverne a, b, c, d",
        "udtale":"a, b, c, d",
        "svar":"a b c d"
     },
     {  
        "id":2,
        "opgave":"Lyt og udtal bogstaverne e, f, g, h",
        "udtale":"e, f, g, h",
        "svar":"e f g h"
     }
 ]

 lytogtal.forEach(function(obj) {
    db.collection("lytogtal").add({
        id: obj.id,
        opgave: obj.opgave,
        udtale: obj.udtale,
        svar: obj.svar
    }).then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
});