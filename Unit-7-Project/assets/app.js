
	// 1. Link to Firebase
var config = {
    apiKey: "AIzaSyDE3_wFWGkGaq6JxRbLZFaAaspt7_lHf3A",
    authDomain: "train-9a84e.firebaseapp.com",
    databaseURL: "https://train-9a84e.firebaseio.com",
    projectId: "train-9a84e",
    storageBucket: "train-9a84e.appspot.com",
    messagingSenderId: "357588333563"
    
};
  firebase.initializeApp(config);

 var database = firebase.database();
	
// Button for adding Trains
	$("#addTrain").on("click", function(){

		// Grabs user input and creates values
		var trainName = $("#trainName").val().trim();
		var destination = $("#goingPlaces").val().trim();
		var trainTime = moment($("#trainTime").val().trim(), "HH:mm").subtract(10, "years").format("X");;
		var freq = $("#freq").val().trim();

		// Test for user input
		console.log(trainName);
		console.log(destination);
		console.log(trainTime);
		console.log(freq);

		// Creates local shortterm object for holding train data
		// Will push this to firebase
		var newTrain = {
			trainName:  trainName,
			destination: destination,
			trainTime: trainTime,
			freq: freq,
		}

		// pushing Info to Firebase
		database.ref().push(newTrain);

		// clear text-boxes
		$("#trainName").val("");
		$("#goingPlaces").val("");
		$("#trainTime").val("");
		$("#freq").val("");

		// Prevents page from refreshing
		return false;
	});

	database.ref().on("child_added", function(childSnapshot){

		console.log(childSnapshot.val());

		// assign firebase variables to snapshots.
		var tName = childSnapshot.val().trainName;
     	var tDestination = childSnapshot.val().destination;
		var TrainTime = childSnapshot.val().trainTime;
		var tFrequency = childSnapshot.val().freq;
		
		var timeRemainder = moment().diff(moment.unix(TrainTime), "minutes") % tFrequency ;
		var tMinutes = tFrequency - timeRemainder;

		var nextTrainArrival = moment().add(tMinutes, "m").format("hh:mm A"); 
		
		// Test for correct times and info
		console.log(tMinutes);
		console.log(nextTrainArrival);
		console.log(moment().format("hh:mm A"));
		console.log(nextTrainArrival);
		console.log(moment().format("X"));

		// Append train info to table on page
		$("#trainTable > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" + tFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + tMinutes + "</td></tr>");

  }, 
  function (errorObject){
      console.log("Errors handled: " + errorObject.code);
    });
//could not figure out "NaN" user lack of input
  

