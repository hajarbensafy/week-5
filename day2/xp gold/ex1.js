async function fetchRandomGif() {
    try {
      const response = await fetch("https://api.giphy.com/v1/gifs/random?api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My");
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const gifUrl = data.data.images.original.url;
      
      const img = document.createElement('img');
      img.src = gifUrl;
      document.body.appendChild(img);
      
    } catch (error) {
      console.log('Error:', error);
    }
  }
  
  fetchRandomGif();