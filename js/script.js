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
        var textBlock = $("<textarea>").addClass("col-9 text").text("").attr("value", htmlHourArray[i]);
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
        var htmlHours = $(this).attr("value");
        textValArray.push(htmlHours);
    });

    for (var i = 0; i < textValArray.length; i++) {

        if (parseInt(textValArray[i]) === h) {
            $("textarea[value=" + textValArray[i] + "]").addClass("present");
        } else if (parseInt(textValArray[i]) > h) {
            $("textarea[value=" + textValArray[i] + "]").addClass("future");
        } else {
            $("textarea[value=" + textValArray[i] + "]").addClass("past");
        }
    }
}

// Set Get object from local storage
// var textStore = localStorage.getItem(pageTime, text);

// Store text in local storage
$(".fa-save").on("click", function (event) {
    event.preventDefault();

    var pageTime = $(this).attr("value");
    var text = $(this).parent().prev("textarea").val();

    localStorage.setItem(pageTime, text);   
   
});

var storedKey = localStorage.getItem("9");
var textarea = $("<textarea>").attr("9");

textarea = storedKey;
$("<textarea>").val(textarea);

console.log(textarea);


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

