(global => { // IIFE wrapper
'use strict';

// *****************************************************
// ***** Setting up the Quotes API & passing logic *****
// *****************************************************

const quoteMachine = {
  apiURL: 'https://got-quotes.herokuapp.com/quotes',
  
  getJSON: (renderQuote, setTweetText) => $.getJSON(quoteMachine.apiURL, renderQuote).done(setTweetText),
  
  renderQuote: ({quote, character}) => view.render(quote, character),
    
  setTweetText: ({quote, character}) => {
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
  randomizeButton: () => {
      const randomizeButton = document.querySelector('#randomizeButton');
      randomizeButton.addEventListener('click', handlers.getRandomQuote);
    },
  
  tweetButton: (tweetText) => {
    const tweetButton = document.querySelector('#tweetButton');
    tweetButton.addEventListener('click', ()  => {tweetButton.href = tweetText});
  },
  
  getRandomQuote: () => quoteMachine.getJSON(quoteMachine.renderQuote, quoteMachine.setTweetText),

  init: () => {
    handlers.getRandomQuote();
    handlers.randomizeButton();
    },
};

// *****************************************************
// ******************** View rendering *****************
// *****************************************************

const view = {
  render: (quote, character) => {
    const displayQuote = document.querySelector('#displayQuote');
    const displaySource = document.querySelector('#displayCharacter');
    displayQuote.textContent = quote;
    displayCharacter.textContent = character;
  }
};


// ******************** INIT **************************

handlers.init();

})(window); // end of IIFE wrapper