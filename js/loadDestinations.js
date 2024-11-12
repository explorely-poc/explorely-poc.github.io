const GEO_DB_API_KEY = "5931b2bb47msh78700b432711641p187d55jsncc429db2ba40";  // Replace with your GeoDB API key
const UNSPLASH_ACCESS_KEY = "tcJ3Enh1Hy6wLC1X3bziB0Rc2gZlKLPEHwy4YOPvGYQ";  // Replace with your Unsplash API key

async function loadDestinations() {
    const response = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=4&minPopulation=10000&maxPopulation=50000`, {
        headers: {
            "x-rapidapi-key": GEO_DB_API_KEY,
            "x-rapidapi-host": "wft-geo-db.p.rapidapi.com"
        }
    });
    const cities = await response.json();

    const container = document.querySelector("main");

    for (const city of cities.data) {
        const imageUrl = await fetchUnsplashImage(city.city);
        const section = document.createElement("section");
        section.className = "destination";
        section.innerHTML = `
            <img src="${imageUrl}" alt="${city.city}">
            <div>
                <h2>${city.city}</h2>
                <p>Explore ${city.city}, a hidden gem offering unique experiences.</p>
            </div>
        `;
        container.appendChild(section);
    }
}

async function fetchUnsplashImage(query) {
    const response = await fetch(`https://api.unsplash.com/photos/random?query=${query}&client_id=${UNSPLASH_ACCESS_KEY}`);
    const data = await response.json();
    return data.urls.small;
}

document.addEventListener("DOMContentLoaded", loadDestinations);