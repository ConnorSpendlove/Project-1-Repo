const url = 'https://gamerpower.p.rapidapi.com/api/giveaways';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '628b3559bemshfe0b18a64e01817p1f802fjsnd97a75d5114c',
        'X-RapidAPI-Host': 'gamerpower.p.rapidapi.com'
    }
};

let startIndex = 0;
const numGamesToLoad = 5;
let loading = false;

async function fetchAndDisplayData() {
    loading = true;
    try {
        const response = await fetch(url, options);
        const data = await response.json(); // Parse the response as JSON

        // Get a reference to the card elements
        const container = document.querySelector('.container');

        // Loop through each item in the data
        for (let i = startIndex; i < startIndex + numGamesToLoad && i < data.length; i++) {
            // Create a new div for the game card
            let gameCard = document.createElement('div');
            gameCard.className = 'card';
  // Set the content of the game card
  gameCard.innerHTML = `
  <div class="card-image">
      <figure class="image is-4by3">
          <img src="${data[i].thumbnail}" alt="${data[i].title}">
      </figure>
  </div>
  <div class="card-content">
      <div class="media">
          <div class="media-content">
              <p class="title is-4">${data[i].title}</p>
          </div>
      </div>
      <div class="content">
          ${data[i].description}
          <br>
          <a href="${data[i].open_giveaway_url}">Get it here</a>
      </div>
  </div>
`;
container.appendChild(gameCard);
}
startIndex += numGamesToLoad;
} catch (error) {
console.error(error);
}
loading = false;
}

fetchAndDisplayData();

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) { 
        fetchAndDisplayData();
    }
});