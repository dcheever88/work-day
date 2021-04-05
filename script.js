// installs dayjs
dayjs().format();

today();

// loop through schedule
var day = [
    {id: 0, hour: "8:00", time: "08", meridiem: " am", reminder: ""}, 
    {id: 1, hour: "9:00", time: "09", meridiem: " am", reminder: ""}, 
    {id: 2, hour: "10:00", time: "10", meridiem: " am", reminder: ""},
    {id: 3, hour: "11:00", time: "11", meridiem: " am", reminder: ""},
    {id: 4, hour: "12:00", time: "12", meridiem: " pm", reminder: ""},
    {id: 5, hour: "1:00", time: "13", meridiem: " pm", reminder: ""},
    {id: 6, hour: "2:00", time: "14", meridiem: " pm", reminder: ""},
    {id: 7, hour: "3:00", time: "15", meridiem: " pm", reminder: ""},
    {id: 8, hour: "4:00", time: "16", meridiem: " pm", reminder: ""},
    {id: 9, hour: "5:00", time: "17", meridiem: " pm", reminder: ""},
    {id: 10, hour: "6:00", time: "18", meridiem: " pm", reminder: ""},
    {id: 11, hour: "7:00", time: "19", meridiem: " pm", reminder: ""},
    {id: 12, hour: "8:00", time: "20", meridiem: " pm", reminder: ""},
    {id: 13, hour: "9:00", time: "21", meridiem: " pm", reminder: ""},
]

// calls and displays today's date
function today() {
    var currentDate = (dayjs().format("dddd, MMMM D YYYY"));
    $("#currentDay").text(currentDate);
}

// saves task to local storage
function saveTask() {
    localStorage.setItem("day", JSON.stringify(day));
}

// displays any tasks in local storage
function displayTask() {
    day.forEach(function (_currentHour) {
        $(`#${_currentHour.id}`).val(_currentHour.reminder);
    })
}


// displays any prior tasks in local storage
function init() {
    var storedPlan = JSON.parse(localStorage.getItem("day"));

        if (storedPlan) {
            day = storedPlan;
        }

        saveTask();
        displayTask();
}

// displays hourly blocks for schedule
day.forEach(function(currentHour) {
    var hourBlock = $("<form>").attr({
        "class": "row"});
        $(".container").append(hourBlock);

    var hourField = $("<div>")
        .text(`${currentHour.hour}${currentHour.meridiem}`)
        .attr({"class": "col-md-2 hour"});

    var plan = $("<div>")
        .attr({"class": "col-md-9 description p-0"});
    
    var planText = $("<textarea>");
        plan.append(planText);
        planText.attr("id", currentHour.id);
        if (
            currentHour.time < dayjs().format("HH")) {
                planText
                .attr ({
                    "class": "past",
                })
            } else if (currentHour.time === dayjs().format("HH")) {
                planText
                .attr ({
                    "class": "present"
                })
            } else if (currentHour.time > dayjs().format("HH")) {
                planText
                .attr ({
                    "class": "future"
                })
            }

            var saveButton = $("<i class='far fa-save fa-lg'></i>")
            var saveInput = $("<button>")
                .attr ({
                    "class": "col-md-1 saveBtn"
                });

            saveInput.append(saveButton);
            hourBlock.append(hourField, plan, saveInput);
            

})

init();


// save button
$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var savePlans = $(this).siblings(".description").children(".future").attr("id");
    day[savePlans].reminder = $(this).siblings(".description").children(".future").val();
    saveTask();
    displayTask();
})