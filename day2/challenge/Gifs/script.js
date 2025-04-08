const API_KEY = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const gifsContainer = document.getElementById("gifs-container");
const deleteAllBtn = document.getElementById("delete-all");

async function fetchRandomGif(searchTerm) {
    try {
        const response = await fetch(
            `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${searchTerm}`
        );
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching GIF:", error);
        alert("Failed to fetch GIF. Please try again.");
        return null;
    }
}

function displayGif(gifData) {
    if (!gifData || !gifData.images) return;
    
    const gifCard = document.createElement("div");
    gifCard.className = "gif-card";
    
    const img = document.createElement("img");
    img.src = gifData.images.original.url;
    img.alt = gifData.title || "GIF";
    
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "DELETE";
    deleteBtn.addEventListener("click", () => {
        gifCard.remove();
    });
    
    gifCard.appendChild(img);
    gifCard.appendChild(deleteBtn);
    gifsContainer.appendChild(gifCard);
}

searchBtn.addEventListener("click", async () => {
    const searchTerm = searchInput.value.trim();
    if (!searchTerm) {
        alert("Please enter a search term");
        return;
    }
    
    const gifData = await fetchRandomGif(searchTerm);
    if (gifData) {
        displayGif(gifData);
    }
    
    searchInput.value = "";
});

searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});

deleteAllBtn.addEventListener("click", () => {
    gifsContainer.innerHTML = "";
});