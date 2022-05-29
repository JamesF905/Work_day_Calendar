// set the current day
$("#currentDay").text(moment($.now()).format("dddd, MMMM Do"));

//dynamically set the li elements 

for (i=9; i<18; i++){
    let ampm = i >= 12 ? 'PM' : 'AM';
    let time_row = $("<div>").addClass("row time-block").attr("data-time", i);;
    let hour_col = $("<div>").addClass("col-1 d-flex align-items-center justify-content-end hour").text(((i + 11) % 12 + 1)+" "+ampm);
    let textarea_col = $("<textarea>").addClass("col-10 description");
    let save_col = $("<div>").addClass("col-1 d-flex align-items-center justify-content-center saveBtn");
    let icon = $("<i>").addClass("fa fa-save").click(save_it);

    hour_col.appendTo(time_row);
    textarea_col.appendTo(time_row);
    icon.appendTo(save_col);
    save_col.appendTo(time_row);

    time_row.appendTo($(".container"));
}

var current_time = Number(moment($.now()).format("H"));
var all_rows = document.getElementsByClassName("time-block");

//Set the classes of the rows based on the time of day
$.each(all_rows, function(){
    var time_slot = $(this).data().time;
    var time_class;
    if(time_slot < current_time){
        time_class = "past";
    } else if(time_slot == current_time) {
        time_class = "present";
    } else if(time_slot > current_time){
        time_class = "future";
    }
    $(this).addClass(time_class);
  });

function save_it(){
    var time_slot_num = $(this).closest('.time-block').data().time;
    var shedule_textarea = $(this).parent().prev();
    
    //let schedule_array = {"time_key"  : time_slot_num, "text" : shedule_textarea.val()};
    let schedule_array = [time_slot_num, shedule_textarea.val()];
    let remote_array = JSON.parse(localStorage.getItem("daily_schedule")); 
    
    if (remote_array !== null) {
        for(i=0; i<remote_array.length; i++){
            if(remote_array[i][0] === time_slot_num){
                remote_array.splice(i,1);
                break;
            }
        }
        if(shedule_textarea.val() != ""){
            remote_array.push(schedule_array);
        }
    } else {
        remote_array = [schedule_array];
    }
    localStorage.setItem("daily_schedule", JSON.stringify(remote_array));
    shedule_textarea.val("");
    render_array();
}

function render_array(){
    var remote_array = JSON.parse(localStorage.getItem("daily_schedule"));
    if (remote_array !== null) {        
        for(i=0; i<remote_array.length; i++){
            let target = $(".time-block[data-time='"+remote_array[i][0]+"'] > textarea");
            target.val(remote_array[i][1]);
        }
    }
}

render_array();