// Fetch data from the CheapShark API
fetch('https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15')
    .then(response => response.json())
    .then(data => {
        // Filter games based on Metacritic score
        const highScoreGames = data.filter(game => game.metacriticScore >= 80);

        // Log the high score games to the console
        console.log(highScoreGames);

        // Select a random game
        const randomGame = highScoreGames[Math.floor(Math.random() * highScoreGames.length)];

        // Get the thumbnail URL
        const thumbnailUrl = randomGame.thumb;

        // Get the image element
        const imageElement = document.getElementById('game-image');

        // Replace the placeholder image with the thumbnail
        imageElement.src = thumbnailUrl;
    })
    .catch(error => console.error(error));