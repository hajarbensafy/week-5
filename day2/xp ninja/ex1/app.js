const API_KEY = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";
const form = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const gifsContainer = document.getElementById("gifs-container");
const deleteButton = document.getElementById("delete-all");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();
    if (!searchTerm) return;

    try {
        const response = await fetch(
            `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${API_KEY}&limit=10`
        );
        
        if (!response.ok) throw new Error("Failed to fetch GIFs");
        
        const data = await response.json();
        displayGifs(data.data);
    } catch (error) {
        console.error("Error:", error);
    }
});

function displayGifs(gifs) {
    gifs.forEach(gif => {
        const img = document.createElement("img");
        img.src = gif.images.fixed_height.url;
        gifsContainer.appendChild(img);
    });
}

deleteButton.addEventListener("click", () => {
    gifsContainer.innerHTML = "";
});