

var config = {
    apiKey: "AIzaSyC24GNVly3K87MYjITQY2cRgsleufis1Es",
    authDomain: "train-d5204.firebaseapp.com",
    databaseURL: "https://train-d5204.firebaseio.com",
    projectId: "train-d5204",
    storageBucket: "train-d5204.appspot.com",
    messagingSenderId: "915668455676",
    appId: "1:915668455676:web:31735877ef79f1130ac779"
};

var database = firebase.database();
// Initialize Firebase
firebase.initializeApp(config);
console.log(firebase);

var trainName = "";
var destination = "";
var firstTrain = "";
var frequency = "";

$("button").on("click", function (event) {
    event.preventDefault();

    trainName = $("#Ttrain").val().trim();
    destination = $("#Tdestination").val().trim();
    firstTrain = $("#TfirstTrain").val().trim();
    frequency = $("#Tfrequency").val().trim();

    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

database.ref().on("child_added", function (snapshot) {
    var sv = snapshot.val();

    console.log(sv.trainName);
    console.log(sv.destination);
    console.log(sv.firstTrain);
    console.log(sv.frequency);

    $("#name").text(sv.trainName);
    $("#destination").text(sv.destination);
    $("#firstTrain").text(sv.firstTrain);
    $("#frequency").text(sv.frequency);


}, function (errorobject) {
    console.log("errors handled: " + errorobject.code);
});
