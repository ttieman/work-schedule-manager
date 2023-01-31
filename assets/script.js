
$(function () {
    var currentDay = dayjs().format("[Today is: ]dddd, MMMM D, YYYY");              //this is the current day variable utilizing dayjs
    var currentTime = dayjs().format('[Current Time is: ]h:mm A');              //this us the current time variable utilizing dayjs
    var current24HourTime = parseInt(dayjs().format("H"));                 //current military time used to determine the color scheme based on time 
    var save = $(".saveBtn");                                            //jquery selector to select the save button  
    var dayEl = $("#currentDay");                                         // jquery selector to select the current day element 
    var textAreas = $(".description");                                    //jquery selector to select the text areas of each time block 
    
    
    
    function saveContent(){                                                 //this function saves the content to local storage when the save button is pressed 
        var textInput = $(this).closest('div').find('textarea').val();
        var textInputValue = textInput;
        var textInputId = $(this).closest("div").attr("id");
        localStorage.setItem(textInputId,textInputValue);
        console.log(localStorage.getItem(textInputId));
        return;
    }
    
    setInterval(() => {                                                           //this function updates the time every minute on the screen 
        let currentUpdateTime = dayjs().format('[Current Time is: ]h:mm A');
        dayEl.html(currentDay + "<br>" + "<br>" + currentUpdateTime); 
        console.log(currentUpdateTime);
    }, 60000);
    
    
    $(document).ready(function() {            // this function pulls the stored values from local storage when the page loads and siplays them on the screen 
        textAreas.each(function() {
            var textInput = $(this);
            var textInputId = textInput.closest("div").attr('id');
            var savedTextInputValue = localStorage.getItem(textInputId);
            textInput.val(savedTextInputValue);
        })
        
        dayEl.html((currentDay + "<br>" + "<br>" + currentTime));
        console.log(current24HourTime);
        initialColors();         //this calls the initial colors funtion 
        
})

function initialColors(){                                    // this determins what the colors of each block will be based on the time when the page loads 
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
    $('.time-block').each(function(){              //this will update the colors as time changes 
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

   
save.on("click", saveContent);        // this is the event listener that handles listening for a click on the save button 

  });