//-Document.ready mean don't executive this code until the DOM is loaded in the browser.
//-It is safer to always wrap the code in document.ready

// $(document).ready(function () {
//   // console.log("Script loaded");
//   $("#tweet-text").on("input", () => {
//     const charCount = $(this).val().length;
//     let counting = 140 - charCount;
//     // console.log("Characters typed: " + charCount);
//     // Update the counter
//     const counter = $(this).parent().find(".counting");
//     if (counting < 0) {
//       counter.css("color", "red");
//     }
//     //applying the display for counting classs to our couting function
//     counter.text(counting);
//     if (counting > 0) {
//       counter.css("color", "black");
//     }
//   });
// });

// $(document).ready(function() {
//   $('#tweet-text').on('input', function() {
//     var tweetLength = $(this).val().length;
//     var remainingCharacters = 140 - tweetLength;
//     $('.counter').text(remainingCharacters);
//     if (remainingCharacters < 0) {
//       $('.counter').css('color', 'red');
//     } else {
//       $('.counter').css('color', '');
//     }
//   });
// });

$(document).ready(function () {
  $("#tweet-text").on("input", function () {
    //grab the contents of textarea input field
    const $textarea = $("#tweet-text");
    const userInput = $textarea.val();
    let userInputLength = userInput.length;
    //let userInputLength = $(this).val().length
    //$(this)= $textarea. this = whichever element that caused the event to occur
    //console.log(userInput);
    //console.log(userInputLength);
    // Selects FORM:the parent of the <textarea>. Then finds the OUTPUT of counter
    let counterValue = $(this)
      .parent()
      .find("output")
      .text(140 - userInputLength);
    //change color for the counter
    //if userInputLength is below 0 -> add class to turn counter to red
    if (counterValue.text() < 0) {
      //console.log(counterValue.text());
      counterValue.addClass("counter-red");
    } else {
      counterValue.removeClass("counter-red");
    }
  });
  //----SCROLL UP BUTTON----
  $("#scroll-up").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500);
  });
});
