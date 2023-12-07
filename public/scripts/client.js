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

// ----------------------------------------------------------

$(document).ready(function () {
  renderTweets(tweetData);
});
