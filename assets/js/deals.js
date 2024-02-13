document.addEventListener('DOMContentLoaded', async () => {
    const dealsUrl = 'https://cheapshark-game-deals.p.rapidapi.com/deals';
    const storesUrl = 'https://cheapshark-game-deals.p.rapidapi.com/stores';
    const cheapSharkDomain = 'https://www.cheapshark.com';

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '57500bd651msh63344be9603d24ep142bc2jsnb9ac4fb4458c',
            'X-RapidAPI-Host': 'cheapshark-game-deals.p.rapidapi.com'
        }
    };

    const storeContainer = document.getElementById('storeContainer');
    let currentStoreIndex = 0;
    let storeData;

    const numDealsToLoad = 15;
    const delayBetweenRequests = 1000;

    async function fetchAndDisplayDeals() {
        try {
            const storesResponse = await fetch(storesUrl, options);
            storeData = await storesResponse.json();

            if (!storeContainer) {
                console.error('storeContainer not found!');
                return;
            }

            // Ensure that storeData is an array before filtering
            if (Array.isArray(storeData)) {
                // Filter out stores with no deals or isActive is 0
                const storesWithDeals = storeData.filter(store => storeHasDeals(store));
                console.log('Stores with deals:', storesWithDeals);

                if (storesWithDeals.length > 0) {
                    // Display the current store
                    displayStore(storesWithDeals[currentStoreIndex]);

                    // Add event listeners for navigation arrows
                    document.getElementById('nextStore').addEventListener('click', () => navigateStores(1, storesWithDeals));
                    document.getElementById('prevStore').addEventListener('click', () => navigateStores(-1, storesWithDeals));
                } else {
                    console.error('No stores with deals found.');
                }
            } else {
                console.error('Invalid data format. Expected an array.');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Modify storeHasDeals function to check isActive
    function storeHasDeals(store) {
        return store && store.storeID !== undefined && store.isActive === 1;
    }

    function displayStore(store) {
        // Clear previous content
        storeContainer.innerHTML = '';

        // Check if the store has deals and isActive is 1
        if (storeHasDeals(store) && store.images) {
            // Create store card
            const storeCard = document.createElement('div');
            storeCard.className = 'store-card';

            storeCard.innerHTML = `
                <img src="${cheapSharkDomain}${store.images.banner || '/img/stores/banners/0.png'}" alt="${store.storeName} Banner" class="store-banner">
                <div class="store-deals"></div>
            `;

            storeContainer.appendChild(storeCard);

            const storeDealsContainer = storeCard.querySelector('.store-deals');

            // Fetch and display deals for the current store
            fetch(`${dealsUrl}?storeID=${store.storeID}`, options)
                .then(response => response.json())
                .then(storeDeals => {
                    for (let i = 0; i < Math.min(numDealsToLoad, storeDeals.length); i++) {
                        const deal = storeDeals[i];
                        const gameCard = document.createElement('div');
                        gameCard.className = 'game-card';

                        const gameLink = document.createElement('a');
                        gameLink.href = `https://www.cheapshark.com/redirect?dealID=${deal.dealID}`;
                        gameLink.target = '_blank';
                        gameLink.rel = 'noopener noreferrer';
                        gameLink.textContent = 'View Deal';

                        gameCard.innerHTML = `
                            <img src="${deal.thumb}" alt="${deal.title} Thumbnail" class="game-thumb">
                            <p><strong>${deal.title}</strong></p>
                            <p>Original Price: <del>${deal.normalPrice}</del></p>
                            <p>Sale Price: ${deal.salePrice}</p>
                        `;

                        gameCard.appendChild(gameLink);
                        storeDealsContainer.appendChild(gameCard);
                    }
                })
                .catch(error => console.error('Error fetching store deals:', error));
        }
    }

    function navigateStores(direction, stores) {
        // Update currentStoreIndex based on the direction
        currentStoreIndex = (currentStoreIndex + direction + stores.length) % stores.length;

        // Display the new current store
        displayStore(stores[currentStoreIndex]);
    }

    fetchAndDisplayDeals();
});
