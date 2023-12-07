/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@MadameIsabella",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1701728198796,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1701814598796,
  },
];

// Helper function to convert timestamp to "time ago" format
const timeAgo = function (timestamp) {
  const currentTime = Date.now();
  const timeDifference = currentTime - timestamp;
  // Convert timeDifference to "timeAgo" format
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} days ago`;
  } else if (hours > 0) {
    return `${hours} hours ago`;
  } else if (minutes > 0) {
    return `${minutes} minutes ago`;
  } else {
    return `${seconds} seconds ago`;
  }
};
// ---------------------------------------Mark-up Tweet----------
// access user objects from renderTweets and accesses speific key:pair values and adds them to html template and returns back to renderTweets
// updated 'userTweets' into '$tweet'
const createTweetElement = (tweetData) => {
  const $tweet = $(`
    <article class="article">
      <header class="article-tweet-header">
        <div class="article-tweet-header-profile">
          <div class="tweet-icon">
            <img src= ${tweetData.user.avatars}">
          </div>  
          <p>${tweetData.user.name}</p>
        </div>
        <div class="tweet-handle"><b>${tweetData.user.handle}</b></div>
        </header>
        <p class="tweet-text">${tweetData.content.text}</p>
      <footer class="article-tweet-footer">
        <div class="timestamp"><b>${timeAgo(tweetData.created_at)}</b></div>
        <div class="tweet-footer-icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-sharp fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
    `);

  return $tweet;
};

// -------------------------------Append new tweet to id='tweet-container'in index.html----
const renderTweets = function (tweets) {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $("#tweets-container").append($tweet);
  }
};

// -------------------------------Fetching tweets from /tweets routes.
//client-side JavaScript will use AJAX to request fetch (GET) data from the server.
//load tweet from "/tweets", receive array in json.
const loadTweets = function () {
  return $.ajax({
    method: "GET",
    url: "/tweets",
    dataType: "json",
  });
};

// -----------------------------------//load tweet and render
$(document).ready(function () {
  loadTweets()
    .then((tweets) => {
      renderTweets(tweets);
    })
    .catch(function (error) {
      console.error("Error loading tweets:", error);
    });

  // event listener :  Post tweet details to server
  $("#tweet-form").on("submit", function (event) {
    event.preventDefault();
    //validation
    const $tweetText = $("#tweet-text");
    const tweetContent = $tweetText.val().trim();

    if (!tweetContent) {
      alert("Error: Tweet content cannot be empty.");
      return;
    }

    if (tweetContent.length > 140) {
      alert("Error: Tweet content exceeds 140 characters.");
      return;
    }
    //In case of 'No error', sending tweet to server
    const formData = $(this).serialize(); //$(this) refers to the form that triggered the submit event(same as${#tweet-form")})
    console.log(formData);
    $.ajax({
      url: "/tweets/", // URL to send data to
      type: "POST", // HTTP method for the request
      data: formData, // data to send. This is the serialized form data
      success: function (response) {
        console.log("Data submitted successfully!");
        // Update the UI here to show the new tweet
        loadTweets().then((tweets) => {
          renderTweets(tweets);
        });
        $("#tweet-list").prepend(response); // This adds the new tweet to the top of the list
        console.log("Data submitted successfully!");
      },
      error: function (xhr, status, error) {
        console.log("Error submitting data: " + error);
      },
    });
  });
});
