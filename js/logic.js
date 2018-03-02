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

// *****ALL VARIABLES MUST BE CHANGED TO MATCH TRAIN SCHEDULE

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

    //     // name:$("#name").val().trim()
    //     // name:$("#name").val().trim()
    //     // name:$("#name").val().trim()
    //     // name:$("#name").val().trim()

        name:trainInput,
        destination:destinationInput,
        time:timeInput,
        frequency:freqInput,
        timestamp:firebase.database.ServerValue.TIMESTAMP

    })

    
})

database.ref().on("value", function(snapshot) {
    console.log("Database info:"+snapshot.val())
    console.log(snapshot.val())
    

})


database.ref().orderByChild("timestamp").on("child_added", function(snap) {
    $("#addTrain").append("<div>"+snap.val().name+"</div>");
    $("#addDestination").append("<div>"+snap.val().destination+"</div>");
    $("#addFrequency").append("<div>"+snap.val().frequency+"min"+"</div>");

  });


