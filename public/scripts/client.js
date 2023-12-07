/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// ---------------------------------------Mark-up Tweet----------
// access user objects from renderTweets and accesses speific key:pair values and adds them to html template and returns back to renderTweets
const createTweetElement = (tweetData) => {
  const userTweets = $(`
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
        <div class="tweet-post-date"><b>${tweetData.created_at}</b></div>
        <div class="tweet-footer-icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-sharp fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
    `);

  return userTweets;
};

// ------------------------------------Render New Tweets to Main page container-----
const renderTweets = function (tweets) {
  //reverses and loops tweets object array order
  let reversedTweets = tweets.reverse();
  for (let key of reversedTweets) {
    // calls createTweetElement as callback
    const $tweet = createTweetElement(reversedTweets[key]);
    $("#tweets-container").append($tweet); //opposite: prepend
  }
};
// ----------------------------------------------------------
// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
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
    created_at: 1461113959088,
  },
];

$(document).ready(function () {
  renderTweets(tweetData);
});
