// Luxon Date and Time
var dateTime = luxon.DateTime;
var today = dateTime.local();
var m = today.get("month");
var d = today.get("day");
var h = today.get("hour");

// Global Variables
var htmlHourArray = [9, 10, 11, 12, 13, 14, 15, 16, 17];
var textValArray = [];
var htmlHourSuffix = "";
var timeArr = [];

// Displays current date and/or time in header
$("#currentDay").text(today.toLocaleString(dateTime.DATE_HUGE));

createTimeBlocks();
clearStorageButton();

// Create time blocks html dynamically and set the time display with am or
function createTimeBlocks() {

    var i = 0;
    while (i < htmlHourArray.length) {

        // Appends the correct am or pm suffix respectively
        if (htmlHourArray[i] >= 12) {
            htmlHourSuffix = "pm";
        } else {
            htmlHourSuffix = "am";
        }

        // Changes the 24hr format to 12hr format
        if (htmlHourArray[i] > 12) {
            var htmlTime = (htmlHourArray[i] - 12) + htmlHourSuffix;
        } else {
            var htmlTime = htmlHourArray[i] + htmlHourSuffix;
        }

        // Time block div
        var timeBlock = $("<div>").addClass("row m-1");
        // First child div conatining the displayed time
        var displayTime = $("<div>").addClass("time-block hour").text(htmlTime);
        var timeDiv = $("<div>").addClass("col-2 pr-0").append(displayTime);
        // Next child div named textarea for inputting text
        var textBlock = $("<textarea>").addClass("col-9 text").text("").attr("id", htmlHourArray[i]);
        // Next child div, the save icon at the end of the time block
        var saveIcon = $("<i>").addClass("fas fa-save").attr("value", htmlHourArray[i]);
        var saveDiv = $("<div>").addClass("col-1 saveBtn").append(saveIcon);
        // this creates the time block div order of the above div's
        timeBlock.append(timeDiv, textBlock, saveDiv);
        $("#scheduler").append(timeBlock);

        i++;
    }
    textAreaBGColour();
}

// Set the textarea background colour relative to the time of day
function textAreaBGColour() {

    $("textarea").each(function () {
        var htmlHours = $(this).attr("id");
        textValArray.push(htmlHours);
    });

    for (var i = 0; i < textValArray.length; i++) {

        if (parseInt(textValArray[i]) === h) {
            $("textarea[id=" + textValArray[i] + "]").addClass("present");
        } else if (parseInt(textValArray[i]) > h) {
            $("textarea[id=" + textValArray[i] + "]").addClass("future");
        } else {
            $("textarea[id=" + textValArray[i] + "]").addClass("past");
        }
    }
}

// Store text in local storage
$(".fa-save").on("click", function (event) {
    event.preventDefault();

    var pageTime = $(this).attr("value");
    var text = $(this).parent().prev("textarea").val();

    localStorage.setItem(pageTime, text);
   
});

// getItem from Local storage and persistantly display on the webpage until the clear Planner button is clicked
// or the input is updated and saved with alternate text
var storedKey9 = localStorage.getItem("9"); 
$("#9").text(storedKey9);

var storedKey10 = localStorage.getItem("10");
$("#10").text(storedKey10);

var storedKey11 = localStorage.getItem("11");
$("#11").text(storedKey11);

var storedKey12 = localStorage.getItem("12");
$("#12").text(storedKey12);

var storedKey13 = localStorage.getItem("13");
$("#13").text(storedKey13);

var storedKey14 = localStorage.getItem("14");
$("#14").text(storedKey14);

var storedKey15 = localStorage.getItem("15");
$("#15").text(storedKey15);

var storedKey16 = localStorage.getItem("16");
$("#16").text(storedKey16);

var storedKey17 = localStorage.getItem("17");
$("#17").text(storedKey17);


// Clear planner button
function clearStorageButton() {

    $clearDiv = $("<div>").addClass("row m-4");
    $buttonDiv = $("<div>").addClass("col text-center");
    $clearDiv.append($buttonDiv);

    $($buttonDiv).append(
        $(document.createElement('input')).prop({
            type: 'button',
            id: 'submit',
            value: 'Clear Planner',
            className: 'btn btn-secondary'
        })
    );
    $("#scheduler").append($clearDiv);
}

// clear local storage & planner function
$("#submit").on("click", function (event) {
    event.preventDefault();

    localStorage.clear();
    window.location.reload();
});

