
$(function () {
    var currentDay = dayjs().format("[Today is: ]dddd, MMMM D, YYYY");
    var currentTime = dayjs().format('[Current Time is: ]h:mm A');
    var current24HourTime = parseInt(dayjs().format("H"));
    var save = $(".saveBtn");
    var dayEl = $("#currentDay");
    var textAreas = $(".description");
    
    
    
    function saveContent(){
        var textInput = $(this).closest('div').find('textarea').val();
        var textInputValue = textInput;
        var textInputId = $(this).closest("div").attr("id");
        localStorage.setItem(textInputId,textInputValue);
        console.log(localStorage.getItem(textInputId));
        return;
    }
    
    setInterval(() => {
        let currentUpdateTime = dayjs().format('[Current Time is: ]h:mm A');
        dayEl.html(currentDay + "<br>" + "<br>" + currentUpdateTime); 
        console.log(currentUpdateTime);
    }, 60000);
    
    
    $(document).ready(function() {
        textAreas.each(function() {
            var textInput = $(this);
            var textInputId = textInput.closest("div").attr('id');
            var savedTextInputValue = localStorage.getItem(textInputId);
            textInput.val(savedTextInputValue);
        })
        
        dayEl.html((currentDay + "<br>" + "<br>" + currentTime));
        console.log(current24HourTime);
        initialColors();
        
})

function initialColors(){
    $('.time-block').each(function(){
        var now = dayjs().hour(current24HourTime);
      var eventTime = dayjs().hour(parseInt($(this).attr("id")));
      
      if(eventTime.isBefore(now)) {
        $(this).addClass('past').removeClass("future present");
      } else if(eventTime.isAfter(now)) {
        $(this).addClass('future').removeClass('present past');
      } else {
        $(this).addClass('present').removeClass("past future");
      }
})}

setInterval(() => {
    $('.time-block').each(function(){
        var now = dayjs().hour(current24HourTime);
      var eventTime = dayjs().hour(parseInt($(this).attr("id")));
      
      if(eventTime.isBefore(now)) {
        $(this).addClass('past').removeClass("future present");
      } else if(eventTime.isAfter(now)) {
        $(this).addClass('future').removeClass('present past');
      } else {
        $(this).addClass('present').removeClass("past future");
      }
      
      
    });
  }, 60000);

   
save.on("click", saveContent);

  });