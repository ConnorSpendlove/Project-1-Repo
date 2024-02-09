const url = 'https://gamerpower.p.rapidapi.com/api/giveaways';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '628b3559bemshfe0b18a64e01817p1f802fjsnd97a75d5114c',
        'X-RapidAPI-Host': 'gamerpower.p.rapidapi.com'
    }
};

// Declare container at the top of your script
const container = document.querySelector('.container');

// Function to create a game card
function createGameCard(game) {
    const gameCard = document.createElement('div');
    gameCard.className = 'card';
    gameCard.innerHTML = `
        <div class="card-image">
            <figure class="image is-4by3">
                <img src="${game.thumbnail}" alt="${game.title}">
            </figure>
        </div>
        <div class="card-content">
            <div class="media">
                <div class="media-content">
                    <p class="title is-4">${game.title}</p>
                </div>
            </div>
            <div class="content">
                ${game.description}
                <br>
                <a href="${game.open_giveaway_url}">Get it here</a>
            </div>
        </div>
    `;
    return gameCard;
}

// Function to create dropdown options
function createDropdownOptions(types, dropdown) {
    types.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        dropdown.appendChild(option);
    });
}

// Fetch the data
fetch(url, options)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Extract the unique types
        const types = [...new Set(data.map(game => game.type))];

        // Get the type dropdown
        const typeDropdown = document.getElementById('type-dropdown');

        // Create an option for each type
        createDropdownOptions(types, typeDropdown);

        // Get the filter button
        const filterButton = document.getElementById('filter-button');

        // Add event listener to the filter button
        filterButton.addEventListener('click', () => {
            // Get the selected type
            const selectedType = typeDropdown.value;

            // Perform the filtering
            const filteredData = data.filter(game => game.type === selectedType);

            // Clear the current UI
            container.innerHTML = '';

            // Create elements for each game
            filteredData.forEach(game => {
                const gameCard = createGameCard(game);
                container.appendChild(gameCard);
            });

            // Save the filter settings to localStorage
            localStorage.setItem('selectedType', selectedType);
        });

        // Load the filter settings from localStorage
                const savedFilter = localStorage.getItem('selectedType');
                if (savedFilter) {
                    typeDropdown.value = savedFilter;
                    filterButton.click();
                }
            }
        );