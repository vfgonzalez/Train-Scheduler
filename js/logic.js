 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyDFY1JJpIcY_-26GalzNZdXcGoebiFKEvg",
    authDomain: "train-scheduler-d01f9.firebaseapp.com",
    databaseURL: "https://train-scheduler-d01f9.firebaseio.com",
    projectId: "train-scheduler-d01f9",
    storageBucket: "train-scheduler-d01f9.appspot.com",
    messagingSenderId: "636114168685"
  };
  firebase.initializeApp(config);



  var database = firebase.database()

var trainInput
var destinationInput
var freqInput
var timeInput
var timestamp




$("#submit").on("click", function (){
    event.preventDefault()
    trainInput = $("#name").val()
    console.log("name =" + trainInput)
    destinationInput = $("#destination").val()
    timeInput = $("#time").val()
    freqInput = $("#frequency").val()
   
    
    database.ref().push({
        name:trainInput,
        destination:destinationInput,
        time:timeInput,
        frequency:freqInput,
        timestamp:firebase.database.ServerValue.TIMESTAMP
    })
    $("#name").val("")
    $("#destination").val("")
    $("#time").val("")
    $("#frequency").val("")
    
    console.log(moment().add(frequency,'minutes'))
})

// database.ref().on("value", function(snapshot) {
//     // console.log("Database info:"+snapshot.val())
//     // console.log(snapshot.val())

// })
 
// setInterval(function(){  
   
database.ref().orderByChild("timestamp").on("child_added", function(snap) {
    // var startTime = moment(snap.val().time, "hh:mm A")
    $("#addTrain").append("<div>"+snap.val().name+"</div>");
    $("#addDestination").append("<div>"+snap.val().destination+"</div>");
    $("#addFrequency").append("<div>"+snap.val().frequency+"min"+"</div>");
    // $("#firstTrain").append("<div>"+snap.val().startTime+"</div>");
    console.log("Time input: "+snap.val().time)
    
    // Time Variables
    
    var tFrequency = snap.val().frequency;
    
    
    var firstTime = snap.val().time;
    
    
    
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm A").subtract(1, "years");
    console.log(firstTimeConverted);
    
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm A"));
    
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    
    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);
    
    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    $("#addMinaway").append("<div>"+tMinutesTillTrain+" min"+"</div>")

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    $("#addNext").append("<div>"+nextTrain.format('hh:mm A')+"</div>")

  });
  
//  }, 10000,);
