// Luxon Date and Time
var dateTime = luxon.DateTime;
var today = dateTime.local();
var m = today.get("month");
var d = today.get("day");
var h = today.get("hour");

// Time variables
var htmlHoursArray = [];
var htmlHour = 9;
var htmlHourSuffix = "";

// Displays current date and/or time in header
$("#currentDay").text(today.toLocaleString(dateTime.DATE_HUGE));

textAreaBGColour();

function textAreaBGColour() {

    $("textarea").each(function () {
        var htmlHours = $(this).attr("value");
        htmlHoursArray.push(htmlHours);
    });

    var currentHour = h.toString();

    console.log("Text Area Value: ", $("textarea").attr("value"));
    console.log("Current Hour: ", currentHour);
    console.log("HTML Hours Array: ", htmlHoursArray);

    for (var i = 0; i < htmlHoursArray.length; i++) {

            // console.log(htmlHoursArray[i]);

        if (currentHour === htmlHoursArray[i]) {
            console.log("great its working");
            $("textarea").addClass("present");

        } else if (currentHour > htmlHoursArray[i]) {
            

        } else {
            
        }
    }
}

// Store text in local storage
$(".fa-save").on("click", function (event) {
    event.preventDefault();

    var pageTime = $(".time-block").attr("value");
    var text = $(".text").val().trim();

    console.log("Page Time: ", pageTime);
    console.log("Page Text: ", text);

    // Validates the text field for text and alerts if none is present
    if ($(".text").val() == '') {
        alert("No text detected, Please enter text.")
        return;
    } else {
        textEntered = {
            "time": pageTime,
            "textInput": text
        };
        var textCaptured = JSON.stringify(textEntered);
        localStorage.setItem("timeBlockText", textCaptured);
    }
});

// Get and display textarea from local storage
function getStoredText() {

    var storedText = localStorage.getItem("timeBlockText");
    var text = JSON.parse(storedText);

    var timeMatch = text.time;
    var textSave = text.textInput;

    if ($("textarea").attr("value") == timeMatch) {
        $("textarea").val(textSave);
    } else {
        return;
    }
}

// Clears local storage & planner function
$("#submit").on("click", function (event) {
    event.preventDefault();

    localStorage.clear();
    window.location.reload();
});



