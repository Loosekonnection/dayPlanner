// Luxon Date and Time
var dateTime = luxon.DateTime;
var today = dateTime.local();
var m = today.get("month");
var d = today.get("day");
var h = today.get("hour");

// Time variables
var htmlHourArray = [9, 10, 11, 12, 13, 14, 15, 16, 17];
var textValArray = [];
var htmlHourSuffix = "";

// Displays current date and/or time in header
$("#currentDay").text(today.toLocaleString(dateTime.DATE_HUGE));

createTimeBlocks();
clearStorageButton();

// Create time blocks html dynamically
function createTimeBlocks() {

    var i = 0;
    while (i < htmlHourArray.length) {

        if (htmlHourArray[i] >= 12) {
            htmlHourSuffix = "pm";
        } else {
            htmlHourSuffix = "am";
        }

        var htmlTime = htmlHourArray[i]+ htmlHourSuffix;

        // Time block div
        $timeBlock = $("<div>").addClass("row m-1");
        // First child div conatining the displayed time
        $displayTime = $("<div>").addClass("time-block hour").text(htmlTime);
        $timeDiv = $("<div>").addClass("col-2 pr-0").append($displayTime);
        // Next child div named textarea for inputting text
        $textBlock = $("<textarea>").addClass("col-9 text").text("").attr("value", htmlHourArray[i]);
        // Next child div, the save icon at the end of the time block
        $saveIcon = $("<i>").addClass("fas fa-save").attr("value", htmlHourArray[i]);
        $saveDiv = $("<div>").addClass("col-1 saveBtn").append($saveIcon);
        // this creates the time block div order of the above div's
        $timeBlock.append($timeDiv, $textBlock, $saveDiv);
        $("#scheduler").append($timeBlock);
        
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

// Get object from local storage
var textStore = JSON.parse(localStorage.getItem("textStore")) || [];

// Store text in local storage
$(".fa-save").on("click", "i", function (event) {
    event.preventDefault();

    var pageTime = $(this).attr("value");
    var text = $(".text").val().trim();

    // Validates the text field for text and alerts if none is present
    if ($(".text").val() == '') {
        alert("No text detected, Please enter text.")
        return;
    } else {
        textEntered = {
            time: pageTime,
            textInput: text
        };
        textStore.push(textEntered);
        localStorage.setItem("textStore", JSON.stringify(textStore));
    }
});

// Get and display textarea from local storage
function getStoredText() {

    var storedText = localStorage.getItem("timeBlockText");
    var text = JSON.parse(storedText);

    var timeMatch = text.time;
    var textSave = text.textInput;

    if ($(".time-block").text() == timeMatch) {
        console.log("Woohoo! " + timeMatch);
        $(".text").text(textSave);
    } else {
        $(".time-block").text();
    }
}

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
$("#submit").on("click", function () {

    localStorage.clear();
    window.location.reload();
});

getStoredText();

