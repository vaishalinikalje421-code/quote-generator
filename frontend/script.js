
const quotes = [
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },
    {
        text: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt"
    },
    {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt"
    },
    {
        text: "You miss 100% of the shots you don't take.",
        author: "Wayne Gretzky"
    },
    {
        text: "The best way to predict the future is to create it.",
        author: "Peter Drucker"
    },
    {
        text: "Keep your face always toward the sunshine—and shadows will fall behind you.",
        author: "Walt Whitman"
    },
    {
        text: "The only limit to our realization of tomorrow will be our doubts of today.",
        author: "Franklin D. Roosevelt"
    },
    {
        text: "Life is what happens to you while you're busy making other plans.",
        author: "John Lennon"
    },
    {
        text: "The purpose of life is a life of purpose.",
        author: "Robert Byrne"
    },
    {
        text: "You can't use up creativity. The more you use, the more you have.",
        author: "Maya Angelou"
    }
];

// Get DOM elements
const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');
const likeBtn = document.getElementById('like-btn');
const twitterBtn = document.getElementById('twitter-btn');

// Function to generate random quote
function generateQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    quoteElement.textContent = `"${randomQuote.text}"`;
    authorElement.textContent = `- ${randomQuote.author}`;

    // Reset button states when new quote is generated
    resetButtonStates();
}

// Function to reset button states
function resetButtonStates() {
    copyBtn.classList.remove('copied');
    copyBtn.textContent = '📋 Copy';
    likeBtn.classList.remove('liked');
    likeBtn.textContent = '❤️ Like';
}

// Function to copy quote to clipboard
function copyQuote() {
    const quoteText = quoteElement.textContent;
    const authorText = authorElement.textContent;

    if (quoteText !== 'Click the button to generate a quote!') {
        const fullQuote = `${quoteText} ${authorText}`;

        navigator.clipboard.writeText(fullQuote).then(() => {
            // Show success state
            copyBtn.classList.add('copied');
            copyBtn.textContent = '✅ Copied!';

            // Reset after 2 seconds
            setTimeout(() => {
                copyBtn.classList.remove('copied');
                copyBtn.textContent = '📋 Copy';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = fullQuote;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);

            copyBtn.classList.add('copied');
            copyBtn.textContent = '✅ Copied!';
            setTimeout(() => {
                copyBtn.classList.remove('copied');
                copyBtn.textContent = '📋 Copy';
            }, 2000);
        });
    }
}

// Function to toggle like state
function toggleLike() {
    const quoteText = quoteElement.textContent;
    const authorText = authorElement.textContent;

    if (quoteText !== 'Click the button to generate a quote!') {
        const isLiked = likeBtn.classList.contains('liked');

        if (isLiked) {
            // Unlike
            likeBtn.classList.remove('liked');
            likeBtn.textContent = '❤️ Like';
            removeFromLikedQuotes(`${quoteText} ${authorText}`);
        } else {
            // Like
            likeBtn.classList.add('liked');
            likeBtn.textContent = '💖 Liked!';
            addToLikedQuotes(`${quoteText} ${authorText}`);
        }
    }
}

// Function to share on Twitter
function shareOnTwitter() {
    const quoteText = quoteElement.textContent;
    const authorText = authorElement.textContent;

    if (quoteText !== 'Click the button to generate a quote!') {
        const tweetText = encodeURIComponent(`${quoteText} ${authorText} #QuoteGenerator`);
        const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
        window.open(twitterUrl, '_blank', 'width=550,height=420');
    }
}

// Function to add quote to liked quotes (localStorage)
function addToLikedQuotes(quote) {
    let likedQuotes = JSON.parse(localStorage.getItem('likedQuotes')) || [];
    if (!likedQuotes.includes(quote)) {
        likedQuotes.push(quote);
        localStorage.setItem('likedQuotes', JSON.stringify(likedQuotes));
    }
}

// Function to remove quote from liked quotes (localStorage)
function removeFromLikedQuotes(quote) {
    let likedQuotes = JSON.parse(localStorage.getItem('likedQuotes')) || [];
    likedQuotes = likedQuotes.filter(q => q !== quote);
    localStorage.setItem('likedQuotes', JSON.stringify(likedQuotes));
}

// Add event listeners
generateBtn.addEventListener('click', generateQuote);
copyBtn.addEventListener('click', copyQuote);
likeBtn.addEventListener('click', toggleLike);
twitterBtn.addEventListener('click', shareOnTwitter);
