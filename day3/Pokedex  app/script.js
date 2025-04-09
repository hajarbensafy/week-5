document.addEventListener('DOMContentLoaded', function() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const randomBtn = document.getElementById('randomBtn');
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    const pokemonInfoElement = document.getElementById('pokemonInfo');
    
    const pokemonNameElement = document.getElementById('pokemonName');
    const pokemonIdElement = document.getElementById('pokemonId');
    const pokemonHeightElement = document.getElementById('pokemonHeight');
    const pokemonWeightElement = document.getElementById('pokemonWeight');
    const pokemonTypesElement = document.getElementById('pokemonTypes');
    const pokemonImageElement = document.getElementById('pokemonImage');
    
    let currentPokemonId = 1;
    const TOTAL_POKEMON = 898; 
    
    loadPokemon(currentPokemonId);
    
    prevBtn.addEventListener('click', () => {
        if (currentPokemonId > 1) {
            currentPokemonId--;
            loadPokemon(currentPokemonId);
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentPokemonId < TOTAL_POKEMON) {
            currentPokemonId++;
            loadPokemon(currentPokemonId);
        }
    });
    
    randomBtn.addEventListener('click', () => {
        currentPokemonId = Math.floor(Math.random() * TOTAL_POKEMON) + 1;
        loadPokemon(currentPokemonId);
    });
    
    async function loadPokemon(id) {
        try {
            showLoading();
            
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            
            if (!response.ok) {
                throw new Error('Pokémon non disponible');
            }
            
            const pokemonData = await response.json();
            
            displayPokemon(pokemonData);
            
        } catch (error) {
            console.error('Erreur:', error);
            showError();
        }
    }
    
    function displayPokemon(pokemon) {
        pokemonNameElement.textContent = pokemon.name;
        pokemonIdElement.textContent = pokemon.id;
        pokemonHeightElement.textContent = `${pokemon.height / 10} m`;
        pokemonWeightElement.textContent = `${pokemon.weight / 10} kg`;
        
        pokemonTypesElement.textContent = pokemon.types
            .map(type => type.type.name)
            .join(', ');
        
        pokemonImageElement.src = pokemon.sprites.other['official-artwork'].front_default;
        pokemonImageElement.alt = pokemon.name;
        
        pokemonInfoElement.classList.remove('hidden');
        loadingElement.classList.add('hidden');
        errorElement.classList.add('hidden');
    }
    
    function showLoading() {
        loadingElement.classList.remove('hidden');
        pokemonInfoElement.classList.add('hidden');
        errorElement.classList.add('hidden');
    }
    
    function showError() {
        errorElement.classList.remove('hidden');
        loadingElement.classList.add('hidden');
        pokemonInfoElement.classList.add('hidden');
    }
});