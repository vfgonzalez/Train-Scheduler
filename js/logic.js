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

var nameInput
var roleInput
var startInput
var rateInput
var timestamp




$("#submit").on("click", function (){
    event.preventDefault()
    nameInput = $("#name").val()
    console.log("name =" + nameInput)
    roleInput = $("#role").val()
    startInput = $("#startDate").val()
    rateInput = $("#monthlyRate").val()
   
    
    database.ref().push({

    //     // name:$("#name").val().trim()
    //     // name:$("#name").val().trim()
    //     // name:$("#name").val().trim()
    //     // name:$("#name").val().trim()

        name:nameInput,
        role:roleInput,
        start:startInput,
        rate:rateInput,
        timestamp:database.ServerValue.TIMESTAMP

    })

    
})

// database.ref().on("value", function(snapshot) {
//     console.log("Database info:"+snapshot.val())
//     console.log(snapshot.val())
    

// })

database.ref().on('child_added', function(snap) {
    var json = JSON.stringify(snap.val())
    console.log(json)
    var splitarray = json.split(',')
    console.log(splitarray)
    console.log(splitarray[1])
    console.log(splitarray[0])
    $("#addName").append("<div>"+splitarray[0]+"</div>")
    $("#addRole").append("<div>"+splitarray[2]+"</div>")
    $("#addDate").append("<div>"+splitarray[3]+"</div>")
    $("#addRate").append("<div>"+splitarray[1]+"</div>")
    
})

// database.ref().orderByChild('number').on('value', function(snapshot) {
//     // console.log('hi')
//     console.log(snapshot.val())
// })



