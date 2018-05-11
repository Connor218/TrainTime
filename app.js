var config = {
    apiKey: "AIzaSyAngoLtG18UHzV1B1LIudgX1_EGm62yYms",
    authDomain: "fir-2ab08.firebaseapp.com",
    databaseURL: "https://fir-2ab08.firebaseio.com",
    projectId: "fir-2ab08",
    storageBucket: "fir-2ab08.appspot.com",
    messagingSenderId: "428816235852"
  };

  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // 2. Button for adding Employees
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#employee-name-input").val().trim();
    var destination = $("#role-input").val().trim();
    var tTime = moment($("#start-input").val().trim(), "DD/MM/YY").format("X");
    var frequency = $("#rate-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      role: destination,
      start: tTime,
      rate: frequency
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.role);
    console.log(newTrain.start);
    console.log(newTrain.rate);

  
    // Clears all of the text-boxes
    $("#employee-name-input").val("");
    $("#role-input").val("");
    $("#start-input").val("");
    $("#rate-input").val("");
  
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trRole = childSnapshot.val().role;
    var tTime = childSnapshot.val().start;
    var frequency = childSnapshot.val().rate;
  
    // Employee Info
    console.log(trainName);
    console.log(destination);
    console.log(tTime);
    console.log(frequency);
  
    // Prettify the employee start
    var trainStart = moment.unix(tTime).format("MM/DD/YY");
  
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var empMonths = moment().diff(moment.unix(tTime, "X"), "months");
    console.log(empMonths);
  
    // Calculate the total billed rate
    var empBilled = empMonths * frequency;
    console.log(empBilled);
  
    // Add each train's data into the table
    $("#employee-table > tbody").append("<tr><td>" + empName + "</td><td>" + destination + "</td><td>" +
    trainStart + "</td><td>" + empMonths + "</td><td>" + frequency + "</td><td>" + empBilled + "</td></tr>");
  });