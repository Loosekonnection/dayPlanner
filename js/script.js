// Luxon Date and Time
var dateTime = luxon.DateTime;
var today = dateTime.local();
var m = today.get("month");
var d = today.get("day");
var h = today.get("hour");

// Time variables
var htmlLastHour = 17;
var htmlHour = 12;
var htmlHourSuffix = "";

// Displays current date and/or time in header
$("#currentDay").text(today.toLocaleString(dateTime.DATE_HUGE));

incrementHtmlHour();

function incrementHtmlHour() {

    if (htmlHour >= 12) {
        htmlHourSuffix = "PM";
    } else if (htmlHour <= 11) {
        htmlHourSuffix = "AM";
    }
    createTimeBlocks();
}

// Create time blocks html dynamically
function createTimeBlocks() {

    var htmlTime = htmlHour + htmlHourSuffix;

    // Time block div
    $timeBlock = $("<div>").addClass("row m-1");
    // First child div conatining the displayed time
    $displayTime = $("<div>").addClass("time-block hour").text(htmlTime);
    $timeDiv = $("<div>").addClass("col-2 pr-0").append($displayTime);
    // Next child div named textarea for inputting text
    $textBlock = $("<textarea>").addClass("col-9 text").text("").attr("id", "data-colour");
    // Next child div, the save icon at the end of the time block
    $saveIcon = $("<i>").addClass("fas fa-save").attr("id", "data-save");
    $saveDiv = $("<div>").addClass("col-1 saveBtn").append($saveIcon);
    // this creates the time block div order of the above div's
    $timeBlock.append($timeDiv, $textBlock, $saveDiv);
    $("#scheduler").append($timeBlock);

    textAreaBGColour();
}

// Set the textarea background colour relative to the time of day
function textAreaBGColour() {

    console.log("time: " + h);
    console.log("textHour: ", htmlHour);

    if (htmlHour === h) {
        $("#data-colour").addClass("present");
    } else if (htmlHour < h) {
        $("#data-colour").addClass("past");
    } else {
        $("#data-colour").addClass("future");
    }
}

// Get text from local storage
var textStore = JSON.parse(localStorage.getItem("textStore")) || [];

// Store text in local storage
$("#data-save").on("click", function (event) {
    event.preventDefault();

    var htmlTime = htmlHour + htmlHourSuffix;
    var text = $(".text").val().trim();

    // Validates the text field for text and alerts if none is present
    if ($(".text").val() == '') {
        alert("Please enter text.")
        return;
    } else {
        text = {
            time: htmlTime,
            textInput: text
        };
        textStore.push(text);
        localStorage.setItem("textStore", JSON.stringify(textStore));
    }
    getTextStored();
});




