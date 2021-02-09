const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

//Show loading

function showLoadingSpinner() {
  //show loader
  loader.hidden = false;
// hide container
  quoteContainer.hidden = true;
}

// Hide loading
function removeLoadingSpinner() {
  if (!loader.hidden) {
    //To show container
    quoteContainer.hidden = false;
    // To hide the loader
    loader.hidden = true;
  }
}
// console.log(quoteText);
//Get quote from API

async function getQuote() {
  showLoadingSpinner();
  // const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiUrl = "http://api.quotable.io/random";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const dataarray = [data];

    // if author is blank and unknown
    if (dataarray[0].author === "") {
      authorText.innerText = "unknown";
    } else {
      authorText.innerText = dataarray[0].author;
    }

    //Reduce font size for long quotes
    if (dataarray[0].content > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }

    quoteText.innerText = dataarray[0].content;
    // stop loader and show the quote
    removeLoadingSpinner();
  } catch (error) {
    getQuote();
    console.log("Error", error);
  }
}
// Tweet quote

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twiiterUrl = `https://twitter.com/intent/tweet?text=${quote}-${author}`;

  // To open in new tab
  window.open(twiiterUrl, "_blank");
}

// Event listners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

//on load
getQuote();
