// Luxon Date and Time
var currentDay = document.getElementById("currentDay");
var dateTime = luxon.DateTime;

var today = dateTime.local();
var f = {month: "long", day: "2-digit"};
var m = today.get("month");
var newDt = today.set({month: 12});

currentDay.textContent = today.toLocaleString(dateTime.DATE_HUGE);


console.log(today.toISO());


