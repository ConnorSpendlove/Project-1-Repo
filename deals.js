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

    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'deals.css';
    document.head.appendChild(linkElement);

    let loading = false;
    let startIndex = 0;
    const numDealsToLoad = 5;
    const delayBetweenRequests = 1000;

    async function fetchAndDisplayDeals() {
        if (loading) return;
        loading = true;

        try {
            const storesResponse = await fetch(storesUrl, options);
            const storeData = await storesResponse.json();

            const storeContainer = document.getElementById('storeContainer');

            if (!storeContainer) {
                console.error('storeContainer not found!');
                return;
            }

            storeContainer.innerHTML = '';

            for (const store of storeData) {
                await new Promise(resolve => setTimeout(resolve, delayBetweenRequests));
                const dealsResponse = await fetch(`${dealsUrl}?storeID=${store.storeID}`, options);
                const storeDeals = await dealsResponse.json();

                if (storeDeals.length > 0) {
                    const storeCard = document.createElement('div');
                    storeCard.className = 'store-card';

                    storeCard.innerHTML = `
                        <img src="${cheapSharkDomain}${store.images.banner || '/img/stores/banners/0.png'}" alt="${store.storeName} Banner" class="store-banner">
                        <div class="store-deals"></div>
                    `;

                    storeContainer.appendChild(storeCard);

                    const storeDealsContainer = storeCard.querySelector('.store-deals');

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
                            <p>Original Price: <del>${deal.normalPrice}</del></p>
                            <p>Sale Price: ${deal.salePrice}</p>
                        `;

                        gameCard.appendChild(gameLink);
                        storeDealsContainer.appendChild(gameCard);
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }

        loading = false;
    }

    fetchAndDisplayDeals();

    
});
