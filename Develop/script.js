// var now = dayjs();

// document.getElementById("currentDay").innerHTML = (now.format("dddd, MMMM D YYYY"));

// dayjs().format();
function today() {
    var currentDate = (dayjs().format("dddd, MMMM D YYYY"));
    $("#currentDay").text(currentDate);
}


var day = [
    {id: 0, hour: "8", time: "8:00", ampm: " am", reminder: ""}, 
    {id: 1, hour: "9", time: "9:00", ampm: " am", reminder: ""}, 
    {id: 2, hour: "10", time: "10:00", ampm: " am", reminder: ""},
    {id: 3, hour: "11", time: "11:00", ampm: " am", reminder: ""},
    {id: 4, hour: "12", time: "12:00", ampm: " pm", reminder: ""},
    {id: 5, hour: "1", time: "1:00", ampm: " pm", reminder: ""},
    {id: 6, hour: "2", time: "2:00", ampm: " pm", reminder: ""},
    {id: 7, hour: "3", time: "3:00", ampm: " pm", reminder: ""},
    {id: 8, hour: "4", time: "4:00", ampm: " pm", reminder: ""},
    {id: 9, hour: "5", time: "5:00", ampm: " pm", reminder: ""},
    {id: 10, hour: "6", time: "6:00", ampm: " pm", reminder: ""},
    {id: 11, hour: "7", time: "7:00", ampm: " pm", reminder: ""},
    {id: 12, hour: "8", time: "8:00", ampm: " pm", reminder: ""},
    {id: 13, hour: "9", time: "9:00", ampm: " pm", reminder: ""},
]

function saveRemind() {
    localStorage.setItem("day", JSON.stringify(day));
}

// function displayRemind() {
//     day.forEach(function (_currentHour) {
//         $('#${_currentHour.id}').val(_currentHour.reminder);
//     })
// }

function init() {
    var storedPlan = JSON.parse(localStorage.getItem("day"));

        if (storedPlan) {
            day = storedPlan;
        }

        saveRemind();
        // displayRemind();
}

day.forEach(function(currentHour) {
    var hourBlock = $("<form>")
        .attr({"class": "row"});
        $(".container").append(hourBlock);

    var hourField = $("<div>")
        .text('${currentHour.hour}$(currentHour.ampm}')
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

$(".saveBtn").on("click", function(event) {
    event.preventdefault();
    var savePlans = $(this).siblings(".description").children("future").attr("id");
    day[savePlans].reminder = $(this).siblings(".description").children("future").val;
    console.log(savePlans);
    saveRemind;
    // displayRemind;
})


today();

