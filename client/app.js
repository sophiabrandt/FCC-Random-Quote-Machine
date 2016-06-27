// IIFE wrapper
(global => {
'use strict';

// *****************************************************
// ***** Setting up the Quotes API & passing logic *****
// *****************************************************

const quoteMachine = {
  apiURL: 'https://got-quotes.herokuapp.com/quotes',
  
  // Vanilla ES6 AJAX function via http://www.html5rocks.com/en/tutorials/es6/promises/
  ajax: function (url) {
  return new Promise(function(resolve, reject) {
    const req = new XMLHttpRequest();
    req.open('GET', url);
    req.onload = function() {
      if (req.status === 200) {
        const res = req.responseText;
        resolve(JSON.parse(res));
         }
      reject;
      };
    req.onerror = reject;
    req.send();
    });
  },
  
  getJSON: function(renderQuote, setTweetText) {
    quoteMachine.ajax(quoteMachine.apiURL)
      .then(renderQuote)
      .then(setTweetText)
      .catch(err => {console.log(err)});
  },
  
  renderQuote: function(JSON) {
    view.render(JSON);
    return JSON;
  },
    
  setTweetText: function ({quote, character}) {
    const tweetIntent = 'https://twitter.com/intent/tweet?hashtags=gameofthrones&text=';
    const normalTweet = quote + ' ~ ' + character;
    const shortenedTweet = normalTweet.substr(0,122) + '...';
    if (normalTweet.length > 140) {
      return handlers.tweetButton(tweetIntent+shortenedTweet);
        }
      return handlers.tweetButton(tweetIntent+normalTweet);
  }
};

// *****************************************************
// ******** Button handlers and init logic *************
// *****************************************************

const handlers = {
  randomizeButton: function() {
      const randomizeButton = document.querySelector('#randomizeButton');
      randomizeButton.addEventListener('click', handlers.getRandomQuote);
    },
  
  tweetButton: function (tweetText) {
    const tweetButton = document.querySelector('#tweetButton');
    tweetButton.addEventListener('click', ()  => {tweetButton.href = tweetText});
  },
  
  getRandomQuote: function() {
    quoteMachine.getJSON(quoteMachine.renderQuote, quoteMachine.setTweetText);
  },

  init: function() {
    handlers.getRandomQuote();
    handlers.randomizeButton();
    },
};

// *****************************************************
// ******************** View rendering *****************
// *****************************************************

const view = {
  render: function({quote, character}) {
    const displayQuote = document.querySelector('#displayQuote');
    const displaySource = document.querySelector('#displayCharacter');
    displayQuote.textContent = quote;
    displayCharacter.textContent = character;
  }
};


// ******************** INIT **************************

handlers.init();

})(window); // end of IIFE wrapper