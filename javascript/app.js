
// setting the function to be ready when page loads
$(document).ready(function () {
    var config = {
        apiKey: "AIzaSyBOu23lM1G6V271A-N8XoHS3YKmO6aTLgA",
        authDomain: "train-01-211cc.firebaseapp.com",
        databaseURL: "https://train-01-211cc.firebaseio.com",
        projectId: "train-01-211cc",
        storageBucket: "train-01-211cc.appspot.com",
        messagingSenderId: "877637243527",
        appId: "1:877637243527:web:31a5a55be90cb5d7a7de22",
        measurementId: "G-LCNEENZL2Z"
    };


    firebase.initializeApp(config);

    console.log(firebase);
    // A variable to reference the database.
    var database = firebase.database();

    console.log(database);

    // Variables for the onClick event
    var trainName = "";
    var destination = "";
    var firstTrain = "";
    var frequency = 0;

    $("#add-train").on("click", function () {
        event.preventDefault();
        // Storing and retreiving new train data
        trainName = $("#train-name").val().trim();
        destination = $("#destination").val().trim();
        firstTrain = $("#Ftrain").val().trim();
        frequency = $("#frequency-input").val().trim();

        // Pushing to database
        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        $("form")[0].reset();
    });

    database.ref().on("child_added", function (childSnapshot) {
        var nextArr;
        var minAway;
        // Change year so first train comes before now
        var firstTrainNew = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1, "years");
        // Difference between the current and firstTrain
        var diffTime = moment().diff(moment(firstTrainNew), "minutes");
        var remainder = diffTime % childSnapshot.val().frequency;
        // Minutes until next train
        var minAway = childSnapshot.val().frequency - remainder;
        // Next train time
        var nextTrain = moment().add(minAway, "minutes");
        nextTrain = moment(nextTrain).format("hh:mm");

        $("#add-row").append("<tr><td>" + childSnapshot.val().trainName +
            "</td><td>" + childSnapshot.val().destination +
            "</td><td>" + childSnapshot.val().frequency +
            "</td><td>" + nextTrain +
            "</td><td>" + minAway + "</td></tr>");

        // Handle the errors
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });

});